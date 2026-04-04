let notes = JSON.parse(localStorage.getItem("notes")) || [];

const addBtn = document.querySelector('#addBtn');
const titleInput = document.querySelector('#titleNote');
const contentInput = document.querySelector('#contentNote');
const notesList = document.querySelector('#notesList');

renderNotes();

addBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === "" || content === "") return;

    notes.push({
        id: Date.now(),
        title,
        content
    });

    localStorage.setItem('notes', JSON.stringify(notes));

    titleInput.value = "";
    contentInput.value = "";

    renderNotes();
});

function renderNotes() {
    notesList.innerHTML = "";

    notes.forEach(note => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="note-title">${note.title}</div>
            <div>${note.content}</div>
        `;

        notesList.appendChild(li);
    });
}