

function addTag() {
    const tagButton = document.getElementById('createTagButton');

    tagButton.addEventListener('click', function () {
        const tagInput = document.getElementById('tagInput');
        const tag = tagInput.value.trim();

        if (tag === '') {
            alert('Tag cannot be empty. Try Again!');
            return;
        }

        if (tag.length > 30) {
            alert('Tag is too long. Try Again!');
            return;
        }

        // Retrieve tags from localStorage or initialize an empty array
        const tags = JSON.parse(localStorage.getItem('tags')) || [];

        if (tags.includes(tag)) {
            alert('Tag already exists. Try Again!');
        } else {
            tags.push(tag);
            localStorage.setItem('tags', JSON.stringify(tags));
            tagInput.value = ''; // Clear input field after adding
            addTagToDOM(tag); // Add tag to UI dynamically
        }
    });
}

// function deleteTag() {
//     const deleteButtons = document.querySelectorAll('.deleteTag');

//     deleteButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const tagElement = button.closest('.tag'); // Find closest tag container
//             const tagText = tagElement.querySelector('p').innerText;

//             // Get existing tags from localStorage
//             let tags = JSON.parse(localStorage.getItem('tags')) || [];

//             // Filter out the deleted tag
//             const newTags = tags.filter(element => element !== tagText);
//             localStorage.setItem('tags', JSON.stringify(newTags));

//             // Remove tag from DOM
//             tagElement.remove();
//         });
//     });
// }

function tagTemplate(tag) {
    return `<div class="tag">
        <p>${tag}</p>
        
    </div>`;
}

function displayTags() {
    const tags = JSON.parse(localStorage.getItem('tags')) || [];
    const tagList = document.getElementById('tagList');
    tagList.innerHTML = ''; // Clear existing tags before rendering

    tags.forEach(tag => addTagToDOM(tag));
}

function addTagToDOM(tag) {
    const tagList = document.getElementById('tagList');
    
    // Create a temporary container to convert string to HTML elements
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = tagTemplate(tag);
    
    const tagElement = tempDiv.firstElementChild;
    
    // Attach delete event listener to the delete button
    // tagElement.querySelector('.deleteTag').addEventListener('click', deleteTag);
    
    tagList.appendChild(tagElement);
}


function showTags() {
    const showTagsButton = document.getElementById('showTags');
    const createdTagContainer = document.getElementById('createdTagContainerOptions');
    const checkboxTagList = document.getElementById('checkboxTagList');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const tags = JSON.parse(localStorage.getItem('tags')) || [];
    
    

    showTagsButton.addEventListener('click', function() {
        const noteId = document.getElementById('noteId').value;
        const note = notes.find(note => note.id == noteId);
        const noteTags = note ? note.tags : [];
        
        console.log('noteTags from showTags Function', noteTags);
        createdTagContainer.style.display = 'block';

        tags.forEach(tag => {
            const tagElement = document.createElement('li');
            tagElement.classList.add('modalTag');
            if (tag === '') {
                return;
            } else {
                if (noteTags.includes(tag)) {
                    tagElement.innerHTML = `<input type="checkbox" name="tags" value="${tag}" id="tag-${tag}" checked>
                    <label for="tag-${tag}">${tag}</label>`;

                } else {
                    
                    tagElement.innerHTML = `<input type="checkbox" name="tags" value="${tag}" id="tag-${tag}">
                    <label for="tag-${tag}">${tag}</label>`;  
                }

            }

            checkboxTagList.appendChild(tagElement);
        });
        showTagsButton.style.display = 'none';
    });
}

export function addTagToNote() {
    const addTagToNoteButton = document.getElementById('addTagToNoteButton');
    const addTagsButton = document.getElementById('showTags');
    const createdTagContainer = document.getElementById('createdTagContainerOptions');
    const checkboxTagList = document.getElementById('checkboxTagList');
    const addedTagContainer = document.getElementById('addedTagContainer');

    
    
    
    
    if (!addTagToNoteButton.dataset.listenerAdded) { // Prevents duplicate listeners
        addTagToNoteButton.dataset.listenerAdded = "true";
        
        addTagToNoteButton.addEventListener('click', function() {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            const noteId = document.getElementById('noteId').value;
            const note = notes.find(note => note.id == noteId);
            const noteTags = note ? note.tags : [];

            console.log('noteTags from addTagToNote Function', noteTags);

            const selectedTags = Array.from(checkboxTagList.querySelectorAll('input[type="checkbox"]:checked'))
                .map(checkbox => checkbox.value);

            console.log(selectedTags);
            console.log('noteId from addTagToNote Function', noteId);

            
            selectedTags.forEach(tag => {
                if (!noteTags.includes(tag)) {
                    console.log("Tag already added")
                    const tagElement = document.createElement('li');
                    tagElement.classList.add('modalTag');
                    tagElement.innerText = `${tag}`;
                    addedTagContainer.appendChild(tagElement);
                } else {
                    return;
                }
            });

            createdTagContainer.style.display = 'none';
            checkboxTagList.innerHTML = '';
            addTagsButton.style.display = 'inline-block';
        });
    }
}




export function tagFunctions() {
    addTag();
    displayTags();
    showTags();
    addTagToNote();
}