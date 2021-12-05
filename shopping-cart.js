var cartList = document.getElementById('cart-list');
const buttonShowCart = document.querySelector("#open-cart");
var thecart = [];
var productsInCart = document.getElementById("cart-products-number");
var cartSum = 0;
var btnDelete = [];
var cart_check = 0;

function addToCart(id) {
	var ok = 0;
	for (let ids of thecart) {
		if (ids == id) {
			ok = 1;
		}
	}
	if (ok == 0) {
		thecart.push(id);
	}
}


setTimeout(() => {
	btns = document.getElementsByClassName("button button-default button-add-cart");
	for (var i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", function () {
			addToCart(this.id);
		});
	}
}, 1000);

function appendProductsToCart(products) {
	for (let ids of thecart) {
		for (let i = 0; i < products.length; i++) {
			if (products[i].id == ids) {
			  let container = document.createElement('article');
			  container.className = "product-cart linea-divisoria";
			  
			  let container2 = document.createElement('div');
			  container2.className = "container-imagen-product-cart";
			  
			  let img = document.createElement('img');
			  console.log(products[i].img);
			  img.src = products[i].img;
			  img.className = "imagen-product-cart";
			  
			  container2.appendChild(img);
			  container.appendChild(container2);
			  
			  
			  let container3 = document.createElement('div');
			  container3.className = "info-products-cart";
			  
			  let container4 = document.createElement('div');
			  container4.className = "info-product-cart cross-cart";
			  let container5 = document.createElement('h3');
			  container5.className = "title-cart";
			  container5.innerText = products[i].name;
			  let container6 = document.createElement('button');
			  container6.className = "far fa-trash-alt tacho-cart";
			  container6.id = "btn-" + products[i].id;

			  var att1 = document.createAttribute("aria-label");
  			  att1.value = "trash bin";
			  container6.setAttributeNode(att1);
			  container6.alt = "trash bin";
			  
			  container4.appendChild(container5);
			  container4.appendChild(container6);
			  container3.appendChild(container4);
			  
			  let container7 = document.createElement('div');
			  container7.className = "info-product-cart-2 cross-cart";
			  
			  let container8 = document.createElement('input');
			  container8.type = "number";
			  container8.min = "0";
			  container8.value = "1"
			  container8.className = "amount-product-cart";
			  container8.id = "number-" + products[i].id;
			  container8.tabindex = "0";
			  
			  container7.appendChild(container8);
			  
			  let container9 = document.createElement('p');
			  container9.innerText = "items";
			  container7.appendChild(container9);
			  

			  let container10 = document.createElement('p');
			  container10.innerText = products[i].price;
			  container10.id = "price-" + products[i].id;
			  container7.appendChild(container10);

			  
			  let containerDollar = document.createElement('p');
			  containerDollar.innerText = '$';
			  container7.appendChild(containerDollar);
			  
			  container3.appendChild(container7);
			  container.appendChild(container3);
			  cartList.appendChild(container);
			  
			  document.getElementById(container6.id).onclick = function() {delFunction(ids)};
			}
		}
	}
}

function delFunction(ids) {
	//window.alert("Delete!");
	for (let i = 0; i < thecart.length; i++) {
		if (thecart[i] == ids) {
			thecart.splice(i, 1);
		}
	}
	cartSum = 0;
	while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
	
	overlay.classList.remove("not-showing");
	document.body.classList.add("no-scroll");
	cart.classList.add("show-cart");
	productsInCart.innerText = thecart.length;
  
	fetch('http://localhost:3000/products')
			.then(function (response) {
				response.json().then(function (products) {
					appendProductsToCart(products);
				});
			});
}

buttonShowCart.onclick = () => {
	cart_check = 1;
	while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
	
  overlay.classList.remove("not-showing");
  document.body.classList.add("no-scroll");
  cart.classList.add("show-cart");
	productsInCart.innerText = thecart.length;
  
  fetch('http://localhost:3000/products')
        .then(function (response) {
            response.json().then(function (products) {
                appendProductsToCart(products);
            });
        });
};

buttonHideCart.onclick = () => {
	cart_check = 0;
  overlay.classList.add("not-showing");
  document.body.classList.remove("no-scroll");
  cart.classList.remove("show-cart");
};


setTimeout(() => {
	const clearBtn = document.getElementById('clear-button');
	clearBtn.addEventListener("click", function () {
		thecart = [];
		thecart.length = 0;
		productsInCart.innerText = 0;
		while (cartList.firstChild) {
			cartList.removeChild(cartList.firstChild);
		}
		cartSum = 0;
		document.getElementById("cart-subtotal-price").innerText = cartSum;
	});

}, 1000);

setInterval(function() { 
	if(cart_check == 1) {
		cartSum = 0;
		for (let i = 0; i < thecart.length; i++) {
			// window.alert(document.getElementById("price-" + cart[i]).innerHTML);
			cartSum = parseInt(cartSum, 10) + parseInt(document.getElementById("price-" + thecart[i]).innerHTML, 10) * parseInt(document.getElementById("number-" + thecart[i]).value, 10);
		}
		document.getElementById("cart-subtotal-price").innerText = cartSum;
		subtotal = cartSum;
		total = cartSum;
	}
}, 100);