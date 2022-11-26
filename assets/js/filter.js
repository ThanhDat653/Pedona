import { gItem } from "./storage.js";
import { addToCart, description } from "./app.js";

const category_Color = document.querySelector(".product-category");
let colorList = [];

const productList = gItem("productList");
const productGridList = document.querySelector(".list-product__grid");
const productListList = document.querySelector(".list-product__list");
const searchButton = document.querySelector(".header--search__btn");
const searchInput = document.querySelector(".header--search__input");
function searchProduct() {
  let searchValue = searchInput.value;
  productGridList.innerHTML = "";
  productListList.innerHTML = "";
  productList.forEach(function (item, index) {
    if (item.name.includes(searchValue)) {
      productGridList.innerHTML += basicItemRenderGrid(item, index);
      productListList.innerHTML += basicItemRenderList(item, index);

      addToCart();
      description();
    }
  });
  searchInput.value = "";
}
searchButton.addEventListener("click", searchProduct);
searchInput.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    console.log(1);
    searchProduct();
  }
});
//
function basicItemRenderList(product, index) {
  return `<div class="l-12 product">
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
}
function basicItemRenderGrid(product, index) {
  return `<div class="l-4 m-6 c-12 product">
  <div class="product__link">
      <div class="product-item product__img">
          <img src="./assets/image/${product.img}"></img>
      </div>

      <div class="product__description-layer">
          <div class="product__description">
              <div class="product__description--close">
                  <i class="fa-solid fa-xmark"></i>
              </div>

              <div class="product-item">
                  <div class="product-item__img">
                      <div class="dscr--product__img">
                          <img src="./assets/image/${product.img}" alt="">
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
}

//
productList.forEach(function (item) {
  if (colorList.map((x) => x.color).indexOf(item.color) == -1) {
    var object = { color: item.color, amount: 1 };

    colorList.push(object);
  } else {
    colorList[colorList.map((x) => x.color).indexOf(item.color)].amount++;
  }
});
//

//
function upperCaseFirstLetter(item) {
  return item.charAt(0).toUpperCase() + item.slice(1);
}

//

//

function categoryRender() {
  category_Color.innerHTML += "";
  colorList.forEach(function (item) {
    category_Color.innerHTML += ` <li class="category-item color ${item.color}">
        <div class="category-item__link">
            <span class="category-item__lable"> ${upperCaseFirstLetter(
              item.color
            )} 
            </span>
            <span class="item-amount">(${item.amount})</span>
        </div>
    </li>`;
  });
  //

  //

  category_Color.innerHTML += `<li class="category-item filter-by-price">
    <span class="category-item__lable">Filter By Price</span>
    <input type="range" name="filter-price" class="filter-price__input" id="" min="100"
      value="1000"  max="1000">
      <div class="bubble"> <div>
</li>`;
  //

  //

  const filterPrice = document.querySelector(".filter-price__input");
  const view = document.querySelector(".bubble");
  console.log("🚀 ~ file: filter.js ~ line 42 ~ categoryRender ~ view", view);
  const maxPrice = filterPrice.max;
  const maxView = filterPrice.scrollWidth;
  const minPrice = filterPrice.min;
  //
  const colorButton = document.querySelectorAll(".color");
  colorButton.forEach(function (colorFil) {
    colorFil.classList.remove("checked");
    colorFil.onclick = function () {
      if (!colorFil.classList.contains("checked")) {
        let j = 0;
        while (j < colorButton.length) {
          colorButton[j].classList.remove("checked");
          j++;
          productGridList.innerHTML = "";
          productListList.innerHTML = "";
          productList.forEach(function (item, index) {
            if (
              colorFil.className.split(" ")[2] == item.color &&
              item.price <= filterPrice.value
            ) {
              productGridList.innerHTML += basicItemRenderGrid(item, index);
              productListList.innerHTML += basicItemRenderList(item, index);

              addToCart();
              description();
            }
          });
        }
        colorFil.classList.add("checked");
      } else {
        colorFil.classList.remove("checked");
        productGridList.innerHTML = "";
        productListList.innerHTML = "";
        productList.forEach(function (item, index) {
          productGridList.innerHTML += basicItemRenderGrid(item, index);
          productListList.innerHTML += basicItemRenderList(item, index);

          addToCart();
          description();
        });
      }
    };
  });

  //

  function callBubble() {
    view.style.left =
      (filterPrice.value * maxView) / (maxPrice - minPrice) -
      minPrice / 10 +
      "px";
    view.style.right =
      maxView -
      (filterPrice.value * maxView) / (maxPrice - minPrice) -
      (minPrice / 10 + 32) +
      "px";
    view.innerHTML = filterPrice.value;
  }
  callBubble();
  //

  //

  function filterInRangePrice() {
    const colorFil = document.querySelector(".color.checked ");
    productGridList.innerHTML = "";
    productListList.innerHTML = "";
    if (colorFil != null) {
      productList.forEach(function (item, index) {
        if (
          item.price <= filterPrice.value &&
          item.color == colorFil.className.split(" ")[2]
        ) {
          console.log(colorFil.innerHTML);
          productGridList.innerHTML += basicItemRenderGrid(item, index);
          productListList.innerHTML += basicItemRenderList(item, index);
        }
        addToCart();
        description();
      });
    } else {
      productList.forEach(function (item, index) {
        if (item.price <= filterPrice.value) {
          productGridList.innerHTML += basicItemRenderGrid(item, index);
          productListList.innerHTML += basicItemRenderList(item, index);
        }
        addToCart();
        description();
      });
    }
  }
  //

  filterPrice.oninput = function () {
    callBubble();
    filterInRangePrice();
  };
}
categoryRender();
