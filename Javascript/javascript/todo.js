document.addEventListener("DOMContentLoaded", function (event) {
    var todoList = [];

    addTodoToList = function () {
        var val = document.getElementById("todoInput").value;
        var element = document.getElementById("todolist");
        var id = todoList.length;
        todoList.push(val);
        helperAddTodoItem(element, id, val);
    }

    helperAddTodoItem = function (todoListElement, id, value) {
        var todoDiv = document.createElement('div');
        todoDiv.setAttribute("class", "todo");
        todoDiv.setAttribute("id", id);

        var checkboxDiv = document.createElement('div');
        checkboxDiv.setAttribute("class", "todoCheckbox");
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "todoInputCheckbox");
        checkbox.setAttribute("id", "checkbox"+id);
        checkbox.onclick = crossoutTodo;
        checkboxDiv.appendChild(checkbox);

        todoDiv.appendChild(checkboxDiv);

        var todoTextDiv = document.createElement("div");
        todoTextDiv.setAttribute("class", "todoText");
        var todoTextSpan = document.createElement("span");
        todoTextSpan.setAttribute("id", "todoSpanText");
        todoTextSpan.appendChild(document.createTextNode(value));
        todoTextDiv.appendChild(todoTextSpan);

        todoDiv.appendChild(todoTextDiv);

        var todoEditBtnDiv = document.createElement("div");
        todoEditBtnDiv.setAttribute("class", "todoBtn editBtn");
        todoEditBtnDiv.setAttribute("id", "editBtn"+id);
        todoEditBtnDiv.onclick = editTodo;
        var editImg = document.createElement("img");
        editImg.setAttribute("src", "../images/edit-icon-small.png");
        todoEditBtnDiv.appendChild(editImg);

        todoDiv.appendChild(todoEditBtnDiv);

        var todoDeleteBtnDiv = document.createElement("div");
        todoDeleteBtnDiv.setAttribute("class", "todoBtn deleteBtn");
        todoDeleteBtnDiv.setAttribute("id", "deleteBtn"+id);
        todoDeleteBtnDiv.onclick = removeTodo;
        var deleteImg = document.createElement("img");
        deleteImg.setAttribute("src", "../images/delete-icon-small.png");
        todoDeleteBtnDiv.appendChild(deleteImg);

        todoDiv.appendChild(todoDeleteBtnDiv);

        todoListElement.appendChild(todoDiv);
    }

    editTodo = function () {

    }

    removeTodo = function () {
        var itemToRemove = document.getElementById(this.id).parentElement;
        document.getElementById("todolist").removeChild(itemToRemove);
        var allTodos = document.getElementsByClassName("todo");
        var allTodoCheckboxes = document.getElementsByClassName("todoInputCheckbox");
        var editBtns = document.getElementsByClassName("editBtn");
        var deleteBtns = document.getElementsByClassName("deleteBtn");
        for (var i = 0; i < allTodos.length; i++) {
            allTodos[i].setAttribute("id", i);
            allTodoCheckboxes[i].setAttribute("id", "checkbox"+i);
            editBtns[i].setAttribute("id", "editBtn"+i);
            deleteBtns[i].setAttribute("id", "deleteBtn"+i);
        }

        todoList.splice(itemToRemove.id, 1);
    }

    crossoutTodo = function () {
        var parent = document.getElementById(this.id).parentElement.parentElement;
        parent.getElementsByClassName("todoText")[0].classList.add("strikeoutText");
    }
});