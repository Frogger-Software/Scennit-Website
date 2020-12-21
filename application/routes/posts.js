var express = require('express');
var router = express.Router();
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const { check, validationResult } = require('express-validator');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostModel = require('../models/Posts');
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

router.post('/createPost',
    // [
    //     check('title').notEmpty(),
    //     check('description').notEmpty(),
    //     check('uploadImage').custom(function (fileExists) {
    //         if (fileExists == undefined) {
    //             throw new Error('no file submitted')
    //         }
    //     })

    // ],
    uploader.single("uploadImage"), (req, res, next) => {
        let title = req.body.title;
        let desc = req.body.description;

        // var errors = validationResult(req);
        if (!title || !desc || !req.file) {
            // console.log({ errors: errors.array() });
            req.flash('error', 'post failed');
            res.redirect('/');
        } else {
            let fileUploaded = req.file.path;
            let fileAsThumbnail = `thumbnail-${req.file.filename}`;
            let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
            let fk_userId = req.session.userId;

            sharp(fileUploaded)
                .resize(200)
                .toFile(destinationOfThumbnail)
                .then(() => {
                    return PostModel.create(
                        title,
                        desc,
                        fileUploaded,
                        destinationOfThumbnail,
                        fk_userId);
                })
                .then((postWasCreated) => {
                    if (postWasCreated) {
                        req.flash('success', 'your post was created successfully');
                        res.redirect('/');
                    } else {
                        throw new PostError('post could not be created', '/postimage', 200);
                    }
                })
                .catch((err) => {
                    if (err instanceof PostError) {
                        errorPrint(err.getMessage());
                        req.flash('error', err.getMessage());
                        res.status(err.getStatus());
                        res.redirect(err.getRedirectURL());
                    } else {
                        next(err);
                    }
                })
        }
    });

router.get('/search', async (req, res, next) => {
    try {
        let searchTerm = req.query.search;
        if (!searchTerm) {
            res.send({
                message: "no search term given",
                results: []
            });
        } else {
            let results = await PostModel.search(searchTerm)
            if (results.length) {
                res.send({
                    message: `${results.length} results found`,
                    results: results
                });
            } else {
                let results = await PostModel.getNRecentPosts(8);
                res.send({
                    message: 'No results found. 8 most recent posts displayed instead',
                    results: results
                });
            }
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
