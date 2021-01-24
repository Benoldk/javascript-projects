document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector("#modal");

    document.querySelector("#gen-pwd").onclick = function () {
        var pwd = generatePassword(12);
        document.querySelector('#pwd-textbox').value = pwd;
    }

    document.querySelector("#copy-pwd").onclick = function () {
        const pwdTxbx = document.querySelector('#pwd-textbox');
        pwdTxbx.focus();
        pwdTxbx.select();
        // copy text inside textbox
        document.execCommand("copy");
        displayMessage("Password Copied: " + pwdTxbx.value);
    }

    function generatePassword(len) {
        var pwd = "";
        for (var i = 0; i < len; i++) {
            // using ascii table
            pwd += String.fromCharCode(Math.random() * (126 - 33) + 33);
        }
        return pwd;
    }

    function displayMessage(message) {
        modal.querySelector("#modal-text").innerText = message;
        modal.style.display = "block";
        fadeOut(modal);
    }

    function fadeOut(element) {
        var opacity = 1;
        var timer = setInterval(function () {
            if (opacity <= 0.1) {
                clearInterval(timer);
                element.style.display = "none";
            }

            element.style.opacity = opacity;
            element.style.filter = 'alpha(opactiy=' + opacity * 100 + ')';
            opacity -= 0.1;
        }, 100);
    }

    window.onclick = function (e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }
});