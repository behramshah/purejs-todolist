let addTodo = document.getElementById('add-button');
let todoList = document.getElementById('todo-list');
let todoInput = document.getElementById('todo-input');
let preEditon = '';

addTodo.setAttribute('disabled', true);

function checkInput (event) {    
    event.target.value ? addTodo.removeAttribute('disabled') : addTodo.setAttribute('disabled', true);
}

function addNewTodo () {
    let todoText = document.getElementById('todo-input').value;
    createTodo(todoText);
    document.getElementById('todo-input').value = '';
    addTodo.setAttribute('disabled', true);
};

function clickEdit (event) {
    addTodo.removeEventListener('click', addNewTodo);
    addTodo.setAttribute('disabled', true);
    let task = event.currentTarget.parentElement;
    task.setAttribute('id', 'editing');
    preEditon = task.children[0].innerHTML;
    taskText = task.children[0].innerHTML;
    task.children[2].setAttribute('onClick', '')
    document.getElementById('todo-input').value = taskText;
    const savechanges = document.createElement('button');
    const cancel = document.createElement('button');
    savechanges.innerText = 'Save changes';
    cancel.innerText = 'cancel';
    savechanges.setAttribute('id', 'save-button');
    cancel.setAttribute('id', 'cancel-button');
    let wrapper = document.getElementById('wrapper')
    wrapper.insertBefore(savechanges, addTodo);
    wrapper.insertBefore(cancel, addTodo);
    savechanges.addEventListener('click', saveEdition);
    cancel.addEventListener('click', cancelEdition);
}

function clickDelete (event) {
    const item = event.target.closest('li');
    item.remove();
}

function saveEdition () {
    if(document.getElementById('todo-input').value) {
        let editedTask = document.getElementById('todo-input').value;
        let editingTaskItem = document.getElementById('editing');
        editingTaskItem.children[0].innerHTML = editedTask;
        editingTaskItem.removeAttribute('id');
        editingTaskItem.children[2].setAttribute('onClick', 'clickDelete(event)')
        let savechanges = document.getElementById('save-button');
        let cancel = document.getElementById('cancel-button');
        document.getElementById('todo-input').value = '';
        addTodo.addEventListener('click', addNewTodo);
        savechanges.remove();
        cancel.remove();
    }
}

function cancelEdition () {
    let editingTaskItem = document.getElementById('editing');
    editingTaskItem.children[0].innerHTML = preEditon;
    editingTaskItem.children[2].setAttribute('onClick', 'clickDelete(event)')
    editingTaskItem.removeAttribute('id');
    document.getElementById('todo-input').value = '';
    let savechanges = document.getElementById('save-button');
    let cancel = document.getElementById('cancel-button');
    savechanges.remove();
    cancel.remove();
}

function createTodo (text) {
    const deleteButton = document.createElement('span');
    const editButton = document.createElement('span');
    deleteButton.innerHTML = 'x';
    editButton.innerHTML = 'Edit';
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.setAttribute('onclick', 'clickDelete(event)');
    editButton.setAttribute('class', 'edit-button');
    editButton.setAttribute('onclick', 'clickEdit(event)');
    const todoContent = document.createElement('span');
    todoContent.setAttribute('class', 'taskTodo');
    todoContent.innerHTML = text;
    let newTodo = document.createElement('li');
    newTodo.appendChild(todoContent);
    newTodo.appendChild(editButton);
    newTodo.appendChild(deleteButton);
    document.getElementById('todo-list').appendChild(newTodo);
}

todoInput.addEventListener('input', checkInput);
addTodo.addEventListener('click', addNewTodo);