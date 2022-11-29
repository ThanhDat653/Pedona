import { tableBodyOrder } from "./main.js";

import { createArr, orderKey } from "./main.js";
// import { orderItemCheck} from "./app.js";
import { gItem, sItem } from "./storage.js";

function displayCheck(item) {
  if (item) {
    return "Đã xử lý";
  } else {
    return "Chưa xử lý";
  }
}
function bigCheck(item) {
  if (item) {
    return "Fully Checked";
  } else {
    return "Haven't Checked";
  }
}

const checkerListener = document.querySelectorAll(".checker");

checkerListener.forEach(function (item) {
  item.onclick = function () {
    let orderList = gItem(orderKey);
    const checkValue = item.className.split(" ")[1];
    if (item.classList.contains("checked")) {
      item.classList.remove("checked");
      item.checked = false;
      let searchValue = searchInput.value;
      tableBodyOrder.innerHTML = "";
      if (searchValue != "") {
        orderList.forEach(function (order, i) {
          if (
            order.name.includes(searchValue) ||
            order.orderID.includes(searchValue) ||
            order.userID.includes(searchValue)
          ) {
            tableBodyOrder.innerHTML += baseRenderOrder(i);
          }
          renderOrderDetails();
        });
      } else {
        outputOrders();
      }
    } else {
      let j = 0;
      while (j < checkerListener.length) {
        checkerListener[j].classList.remove("checked");
        checkerListener[j].checked = false;
        j++;
      }
      item.classList.add("checked");
      let searchValue = searchInput.value.trim();
      tableBodyOrder.innerHTML = "";
      if (searchValue != "") {
        orderList.forEach(function (order, i) {
          if (
            order.name.includes(searchValue) ||
            order.orderID.includes(searchValue) ||
            order.userID.includes(searchValue)
          ) {
            if (checkValue == order.fullyCheck.toString()) {
              tableBodyOrder.innerHTML += baseRenderOrder(i);
            }
            renderOrderDetails();
          }
        });
      } else {
        tableBodyOrder.innerHTML = "";
        orderList.forEach(function (order, i) {
          if (checkValue == order.fullyCheck.toString()) {
            tableBodyOrder.innerHTML += baseRenderOrder(i);
          }
          renderOrderDetails();
        });
      }
    }
  };
});

function fullCheck(item, index, button) {
  const check_True = createArr(document.querySelectorAll("button.check.true"));
  const fullCheckDisplay = createArr(document.querySelectorAll("span.check"));
  if (item.productList.length == check_True.length) {
    orderList[index].fullyCheck = true;
    fullCheckDisplay[index].classList.add("true");
    fullCheckDisplay[index].classList.remove("false");
    fullCheckDisplay[index].innerHTML = "Fully Checked";

    button.classList.add("true");
    button.innerHTML = "✓";
  } else {
    fullCheckDisplay[index].classList.remove("true");
    fullCheckDisplay[index].classList.add("false");
    fullCheckDisplay[index].innerHTML = "Haven't Checked";

    orderList[index].fullyCheck = false;
    button.classList.remove("true");
    button.innerHTML = `<i class="fa-solid fa-caret-left fa-xl"></i>`;
  }
  sItem(orderKey, orderList);
  // orderItemCheck();
}

function baseRenderOrder(i) {
  return (
    `<div class="row mb-32 table__row shadow-wrap js-mid no-gutters">
    <div class="col l-1 order number">
      ` +
    (i + 1) +
    `
    </div>
    <div class="col l-6 l-o-1 information">
      <div class="row   spc-btw">` +
    `<div class="col ">User Name:  ` +
    orderList[i].name +
    `</div>
<div class="col ">Order ID:  ` +
    orderList[i].orderID +
    `</div>
    </div>
      <div class="row   mt-16 spc-btw">
      <div class="col ">Time : ` +
    (orderList[i].time || Date.now()) +
    `</div>
<div class="col ">Total: ` +
    orderList[i].total +
    `$</div>
    </div>
    </div>
	<div class="col l-2 l-o-1 ">
    <span class="check ` +
    (orderList[i].fullyCheck || false) +
    `"> ` +
    bigCheck(orderList[i].fullyCheck || false) +
    ` </span>
    </div>
    <div class="col l-1 order-detail__btn">
      <button class="order-full ` +
    orderList[i].fullyCheck +
    ` btn"><i class="fa-solid fa-caret-left fa-xl"></i></button>
    </div>
    </div>
  <div class="details-view no-gutters">
    
  </div>`
  );
}
const orderList = gItem("orderList");
function renderOrderDetails() {
  const orderView = document.querySelectorAll(".details-view");
  const viewButton = document.querySelectorAll(".order-full");
  const OrderNumber = document.querySelectorAll(".order.number");
  viewButton.forEach((item, indexButton) => {
    if (item.classList.contains("true")) {
      item.innerHTML = "✓";
    } else {
      item.innerHTML = `<i class="fa-solid fa-caret-left fa-xl"></i>`;
    }
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
                <img class="product__img" src="./assets/image/` +
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
          fullCheck(orderList[indexButton], indexButton, item);
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
  const searchValue = searchInput.value.toLowerCase().trim();
  tableBodyOrder.innerHTML = "";
  let checker = document.querySelector(".checker.checked");

  orderList.forEach((item, i) => {
    if (checker != null) {
      let checkerValue = checker.className.split(" ")[1];
      if (
        item.name.includes(searchValue) ||
        item.userID.includes(searchValue) ||
        item.orderID.includes(searchValue)
      ) {
        if (item.fullyCheck.toString() == checkerValue) {
          tableBodyOrder.innerHTML += baseRenderOrder(i);
        }
        renderOrderDetails();
      }
    } else {
      if (
        item.name.includes(searchValue) ||
        item.userID.includes(searchValue) ||
        item.orderID.includes(searchValue)
      ) {
        tableBodyOrder.innerHTML += baseRenderOrder(i);
      }
      renderOrderDetails();
    }
  });
}

searchInput.addEventListener("keypress", searchOrderList);
searchInput.addEventListener("input", searchOrderList);
searchInput.addEventListener("paste", searchOrderList);
searchInput.addEventListener("change", searchOrderList);
