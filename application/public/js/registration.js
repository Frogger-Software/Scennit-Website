var requirements = [false, false, false, false, false, false];

let username = document.getElementById('username');
username.onchange = function () {
    let req1 = document.getElementById('username-req1');
    let req2 = document.getElementById('username-req2');
    let str = username.value;
    const usernameRegex = new RegExp("^[a-zA-z]");

    if (usernameRegex.test(str)) {
        req1.style = "color: rgb(60, 255, 0)";
        requirements[0] = true;
    } else {
        req1.style = "color: red";
        requirements[0] = false;
    }

    if (str.length >= 3) {
        req2.style = "color: rgb(60, 255, 0)";
        requirements[1] = true;
    } else {
        req2.style = "color: red";
        requirements[1] = false;
    }
}

let email = document.getElementById('email');
email.onchange = function () {
    let str = email.value;
    let req = document.getElementById('email-req');
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(str)) {
        req.style = "color: rgb(60, 255, 0)";
        requirements[2] = true;
    } else {
        req.style = "color: red)";
        requirements[2] = false;
    }

}

let password = document.getElementById('password');
password.onchange = function () {
    let req1 = document.getElementById('pass-req1');
    let req2 = document.getElementById('pass-req2');
    let str = password.value;
    const passRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[/\*-+!@#\$%\^&])");
    if (str.length >= 8) {
        req1.style = "color: rgb(60, 255, 0)";
        requirements[3] = true;
    } else {
        req1.style = "color: red";
        requirements[3] = false;
    }

    if (passRegex.test(str)) {
        req2.style = "color: rgb(60, 255, 0)";
        requirements[4] = true;
    } else {
        req2.style = "color: red";
        requirements[4] = false;
    }
}

let passwordConfirm = document.getElementById('password-confirm');
passwordConfirm.onchange = function () {
    let req = document.getElementById('cpass-req');
    let str1 = password.value;
    let str2 = passwordConfirm.value;
    if (str1 = str2) {
        req.style = "color: rgb(60, 255, 0)";
        requirements[5] = true;
    } else {
        req.style = "color: red";
        requirements[5] = false;
    }
}

function isTrue(bool) {
    return bool;
}

let registerButton = document.getElementById('register-button');
registerButton.onclick = function () {
    if (requirements.every(isTrue)) {
        return true;
    } else {
        alert('requirements not fulfilled');
        return false;
    }
}
