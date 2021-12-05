const loginName = document.getElementById('username');
const loginPassword = document.getElementById('password');
let loginButton = document.getElementById('login');
let result = document.getElementById('result');

function checkLogin() {
    fetch('http://localhost:3000/users')
        .then(function (response) {
            response.json().then(function (users) {
                checkValidUser(users);
            });
        });
}

function updateUser(userName, userPassword, id) {
    const putObject = {
        name: userName,
        password: userPassword,
		type: "user",
		active: true
    }
	
    fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(response => response.json())
		.then(result => {
			window.alert('Success:', result);
		})
		.catch(error => {
			window.alert('Error:', error);
		});
}

function checkValidUser(users) {
    let userName = loginName.value;
    let userPassword = loginPassword.value;

    resetData();

    for (var i = 0; i < users.length; i++) {
        if (users[i].name == userName && users[i].password == userPassword) {
			if (users[i].type == "admin") {
				window.location.href = 'MyProducts - admin.html';
				window.alert('You are now logged in as admin!');
				return;
			}
            let serverMessage = document.createElement('p');
			window.alert('Congratulations! You have successfully logged in!');
			
			window.location.href = 'MyProducts - logged.html';

            return;
        }
    }
    
    let serverMessage = document.createElement('span');
    serverMessage.innerText = 'The login data is incorrect. Try again.'

    let container = document.createElement('div');
    container.appendChild(serverMessage);
    result.appendChild(container);
}

function resetData() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}

loginButton.addEventListener('click', checkLogin);
resetData();
