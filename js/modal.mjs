import { displayCards } from "./noteCards.mjs";


export let quill = new Quill('.modal-content', {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],        // toggled button
          
            [{ 'header': 1 }, { 'header': 2 }],               // custom dropdown
            [{ 'list': 'ordered'}],
          
            ['clean'],                                         // remove formatting button
            ['link']
          ]
      },
    placeholder: 'Take a note...',
    theme: 'snow'
  });

function isQuillEmpty(quillEditor) {
    return quillEditor.getText().trim().length === 0;
}

export function addNote() {
    const addNoteButton = document.querySelector("#addNote");
    const modalBackground = document.getElementById("modalBackground");
    const modal = document.getElementById("note-modal");

    addNoteButton.addEventListener("click", () => {
        modalBackground.style.display = "block";
        modal.style.height = "600px";
    });
}



export function closeModal() {
    const modalBackground = document.getElementById("modalBackground");
    const modal = document.getElementById("note-modal");

    modalBackground.addEventListener("click", () => {
        console.log("close");
        saveNote();
        modal.style.height = "0";
        modalBackground.style.display = "none";
    });
}

function saveNote() {
    const titleInput = document.querySelector("#noteTitle").value;
    const tags = document.querySelector("#addedTagContainer").children;
    const tagArray = Array.from(tags).map(tag => tag.innerText);
    console.log("tagArray", tagArray);

    

    if (isQuillEmpty(quill)) {
        console.log("empty");
        return;
    }

    let existingNotes = localStorage.getItem("notes");
    let notesArray = [];

    if (existingNotes) {
        try {
            notesArray = JSON.parse(existingNotes);
            if (!Array.isArray(notesArray)) {
                notesArray = [];
            }
        } catch (e) {
            console.error("Error parsing existing notes:", e);
            notesArray = [];
        }
    }

    // Get the note ID from the hidden input
    const noteId = document.querySelector("#noteId").value;

    if (noteId) {
        // If an ID exists, update the existing note
        const noteIndex = notesArray.findIndex(note => note.id == noteId);
        if (noteIndex !== -1) {
            notesArray[noteIndex].title = titleInput;
            notesArray[noteIndex].content = quill.root.innerHTML;
            notesArray[noteIndex].tags = tagArray;
            console.log("Note updated:", notesArray[noteIndex]);
        }
    } else {
        // If no ID, create a new note with a new incremented ID
        let nextId = notesArray.length > 0 
            ? Math.max(...notesArray.map(note => note.id || 0)) + 1 
            : 1;

        let content = {
            id: nextId,
            title: titleInput,
            content: quill.root.innerHTML,
            tags: tagArray
        };

        notesArray.push(content);
        console.log("New note added:", content);
    }

    // Save the updated notes back to local storage
    localStorage.setItem("notes", JSON.stringify(notesArray));

    // Reset the editor and hidden noteId field
    quill.setText(""); 
    document.querySelector("#noteId").value = ""; // Clear noteId after saving
    document.querySelector("#addedTagContainer").innerHTML = ""; // Clear tags after saving
    document.querySelector(".notes-container").innerHTML = ""; 
    document.querySelector("#noteTitle").value = ""; // Clear title after saving
    displayCards();
}


export function fillTagCheckBox(noteId) {
    

}