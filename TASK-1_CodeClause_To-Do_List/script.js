const inputtdl = document.querySelector('.textarea');
const buttontdl = document.querySelector('.buttoninput');
const listtdl = document.querySelector('.todolist');
const loginButton = document.querySelector('#loginButton');
const registerButton = document.querySelector('#registerButton');
const voiceInputButton = document.querySelector('#voiceInputButton');
const loggedInUser = document.querySelector('#loggedInUser');
const collaborationIndicator = document.querySelector('#collaborationIndicator');
const notificationArea = document.querySelector('#notificationArea');
const statisticsSection = document.querySelector('#statisticsSection');

// Additional functionality for your to-do list
function clickButton(e) {
    e.preventDefault();
    addTodo();
}

function addTodo() {
    const itemall = document.createElement('div');
    itemall.classList.add('itemall');

    const item = document.createElement('p');
    item.classList.add('item');
    item.innerText = inputtdl.value;
    itemall.appendChild(item);

    if (inputtdl.value === '') return;

    const checkbutton = document.createElement("button");
    checkbutton.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkbutton.classList.add("check-button");
    itemall.appendChild(checkbutton);

    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashbutton.classList.add("trash-button");
    itemall.appendChild(trashbutton);

    listtdl.appendChild(itemall);
    inputtdl.value = '';

    showNotification('To-do item added successfully!');
}

function okdel(e) {
    const item = e.target;

    if (item.classList[0] === 'check-button') {
        const todolist = item.parentElement;
        todolist.classList.toggle('checklist');
    }

    if (item.classList[0] === 'trash-button') {
        const todolist = item.parentElement;
        todolist.remove();
    }
}

buttontdl.addEventListener('click', clickButton);
listtdl.addEventListener('click', okdel);


// User Authentication
loginButton.addEventListener('click', login);
registerButton.addEventListener('click', register);

function login() {
    const username = prompt('Enter your username:');
    if (username) {
        loggedInUser.textContent = `Logged in as: ${username}`;
        showNotification('Logged in successfully!');
    }
}

function register() {
    const username = prompt('Enter a username:');
    if (username) {
        loggedInUser.textContent = `Logged in as: ${username}`;
        showNotification('Registered and logged in successfully!');
    }
}

// Drag-and-Drop
new Sortable(listtdl, {
    animation: 150
});



// Real-time Collaboration
const collaborationStatus = {
    connected: false,
    collaborators: 0
};

function connectCollaboration() {
    // Simulating connection to a collaboration server
    setTimeout(() => {
        collaborationStatus.connected = true;
        collaborationStatus.collaborators = 1;
        collaborationIndicator.textContent = `Connected with ${collaborationStatus.collaborators} collaborator`;
        collaborationIndicator.style.display = 'block';
    }, 2000);
}

connectCollaboration();

// Notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerText = message;
    notificationArea.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}