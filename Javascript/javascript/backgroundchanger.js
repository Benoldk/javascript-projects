document.addEventListener("DOMContentLoaded", function () {
    var curBackgroundColor = "#fff";


    document.getElementById("backgroundChangerBtn").onclick = function () {
        var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        SetBackgroundColor(randomColor);
    }

    SetBackgroundColor = function (color) {
        document.getElementById("colorArea").innerHTML = color;
        document.body.style.backgroundColor = color;
    }

    SetBackgroundColor(curBackgroundColor);
});