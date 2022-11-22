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
const orderList = gItem("orderList") || defaultOrders;

// =================================================================== render =================================================================//
export function outputOrders() {
  tableBodyOrder.innerHTML = "";

  for (let i = 0; i < orderList.length; i++) {
    tableBodyOrder.innerHTML +=
      `<div class="row mb-32 table__row shadow-wrap js-mid no-gutters">
    <div class="col l-1">
      ` +
      (i + 1) +
      `
    </div>
    <div class="col l-9">
      <div class="row">User Name:  ` +
      orderList[i].name +
      `</div>
      <div class="row mt-16">Order ID:  ` +
      orderList[i].orderID +
      `</div>
    </div>
    <div class="col l-1 order-detail__btn">
      <button class="order-full btn"><i class="fa-solid fa-caret-left fa-xl"></i></button>
      ` + // <button class="order-full--close btn"><i class="fa-solid fa-caret-down"></i></button>`
      `</div>
    </div>
  <div class="details-view no-gutters">
    
  </div>`;
  }
  const orderView = document.querySelectorAll(".details-view");
  const viewButton = document.querySelectorAll(".order-full");

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
        orderList[indexButton].productList.forEach((item, indexList) => {
          orderView[indexButton].innerHTML +=
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
        orderView[indexButton].innerHTML +=
          `<div class="row no-gutters js-mid">
      <div class="col l-3">Thời Gian: ` +
          orderList[indexButton].time +
          `   </div>
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
        };
      });
    };
  });
  sItem(orderKey, orderList);
}
outputOrders();
const searchInput = document.querySelector(".order.search-input");
function searchOrderList() {
  const searchValue = searchInput.value;
  tableBodyOrder.innerHTML = "";
  orderList.filter((item, i) => {
    if (item.name.includes(searchValue)) {
      tableBodyOrder.innerHTML +=
        `<div class="row mt-32 mb-32 table__row shadow-wrap js-mid no-gutters">
      <div class="col l-2 Order number">
      ` +
        (i + 1) +
        `
  </div>
  <div class="col l-8">
    <div class="row">Tên Khách Hàng:` +
        orderList[i].name +
        `</div>
      <div class="row mt-16">Mã Đơn Hàng:` +
        orderList[i].orderID +
        `</div>
  </div>
  <div class="col l-2">
  <button class="mt-16 order-full btn"><i class="fa-solid fa-caret-left fa-xl"></i></button>
    ` +
        `</div>
    </div>
    <div class="content details-view no-gutters">
    
    </div>`;
      const orderView = document.querySelectorAll(".details-view");
      const viewButton = document.querySelectorAll(".order-full");
      const OrderNumber = document.querySelectorAll(".Order.number");
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
            ].productList.forEach((item, indexList) => {
              orderView[indexButton].innerHTML +=
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
            orderView[
              indexButton
            ].innerHTML += `<div class="row no-gutters js-mid">
          <div class="col l-3">Thời Gian :</div>
    <div class="col l-3 l-o-6">Tổng Đơn Hàng</div>
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
              if (
                orderList[indexButton].productList[indexCheck].check == true
              ) {
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
            };
          });
        };
      });
    }
  });
}
searchInput.addEventListener("keypress", searchOrderList);
searchInput.addEventListener("input", searchOrderList);
searchInput.addEventListener("paste", searchOrderList);
searchInput.addEventListener("change", searchOrderList);
