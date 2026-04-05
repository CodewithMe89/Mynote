let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editId = null

const addBtn = document.querySelector('#addBtn');
const titleInput = document.querySelector('#titleNote');
const contentInput = document.querySelector('#contentNote');
const notesList = document.querySelector('#notesList');
const searchInput = document.querySelector('#searchBox')

renderNotes();

addBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === "" || content === "") return;

    if (editId) {
        notes = notes.map(note =>
            note.id === editId
                ? { ...note, title, content }
                : note
        );
        editId = null;
        addBtn.textContent = "Add Note";
    }
    else {
        notes.push({
            id: Date.now(),
            title,
            content
        });
    }

    localStorage.setItem('notes', JSON.stringify(notes));

    titleInput.value = "";
    contentInput.value = "";

    renderNotes();
});

notesList.addEventListener('click', (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        const id = Number(e.target.dataset.id);

        notes = notes.filter(note => note.id !== id);

        localStorage.setItem('notes', JSON.stringify(notes));

        renderNotes();
    }
});

notesList.addEventListener('click', (e) => {
    if (e.target.classList.contains("editBtn")) {
        const id = Number(e.target.dataset.id);

        const note = notes.find(n => n.id === id)

        titleInput.value = note.title;
        contentInput.value = note.content

        editId = id;
        addBtn.textContent = "Update Note"
    }
})

searchInput.addEventListener('input',() =>{
    renderNotes();
})

function renderNotes() {
    notesList.innerHTML = "";

    const searchValue = searchInput.value.toLowerCase();

    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchValue)
    )

    filteredNotes.forEach(note => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="note-title">${note.title}</div>
            <div>${note.content}</div>
            <button class="editBtn" data-id="${note.id}">Edit</button>
            <button class="deleteBtn" data-id="${note.id}">Delete</button>
        `;

        notesList.appendChild(li);
    });
}