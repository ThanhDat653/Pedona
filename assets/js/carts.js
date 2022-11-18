import { tableBodyCart as tableBodyCart } from "./main.js";

import { cartKey, createArr } from "./main.js";
import { gItem, sItem, carts as defaultCarts } from "./storage.js";

function displayCheck(item) {
  if (item) {
    return "Đã xử lý";
  } else {
    return "Chưa xử lý";
  }
}
const cartList = gItem("cartList") || defaultCarts;

// =================================================================== render =================================================================//

export function outputCarts() {
  tableBodyCart.innerHTML = "";

  for (let i = 0; i < cartList.length; i++) {
    tableBodyCart.innerHTML +=
      `<div class="row mb-32 table__row shadow-wrap js-mid no-gutters">
    <div class="col l-1">
      ` +
      (i + 1) +
      `
    </div>
    <div class="col l-9">
      <div class="row">User Name:  ` +
      cartList[i].name +
      `</div>
      <div class="row mt-16">Cart ID:  ` +
      cartList[i].cartID +
      `</div>
    </div>
    <div class="col l-1 cart-detail__btn">
      <button class="order-full btn"><i class="fa-solid fa-caret-left fa-xl"></i></button>
      ` + // <button class="order-full--close btn"><i class="fa-solid fa-caret-down"></i></button>`
      `</div>
    </div>
  <div class="details-view no-gutters">
    
  </div>`;
  }
  const cartView = document.querySelectorAll(".details-view");
  const viewButton = document.querySelectorAll(".order-full");

  viewButton.forEach((item, indexButton) => {
    item.onclick = () => {
      if (!item.classList.contains("active")) {
        let j = 0;
        while (j < viewButton.length) {
          viewButton[j].classList.remove("active");
          cartView[j].innerHTML = "";
          cartView[j].classList.remove("active");
          cartView[j].style.height = 0 + "px";
          j++;
        }
        item.classList.add("active");
        cartView[indexButton].classList.add("active");
        cartView[indexButton].innerHTML = "";
        cartList[indexButton].productList.forEach((item, indexList) => {
          cartView[indexButton].innerHTML +=
            `<div class="row order-view ">
            <div class=" col l-9 l-o-3 ">
                <div class="row no-gutters js-mid order-view__header">
                  <div class="col l-3">Product</div>
                        <div class="col l-3">Amount</div>
                        <div class="col l-3">Price</div>
                        <div class="col l-3">Condition</div>
                </div>
                <div class="row table__row  no-gutters js-mid">
                  <div class="col l-3 ">
                  <img class="product__img" src="` +
            item.product.img +
            `" alt="">
  
                      
                    <div class="row js-mid">
                    ` +
            item.product.name +
            `
                    </div>
                    <div class="row js-mid">
                    ` +
            item.product.id +
            `
                    </div>
                  </div>
                        <div class="col l-3">` +
            item.amount +
            `</div>
                        <div class="col l-3">` +
            item.total +
            `</div>
                        <button class=" btn col l-3 check ` +
            item.check +
            `">` +
            displayCheck(item.check) +
            `</button>
                </div>
            </div>
          </div>`;
        });
        cartView[indexButton].innerHTML += `<div class="row no-gutters js-mid">
      <div class="col l-3">Thời Gian:  </div>
      <div class="col l-3 l-o-6">Total:  </div>
      </div>`;
        let h = cartView[indexButton].scrollHeight;
        let i = 0;
        while (i <= h) {
          cartView[indexButton].style.height = i + "px";
          i += 3;
        }
      } else {
        cartView[indexButton].classList.remove("active");
        cartView[indexButton].style.height = 0 + "px";
        cartView[indexButton].innerHTML = "";
        item.classList.toggle("active");
      }
      const checkView = createArr(document.querySelectorAll(".col.check"));

      checkView.forEach((itemCheck, indexCheck) => {
        itemCheck.onclick = () => {
          if (cartList[indexButton].productList[indexCheck].check == true) {
            itemCheck.innerHTML = "Chưa xử lý";
            itemCheck.classList.remove("true");
            itemCheck.classList.add("false");
            cartList[indexButton].productList[indexCheck].check = false;
            sItem(cartKey, cartList);
          } else {
            itemCheck.innerHTML = "Đã xử lý";
            itemCheck.classList.remove("false");
            itemCheck.classList.add("true");
            cartList[indexButton].productList[indexCheck].check = true;
            sItem(cartKey, cartList);
          }
        };
      });
    };
  });
  sItem(cartKey, cartList);
}
outputCarts();
const searchInput = document.querySelector(".cart.search-input");
function searchCartList() {
  const searchValue = searchInput.value;
  tableBodyCart.innerHTML = "";
  cartList.filter((item, i) => {
    if (item.name.includes(searchValue) || item.cartID.includes(searchValue)) {
      tableBodyCart.innerHTML +=
        `<div class="row mt-32 mb-32 table__row shadow-wrap js-mid no-gutters">
      <div class="col l-2 cart number">
      ` +
        (i + 1) +
        `
  </div>
  <div class="col l-8">
    <div class="row">Tên Khách Hàng:` +
        cartList[i].name +
        `</div>
      <div class="row mt-16">Mã Đơn Hàng:` +
        cartList[i].cartID +
        `</div>
  </div>
  <div class="col l-2">
  <button class="mt-16 order-full btn"><i class="fa-solid fa-caret-left fa-xl"></i></button>
    ` +
        `</div>
    </div>
    <div class="content details-view no-gutters">
    
    </div>`;
      const cartView = document.querySelectorAll(".details-view");
      const viewButton = document.querySelectorAll(".order-full");
      const cartNumber = document.querySelectorAll(".cart.number");
      viewButton.forEach((item, indexButton) => {
        item.onclick = () => {
          if (!item.classList.contains("active")) {
            let j = 0;
            while (j < viewButton.length) {
              viewButton[j].classList.remove("active");
              cartView[j].innerHTML = "";
              cartView[j].classList.remove("active");
              cartView[j].style.height = 0 + "px";
              j++;
            }
            item.classList.add("active");
            cartView[indexButton].classList.add("active");
            cartView[indexButton].innerHTML = "";
            cartList[
              parseInt(cartNumber[indexButton].innerHTML) - 1
            ].productList.forEach((item, indexList) => {
              cartView[indexButton].innerHTML +=
                `<div class="row mt-16 mr-16 no-gutters pt-16 order-view ">
            <div class=" col l-9 l-o-3">
            <div class="row no-gutters js-mid">
            <div class="col l-3">Sản phẩm</div>
            <div class="col l-3">Số Lượng</div>
            <div class="col l-3">Giá</div>
                      <div class="col l-3">Trạng Thái</div>
                      </div>
              <div class="row table__row  no-gutters js-mid">
              <div class="col l-3 ">
                <img class="product__img" src="` +
                item.product.img +
                `" alt="">
              
              
              <div class="row js-mid">
              ` +
                item.product.name +
                `
              </div>
              <div class="row js-mid">
              ` +
                item.product.id +
                `
              </div>
                  </div>
                  <div class="col l-3">` +
                item.amount +
                `</div>
                  <div class="col l-3">` +
                item.total +
                `</div>
                  <button class="col l-3 check ` +
                item.check +
                `">` +
                displayCheck(item.check) +
                `</button>
              </div>
          </div>
        </div>`;
            });
            cartView[
              indexButton
            ].innerHTML += `<div class="row no-gutters js-mid">
          <div class="col l-3">Thời Gian :</div>
    <div class="col l-3 l-o-6">Tổng Đơn Hàng</div>
    </div>`;
            let h = cartView[indexButton].scrollHeight;
            let i = 0;
            while (i <= h) {
              cartView[indexButton].style.height = i + "px";
              i += 3;
            }
          } else {
            cartView[indexButton].classList.remove("active");
            cartView[indexButton].style.height = 0 + "px";
            cartView[indexButton].innerHTML = "";
            item.classList.toggle("active");
          }
          const checkView = createArr(document.querySelectorAll(".col.check"));

          checkView.forEach((itemCheck, indexCheck) => {
            itemCheck.onclick = () => {
              if (cartList[indexButton].productList[indexCheck].check == true) {
                itemCheck.innerHTML = "Chưa xử lý";
                itemCheck.classList.remove("true");
                itemCheck.classList.add("false");
                cartList[indexButton].productList[indexCheck].check = false;
                sItem(cartKey, cartList);
              } else {
                itemCheck.innerHTML = "Đã xử lý";
                itemCheck.classList.remove("false");
                itemCheck.classList.add("true");
                cartList[indexButton].productList[indexCheck].check = true;
                sItem(cartKey, cartList);
              }
            };
          });
        };
      });
    }
  });
}
searchInput.addEventListener("keypress", searchCartList);
searchInput.addEventListener("input", searchCartList);
searchInput.addEventListener("paste", searchCartList);
searchInput.addEventListener("change", searchCartList);
