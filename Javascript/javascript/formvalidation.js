document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        if (document.querySelector("#email-input").value.trim().length == 0) {
            document.querySelector("#email-error-text").innerText = "Please fill in email. Email cannot be empty."
            document.querySelector("#email-error").style.display = "block";
        }
        else if (!/\S+@\S+\.\S+/.test(document.querySelector("#email-input").value)) {
            document.querySelector("#email-error-text").innerText = "The format of the email is incorrect. Enter an email that follows this format: email@domain.com."
            document.querySelector("#email-error").style.display = "block";
        }
        else {
            document.querySelector("#email-error").style.display = "none";
        }

        if (document.querySelector("#username-input").value.trim().length == 0) {
            document.querySelector("#username-error-text").innerText = "Please fill in username. Username cannot be empty."
            document.querySelector("#username-error").style.display = "block";
        }
        else {
            document.querySelector("#username-error").style.display = "none";
        }

        const passwordEl = document.querySelector("#password-input")
        if (passwordEl.value.trim().length < 12) {
            var containsNumber = /\d+/.test(passwordEl.value);
            var containsSymbol = /\W+[^\s]+/.test(passwordEl.value) && !passwordEl.value.includes(' ');
            var containsUppercaseLetter = passwordEl.value.toLowerCase() !== passwordEl.value;
            if (!(containsNumber && containsSymbol && containsUppercaseLetter)) {
                document.querySelector("#password-error-text").innerText = "The password must be at least 12 characters long and contain at least one Capital, one number and one symbol.";
                document.querySelector("#password-error").style.display = "block";
            }
        }
        else {
            document.querySelector("#password-error").style.display = "none";
        }

        return false;
    });
});