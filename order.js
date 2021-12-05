const OrderList = document.getElementById('order-list');

var formAdress;
var formEmail;
var cartAux = [];

function getOrders() {
    fetch('http://localhost:3000/orders')
        .then(function (response) {
            response.json().then(function (orders) {
                appendOrdersToDOM(orders);
            });
        });
};

function deleteOrder(id) {
    fetch(`http://localhost:3000/orders/${id}`, {
        method: 'DELETE',
    }).then(function () {
        getOrders();
    });
}

function getTheCartProducts(products) {
	cartAux = [];
	for (let i = 0; i < thecart.length; i++) {
		for (let j = 0; j < products.length; j++) {
			if (thecart[i] == products[j].id) {
				var aux  = {
					id : thecart[i],
					name : products[j].name,
					imgsrc : products[j].img,
					cnt : document.getElementById("number-" + thecart[i]).value
				};
				cartAux.push(aux);
			}
		}
	}

	const postOrder = {
		adress: formAdress,
		email: formEmail,
		order: cartAux
	};

	fetch('http://localhost:3000/orders', {
		method: 'post',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(postOrder)
	}).then(function () {
		getOrders();
		location.reload();
	});
}

function getCartAux() {
    fetch('http://localhost:3000/products')
        .then(function (response) {
            response.json().then(function (products) {
                getTheCartProducts(products);
            });
        });
};

function placeOrder() {
	window.alert("Your order has been placed!");
	formAdress = document.getElementById("deposit-name-full").value;
	formEmail = document.getElementById("deposit-email").value;

	getCartAux();

};

function postOrder() {
    const postOrder = {
		adress: formAdress,
		email: formEmail,
		order: thecart
	};

    fetch('http://localhost:3000/orders', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        getOrders();
    });
}

function appendOrdersToDOM(orders) {
    while (OrderList.firstChild) {
        OrderList.removeChild(OrderList.firstChild);
    }
    for (let i = 0; i < orders.length; i++) {
        
		let container = document.createElement('div');
		container.className = "order";

		let container2 = document.createElement('div');
		container2.className = "email";
		container2.innerText = "Email: " + orders[i].email;

		let container3 = document.createElement('div');
		container3.className = "adress";
		container3.innerText = "Adress: " + orders[i].adress;
		
		
        container.appendChild(container2);
        container.appendChild(container3);

		for (let j = 0; j < orders[i].order.length; j++) {
			let container4 = document.createElement('div');
			container4.className = "Product";
			container4.innerText = "Product \"" + orders[i].order[j].name + "\" was ordered " + orders[i].order[j].cnt + " times";
			
			let img = document.createElement('img');
			img.src = orders[i].order[j].imgsrc;


			container.appendChild(container4);
			container.appendChild(img);
		}
		
		let deleteButton = document.createElement('button')
        deleteButton.addEventListener('click', function () {
            deleteOrder(orders[i].id)
        });
        deleteButton.innerText = 'Done';
        deleteButton.className = 'script-btn';
        container.appendChild(deleteButton);

		let containerDiv = document.createElement('div');
		containerDiv.appendChild(container);
        OrderList.appendChild(containerDiv);
    }
}

getOrders();