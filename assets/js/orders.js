import { tableBodyOrder } from "./main.js";

import { createArr, orderKey } from "./main.js";
import { gItem, sItem, orders as defaultOrders } from "./storage.js";

function displayCheck(item) {
  if (item) {
    return "Đã xử lý";
  } else {
    return "Chưa xử lý";
  }
}

function fullCheck(item) {
  const check_True = createArr(document.querySelectorAll("button.check.true"));
  console.log(
    "🚀 ~ file: orders.js ~ line 16 ~ fullCheck ~ check_True",
    check_True
  );
  const fullCheckDisplay = document.querySelector("span.check");
  if (item.productList.length == check_True.length) {
    fullCheckDisplay.classList.add("true");
  } else {
    fullCheckDisplay.classList.remove("true");
  }
}

function baseRenderOrder(i) {
  return (
    `<div class="row mb-32 table__row shadow-wrap js-mid no-gutters">
    <div class="col l-1 order number">
      ` +
    (i + 1) +
    `
    </div>
    <div class="col l-8 information">
      <div class="row">User Name:  ` +
    orderList[i].name +
    `</div>
      <div class="row mt-16">Order ID:  ` +
    orderList[i].orderID +
    `</div>
    </div>
	<div class="col l-1 ">
    <span class="check"> Fully checked </span>
    </div>
    <div class="col l-1 order-detail__btn">
      <button class="order-full btn"><i class="fa-solid fa-caret-left fa-xl"></i></button>
    </div>
    </div>
  <div class="details-view no-gutters">
    
  </div>`
  );
}
const orderList = gItem("orderList") || defaultOrders;
function renderOrderDetails() {
  const orderView = document.querySelectorAll(".details-view");
  const viewButton = document.querySelectorAll(".order-full");
  const OrderNumber = document.querySelectorAll(".order.number");
  viewButton.forEach((item, indexButton) => {
    item.onclick = () => {
      if (!item.classList.contains("active")) {
        let j = 0;
        while (j < viewButton.length) {
          viewButton[j].classList.remove("active");
          orderView[j].innerHTML = "";
          orderView[j].classList.remove("active");
          orderView[j].style.height = 0 + "px";
          j++;
        }
        item.classList.add("active");
        orderView[indexButton].classList.add("active");
        orderView[indexButton].innerHTML = "";
        orderList[
          parseInt(OrderNumber[indexButton].innerHTML) - 1
        ].productList.forEach((item) => {
          orderView[indexButton].innerHTML +=
            `<div class="row mt-16 mr-16 no-gutters pt-16 order-view ">
              <div class=" col l-9 l-o-3">
                  <div class="row no-gutters js-mid">
                    <div class="col l-3">Product</div>
                      <div class="col l-3">Amount</div>
            <div class="col l-3">Price</div>
                      <div class="col l-3">State</div>
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
            `$</div>
                  <button class="col l-3 check ` +
            item.check +
            `">` +
            displayCheck(item.check) +
            `</button>
              </div>
          </div>
        </div>`;
        });
        orderView[indexButton].innerHTML +=
          `<div class="row no-gutters js-mid">
          <div class="col l-3">Time : ` +
          (orderList[indexButton].time || Date.now()) +
          `</div>
    <div class="col l-3 l-o-6">Total: ` +
          orderList[indexButton].total +
          `$</div>
    </div>`;
        let h = orderView[indexButton].scrollHeight;
        let i = 0;
        while (i <= h) {
          orderView[indexButton].style.height = i + "px";
          i += 3;
        }
      } else {
        orderView[indexButton].classList.remove("active");
        orderView[indexButton].style.height = 0 + "px";
        orderView[indexButton].innerHTML = "";
        item.classList.toggle("active");
      }
      const checkView = createArr(document.querySelectorAll(".col.check"));

      checkView.forEach((itemCheck, indexCheck) => {
        itemCheck.onclick = () => {
          if (orderList[indexButton].productList[indexCheck].check == true) {
            itemCheck.innerHTML = "Chưa xử lý";
            itemCheck.classList.remove("true");
            itemCheck.classList.add("false");
            orderList[indexButton].productList[indexCheck].check = false;
            sItem(orderKey, orderList);
          } else {
            itemCheck.innerHTML = "Đã xử lý";
            itemCheck.classList.remove("false");
            itemCheck.classList.add("true");
            orderList[indexButton].productList[indexCheck].check = true;
            sItem(orderKey, orderList);
          }
          fullCheck(orderList[indexButton]);
        };
      });
    };
  });
}
// =================================================================== render =================================================================//
export function outputOrders() {
  tableBodyOrder.innerHTML = "";

  for (let i = 0; i < orderList.length; i++) {
    tableBodyOrder.innerHTML += baseRenderOrder(i);
  }
  renderOrderDetails();
  sItem(orderKey, orderList);
}
outputOrders();
const searchInput = document.querySelector(".order.search-input");
function searchOrderList() {
  const searchValue = searchInput.value;
  tableBodyOrder.innerHTML = "";
  orderList.filter((item, i) => {
    if (item.name.includes(searchValue)) {
      tableBodyOrder.innerHTML += baseRenderOrder(i);
    }
    renderOrderDetails();
  });
}
searchInput.addEventListener("keypress", searchOrderList);
searchInput.addEventListener("input", searchOrderList);
searchInput.addEventListener("paste", searchOrderList);
searchInput.addEventListener("change", searchOrderList);
