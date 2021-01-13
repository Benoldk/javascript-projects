document.addEventListener("DOMContentLoaded", function () {
    var noteList = [];
    const ADDMODE = "ADD";
    const EDITMODE = "EDIT";
    var curMode = null;
    var curNoteId = null;
    var curNoteParentId = null;

    const modal = document.querySelector("#modal");
    const submitBtn = document.querySelector("#submitBtn");
    const noteInput = document.querySelector("#noteInput");

    setAddMode = function () {
        curMode = ADDMODE;
        submitBtn.innerText = "Submit";
    }

    setEditMode = function () {
        curMode = EDITMODE;
        submitBtn.innerText = "Edit";
    }

    initialize = function () {
        modal.style.display = "none";
        setAddMode();
        noteInput.innerText = "WRITE NOTE HERE";
        noteInput.focus();
    }

    initialize();

    submitBtn.onclick = function () {
        addNote();
    }

    addNote = function () {
        var note = noteInput.value;
        if (note.trim().length > 0) {
            var noteElVal = note.substring(0, 465) + "...";
            if (curMode == ADDMODE) {
                var noteEl = createNoteElement(noteElVal);
                document.querySelector("#notelist").append(noteEl);
                noteList.push(note);
            }
            else if (curMode == EDITMODE) {
                editTargetNote();
                setAddMode();
            }
            noteInput.value = "";
        }
        else {
            alert("Cannot add an empty note. Please write a note first!")
        }
        noteInput.focus();
    }

    createNoteElement = function (noteVal) {
        var id = noteList.length;

        var removeBtn = createButtonElement("removeBtn", "remove note", "../images/delete-icon-small.png");
        removeBtn.dataset.noteParentId = id;
        removeBtn.onclick = removeNote;

        var editBtn = createButtonElement("editBtn", "edit note", "../images/edit-icon-small.png");
        editBtn.dataset.noteParentId = id;
        editBtn.dataset.noteId = "note"+id;
        editBtn.onclick = editNote;

        var viewBtn = createButtonElement("viewBtn", "view note details", "../images/popup-icon-small.png");
        viewBtn.dataset.noteParentId = id;
        viewBtn.onclick = viewNote;

        var noteBtnsDiv = createDivElement("noteBtns", "");
        noteBtnsDiv.append(removeBtn, editBtn, viewBtn);

        var noteDiv = createDivElement("note", "note" + id);
        noteDiv.innerText = noteVal;

        var mainNoteDiv = createDivElement("noteDiv",  id);
        mainNoteDiv.append(noteDiv, noteBtnsDiv);

        return mainNoteDiv;
    }

    createDivElement = function (divClass, divId) {
        var div = document.createElement("div");
        div.setAttribute("class", divClass);
        div.id = divId;
        return div;
    }

    createImageElement = function (alt, title, src) {
        var img = document.createElement("img");
        img.setAttribute("alt", alt);
        img.setAttribute("title", title);
        img.setAttribute("src", src);
        return img;
    }

    createButtonElement = function (btnClass, imgAltTitle, imgPath) {
        var btn = document.createElement("div");
        btn.setAttribute("class", btnClass);
        var img = createImageElement(imgAltTitle, imgAltTitle, imgPath);
        btn.append(img);

        return btn
    }

    viewNote = function () {
        displayNoteModal(noteList[this.dataset.noteParentId])
    }

    displayNoteModal = function (note) {
        modal.querySelector("#modalText").innerText = note;
        modal.style.display = "block";
    }

    document.querySelector("#closeModal").onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }

    removeNote = function () {
        document.getElementById(this.dataset.noteParentId).remove();
        var remainingNoteDivs = document.querySelector(".noteDiv");
        if (remainingNoteDivs != null) {
            for (var i = 0; i < remainingNoteDivs.length; i++) {
                noteDiv.id = i;
            }
        }
        noteList.splice(this.dataset.noteParentId, 1);
    }

    editNote = function () {
        setEditMode();
        noteInput.value = noteList[this.dataset.noteParentId];
        curNoteParentId = this.dataset.noteParentId;
        curNoteId = this.dataset.noteId;
        noteInput.focus();
    }

    editTargetNote = function () {
        if (curNoteId !== null && curNoteParentId !== null) {
            noteList[curNoteParentId] = noteInput.value;
            document.querySelector("#"+curNoteId).innerText = noteInput.value.substring(0, 465) + "...";
            curNoteId = null;
        }
    }
});