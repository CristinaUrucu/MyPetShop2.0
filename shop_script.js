const list = document.getElementById('image-list');
const formName = document.getElementById('formName');
const formPrice = document.getElementById('formPrice');
const formStars = document.getElementById('formStars');
const formCategory = document.getElementById('formCategory');
const formUrl = document.getElementById('formUrl');
const formDescription = document.getElementById('formDescription');
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');
const cancelButton = document.getElementById('cancelButton');

function getProducts() {
    fetch('http://localhost:3000/products')
        .then(function (response) {
            response.json().then(function (products) {
                appendProductsToDOM(products);
            });
        });
};

function postProduct() {
	if (formName.value == "") {
		window.alert("Product name can not be empty!");
	} else if (formPrice.value == "") {
		window.alert("Price can not be empty!");
	} else if (formStars.value == "") {
		window.alert("Stars can not be empty!");
	} else if (formCategory.value == "") {
		window.alert("You need to chose a Category!");
	} else if (formUrl.value == "") {
		window.alert("Image URL can not be empty!");
	} else if (formDescription.value == "") {
		window.alert("Product description can not be empty!");
	} else {
		const postObject = {
			name: formName.value,
			price: formPrice.value,
			stars: formStars.value,
			category: formCategory.value,
			img: formUrl.value,
			description: formDescription.value
		};

		fetch('http://localhost:3000/products', {
			method: 'post',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(postObject)
		}).then(function () {
			getProducts();
			resetForm();
		});
	}
}

function deleteProduct(id) {
    fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
    }).then(function () {
        getProducts();
    });
}

function updateProduct(id) {
	if (formName.value == "") {
		window.alert("Product name can not be empty!");
	} else if (formPrice.value == "") {
		window.alert("Price can not be empty!");
	} else if (formStars.value == "") {
		window.alert("Stars can not be empty!");
	} else if (formCategory.value == "") {
		window.alert("You need to chose a Category!");
	} else if (formUrl.value == "") {
		window.alert("Image URL can not be empty!");
	} else if (formDescription.value == "") {
		window.alert("Product description can not be empty!");
	} else {
		const putObject = {
			name: formName.value,
			price: formPrice.value,
			stars: formStars.value,
			category: formCategory.value,
			img: formUrl.value,
			description: formDescription.value
		}

		fetch(`http://localhost:3000/products/${id}`, {
			method: 'PUT',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(putObject)
		}).then(function () {
			getProducts();
			addButton.disabled = false;
			updateButton.disabled = true;
			clearUpdateButtonEvents();
			resetForm();
		});
	}
}

function editProduct(product) {
    formName.value = product.name;
    formPrice.value = product.price;
    formStars.value = product.stars;
    formCategory.value = product.category;
    formUrl.value = product.img;
	formDescription.value = product.description;
    
    addButton.disabled = true;

    clearUpdateButtonEvents();

    updateButton.disabled = false;
    updateButton.addEventListener('click', function () {
        updateProduct(product.id)
    });
}

function appendProductsToDOM(products) {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    for (let i = 0; i < products.length; i++) {
        
		let container2 = document.createElement('div');
		container2.className = "product-body";
		let container3 = document.createElement('h3');
		container3.className = "product-name";
		container3.innerText = products[i].name;
		let container4 = document.createElement('h3');
		container4.className = "product-price";
		container4.innerText = '$' + products[i].price;
		let containerD = document.createElement('p');
		containerD.className = "description-product not-showing";
		containerD.innerText = products[i].description;
		
		container2.appendChild(container3);
		container2.appendChild(container4);
		container2.appendChild(containerD);
		
		let container = document.createElement('article');
		container.className = "product";
		
		var att1 = document.createAttribute("data-name");
		att1.value = products[i].name.toLowerCase();
		container.setAttributeNode(att1);
		
		var att2 = document.createAttribute("data-categoria");
		att2.value = products[i].category;
		container.setAttributeNode(att2);
		
		var att3 = document.createAttribute("data-price");
		att3.value = products[i].price;
		container.setAttributeNode(att3);
		
		var att4 = document.createAttribute("data-punctaje");
		att4.value = products[i].stars;
		container.setAttributeNode(att4);
		
		let container5 = document.createElement('div');
		container5.className = "product-img-container";
		
		let img = document.createElement('img');
        console.log(products[i].img);
        img.src = products[i].img;
        img.className = "product-img";
		img.alt = products[i].name;
		
        container5.appendChild(img);
		container.appendChild(container5);
		
		container.appendChild(container2);
		
		let container6 = document.createElement('div');
		var att6 = document.createAttribute("aria-label");
		container6.className = "rating";
		if(products[i].stars == 5) {
			att6.value = "Five stars";
			container6.setAttributeNode(att6);
			
			let container7 = document.createElement('i');
			container7.className = "fas fa-star";
			container6.appendChild(container7);
			let container8 = document.createElement('i');
			container8.className = "fas fa-star";
			container6.appendChild(container8);
			let container9 = document.createElement('i');
			container9.className = "fas fa-star";
			container6.appendChild(container9);
			let container10 = document.createElement('i');
			container10.className = "fas fa-star";
			container6.appendChild(container10);
			let container11 = document.createElement('i');
			container11.className = "fas fa-star";
			container6.appendChild(container11);
		} else if (products[i].stars == 4) {
			att6.value = "Four stars";
			container6.setAttributeNode(att6);
			
			let container7 = document.createElement('i');
			container7.className = "fas fa-star";
			container6.appendChild(container7);
			let container8 = document.createElement('i');
			container8.className = "fas fa-star";
			container6.appendChild(container8);
			let container9 = document.createElement('i');
			container9.className = "fas fa-star";
			container6.appendChild(container9);
			let container10 = document.createElement('i');
			container10.className = "fas fa-star";
			container6.appendChild(container10);
			let container11 = document.createElement('i');
			container11.className = "far fa-star";
			container6.appendChild(container11);
		} else if (products[i].stars == 3) {
			att6.value = "Three stars";
			container6.setAttributeNode(att6);
			
			let container7 = document.createElement('i');
			container7.className = "fas fa-star";
			container6.appendChild(container7);
			let container8 = document.createElement('i');
			container8.className = "fas fa-star";
			container6.appendChild(container8);
			let container9 = document.createElement('i');
			container9.className = "fas fa-star";
			container6.appendChild(container9);
			let container10 = document.createElement('i');
			container10.className = "far fa-star";
			container6.appendChild(container10);
			let container11 = document.createElement('i');
			container11.className = "far fa-star";
			container6.appendChild(container11);
		} else if (products[i].stars == 2) {
			att6.value = "Two stars";
			container6.setAttributeNode(att6);
			
			let container7 = document.createElement('i');
			container7.className = "fas fa-star";
			container6.appendChild(container7);
			let container8 = document.createElement('i');
			container8.className = "fas fa-star";
			container6.appendChild(container8);
			let container9 = document.createElement('i');
			container9.className = "far fa-star";
			container6.appendChild(container9);
			let container10 = document.createElement('i');
			container10.className = "far fa-star";
			container6.appendChild(container10);
			let container11 = document.createElement('i');
			container11.className = "far fa-star";
			container6.appendChild(container11);
		} else if (products[i].stars == 1) {
			att6.value = "One star";
			container6.setAttributeNode(att6);
			
			let container7 = document.createElement('i');
			container7.className = "fas fa-star";
			container6.appendChild(container7);
			let container8 = document.createElement('i');
			container8.className = "far fa-star";
			container6.appendChild(container8);
			let container9 = document.createElement('i');
			container9.className = "far fa-star";
			container6.appendChild(container9);
			let container10 = document.createElement('i');
			container10.className = "far fa-star";
			container6.appendChild(container10);
			let container11 = document.createElement('i');
			container11.className = "far fa-star";
			container6.appendChild(container11);
		}
		
		container.appendChild(container6);
		
		let editButton = document.createElement('button');
        editButton.addEventListener('click', function () {
            editProduct(products[i])
        });
        editButton.innerText = 'Edit';
        editButton.className = 'script-btn';
        container.appendChild(editButton);
		
		let deleteButton = document.createElement('button')
        deleteButton.addEventListener('click', function () {
            deleteProduct(products[i].id)
        });
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'script-btn';
        container.appendChild(deleteButton);

		let containerDiv = document.createElement('div');
		containerDiv.appendChild(container);
        list.appendChild(containerDiv);
    }
}

function resetForm() {
    formName.value = '';
    formPrice.value = '';
    formStars.value = '';
    formCategory.value = '';
    formUrl.value = '';
    formDescription.value = '';
}

function clearUpdateButtonEvents() {
    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('updateButton');
}

function cancelBtn() {
    resetForm();
	addButton.disabled = false;
	updateButton.disabled = true;
}

addButton.addEventListener('click', postProduct);
cancelButton.addEventListener('click', cancelBtn);

getProducts();