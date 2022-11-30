import {
  // products as defaultProducts,
  // users as defaultUsers,
  // orders as defaultOrders,
  sItem,
  gItem,
} from "./storage.js";

import {
  isLogin,
  openForm,
  userList,
  userCurrentInLocal,
  userKey,
  getUserCurrent,
} from "./form.js";
import { basicItemRenderGrid, basicItemRenderList } from "./filter.js";
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

// BACK-TO-TOP BUTTON

document.querySelector(".back-to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: `smooth`,
  });
});

// CONTENT PRODUCT LIST

// Render product view-mode grid
const productGridList = document.querySelector(".list-product__grid");
const products = gItem("productList");
// Render product view-mode list
const productListList = document.querySelector(".list-product__list");

products.forEach(function (product, index) {
  if (index < 6) {
    var productElement = `<div class="l-12 product">
            <div class="product-item">
                <div class="product-item__img">
                    <div class="product__img">
                        <img src="./assets/image/${product.img}" alt="">
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

function renderPageNumber(i) {
  return ` <li class="pagination-item pages page${i}">
  <div class="pagination__link">${i}</div>
</li>`;
}

export function paginationRender(products) {
  const productList = gItem("productList");
  const prevPage = document.querySelector(".pagination-prev ");
  const nextPage = document.querySelector(".pagination-next ");
  let curPage = 1;
  const productPerPage = 6;
  const numberOfProducts = products.length || 0;
  const pageList = document.querySelector(".pagination__menu");
  const numberOfPages = Math.ceil(numberOfProducts / productPerPage);
  pageList.innerHTML = "";
  if (numberOfPages != 0) {
    changePage(1, products);
    for (let i = 1; i <= numberOfPages; i++) {
      pageList.innerHTML += renderPageNumber(i);
    }
    if (numberOfPages == 1) {
      nextPage.classList.add("close-view-mode");
      prevPage.classList.add("close-view-mode");
    } else {
      prevPage.classList.add("close-view-mode");
      nextPage.classList.remove("close-view-mode");
    }
    const onPage = document.querySelectorAll(".pagination-item.pages");
    onPage[0].classList.add("pagination-item__active");
    onPage.forEach(function (item) {
      item.onclick = function () {
        const paginationItem = item.className.replaceAll(" ", ".");

        const paginationLink = document.querySelector(
          "." + paginationItem + " .pagination__link"
        );
        toggleButton(item);
        // item.classList.add("pagination-item__active");
        curPage = parseInt(paginationLink.innerHTML);
        if (curPage == numberOfPages) {
          nextPage.classList.add("close-view-mode");
          prevPage.classList.remove("close-view-mode");
        } else {
          if (curPage == 1) {
            prevPage.classList.add("close-view-mode");
            nextPage.classList.remove("close-view-mode");
          }
        }

        changePage(curPage, products);
        description();
        // addToCart();
        removeProductInCart();
      };
    });
    // description();
    // addToCart();
    //     removeProductInCart();

    prevPage.onclick = function () {
      if (1 < curPage) {
        curPage--;
        changePage(curPage, products);
        toggleButton(onPage[curPage - 1]);
        if (curPage == 1) {
          prevPage.classList.add("close-view-mode");
          nextPage.classList.remove("close-view-mode");
          toggleButton(onPage[0]);
        }
      }
    };
    nextPage.onclick = function () {
      if (curPage < numberOfPages) {
        curPage++;
        changePage(curPage, products);
        toggleButton(onPage[curPage - 1]);

        if (curPage == numberOfPages) {
          prevPage.classList.remove("close-view-mode");
          nextPage.classList.add("close-view-mode");
          toggleButton(onPage[numberOfPages - 1]);
        }
      }
    };
    function changePage(curPage, products) {
      productGridList.innerHTML = "";
      products.forEach(function (product, i) {
        if (
          (curPage - 1) * productPerPage <= i &&
          i < curPage * productPerPage
        ) {
          productGridList.innerHTML += basicItemRenderGrid(
            product,
            productList.map((x) => x.id).indexOf(product.id)
          );
        }
      });
      productListList.innerHTML = "";
      products.forEach(function (product, i) {
        if (
          (curPage - 1) * productPerPage <= i &&
          i < curPage * productPerPage
        ) {
          productListList.innerHTML += basicItemRenderList(
            product,
            productList.map((x) => x.id).indexOf(product.id)
          );
        }
      });
      description();
      // addToCart();
      removeProductInCart();
      setQuantityOfProduct();
      addToCart();
      quantityInput();
    }

    function toggleButton(item) {
      let j = 0;
      while (j < onPage.length) {
        onPage[j++].classList.remove("pagination-item__active");
      }
      item.classList.add("pagination-item__active");
    }
  } else {
    nextPage.classList.add("close-view-mode");
    prevPage.classList.add("close-view-mode");
  }
  // addToCart();
}

paginationRender(products);

// DESCRIPTION

export function description() {
  let productElement = document.querySelectorAll(".product__link");
  let descriptionLayer = document.querySelectorAll(
    ".product__description-layer"
  );
  let productDescriptionElement = document.querySelectorAll(
    ".product__description"
  );
  let closeDescriptionBtn = document.querySelectorAll(
    ".product__description--close"
  );
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

function quantityInput() {
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
}
quantityInput();
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
    });
  });

  plusBtn.forEach(function (item, index) {
    item.addEventListener("click", function () {
      quantityInput[index].value = plus(quantityInput[index].value);
    });
  });
}

// ----- CARTS: start -----
var userCurrent = userCurrentInLocal;

userList.forEach(function (item) {
  if (item.userID === userCurrent.userID) {
    userCurrent = item;
  }
});

document.querySelector(".user-name").innerText = userCurrent.name;

let cartOfUserCurrent = userCurrent.carts;

// add new product to productList of userCurrent
export function addToCart() {
  let buyBtn = document.querySelectorAll(".buy-btn > button");
  let quantityInput = document.querySelectorAll(".input-qty");

  buyBtn.forEach(function (item, index) {
    item.addEventListener("click", function () {
      if (!isLogin) {
        openForm();
      } else {
        var amount = parseInt(quantityInput[index].value);
        var temp = {
          product: products[item.value],
          amount: amount,
          total: products[item.value].price * amount,
          check: false,
        };

        var n = cartOfUserCurrent.length;
        cartOfUserCurrent[n] = temp;

        checkProductList(cartOfUserCurrent);
        updateUserList();
        renderAmountOfCart();
        renderCartlistOfUserCurrent();
      }
    });
  });
}

function updateUserList() {
  userCurrent.carts = cartOfUserCurrent;

  userList.forEach(function (user) {
    if (user.userID === userCurrent.userID) user = userCurrent;
  });

  sItem(userKey, userList);
}

// check product list have a same product
function checkProductList(productList) {
  productList.forEach(function (item, index) {
    for (let i = index + 1; i < productList.length; i++) {
      if (productList[i].product.id === item.product.id) {
        item.amount += productList[i].amount;
        item.total += productList[i].total;

        productList[i] = productList[i + 1];

        if (i == productList.length - 1) productList.pop();
      }
    }
  });
}

//  render amount of products in cart
function renderAmountOfCart() {
  let temp = `<span class="cart-number-badge">
    <span class="cart-quantity">${cartOfUserCurrent.length}</span>
  </span>
  `;
  document.querySelector(".cart-list").insertAdjacentHTML("beforebegin", temp);
}

function renderCartlistOfUserCurrent() {
  const headerCartListElement = document.querySelector(".cart-list-item");
  headerCartListElement.innerHTML = "";
  if (cartOfUserCurrent.length == 0) {
    let temp = `<li class="cart-empty">
      <i class="fa-regular fa-face-frown"></i>
      <span>&nbspYour Cart Is Empty</span>
      </li>`;

    document.querySelector(".cart-purchase-btn").style.display = "none";

    headerCartListElement.insertAdjacentHTML("beforeend", temp);
  } else {
    cartOfUserCurrent.forEach(function (item) {
      let temp = `<li class="cart-item">
        <div class="cart-item__img">
          <img src="./assets/image/${item.product.img}" alt="">
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
      </li>`;

      headerCartListElement.insertAdjacentHTML("beforeend", temp);
    });
    document.querySelector(".cart-purchase-btn").style.display = "block";
  }

  removeProductInCart();
  renderAmountOfCart();
}

// Remove product from cart list
function deleteObjectInArrayList(arrayList, startIndex) {
  for (var i = startIndex; i < arrayList.length; i++) {
    arrayList[i] = arrayList[i + 1];
    if (i == arrayList.length - 1) arrayList.pop();
  }
}

function removeProductInCart() {
  const removeProductBtn = document.querySelectorAll(".cart-item__remove-btn");
  removeProductBtn.forEach(function (button) {
    button.addEventListener("click", function () {
      cartOfUserCurrent.forEach(function (item, index) {
        if (item.product.id === button.value)
          deleteObjectInArrayList(cartOfUserCurrent, index);
      });

      renderCartlistOfUserCurrent();
      updateUserList();
    });
  });
}

// ----- CARTS STORAGE: end -----

// ----- ORDERS: Start -----

// create  the orders of user current
const ordersKey = "orderList";
const ordersList = gItem(ordersKey) || defaultOrders;
sItem(ordersKey, ordersList);

// find an order of current user
var ordersOfUserCurrent;

userList.forEach(function (item) {
  if (item.userID === gItem("userCurrent").userID)
    ordersOfUserCurrent = item.orders;
});

const purchaseButton = document.querySelector(".cart-purchase-btn");

purchaseButton.addEventListener("click", function () {
  let today = new Date();
  let date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  let total = 0;
  cartOfUserCurrent.forEach((item) => {
    total += item.total;
  });

  let ID = 0;
  if (ordersList.length != 0)
    ID = JSON.parse(ordersList[ordersList.length - 1].orderID) + 1;
  else ID = 0;

  ordersList[ordersList.length] = {
    name: userCurrent.name,
    userID: userCurrent.userID,
    orderID: ID,
    productList: cartOfUserCurrent,
    time: date,
    total: total,
    fullyCheck: false,
  };

  // update ordersList
  sItem(ordersKey, ordersList);

  // update cart of current user
  cartOfUserCurrent = [];
  updateUserList();
  renderCartlistOfUserCurrent();
  renderOrderListOfUserCurrent();
  orderList();
});

function renderOrderListOfUserCurrent() {
  // let userID = userCurrent.userID;
  let orderListElement = document.querySelector(".orders-list");
  let mobileOrderListElement = document.querySelector(".mobile__orders-list");
  let ordersListOfUserCurrent = ordersList.filter(function (order) {
    return order.userID === userCurrent.userID;
  });

  orderListElement.innerHTML = "";
  mobileOrderListElement.innerHTML = "";

  // Render the order list
  ordersListOfUserCurrent.forEach(function (order, index) {
    let temp = `<li class="orders-item">
        <div class="orders-item__header">
            <div class="orders-item__info">
                <div class="header-info">
                    <span class="orders-item__user-name">${order.name}</span>
                    <span class="orders-item__order-name">Order ID: ${order.orderID}</span>
                </div>

                <div class="detail-info">
                    <span class="orders-item__time">Date: ${order.time}</span>
                    <span class="orders-item__total">Total:$ ${order.total}</span>
                </div>
            </div>

        </div>

        
      </li>
      
      <div class="orders-item__layer">
        <div class="orders-item__body">
          <div class="orders-item__heading">

            <div class="orders-close__btn">
              <i class="fa-solid fa-xmark"></i>
            </div>
            
            <div class="orders-item__info">
              <div class="header-info">
                  <span class="orders-item__user-name">${order.name}</span>
                  <span class="orders-item__order-name">Order ID: ${order.orderID}</span>
              </div>

              <div class="detail-info">
                  <span class="orders-item__time">Date: ${order.time}</span>
                  <span class="orders-item__total"><mark>Total: $ ${order.total}</mark></span>
              </div>
            </div>

            </div>

            <ul class="orders-item_list">
            
            </ul>
        </div>
      </div>`;

    orderListElement.insertAdjacentHTML("beforeend", temp);
    mobileOrderListElement.insertAdjacentHTML("beforeend", temp);

    // Render the produt list in each order
    let orderProductListElement =
      document.querySelectorAll(".orders-item_list");
    let mobileOrderProductListElement = document.querySelectorAll(
      ".orders .orders-item_list"
    );
    order.productList.forEach(function (item) {
      temp = `<li class="orders-product">
        <div class="orders-product__img">
          <img src="./assets/image/${item.product.img}" alt="">
        </div>
        
        <div class="orders-product__info">
          <div class="orders-product__heading">
            <div class="orders-product__name">${item.product.name}</div>
          </div>
          <div class="orders-product__detail">
            <span class="orders-product__type">Color: ${item.product.color}</span>
            <div class="orders-product__price-wrap">
              <div class="orders-product__price">$${item.product.price}</div>
              <div class="orders-product__quantity"> x ${item.amount}</div>
            </div>
          </div>
        </div>
      </li>`;
      orderProductListElement[index].insertAdjacentHTML("beforeend", temp);
      mobileOrderProductListElement[index].insertAdjacentHTML(
        "beforeend",
        temp
      );
    });
    orderItemCheck();
  });
}

export function orderItemCheck() {
  let ordersListOfUserCurrent = ordersList.filter(function (order) {
    return order.userID === userCurrent.userID;
  });
  let orderItemHeading = document.querySelectorAll(
    ".orders-item__body > .orders-item__heading"
  );
  let mobileOrderItemHeading = document.querySelectorAll(
    "mobile__orders-list .orders-item__body > .orders-item__heading"
  );

  ordersListOfUserCurrent.forEach(function (order, index) {
    if (order.fullyCheck == true) {
      orderItemHeading[index].classList.add("background-color__checked");
      // mobileOrderItemHeading[index].classList.add("background-color__checked");
    }
  });
}

function orderList() {
  let orderModalLayers = document.querySelectorAll(".orders-item__layer");
  let orderItems = document.querySelectorAll(".orders-item");
  let orderCloseBtn = document.querySelectorAll(".orders-close__btn");
  let orderModals = document.querySelectorAll(".orders-item__body");

  orderItems.forEach(function (orderItem, index) {
    orderItem.addEventListener("click", function () {
      orderModalLayers[index].classList.add(
        "orders-item__layer--display__flex"
      );
    });

    orderCloseBtn[index].addEventListener("click", function (event) {
      orderModalLayers[index].classList.remove(
        "orders-item__layer--display__flex"
      );
    });

    orderModalLayers[index].addEventListener("click", function () {
      orderModalLayers[index].classList.remove(
        "orders-item__layer--display__flex"
      );
    });

    orderModals[index].addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
}

// ----- ORDERS: End -----

let ordersListContainerElement = document.querySelector(
  ".orders > .orders-list-container"
);
let iconOrderList = document.querySelector(".orders");
let sideMenuLayer = document.querySelector(".header__side-menu-container");
let sideMenu = document.querySelector(".header__side-menu");

iconOrderList.addEventListener("click", function (event) {
  orderList();
  ordersListContainerElement.classList.add("open");
  event.stopPropagation();
});

ordersListContainerElement.addEventListener("click", function (e) {
  e.stopPropagation();
});

sideMenuLayer.addEventListener("click", function () {
  ordersListContainerElement.classList.remove("open");
});

sideMenu.addEventListener("click", function () {
  ordersListContainerElement.classList.remove("open");
});

// addToCart();
renderCartlistOfUserCurrent();
setQuantityOfProduct();
renderOrderListOfUserCurrent();
orderList();

// Click to open/close filter options in mobile

document
  .querySelector(".mobile-filter--btn__color")
  .addEventListener("click", function () {
    document.querySelector(".color-filter").style.display = "block";
    document.querySelector(".type-filter").style.display = "none";
    document.querySelector(".price-filter").style.display = "none";
  });

document
  .querySelector(".mobile-filter--btn__type")
  .addEventListener("click", function () {
    document.querySelector(".type-filter").style.display = "block";
    document.querySelector(".color-filter").style.display = "none";
    document.querySelector(".price-filter").style.display = "none";
  });

document
  .querySelector(".mobile-filter--btn__price")
  .addEventListener("click", function () {
    document.querySelector(".price-filter").style.display = "block";
    document.querySelector(".color-filter").style.display = "none";
    document.querySelector(".type-filter").style.display = "none";
  });

document.querySelector(".shop-content").addEventListener("click", function () {
  document.querySelector(".color-filter").style.display = "none";
  document.querySelector(".type-filter").style.display = "none";
  document.querySelector(".price-filter").style.display = "none";
});
