const userInputBox = document.getElementById("Username");
const passInputBox = document.getElementById("Password");

/* Function to login */
/*function login() {
--------------- Alert if username input is empty ---------------
        if (userInputBox.value == '' || passInputBox.value == ''){
                alert("Username or password is empty.");
        }
        
        else {
                openToDoList();
        }
}*/

/*--------------- Login with the enter key ---------------*/
function userEnterKey() {
        if (event.key === 'Enter') {
            login();
        }
}

function passEnterKey() {
        if (event.key === 'Enter') {
                login();
        }
}

/*--------------- Open the ToDoList ---------------*/
/*function openToDoList() {
        const url = '/ToDoList';
        window.open(url);
}*/

/* Function to show and hide password */
function show() {
        if (passInputBox.type === "password") {
                passInputBox.type = "text";
        }
        else {
                passInputBox.type = "password";
        }
}

/* Function to change the hide and show icon */
let changeIcon = function(icon) {
        icon.classList.toggle('fa-eye');
}