const searchProducts = document.querySelector("#search-products");
const cards = document.getElementsByTagName("article");
const filterPunctaje = document.getElementsByClassName("rating-checkbox");
const cleanButton = document.querySelector(".filters-clear-btn");
const products = document.getElementsByClassName("products");
const filterCategory = document.querySelectorAll(".category");

const cart = document.querySelector(".cart");
const buttonHideCart = document.querySelector("#close-cart");
const overlay = document.getElementById("overlay");

const buttonList = document.querySelector(".fa-list");
const containerProducts = document.querySelector(".container-section-products");
var productCards = document.querySelectorAll(".product");
setTimeout(() => {
	productCards = document.querySelectorAll(".product"); 
	document.querySelector('.amount-displayed').textContent = productCards.length;
	document.querySelector('.all-products').textContent = productCards.length;
}, 100);
setTimeout(() => {
	productCards = document.querySelectorAll(".product"); 
	document.querySelector('.amount-displayed').textContent = productCards.length;
	document.querySelector('.all-products').textContent = productCards.length;
}, 1000);

const buttonGrilla = document.querySelector(".fa-th");
var descriptionProduct = document.querySelectorAll(".description-product");
setTimeout(() => {descriptionProduct = document.querySelectorAll(".description-product");}, 100);
setTimeout(() => {descriptionProduct = document.querySelectorAll(".description-product");}, 1000);
const buttonsAddListCart = document.querySelectorAll(".button-add-cart");
var containersProducts = document.querySelectorAll(".product-body");
setTimeout(() => {containersProducts = document.querySelectorAll(".product-body");}, 100);
setTimeout(() => {containersProducts = document.querySelectorAll(".product-body");}, 1000);

const buttonEmpty = document.querySelector("#button-empty");
const pictureEmpty = document.querySelector(".picture-empty");
const overlayPictureEmpty = document.querySelector(".overlay-picture-empty");

const buttonEmptyBoxEmpty = document.querySelector(".button-red-picture-empty");
const buttonCancelBoxEmpty = document.querySelector("#button-cancel");

const buttonBuy = document.querySelector("#button-buy");
const pictureBuy = document.querySelector(".picture-buy");
const overlayPictureBuy = document.querySelector(".overlay-picture-buy");

const buttonDebit = document.querySelector("#button-debit");
const surchargeCredit = document.querySelector(".container-surcharge");
const buttonCredit = document.querySelector("#button-credit");
const buttonContinueBuying = document.querySelector("#button-continue-buying");
const buttonDelivery = document.querySelector("#button-delivery");
const buttonGiftCard = document.querySelector("#button-giftcard");
const surchargeDelivery = document.querySelector(".container-delivery");
const discountGiftCard = document.querySelector(".container-giftcard");

var subtotal = 0;
var showSubtotal = document.querySelector(".subtotal-price-options-payment");

var total = 0;
var showTotal = document.querySelector(".total-price-options-payment");

const showDiscount = document.querySelector(".giftcard-price-options-payment");

const delivery = 10;
const showDelivary = document.querySelector(".delivery-price-options-payment");
showDelivary.textContent = "$" + delivery;

const showSurcharge = document.querySelector(".surcharge-price-options-payment");

const form = document.querySelector(".button-send-form");
const inputName = document.querySelector("#deposit-name-full");
const inputEmail = document.querySelector("#deposit-email");

//Responsive

const buttonFilters = document.querySelector(".button-filters");
const overlayFilterssResponsive = document.querySelector(".overlay-section-aside-responsive");
const sectionFilterssResponsive = document.querySelector(".section-aside-responsive");
const buttonCloseFilterssResponsive = document.querySelector("#button-close-aside-responsive");
const buttonSearchResponsive = document.querySelector("#search-products-responsive");
const pictureBuyResponsive = document.querySelector("#reponsive-picture-buy");

// Filters

const hiddenCards = document.getElementsByClassName('product not-showing-product')
const showNoProducts = document.querySelector('.amount-displayed')


searchProducts.oninput = () => {
  productCards = document.querySelectorAll(".product");
  filterCards()
  countProductsDisplayed()
}

for (let checkbox of filterPunctaje) {
  checkbox.onclick = () => {
      filterCards()
      countProductsDisplayed()
  }
}

for (let checkbox of filterCategory) {
  checkbox.onclick = () => {
      filterCards()
      countProductsDisplayed()
  }
}

const countProductsDisplayed = (productsShowed) => {
  productCards = document.querySelectorAll(".product");
  productsShowed = productCards.length - hiddenCards.length
  showNoProducts.textContent = productsShowed
}


const filterCards = () => {

  for (let card of productCards) {
      if (passFilters(card)) {
          showCard(card)
      }
      else {
          hideCard(card)
      }
  }
}

// //hide cards

const hideCard = (card) => {
  return card.classList.add("not-showing-product")
}

const showCard = (card) => {
  return card.classList.remove("not-showing-product")

}



const passFilters = (card) => {
  if (passFilterInput(card) && passFilterByCategory(card) && passFilterByRating(card)) {
      return true
  }
  else {
      return false
  }
}


const passFilterInput = (card) => {
  if (searchBarInput()) {
      if (inputMatch(card)) {
          return true
      }
      else {
          return false
      }
  }
  else {
      return true
  }
}

const searchBarInput = () => {
  return Boolean(searchProducts.value)
}

const inputMatch = (card) => {
  if (card.dataset.name.includes(searchProducts.value.toLowerCase())) {
      return true
  }
  else {
      return false
  }
}


const passFilterByRating = (card) => {
  if (checkboxRatingSeleccionado()) {
      if (matchCheckboxRatingYCard(card)) {
          return true
      }
      else {
          return false
      }
  }
  return true
}

const checkboxRatingSeleccionado = () => {
  for (let checkbox of filterPunctaje) {
      if (checkbox.checked) {
          return true
      }
  }
}

const matchCheckboxRatingYCard = (card) => {
  const rating = card.dataset.punctaje
  for (let checkbox of filterPunctaje) {
      if (checkbox.checked) {
          if (checkbox.value === rating) {
              return true
          }
      }
  }
  return false
}

const passFilterByCategory = (card) => {
  if (checkboxCategoriaSeleccionado()) {
      if (matchCheckboxCategoryAndCard(card)) {
          return true
      }
      else {
          return false
      }
  }
  return true
}

const checkboxCategoriaSeleccionado = () => {
  for (let checkbox of filterCategory) {
      if (checkbox.checked) {
          return true
      }
  }
}

const matchCheckboxCategoryAndCard = (card) => {
  const categoria = card.dataset.categoria
  for (let checkbox of filterCategory) {
      if (checkbox.checked) {
          if (checkbox.value === categoria) {
              return true
          }
      }
  }
  return false
}


const filterRating = () => {
  for (let card of productCards) {
      card.classList.add('not-showing-product')
      if (checkboxSelected()) {
          if (matchCheckboxAndCard(card)) {
              card.classList.remove('not-showing-product')
          }
      }
      else {
          card.classList.remove('not-showing-product')
      }
  }
}



buttonList.onclick = () => {
  containerProducts.classList.add("list");

  for (let description of descriptionProduct) {
    description.classList.remove("not-showing");
  }

  for (let card of productCards) {
    card.classList.add("products-list-flex");
  }

  for (let button of buttonsAddListCart) {
    button.classList.add("button-list");
  }

  for (let contenedorProducto of containersProducts) {
    contenedorProducto.classList.add("container-product");
  }
};

buttonGrilla.onclick = () => {
  containerProducts.classList.remove("list");

  for (let description of descriptionProduct) {
    description.classList.add("not-showing");
  }

  for (let card of productCards) {
    card.classList.remove("products-list-flex");
  }

  for (let button of buttonsAddListCart) {
    button.classList.remove("button-list");
  }

  for (let contenedorProducto of containersProducts) {
    contenedorProducto.classList.remove("container-product");
  }
};


// Cart


buttonEmpty.onclick = () => {
  overlayPictureEmpty.classList.remove("not-showing");
  document.body.classList.add("no-scroll");
  pictureEmpty.classList.add("show-picture-empty");
};

buttonCancelBoxEmpty.onclick = () => {
  console.log("click");
  overlayPictureEmpty.classList.add("not-showing");
  pictureEmpty.classList.remove("show-pictures");
};

buttonEmptyBoxEmpty.onclick = () => {
  overlayPictureEmpty.classList.add("not-showing");
  pictureEmpty.classList.remove("show-pictures");
};

buttonBuy.onclick = () => {
  overlayPictureBuy.classList.remove("not-showing");
  document.body.classList.add("no-scroll");
  pictureBuy.classList.add("show-pictures");
  total = cartSum;
  subtotal = cartSum;
  subtotalNumbers = Number(subtotal)
  
showSubtotal = document.querySelector(".subtotal-price-options-payment");
showSubtotal.textContent = "$" + subtotal;

for (let method of methodsPayment) {
  method.oninput = () => {
    calculateFullTotal();
  };
}

showTotal = document.querySelector(".total-price-options-payment");
showTotal.textContent = "$" + total;
};

buttonContinueBuying.onclick = () => {
  overlayPictureBuy.classList.add("not-showing");
  pictureBuy.classList.remove("show-pictures");
};


var getDiscount = (subtotal) => {
  return subtotal * 0.05;
};

showDiscount.textContent = "$" + getDiscount(subtotal);

var getSurcharge = (subtotal) => {
  return subtotal * 0.1;
};

showSurcharge.textContent = "$" + getSurcharge(subtotal);

let subtotalNumbers = Number(subtotal);

const methodsPayment = document.querySelectorAll(".methods-of-payment");
const surcharge = document.querySelectorAll(".surcharge");
const inputCredit = document.querySelector("input[value='credit']");
const inputGiftCard = document.querySelector("input[value='giftcard']");
const inputDelivery = document.querySelector("input[value='delivery']");

let resultSurcharge;

var suchargeCard = () => {
  if (inputCredit.checked) {
    resultSurcharge = subtotalNumbers * 0.02;
    console.log(resultSurcharge);
    showSurcharge.textContent = "$" + resultSurcharge;
    surchargeCredit.classList.remove("not-showing");
  } else {
    resultSurcharge = 0;
    surchargeCredit.classList.add("not-showing");
  }
  return resultSurcharge;
};

let resultDiscount;

var applyDiscount = () => {
  if (inputGiftCard.checked) {
    resultDiscount = -subtotalNumbers * 0.05;
    showDiscount.textContent = "$" + resultDiscount;
    discountGiftCard.classList.remove("not-showing");
  } else {
    resultDiscount = 0;
    discountGiftCard.classList.add("not-showing");
  }
  return resultDiscount;
};

let resultShipping;

var surchargeShipping = () => {
  if (inputDelivery.checked) {
    resultShipping = 10;
    showDelivary.textContent = "$" + resultShipping;
    surchargeDelivery.classList.remove("not-showing");
  } else {
    resultShipping = 0;
    surchargeDelivery.classList.add("not-showing");
  }
  return resultShipping;
};

var calculateFullTotal = () => {
  let totalCompleto =
    subtotalNumbers + surchargeShipping() + suchargeCard() + applyDiscount();
  showTotal.textContent = "$" + totalCompleto.toFixed(2);
  return totalCompleto;
};


cleanButton.onclick = () => {
  searchProducts.value = "";
  card.classList.remove("not-showing-product");
};


// Responsive

buttonFilters.onclick = () => {
  overlayFilterssResponsive.classList.remove("not-showing");
  document.body.classList.add("no-scroll");
  sectionFilterssResponsive.classList.add("show-section-aside-responsive");
};

buttonCloseFilterssResponsive.onclick = () => {
  overlayFilterssResponsive.classList.add("not-showing");
  document.body.classList.remove("no-scroll");
  sectionFilterssResponsive.classList.remove("show-section-aside-responsive");
};



// // Filters responsive


buttonSearchResponsive.oninput = () => {
  filterCardsResponsive()
  productCards = document.querySelectorAll(".product");
  countProductsDisplayedResponsive()
}

for (let checkbox of filterPunctaje) {
  checkbox.onclick = () => {
      filterCardsResponsive()
	  productCards = document.querySelectorAll(".product");
      countProductsDisplayedResponsive()
  }
}

for (let checkbox of filterCategory) {
  checkbox.onclick = () => {
      filterCardsResponsive()
	  productCards = document.querySelectorAll(".product");
      countProductsDisplayedResponsive()
  }
}

const countProductsDisplayedResponsive = (ProductsShowedR) => {
  ProductsShowedR = productCards.length - cardsHiddenResponsive.length
  showNoProducts.textContent = ProductsShowedR
}


const filterCardsResponsive = () => {

  for (let card of productCards) {
      if (passFiltersResponsive(card)) {
          showCardResponsive(card)
      }
      else {
          hideCardResponsive(card)
      }
  }
}

const cardsHiddenResponsive = document.getElementsByClassName('product not-showing-product-responsive')

const hideCardResponsive = (card) => {
  card.setAttribute("aria-hidden", true)
  return card.classList.add("not-showing-product-responsive")
}

const showCardResponsive = (card) => {
  card.removeAttribute("aria-hidden", true)
  return card.classList.remove("not-showing-product-responsive")

}

const passFiltersResponsive = (card) => {
  if (passFiltersInputResponsive(card) && passesFilterByCategoryResponsive(card) && passFilterByRatingResponsive(card)) {
      return true
  }
  else {
      return false
  }
}


const passFiltersInputResponsive = (card) => {
  if (searchbarHasInputResponsive()) {
      if (inputMatchesCardNameResponsive(card)) {
          return true
      }
      else {
          return false
      }
  }
  else {
      return true
  }
}

const searchbarHasInputResponsive = () => {
  return Boolean(buttonSearchResponsive.value)
}

const inputMatchesCardNameResponsive = (card) => {
  if (card.dataset.name.includes(buttonSearchResponsive.value.toLowerCase())) {
      return true
  }
  else {
      return false
  }
}

const passFilterByRatingResponsive = (card) => {
  if (checkboxRatingSelectedResponsive()) {
      if (matchCheckboxRatingYCardResponsive(card)) {
          return true
      }
      else {
          return false
      }
  }
  return true
}

const checkboxRatingSelectedResponsive = () => {
  for (let checkbox of filterPunctaje) {
      if (checkbox.checked) {
          return true
      }
  }
}

const matchCheckboxRatingYCardResponsive = (card) => {
  const rating = card.dataset.punctaje
  for (let checkbox of filterPunctaje) {
      if (checkbox.checked) {
          if (checkbox.value === rating) {
              return true
          }
      }
  }
  return false
}

const passesFilterByCategoryResponsive = (card) => {
  if (checkboxCategoriaSeleccionadoResponsive()) {
      if (matchCheckboxCategoryAndCardResponsive(card)) {
          return true
      }
      else {
          return false
      }
  }
  return true
}

const checkboxCategoriaSeleccionadoResponsive = () => {
  for (let checkbox of filterCategory) {
      if (checkbox.checked) {
          return true
      }
  }
}

const matchCheckboxCategoryAndCardResponsive = (card) => {
  const categoria = card.dataset.categoria
  for (let checkbox of filterCategory) {
      if (checkbox.checked) {
          if (checkbox.value === categoria) {
              return true
          }
      }
  }
  return false
}

const filterRatingResponsive = () => {
  for (let card of productCards) {
      card.classList.add('not-showing-product-responsive')
      if (checkboxSeleccionadoResponsive()) {
          if (matchCheckboxAndCardResponsive(card)) {
              card.classList.remove('not-showing-product-responsive')
          }
      }
      else {
          card.classList.remove('not-showing-product-responsive')
      }
  }
}



