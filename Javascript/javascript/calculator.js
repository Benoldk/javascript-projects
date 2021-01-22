document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#operation-input").onkeypress = function (e) {
        e.preventDefault();
        var event = e ? e : window.event;
        var keyCode = event.which ? event.which : event.keyCode;
        var acceptKey = (keyCode > 47 && keyCode < 58)
            || [42, 43, 45, 46, 47].indexOf(keyCode) >= 0;
        if (acceptKey) {
            this.value += String.fromCharCode(keyCode);
        }
    }

    handleNumberButtonClick = function (e) {
        var event = event || window.event;
        var eventTarget = event.target || event.srcElement;
        if (eventTarget.className.match("calc-num")) {
            setInputValueFromButton(eventTarget);
        }
    }

    handleOperationButtonClick = function (e) {
        var event = event || window.event;
        var eventTarget = event.target || event.srcElement;
        if (eventTarget.className.match("calc-op")) {
            handleOperation(eventTarget);
        }
    }

    if (document.body.addEventListener) {
        document.body.addEventListener("click", handleNumberButtonClick, false);
        document.body.addEventListener("click", handleOperationButtonClick, false);
    }
    else {
        document.body.attachEvent("onclick", handleNumberButtonClick);
        document.body.attachEvent("onclick", handleOperationButtonClick);
    }

    setInputValueFromButton = function (element) {
        document.querySelector("#operation-input").value += element.dataset.num;
    }

    handleOperation = function (element) {
        if (element.dataset.operation === "plus") {
            document.querySelector("#operation-input").value += "+";
        }
        else if (element.dataset.operation === "minus") {
            document.querySelector("#operation-input").value += "-";
        }
        else if (element.dataset.operation === "multiply") {
            document.querySelector("#operation-input").value += "*";
        }
        else if (element.dataset.operation === "divide") {
            document.querySelector("#operation-input").value += "/";
        }
        else {
            evalutateEquation();
        }
    }

    document.querySelector("#clear-btn").onclick = function () {
        document.querySelector("#operation-input").value = "";
    }

    evalutateEquation = function () {
        // order of consideration
        // Parentheses
        // Exponents
        // << Multiplication >>
        // << Division >>
        // << Addition >>
        // << Subtraction >>

        var equation = document.querySelector("#operation-input").value;

        var equationBreakdown = breakdownEquation(equation);
        var equation = evaluateOperation(equationBreakdown[1], equationBreakdown[0].get("*"), "*");

        var equationBreakdown = breakdownEquation(equation);
        var equation = evaluateOperation(equationBreakdown[1], equationBreakdown[0].get("/"), "/");

        var equationBreakdown = breakdownEquation(equation);
        var equation = evaluateOperation(equationBreakdown[1], equationBreakdown[0].get("+"), "+");

        var equationBreakdown = breakdownEquation(equation);
        var equation = evaluateOperation(equationBreakdown[1], equationBreakdown[0].get("-"), "-");

        document.querySelector("#operation-input").value = equation;
    }

    breakdownEquation = function (equation) {
        var breakdown = [new Map(), []]
        breakdown[0].set("*", [])
        breakdown[0].set("/", [])
        breakdown[0].set("+", [])
        breakdown[0].set("-", [])
        var opSigns = ["*", "/", "+", "-"];
        var prevTracker = 0;
        var opSignIndex = 1;
        for (var i = 0; i < equation.length; i++) {
            var index = opSigns.indexOf(equation[i]);
            if (index >= 0) {
                breakdown[0].get(opSigns[index]).push(opSignIndex);
                breakdown[1].push(equation.substring(prevTracker, i));
                breakdown[1].push(opSigns[index]);
                prevTracker = i+1;
                ++opSignIndex;
            }
        }
        breakdown[1].push(equation.substring(prevTracker, equation.length));
        return breakdown;
    }

    evaluateOperation = function (equationArr, operationIndices, operation) {
        for (var i = operationIndices.length - 1; i >= 0; i--) {
            var result = getOperationResult(Number(equationArr[operationIndices[i] - 1]), Number(equationArr[operationIndices[i] + 1]), operation);
            equationArr[operationIndices[i] - 1] = result;
            equationArr.splice(operationIndices[i], 2);
        }
        return equationArr.join('');
    }

    getOperationResult = function (leftNum, rightNum, operation) {
        switch (operation) {
            case "*":
                return leftNum * rightNum;
            case "/":
                return leftNum / rightNum;
            case "+":
                return leftNum + rightNum;
            case "-":
                return leftNum - rightNum;
        }
    }
});