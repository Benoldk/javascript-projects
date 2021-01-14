document.addEventListener("DOMContentLoaded", function () {
    const textInputEl = document.querySelector("#text-input");
    const vowelCountEl = document.querySelector("#total-vowels");

    textInputEl.addEventListener("keyup", function (e) {
        if (textInputEl.value.trim().length > 0) {
            setVowelCount();
        }
    })

    calculateVowelCount = function (val) {
        return Array.from(val.toLowerCase()).filter(v => 'aeiou'.includes(v)).length;

        // or use regex (bleh!)
        //return (val.toLowerCase().match(/[aeiou]/gi) || []).length;
    }

    setVowelCount = function () {
        var vowelCount = calculateVowelCount(textInputEl.value);
        vowelCountEl.innerText = vowelCount;
    }

    initialize = function () {
        setVowelCount();
    }

    initialize();
});