// import { outputCarts } from "./content/carts.js";
import { outputProd } from "./product.js";
import { outputUsers } from "./users.js";
import {
  sItem,
  gItem,
  products as defaultProducts,
  users as defaultUsers,
  carts as defaultCarts,
} from "./storage.js";
const userKey = "userList";
const prodKey = "productList";
const cartKey = "cartList";
export { userKey, prodKey, cartKey };

const tableBodyProduct = document.getElementById("table__body--products");
export { tableBodyProduct };
const tableBodyUser = document.getElementById("table__body--users");
export { tableBodyUser };
const tableBodyCart = document.getElementById("table__body--carts");
export { tableBodyCart };

outputProd();
outputUsers();
// outputCarts();

//        Sidebar Size Change :Start
const productPage = document.getElementById("products-page");
let pastProduct = productPage.offsetTop;
const userPage = document.getElementById("users-page");
let pastUser = userPage.offsetTop;
const cartPage = document.getElementById("carts-page");
let pastCart = cartPage.offsetTop;

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
const tableHeader = document.getElementById("");

let list = document.querySelectorAll(".side-bar__item");

function test() {
  if (window.scrollY);
}
for (let i = 0; i < list.length; i++) {
  list[i].onclick = function () {
    let j = 0;
    while (j < list.length) {
      list[j++].classList.remove("side-bar__item--active");
    }
    list[i].classList.add("side-bar__item--active");
  };
}

export function createEditable(item, index) {
  let area = document.createElement("textarea");
  area.className = item.className + " textarea " + item.innerHTML;
  area.value = item.innerHTML;
  item.replaceWith(area);
}

export function deleteObject(index, array, key) {
  array.splice(index, 1);
  sItem(key, array);
}

export function createArr(node) {
  return Array.from(node);
}

// function search() {
//   const searchInput = document.querySelector(".header_searchbar-input");
//   const searchBtn = document.querySelector(".search_btn");

//   function test(){
//       let searchValue = searchInput.value;
//       let searchResultProducts = products.filter(function(item) {
//           return item.name.includes(searchValue);
//       })
//       start = 0;
//       end = itemPerPage;
//       totalPages = Math.ceil(searchResultProducts.length / itemPerPage);
//       renderPagesList(totalPages);
//       renderProduct(searchResultProducts, start, end);
//       changePage(searchResultProducts);
//       filterByPrice(searchResultProducts, ".price_items");
//       filterByPrice(searchResultProducts, ".filter_item-priceOption");
//       productDetailNaviagte()
//   }

//   searchBtn.onclick = function() {
//       test();
//   }
//   searchInput.onkeydown = function(event) {
//       if(event.key=='Enter'){
//           test();
//       }
//   }
window.scrollY;
console.log("🚀 ~ file: main.js ~ line 129 ~ window.scrollY", window.scrollY);

const body = document.querySelector("body");
body.onscroll = function () {
  if (window.scrollY <= pastUser) {
    let j = 0;
    while (j < list.length) {
      list[j++].classList.remove("side-bar__item--active");
    }
    list[1].classList.add("side-bar__item--active");
  } else if (window.scrollY >= pastUser && window.scrollY <= pastCart) {
    let j = 0;
    while (j < list.length) {
      list[j++].classList.remove("side-bar__item--active");
    }
    list[2].classList.add("side-bar__item--active");
  } else if (window.scrollY >= pastCart) {
    let j = 0;
    while (j < list.length) {
      list[j++].classList.remove("side-bar__item--active");
    }
    list[3].classList.add("side-bar__item--active");
  }
};
