const signupName = document.getElementById('username');
const signupPassword = document.getElementById('password');
let signupButton = document.getElementById('signup');
let result = document.getElementById('result');

function checkSignup() {
    fetch('http://localhost:3000/users')
        .then(function (response) {
            response.json().then(function (users) {
                checkValidUser(users);
            });
        });
}

function checkValidUser(users) {
    let userName = signupName.value;
    let userPassword = signupPassword.value;

    resetData();

    for (var i = 0; i < users.length; i++) {
        if (users[i].name == userName) {
            let serverMessage = document.createElement('p');
            serverMessage.innerText = 'There is an existing user with the same name. Please enter a different name.';

            let container = document.createElement('div');
            container.appendChild(serverMessage);
            result.appendChild(container);
            return;
        }
    }
    let serverMessage = document.createElement('span');
    serverMessage.innerText = 'The new user has been successfully created!'

    let container = document.createElement('div');
    container.appendChild(serverMessage);
    result.appendChild(container);
	
    const postObject = {
        name: userName,
        password: userPassword,
		type: "user",
		active: 0
    }

    fetch('http://localhost:3000/users', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    });
}

function resetData() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}

signupButton.addEventListener('click', checkSignup);
resetData();


const removeUser = (criteria, users) =>
   users.splice (users.indexOf (users.find (criteria)), 1)
   
   
removeUser (
   ({ Id, discordId }) =>
       Id == '780748c5d4504446bbba3114ce48f6e9' 
       && discordId == '471621420162744342',
     input.users
)

// Output: 0 <-- User has been removed!
console.log(input.users.length)