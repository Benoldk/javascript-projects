document.addEventListener("DOMContentLoaded", function () {
    var count = 0;

    document.getElementById("addBtn").onclick = function () {
        var valid = true;
        var date = document.getElementById("dateInput").value;
        var description = document.getElementById("descriptionInput").value;
        var amount = document.getElementById("amountInput").value;
        if (date.trim().length == 0) {
            valid = false;
        }
        else if (description.trim().length == 0) {
            valid = false;
        }
        else if (amount.trim().length == 0) {
            valid = false;
        }

        if (valid == false) {
            alert("Please fill in all information for expense and submiting again!")
        }
        else {
            AddExpense(date, description, amount);
        }
    }

    AddExpense = function (date, description, amount) {
        var tableElement = document.getElementById("expenseTable");

        var dateCol = document.createElement("td");
        dateCol.appendChild(document.createTextNode(date));

        var descCol = document.createElement("td");
        descCol.appendChild(document.createTextNode(description));

        var amountCol = document.createElement("td");
        amountCol.appendChild(document.createTextNode(amount));

        var removeCol = document.createElement("td");
        var removeImg = document.createElement("img");
        removeImg.setAttribute("id", "remove" + count);
        removeImg.setAttribute("src", "../images/delete-icon-small.png");
        removeImg.onclick = RemoveExpense;
        removeCol.appendChild(removeImg);

        var row = document.createElement("tr");
        row.setAttribute("id", "row"+count);
        row.setAttribute("class", "expenseRow");
        row.appendChild(dateCol);
        row.appendChild(descCol);
        row.appendChild(amountCol);
        row.appendChild(removeCol);

        tableElement.appendChild(row);
        count++;
    }

    RemoveExpense = function () {
        var targetId = document.getElementById(this.id).parentElement.parentElement.id;
        var targetRowElement = document.getElementById(targetId);
        var table = document.getElementById("expenseTable");
        table.removeChild(targetRowElement);

        var expenseRows = document.getElementsByClassName("expenseRow");
        for (var i = 0; i < expenseRows.length; i++) {
            expenseRows[i].setAttribute("id", "row" + i);
        }
    }
});