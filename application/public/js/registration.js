function alphanumericCheck(str) {
    ascii = str.charCodeAt(0);
    if (ascii < 65 || ascii > 122) {
        return false;
    }
    return true;
}

let username = document.getElementById('username');
username.onchange = function () {
    var str = username.value;
    if (!alphanumericCheck(str)) {
        alert("Username must start with a character ([a-zA-Z])");
    }
    if (str.length < 3) {
        alert("Username must be 3 or more alphanumeric characters");
    }
}

let password = document.getElementById('password');
password.onchange = function () {
    var str = password.value;
    const passRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[/\*-+!@#\$%\^&])");
    if (str.length < 8) {
        alert("Password must be 8 or more characters");
    }
    if (!passRegex.test(str)) {
        alert("Password must contain at least 1 upper case letter and 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * ).");
    }
}

let passwordConfirm = document.getElementById('password-confirm');
passwordConfirm.onchange = function () {
    var str1 = password.value;
    var str2 = passwordConfirm.value;
    if (str1 != str2) {
        alert("Passwords don't match");
    }
}

