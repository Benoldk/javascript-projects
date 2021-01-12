document.addEventListener("DOMContentLoaded", function () {
    var noteList = [];
    const ADDMODE = "ADD";
    const EDITMODE = "EDIT";
    var curMode = null;
    var curNoteId = null;

    setAddMode = function () {
        curMode = ADDMODE;
        document.getElementById("submitBtn").innerHTML = "Submit";
    }

    setEditMode = function () {
        curMode = EDITMODE;
        document.getElementById("submitBtn").innerHTML = "Edit";
    }

    initialize = function () {
        setAddMode();
        document.getElementById("noteInput").focus();
    }

    initialize();

    document.getElementById("submitBtn").onclick = function () {
        addNote();
    }

    addNote = function () {
        var noteInput = document.getElementById("noteInput");
        var note = noteInput.innerHTML;
        if (note.trim().length > 0) {
            var noteElVal = note.substring(0, 100) + "...";
            if (curMode == ADDMODE) {
                var noteEl = createNoteElement(noteElVal);
                document.getElementById("notelist").appendChild(noteEl);
                noteList.push(note);
            }
            else if (curMode == EDITMODE) {
                editTargetNote();
                setAddMode();
            }
            noteInput.innerHTML = "";
        }
        else {
            alert("Cannot add an empty note. Please write a note first!")
        }
        noteInput.focus();
    }

    createNoteElement = function (noteVal) {
        var id = noteList.length;

        var noteDiv = document.createElement("div");
        noteDiv.setAttribute("class", "note");
        noteDiv.setAttribute("id", "note" + id);
        noteDiv.innerHTML = noteVal;

        var noteBtnsDiv = document.createElement("div");
        noteBtnsDiv.setAttribute("class", "noteBtns");

        var removeBtn = document.createElement("div");
        removeBtn.setAttribute("class", "remove");

        var removeImg = createImage("remove note", "remove note", "../images/delete-icon-small.png");
        removeBtn.appendChild(removeImg);

        var detailsBtn = document.createElement("div");
        detailsBtn.setAttribute("class", "viewBtn");

        var detailsImg = createImage("view details", "view details", "../images/popup-icon-small.png");
        detailsBtn.appendChild(detailsImg);

        noteBtnsDiv.appendChild(removeBtn);
        noteBtnsDiv.appendChild(detailsBtn);

        var mainNoteDiv = document.createElement("div");
        mainNoteDiv.setAttribute("id", id);
        mainNoteDiv.setAttribute("class", "noteDiv");
        mainNoteDiv.appendChild(noteDiv);
        mainNoteDiv.appendChild(noteBtnsDiv);

        return mainNoteDiv;
    }

    createImage = function (alt, title, src) {
        var img = document.createElement("img");
        img.setAttribute("alt", alt);
        img.setAttribute("title", title);
        img.setAttribute("src", src);
        return img;
    }

    editNote = function () {
        setEditMode();
    }

    editTargetNote = function () {
        if (curNoteId !== null) {
            // TODO: add logic to edit target note
        }
    }
});