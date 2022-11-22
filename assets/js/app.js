import {
    products as defaultProducts,
    users as defaultUsers,
	 orders as defaultOrders
} from "./storage.js";

function gItem(key) {
    return localStorage.getItem(key);
}

function sItem(key, value) {
    return localStorage.setItem(key, value);
}

//  HEADER SCROLL

const headerElement = document.querySelector(".header");
const stickyHeaderElement = document.querySelector(".header-sticky");

window.onscroll = function () {
    if (
        document.body.scrollTop > 150 ||
        document.documentElement.scrollTop > 150
    ) {
        stickyHeaderElement.style.top = "0";
    } else {
        stickyHeaderElement.style.top = "-60px";
    }
};

// MOBILE SIDE MENU

const menuIcon = document.querySelector(".mobile-menu__icon");
const overlaySideMenu = document.querySelector(".header__side-menu-container");
const sideMenu = document.querySelector(".header__side-menu");

menuIcon.addEventListener("click", function () {
    overlaySideMenu.classList.toggle("open");
    sideMenu.classList.toggle("open");
    sideMenu.classList.remove("hide");
});

overlaySideMenu.addEventListener("click", function () {
    sideMenu.classList.toggle("hide");
    setTimeout(hideMenu, 450);
});

sideMenu.addEventListener("click", function (event) {
    event.stopPropagation();
});

function hideMenu() {
    overlaySideMenu.classList.toggle("open");
    sideMenu.classList.toggle("open");
}

// CONTENT PRODUCT LIST


// Render product view-mode grid
const productGridList = document.querySelector(".list-product__grid");
const products = JSON.parse(gItem("productList")) || defaultProducts;

products.forEach(function (product, index) {
  if (index < 6) {
    var productElement = `<div class="l-4 m-6 c-12 product">
                <div class="product__link">
                    <div class="product-item product__img">
                        <img src="${product.img}"></img>
                    </div>
    
                    <div class="product__description-layer">
                        <div class="product__description">
                            <div class="product__description--close">
                                <i class="fa-solid fa-xmark"></i>
                            </div>
    
                            <div class="product-item">
                                <div class="product-item__img">
                                    <div class="dscr--product__img">
                                        <img src="${product.img}" alt="">
                                    </div>
                                </div>
                            </div>
    
                            <div class="product__information">
                                <div class="product-item dscr--product__name">${product.name}</div>
                                <p class="dscr--product__detail">${product.desc}.</p>
                                
                                <div class="wrap-price">
                                    <div class="product-item product__price">$${product.price}</div>
                                    <div class="buttons__added">
                                        <input class="minus quantity-btn" type="button" value="-">
                                        <input class="input-qty" name="" type="text" inputmode="numeric" value="1" min="1" max="10">
                                        <input class="plus quantity-btn" type="button" value="+">
                                    </div>
                                </div>
    
                                <div class="buy-btn grid_buy-btn">
                                    <button type="submit" value=${index}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
    
                    <div class="product-item product__name">${product.name}</div>
                    <p class="product__detail">${product.desc}.</p>
                    <div class="product-item product__price">$${product.price}</div>
    
                    <div class="mobile-product__information">
                        <div class="product-item dscr--product__name">${product.name}</div>
                        <p class="dscr--product__detail">${product.desc}.</p>
                        
                        <div class="wrap-price">
                            <div class="product-item product__price">$${product.price}</div>
                            <div class="buttons__added">
                                <input class="minus quantity-btn" type="button" value="-">
                                <input class="input-qty" name="" type="text" inputmode="numeric" value="1" min="1" max="10">
                                <input class="plus quantity-btn" type="button" value="+">
                            </div>
                        </div>
    
                        <div class="buy-btn grid_buy-btn">
                            <button type="submit" value=${index}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>`;
    productGridList.insertAdjacentHTML("beforeend", productElement);
  }
});

// Render product view-mode list
const productListList = document.querySelector(".list-product__list");

products.forEach(function (product, index) {
  if (index < 6) {
    var productElement = `<div class="l-12 product">
            <div class="product-item">
                <div class="product-item__img">
                    <div class="product__img">
                        <img src="${product.img}" alt="">
                    </div>
                </div>
            </div>
        
            <div class="product__information">
                <div class="product-item product__name">${product.name}</div>
                <p class="product__detail">${product.desc}</p>
                
                <div class="wrap-price">
                    <div class="product-item product__price">$${product.price}</div>
                    <div class="buttons__added">
                        <input class="minus quantity-btn" type="button" value="-">
                        <input class="input-qty" name="" type="text" inputmode="numeric" value="1" min="1" max="10">
                        <input class="plus quantity-btn" type="button" value="+">
                    </div>
                </div>
        
                <div class="buy-btn">
                    <button type="submit" value=${index}>Add to Cart</button>
                </div>
            </div>
            </div>`;
    productListList.insertAdjacentHTML("beforeend", productElement);
  }
});

description();
setQuantityOfProduct();
addToCart();

//  --- PAGINATION ---
const prevBtn = document.querySelector(".pagination-prev");
const page1 = document.querySelector(".pagination-1");
const page2 = document.querySelector(".pagination-2");
const nextBtn = document.querySelector(".pagination-next");

function clickOnPage1() {
  page1.classList.add("pagination-item__active");
  page2.classList.remove("pagination-item__active");
  prevBtn.classList.add("close-view-mode");
  nextBtn.classList.remove("close-view-mode");
  productGridList.innerHTML = "";
  productListList.innerHTML = "";

  //  Render 0 - 5
  //Grid
  products.forEach(function (product, index) {
    if (index < 6) {
      var productElement = `<div class="l-4 m-6 c-12 product">
                    <div class="product__link">
                        <div class="product-item product__img">
                            <img src="${product.img}"></img>
                        </div>
        
                        <div class="product__description-layer">
                            <div class="product__description">
                                <div class="product__description--close">
                                    <i class="fa-solid fa-xmark"></i>
                                </div>
        
                                <div class="product-item">
                                    <div class="product-item__img">
                                        <div class="dscr--product__img">
                                            <img src="${product.img}" alt="">
                                        </div>
                                    </div>
                                </div>
        
                                <div class="product__information">
                                    <div class="product-item dscr--product__name">${product.name}</div>
                                    <p class="dscr--product__detail">${product.desc}.</p>
                                    
                                    <div class="wrap-price">
                                        <div class="product-item product__price">$${product.price}</div>
                                        <div class="buttons__added">
                                            <input class="minus quantity-btn" type="button" value="-">
                                            <input class="input-qty" name="" type="text" inputmode="numeric" value="1" min="1" max="10">
                                            <input class="plus quantity-btn" type="button" value="+">
                                        </div>
                                    </div>
        
                                    <div class="buy-btn grid_buy-btn">
                                        <button type="submit" value=${index}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
        
                        <div class="product-item product__name">${product.name}</div>
                        <p class="product__detail">${product.desc}.</p>
                        <div class="product-item product__price">$${product.price}</div>
        
                        <div class="mobile-product__information">
                            <div class="product-item dscr--product__name">${product.name}</div>
                            <p class="dscr--product__detail">${product.desc}.</p>
                            
                            <div class="wrap-price">
                                <div class="product-item product__price">$${product.price}</div>
                                <div class="buttons__added">
                                    <input class="minus quantity-btn" type="button" value="-">
                                    <input class="input-qty" name="" type="text" inputmode="numeric" value="1" min="1" max="10">
                                    <input class="plus quantity-btn" type="button" value="+">
                                </div>
                            </div>
        
                            <div class="buy-btn">
                                <button type="submit" value=${index}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>`;
      productGridList.insertAdjacentHTML("beforeend", productElement);
    }
  });

  // List
  products.forEach(function (product, index) {
    if (index < 6) {
      var productElement = `<div class="l-12 product">
                <div class="product-item">
                    <div class="product-item__img">
                        <div class="product__img">
                            <img src="${product.img}" alt="">
                        </div>
                    </div>
                </div>
            
                <div class="product__information">
                    <div class="product-item product__name">${product.name}</div>
                    <p class="product__detail">${product.desc}</p>
                    
                    <div class="wrap-price">
                        <div class="product-item product__price">$${product.price}</div>
                        <div class="buttons__added">
                            <input class="minus quantity-btn" type="button" value="-">
                            <input class="input-qty" name="" type="text" inputmode="numeric" value="1" min="1" max="10">
                            <input class="plus quantity-btn" type="button" value="+">
                        </div>
                    </div>
            
                    <div class="buy-btn">
                        <button type="submit" value=${index}>Add to Cart</button>
                    </div>
                </div>
                </div>`;
      productListList.insertAdjacentHTML("beforeend", productElement);
    }
  });

  description();
  setQuantityOfProduct();
  addToCart();
}

function clickOnPage2() {
  page2.classList.add("pagination-item__active");
  page1.classList.remove("pagination-item__active");
  prevBtn.classList.remove("close-view-mode");
  nextBtn.classList.add("close-view-mode");
  productGridList.innerHTML = "";
  productListList.innerHTML = "";

  //  Render 6 - end
  // Grid
  products.forEach(function (product, index) {
    if (index >= 6) {
      var productElement = `<div class="l-4 m-6 c-12 product">
                    <div class="product__link">
                        <div class="product-item product__img">
                            <img src="${product.img}"></img>
                        </div>
        
                        <div class="product__description-layer">
                            <div class="product__description">
                                <div class="product__description--close">
                                    <i class="fa-solid fa-xmark"></i>
                                </div>
        
                                <div class="product-item">
                                    <div class="product-item__img">
                                        <div class="dscr--product__img">
                                            <img src="${product.img}" alt="">
                                        </div>
                                    </div>
                                </div>
        
                                <div class="product__information">
                                    <div class="product-item dscr--product__name">${product.name}</div>
                                    <p class="dscr--product__detail">${product.desc}.</p>
                                    
                                    <div class="wrap-price">
                                        <div class="product-item product__price">$${product.price}</div>
                                        <div class="buttons__added">
                                            <input class="minus quantity-btn" type="button" value="-">
                                            <input class="input-qty" name="" type="text" inputmode="numeric" value="1" min="1" max="10">
                                            <input class="plus quantity-btn" type="button" value="+">
                                        </div>
                                    </div>
        
                                    <div class="buy-btn grid_buy-btn">
                                        <button type="submit" value=${index}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
        
                        <div class="product-item product__name">${product.name}</div>
                        <p class="product__detail">${product.desc}.</p>
                        <div class="product-item product__price">$${product.price}</div>
        
                        <div class="mobile-product__information">
                            <div class="product-item dscr--product__name">${product.name}</div>
                            <p class="dscr--product__detail">${product.desc}.</p>
                            
                            <div class="wrap-price">
                                <div class="product-item product__price">$${product.price}</div>
                                <div class="buttons__added">
                                    <input class="minus quantity-btn" type="button" value="-">
                                    <input class="input-qty" name="" type="text" inputmode="numeric" value="1" min="1" max="10">
                                    <input class="plus quantity-btn" type="button" value="+">
                                </div>
                            </div>
        
                            <div class="buy-btn">
                                <button type="submit" value=${index}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>`;
      productGridList.insertAdjacentHTML("beforeend", productElement);
    }
  });

  // List
  products.forEach(function (product, index) {
    if (index >= 6) {
      var productElement = `<div class="l-12 product">
                <div class="product-item">
                    <div class="product-item__img">
                        <div class="product__img">
                            <img src="${product.img}" alt="">
                        </div>
                    </div>
                </div>
            
                <div class="product__information">
                    <div class="product-item product__name">${product.name}</div>
                    <p class="product__detail">${product.desc}</p>
                    
                    <div class="wrap-price">
                        <div class="product-item product__price">$${product.price}</div>
                        <div class="buttons__added">
                            <input class="minus quantity-btn" type="button" value="-">
                            <input class="input-qty" name="" type="text" inputmode="numeric" value="1" min="1" max="10">
                            <input class="plus quantity-btn" type="button" value="+">
                        </div>
                    </div>
            
                    <div class="buy-btn">
                        <button type="submit" value=${index}>Add to Cart</button>
                    </div>
                </div>
                </div>`;
      productListList.insertAdjacentHTML("beforeend", productElement);
    }
  });

  description();
  setQuantityOfProduct();
  addToCart();
}

page1.addEventListener("click", clickOnPage1);
page2.addEventListener("click", clickOnPage2);
nextBtn.addEventListener("click", clickOnPage2);
prevBtn.addEventListener("click", clickOnPage1);

// DISPLAY VIEW MODE

const gridModeOption = document.querySelector(".view-mode__grid");
const listModeOption = document.querySelector(".view-mode__list");

const gridList = document.querySelector(".list-product__grid");
const listList = document.querySelector(".list-product__list");

function viewMode() {
   gridList.classList.toggle("close-view-mode");
   gridModeOption.classList.toggle("current-view");

   listList.classList.toggle("close-view-mode");
   listModeOption.classList.toggle("current-view");
}

gridModeOption.addEventListener("click", viewMode);
listModeOption.addEventListener("click", viewMode);

// DESCRIPTION

function description() {
    let productElement = document.querySelectorAll(".product__link");
    let descriptionLayer = document.querySelectorAll(".product__description-layer");
    let productDescriptionElement = document.querySelectorAll(".product__description");
    let closeDescriptionBtn = document.querySelectorAll(".product__description--close");
    let buyBtn = document.querySelectorAll(".product__description .grid_buy-btn");

    productElement.forEach(function (item, index) {
        item.addEventListener("click", function () {
            descriptionLayer[index].classList.toggle("open-description--layer");
        });
        
        closeDescriptionBtn[index].addEventListener("click", function () {
            descriptionLayer[index].classList.remove("open-description--layer");
        });
        
        descriptionLayer[index].addEventListener("click", function () {
            item.classList.remove("open-description--layer");
        });
       
        buyBtn[index].addEventListener("click", function () {
            descriptionLayer[index].classList.remove("open-description--layer");
        });
    });

    productDescriptionElement.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });
}

// Quantity input

const pcQuantityInput = document.querySelectorAll(
   ".product__description .input-qty"
);

pcQuantityInput.forEach(function (item) {
   item.addEventListener("keypress", checkInput);
   item.addEventListener("input", checkInput);
   item.addEventListener("paste", checkInput);
   item.addEventListener("change", checkInput);
});

const mobileQuantityInput = document.querySelectorAll(
   ".mobile-product__information .input-qty"
);
mobileQuantityInput.forEach(function (item) {
   item.addEventListener("keypress", checkInput);
   item.addEventListener("input", checkInput);
   item.addEventListener("paste", checkInput);
   item.addEventListener("change", checkInput);
});

function checkInput() {
   if (this.max)
      this.value = Math.min(parseInt(this.max), parseInt(this.value) || 1);
}

//  QUANTITY BUTTON

function plus(value) {
   var temp = Math.floor(value);

   if (temp < 10) {
      return String(temp + 1);
   } else return value;
}

function minus(value) {
   var temp = Math.floor(value);

   if (temp > 1) {
      return String(temp - 1);
   } else return value;
}

function setQuantityOfProduct() {
   const minusBtn = document.querySelectorAll(".minus");
   const plusBtn = document.querySelectorAll(".plus");
   const quantityInput = document.querySelectorAll(".input-qty");

   minusBtn.forEach(function (item, index) {
      item.addEventListener("click", function () {
         quantityInput[index].value = minus(quantityInput[index].value);
         console.log(quantityInput[index].value);
      });
   });

   plusBtn.forEach(function (item, index) {
      item.addEventListener("click", function () {
         quantityInput[index].value = plus(quantityInput[index].value);
      });
   });
}

// ----- CARTS: start -----

// demo current user
sItem(
	"userCurrent",
	JSON.stringify({ name: "Nguyen Thanh Dat", userID: "1" })
);

const userKey = "userList";
const userList = JSON.parse(gItem(userKey)) || defaultUsers;
sItem(userKey, JSON.stringify(userList));

let userCurrent;
userList.forEach(function (item) {
   if(item.userID === JSON.parse(gItem("userCurrent")).userID)
      userCurrent = item;
});

// find a cart of userCurrent from cartList by ID
let cartOfUserCurrent = userCurrent.carts;

renderCartlistOfUserCurrent();

// add new product to productList of userCurrent
function addToCart() {
   let buyBtn = document.querySelectorAll(".buy-btn > button");
   let quantityInput = document.querySelectorAll(".input-qty");

   buyBtn.forEach(function(item, index) {
      item.addEventListener("click", function() {
         var amount = parseInt(quantityInput[index].value);
         var temp = {
				product: products[item.value],
				amount: amount,
				total: products[item.value].price * amount,
				check: false
         }
         
         var n = cartOfUserCurrent.length;
         cartOfUserCurrent[n] = temp;

         console.log(cartOfUserCurrent);

         checkProductList(cartOfUserCurrent);
         updateUserList();
         renderAmountOfCart();
         renderCartlistOfUserCurrent();
      })
   })

}

function updateUserList() {
   userCurrent.carts = cartOfUserCurrent;

   userList.forEach(function(user) {
      if(user.userID === userCurrent.userID)
         user = userCurrent;
   })

   sItem(userKey, JSON.stringify(userList));
}

// check product list have a same product 
function checkProductList(productList) {
   productList.forEach(function(item, index) {
      for (let i = index + 1; i < productList.length; i++) {
         if (productList[i].product.id === item.product.id) {
				item.amount += productList[i].amount;
				item.total += productList[i].total;

				productList[i] = productList[i + 1];

				if(i == productList.length - 1)
					productList.pop();
         }
      }
   })
}

//  render amount of products in cart
function renderAmountOfCart() {
   document.querySelector(".cart-quantity").innerText = cartOfUserCurrent.length;
}

function renderCartlistOfUserCurrent() {
   const headerCartListElement = document.querySelector(".cart-list-item");
   headerCartListElement.innerHTML = "";
	if(cartOfUserCurrent.length == 0) {
		let temp = 
      `<li class="cart-empty">
			<i class="fa-regular fa-face-frown"></i>
			<span>Your Cart Is Empty</span>
      </li>`

		document.querySelector(".cart-purchase-btn").style.display = "none";

      headerCartListElement.insertAdjacentHTML("beforeend", temp);
	}
	else {
		cartOfUserCurrent.forEach(function(item) {
			let temp = 
			`<li class="cart-item">
				<div class="cart-item__img">
					<img src="${item.product.img}" alt="">
				</div>
				
				<div class="cart-item__info">
					<div class="cart-item__heading">
						<div class="cart-item__name">${item.product.name}</div>
						<div class="cart-item__price-wrap">
								<div class="cart-item__price">$${item.product.price}</div>
								<div class="cart-item__quantity">x ${item.amount}</div>
						</div>
					</div>
					<div class="cart-item__detail">
						<span class="cart-item__type">Color: ${item.product.color}</span>
						<button type="button" class="cart-item__remove-btn" value="${item.product.id}">Remove</button>
					</div>
				</div>
			</li>`

			headerCartListElement.insertAdjacentHTML("beforeend", temp);
		})
		document.querySelector(".cart-purchase-btn").style.display = "block";
	}

	removeProductInCart();
   renderAmountOfCart();
}

// Remove product from cart list
function deleteObjectInArrayList(arrayList, startIndex) {
	for (var i = startIndex; i < arrayList.length; i++) {
		arrayList[i] = arrayList[i + 1];
		if (i == arrayList.length - 1)
			arrayList.pop();
	}
}

function removeProductInCart() {
	const removeProductBtn = document.querySelectorAll(".cart-item__remove-btn");
	removeProductBtn.forEach(function(button) {
		button.addEventListener("click", function() {
			cartOfUserCurrent.forEach(function(item, index) {
				if (item.product.id === button.value)
					deleteObjectInArrayList(cartOfUserCurrent, index);
			})
			
			renderCartlistOfUserCurrent();
         updateUserList();
		})
	})
}

// ----- CARTS STORAGE: end -----


// ----- ORDERS: Start -----

// create  the orders of user current
const ordersKey = "ordersList";
const ordersList = JSON.parse(gItem(ordersKey)) || defaultOrders;
sItem(ordersKey, JSON.stringify(ordersList));

// find an order of current user
var ordersOfUserCurrent;
userList.forEach(function (item) {
   if(item.userID == JSON.parse(gItem("userCurrent")).userID)
      ordersOfUserCurrent = item.orders;
});

const purchaseButton = document.querySelector(".cart-purchase-btn");

purchaseButton.addEventListener("click", function() {
   let today = new Date();
   let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
   let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   let dateTime = date+' '+time;

   let total = 0; 
   cartOfUserCurrent.forEach((item) => {
      total += item.total;
   })

   ordersList[ordersList.length] = {
      name: userCurrent.name,
      ordersID: userCurrent.userID,
      productList: cartOfUserCurrent,
      time: dateTime,
      total: total
   }

   // update ordersList
	sItem(ordersKey, JSON.stringify(ordersList));

   // update cart of current user
	cartOfUserCurrent = [];
   updateUserList();
	renderCartlistOfUserCurrent();
})

// ----- ORDERS: End -----
