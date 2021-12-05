const list = document.getElementById('image-list');
const formName = document.getElementById('formName');
const formPrice = document.getElementById('formPrice');
const formStars = document.getElementById('formStars');
const formCategory = document.getElementById('formCategory');
const formUrl = document.getElementById('formUrl');
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');

function getProducts() {
    fetch('http://localhost:3000/products')
        .then(function (response) {
            response.json().then(function (products) {
                appendProductsToDOM(products);
            });
        });
};

function postProduct() {
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
		
		
		let container12 = document.createElement('div');
		container12.className = "product-actions";
		
		let container13 = document.createElement('button');
		container13.type = "button";
		container13.id = products[i].id;
		container13.className = "button button-default button-add-cart";
		container13.innerText = "ADD TO CART";
		
		container12.appendChild(container13);
		container6.appendChild(container12);
		
		container.appendChild(container6);

        list.appendChild(container);
    }
}

getProducts();