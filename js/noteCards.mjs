import { quill } from "./modal.mjs";
 
 
function noteTemplate(note) {
    return `<a><div class="noteCard" data-id="${note.id}">
    <div class="noteTitle">${note.title}</div>
    <div class="noteContent">${note.content}</div>
    <div class="noteTags">${note.tags}</div>

    </div></a>`
}

export function displayCards() {
    let notesString = localStorage.getItem("notes");
    const parentElement = document.querySelector(".notes-container");

    if (!parentElement) {
        console.error("notes-container element not found");
        return;
    }

    if (notesString) {
        try {
            let notes = JSON.parse(notesString);

            if (Array.isArray(notes)) {
                notes.forEach(function(note) { // Changed back to forEach, map is not needed.
                    parentElement.insertAdjacentHTML('beforeend', noteTemplate(note)); // Insert at the end
        
                });
            } else {
                console.error("Notes in localStorage are not an array.");
            }
        } catch (error) {
            console.error("Error parsing notes from localStorage:", error);
        }
    } else {
        console.log("No notes found in localStorage.");
    }
}


export function editCards() {
    const container = document.querySelector(".notes-container"); // Parent element


    container.addEventListener("click", (event) => {
        const card = event.target.closest(".noteCard");
        if (!card) return; // Exit if clicked outside a card

        const noteId = card.dataset.id;
        const modalBackground = document.getElementById("modalBackground");
        const modal = document.getElementById("note-modal");
        const addedTagContainer = document.getElementById('addedTagContainer');

        console.log("Clicked card", noteId);
        modalBackground.style.display = "block"; // Show modal background
        modal.style.height = "600px"; // Show modal

        let notesArray = JSON.parse(localStorage.getItem("notes")) || [];
        let note = notesArray.find(note => note.id == noteId);
        
        const tags = note.tags;
        
        if (note) {
            document.querySelector("#noteTitle").value = note.title;
            quill.root.innerHTML = note.content;
            console.log(note);
            console.log("tags from edit Cards", tags);
            
            document.querySelector("#noteId").value = noteId;
            tags.forEach(tag => {
                const tagElement = document.createElement('li');
                tagElement.classList.add('modalTag');
                tagElement.innerText = `${tag}`;
                addedTagContainer.appendChild(tagElement);
                console.log("element created")
            });
        } else {
            document.querySelector("#noteTitle").value = "";
            quill.setText("");
            document.querySelector("#noteId").value = "";
        }
    });
}