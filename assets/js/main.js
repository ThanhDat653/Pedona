// import { outputCarts } from "./content/carts.js";
import { outputProd } from "./product.js";
import { outputUsers } from "./users.js";
import { sItem, gItem } from "./storage.js";
const userKey = "userList";
const prodKey = "productList";
const orderKey = "orderList";
export { userKey, prodKey, orderKey };

const tableBodyProduct = document.getElementById("table__body--products");
export { tableBodyProduct };
const tableBodyUser = document.getElementById("table__body--users");
export { tableBodyUser };
const tableBodyOrder = document.getElementById("table__body--orders");
export { tableBodyOrder };

outputProd();
outputUsers();
// outputOrders();

//        Sidebar Size Change :Start
const productPage = document.getElementById("products-page");
let pastProduct = productPage.offsetTop;
const userPage = document.getElementById("users-page");
let pastUser = userPage.offsetTop;
const orderPage = document.getElementById("orders-page");
let pastOrder = orderPage.offsetTop;

let toggleSideBarButton = document.getElementById("toggle-sidebar");
let closeSideBarButton = document.getElementById("close-sidebar");
let sideBar = document.getElementById("sidebar");
let content = document.getElementById("content");

toggleSideBarButton.onclick = () => {
  sideBar.className = "side-bar side-bar--toggle";
  content.classList.add("content--toggle");
  toggleSideBarButton.className = "close";
  closeSideBarButton.className = "open";
};

closeSideBarButton.onclick = () => {
  sideBar.className = "side-bar";
  content.classList.remove("content--toggle");
  toggleSideBarButton.className = "open";
  closeSideBarButton.className = "close";
};

function hoverIn() {
  content.classList.add("content--toggle");
}
function hoverOut() {
  if (closeSideBarButton.className !== "open") {
    content.classList.toggle("content--toggle");
  }
}

sideBar.addEventListener("mouseover", hoverIn);
sideBar.addEventListener("mouseout", hoverOut);

//         Sidebar Size Change :End

let list = document.querySelectorAll(".side-bar__item");

for (let i = 0; i < list.length; i++) {
  list[i].onclick = function () {
    let j = 0;
    while (j < list.length) {
      list[j++].classList.remove("side-bar__item--active");
    }
    list[i].classList.add("side-bar__item--active");
  };
}
function textAreaStyle(item) {
  if (item.classList.contains("id")) {
    return "Please input product id";
  }
  if (item.classList.contains("name")) {
    if (item.classList.contains("product")) {
      return "Please input product name";
    }
    if (item.classList.contains("user")) {
      return "Please input user name";
    }
  }
  if (item.classList.contains("desc")) {
    return "Please input product desciption";
  }
  if (item.classList.contains("password")) {
    return "Please input user password";
  }
  if (item.classList.contains("username")) {
    return "Please input user username";
  }
}
export function createEditable(item) {
  let area = document.createElement("div");
  area.className = item.className;
  area.innerHTML =
    `<textarea class="textarea 
  ">` +
    item.innerHTML.trim() +
    `</textarea>` +
    `<span class="col l-12 invalid-input ">` +
    textAreaStyle(item) +
    `</span>
  `;

  item.replaceWith(area);
}

export function deleteObject(index, array, key) {
  array.splice(index, 1);
  sItem(key, array);
}

export function createArr(node) {
  return Array.from(node);
}

const body = document.querySelector("body");
body.onscroll = function () {
  if (window.scrollY <= pastUser) {
    let j = 0;
    while (j < list.length) {
      list[j++].classList.remove("side-bar__item--active");
    }
    list[1].classList.add("side-bar__item--active");
  } else if (window.scrollY >= pastUser && window.scrollY <= pastOrder) {
    let j = 0;
    while (j < list.length) {
      list[j++].classList.remove("side-bar__item--active");
    }
    list[2].classList.add("side-bar__item--active");
  } else if (window.scrollY >= pastOrder) {
    let j = 0;
    while (j < list.length) {
      list[j++].classList.remove("side-bar__item--active");
    }
    list[3].classList.add("side-bar__item--active");
  }
};

const searchBar = document.querySelectorAll(".search-bar");
const searchInput = createArr(document.querySelectorAll(".search-input"));
for (let i = 0; i < searchInput.length; i++) {
  searchInput[i].onfocus = function () {
    console.log(1);
    searchBar[i].style.borderColor = "#cc2424";
  };
  searchInput[i].onblur = function () {
    // searchBar[i].style.border = "solid 3px var(--text-color)";
    searchBar[i].style.border = "";
  };
}
