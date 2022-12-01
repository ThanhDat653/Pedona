import { gItem } from "./storage.js";

const dashboard_PopularProduct = document.querySelector(
  "#best-seller .render-box"
);
const orderList = gItem("orderList");

let topProduct = [];
if (orderList.length != 0) {
  renderTopProduct();
  showMoney();
  getPreviousPrice();
}
export function getTopProduct() {
  const orderList = gItem("orderList");
  topProduct = [];
  orderList.forEach(function (order) {
    if (order.fullyCheck == true) {
      order.productList.forEach(function (list) {
        if (list.check) {
          let product = list.product;
          let index = topProduct
            .map((x) => {
              return x.product.id;
            })
            .indexOf(product.id);
          if (index == -1) {
            var obj = {
              product: product,
              amount: Math.max(1, list.amount),
              time: order.time,
            };
            topProduct.push(obj);
          } else {
            topProduct[index].amount += list.amount;
          }
        }
      });
    }
  });
}

function basicPercentageProduct(product, item) {
  return `<div class="product-container">
  <div class="product-img">
    <img src="/assets/image/${product.img}" alt="">
    <p class="product-name">${product.name}</p>
  </div>
  <div class="precent-in-order">
    <div class="percentage ${item.amount}"></div>
  </div>

     <div class="product-amount">${item.amount}</div>
     <span> was bought</span>

</div>`;
}

function sortByAmount(arr) {
  arr.sort(function (a, b) {
    return b.amount - a.amount;
  });
  return arr;
}

export function renderTopProduct() {
  getTopProduct();
  dashboard_PopularProduct.innerHTML = "";
  sortByAmount(topProduct);
  topProduct.forEach(function (item) {
    dashboard_PopularProduct.innerHTML += basicPercentageProduct(
      item.product,
      item
    );
  });
  setPercentage();
}
function getTotalAmount() {
  let total = 0;
  topProduct.forEach(function (item) {
    total += item.amount;
  });
  return total;
}
function setPercentage() {
  let max = getTotalAmount();
  let productPercent = document.querySelectorAll(".percentage");
  productPercent.forEach(function (item) {
    let amount = item.className.split(" ")[1];
    let percent = (amount * 100) / max;
    item.style.width = percent + "%";
  });
}

function getTotalPrice() {
  let price = 0;

  topProduct.forEach(function (item) {
    price += item.product.price * item.amount;
  });
  return price;
}

export function showMoney() {
  const moneyRender = document.querySelector(".information-money");
  moneyRender.innerHTML = "";
  moneyRender.innerHTML = `   <p class="total-money"></p>
  <p class="total-amount"></p>`;
  const totalShowMoney = document.querySelector(".total-money");
  const totalShowAmount = document.querySelector(".total-amount");

  totalShowMoney.innerHTML = getTotalPrice() + "$";
  totalShowAmount.innerHTML = getTotalAmount() + " Products were sold";
}

export function getPreviousPrice() {
  const oldPrice = document.querySelector(".chart-item__old");
  const newPrice = document.querySelector(".chart-item__new");
  const percentShow = document.querySelector(".percent-amount");
  let today = new Date();
  let date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  let previousPrice = 0;
  let presentPrice = 0;
  topProduct.forEach(function (item) {
    if (item.time != date) {
      previousPrice += item.product.price * item.amount;
    } else {
      presentPrice += item.product.price * item.amount;
    }
  });
  let percent = Math.ceil(
    ((presentPrice - previousPrice) / previousPrice) * 100
  );
  if (percent > 0) {
    percentShow.classList.add("up");
    percentShow.classList.remove("down");
  } else {
    percentShow.classList.add("down");
    percentShow.classList.remove("up");
  }
  percentShow.innerHTML = percent + " %";
  oldPrice.innerHTML = "$ " + previousPrice;
  newPrice.innerHTML = "$ " + presentPrice;
}
