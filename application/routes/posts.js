var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const { check, validationResult } = require('express-validator');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostError = require('../helpers/error/PostError');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/uploads");
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(11).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({ storage: storage });

router.post('/createPost', uploader.single("uploadImage"), (req, res, next) => {
    let fileUploaded = req.file.path;
    let title = req.body.title;
    let desc = req.body.description;

    check(title).notEmpty(),
    check(desc).notEmpty(),
    check(fileUploaded).notEmpty()

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log({ errors: errors.array() });
        res.redirect('/');
    } else {
        let fileAsThumbnail = `thumbnail-${req.file.filename}`;
        let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
        let fk_userId = req.session.userId;

        sharp(fileUploaded)
        .resize(200)
        .toFile(destinationOfThumbnail)
        .then(() => {
            let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?,?,?,?, now(), ?);';
            return db.execute(baseSQL,[title, desc, fileUploaded, destinationOfThumbnail, fk_userId]);
        })
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                req.flash('success', 'your post was created successfully');
                res.redirect('/');
            }else{
                throw new PostError('post could not be created', '/postimage', 200);
            }
        })
        .catch((err) => {
            if(err instanceof PostError){
                errorPrint(err.getMessage());
                req.flash('error', err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            }else{
                next(err);
            }
        })
    }
});

module.exports = router;
