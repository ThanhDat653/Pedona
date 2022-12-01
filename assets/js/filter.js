import { gItem, sItem } from "./storage.js";
import { addToCart, description, paginationRender } from "./app.js";

const categoryColor = document.querySelector(".product-category__group-color");
const categoryType = document.querySelector(".product-category__group-type");
let colorList = [];

const productList = gItem("productList");
const productGridList = document.querySelector(".list-product__grid");
const productListList = document.querySelector(".list-product__list");
const searchButton = document.querySelector(".header--search__btn");
const searchInput = document.querySelector(".header--search__input");

//

//

//

//

export function basicItemRenderList(product, index) {
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
//

//

export function basicItemRenderGrid(product, index) {
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

//

//
// let colorList = [];
productList.forEach(function (item) {
  if (colorList.map((x) => x.color).indexOf(item.color) == -1) {
    var object = { color: item.color, amount: 1 };

    colorList.push(object);
  } else {
    colorList[colorList.map((x) => x.color).indexOf(item.color)].amount++;
  }
});
//
let typeList = [];
function getType(item) {
  if (item == "jd3") {
    return "Jordan 3";
  }
  if (item == "jd1") {
    return "Jordan 1";
  }
  if (item == "AirMax") {
    return "Air Max";
  }
  return item;
}
//

//

productList.forEach(function (item) {
  if (typeList.map((x) => x.type).indexOf(item.type) == -1) {
    var object = { type: item.type, amount: 1 };

    typeList.push(object);
  } else {
    typeList[typeList.map((x) => x.type).indexOf(item.type)].amount++;
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
  categoryColor.innerHTML += "";
  colorList.forEach(function (item) {
    categoryColor.innerHTML += ` <li class="category-item color ${
      item.color
    } filter">
        <div class="category-item__link">
            <span class="category-item__lable"> ${upperCaseFirstLetter(
              item.color
            )} 
            </span>
            <span class="item-amount">(${item.amount})</span>
        </div>
    </li>`;
  });
  categoryType.innerHTML += "";

  typeList.forEach(function (item) {
    categoryType.innerHTML += ` <li class="category-item type ${
      item.type
    } filter">
        <div class="category-item__link">
            <span class="category-item__lable"> ${upperCaseFirstLetter(
              getType(item.type)
            )} 
            </span>
            <span class="item-amount">(${item.amount})</span>
        </div>
    </li>`;
  });
  //

  //

  let productCartegoryElement = document.querySelector(".product-category");
  let temp = `<div class="category-item filter-by-price">
    <span class="category-item__lable">Filter By Price</span>
    <input type="range" name="filter-price" class="filter-price__input" id="" min="100"
      value="1001"  max="1001">
      <div class="bubble">  <div>
  </div>`;

  productCartegoryElement.insertAdjacentHTML("beforeend", temp);

  //

  //
  const categoryList = document.querySelectorAll(".category-item.filter");

  const filterPrice = document.querySelector(".filter-price__input");
  const view = document.querySelector(".bubble");
  const maxPrice = filterPrice.max;
  const maxView = filterPrice.scrollWidth;
  const minPrice = filterPrice.min;
  //

  //
  function searchProduct() {
    const productList = gItem("productList");
    let searchValue = searchInput.value.toLowerCase().trim();
    const colorFil = document.querySelector(".color.checked ");
    const typeCheck = document.querySelector(".type.checked");
    productGridList.innerHTML = "";
    productListList.innerHTML = "";
    if (colorFil != null && typeCheck != null) {
      paginationRender(
        productList.filter(function (item, index) {
          if (
            item.name.includes(searchValue) &&
            item.price <= filterPrice.value - 1 &&
            item.color == colorFil.className.split(" ")[2] &&
            item.type == typeCheck.className.split(" ")[2]
          ) {
            return item;
          }
        })
      );
    } else {
      if (colorFil != null) {
        paginationRender(
          productList.filter(function (item) {
            if (
              item.name.toLowerCase().includes(searchValue) &&
              colorFil.className.split(" ")[2] == item.color &&
              item.price <= filterPrice.value - 1
            ) {
              return item;
            }
          })
        );
      } else {
        if (typeCheck != null) {
          paginationRender(
            productList.filter(function (item) {
              if (
                item.name.toLowerCase().includes(searchValue) &&
                item.type == typeCheck.className.split(" ")[2] &&
                item.price <= filterPrice.value - 1
              ) {
                return item;
              }
            })
          );
        } else {
          paginationRender(
            productList.filter(function (item, index) {
              if (
                item.name.toLowerCase().includes(searchValue) &&
                item.price <= filterPrice.value - 1
              ) {
                return item;
              }
            })
          );
        }
      }
    }
    searchInput.value = "";
    window.scrollTo({
      top: 750,
      behavior: `smooth`,
    });
  }
  //

  //

  categoryList.forEach(function (item) {
    item.onclick = function () {
      if (!item.classList.contains("checked")) {
        if (item.classList.contains("color")) {
          let j = 0;
          while (j < colorList.length) {
            categoryList[j].classList.remove("checked");
            j++;
          }
        } else {
          let j = colorList.length - 1;
          while (j < typeList.length + colorList.length) {
            categoryList[j].classList.remove("checked");
            j++;
          }
        }
        item.classList.add("checked");

        filterHandler();
      } else {
        item.classList.remove("checked");
        filterHandler();
      }
    };
  });

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
    view.innerHTML = Math.max(filterPrice.value - 1, minPrice);
  }
  //

  //
  callBubble();
  //

  //

  //

  //

  filterPrice.oninput = function () {
    callBubble();
    filterHandler();
  };
  searchButton.addEventListener("click", searchProduct);
  searchInput.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      event.preventDefault();
      searchProduct();
    }
  });
}
//

//

categoryRender();

/// Mobile
const mobileFilterColor = document.querySelectorAll(".filter__option.color");

mobileFilterColor.forEach(function (color) {
  color.onclick = function () {
    if (color.classList.contains("checked")) {
      color.classList.remove("checked");
    } else {
      let j = 0;
      for (let i = 0; i < mobileFilter.length; i++) {
        mobileFilter[i].classList.remove("checked");
      }
      while (j < mobileFilterColor.length) {
        mobileFilterColor[j].classList.remove("checked");
        j++;
      }
      color.classList.add("checked");
      paginationRender(
        productList.filter(function (product, i) {
          let colorValue = color.className.split(" ")[1];
          if (product.color == colorValue) {
            return product;
          } else {
            if (colorValue == "others") {
              if (
                (product.color == "white") == false &&
                (product.color == "black") == false
              ) {
                return product;
              }
            }
          }
        })
      );
    }
  };
});
//

//

const mobileFilterType = document.querySelectorAll(".filter__option.type");
mobileFilterType.forEach(function (type) {
  type.onclick = function () {
    if (type.classList.contains("checked")) {
      type.classList.remove("checked");
    } else {
      let j = 0;
      for (let i = 0; i < mobileFilter.length; i++) {
        mobileFilter[i].classList.remove("checked");
      }
      while (j < mobileFilterType.length) {
        mobileFilterType[j].classList.remove("checked");
        j++;
      }
      type.classList.add("checked");
      paginationRender(
        productList.filter(function (product, i) {
          let typeValue = type.className.split(" ")[1];
          if (product.type == typeValue) {
            return product;
          }
        })
      );
    }
  };
});

const mobileFilterPrice = document.querySelectorAll(".filter__option.price");
const mobileFilter = document.querySelectorAll(".filter__option");
mobileFilterPrice.forEach(function (price) {
  price.onclick = function () {
    if (price.classList.contains("checked")) {
      price.classList.remove("checked");
    } else {
      for (let i = 0; i < mobileFilter.length; i++) {
        mobileFilter[i].classList.remove("checked");
      }
      let j = 0;
      while (j < mobileFilterPrice.length) {
        mobileFilterPrice[j].classList.remove("checked");
        j++;
      }
      price.classList.add("checked");
      let priceValue = price.innerHTML.split(/[- $ &gt;]+/);
      productGridList.innerHTML = "";
      productList.forEach(function (product, i) {
        if (priceValue[2] != null) {
          if (
            product.price >= parseInt(priceValue[1]) &&
            product.price <= parseInt(priceValue[2])
          ) {
            productGridList.innerHTML += basicItemRenderGrid(product, i);
          }
        } else {
          if (product.price >= parseInt(priceValue[1])) {
            productGridList.innerHTML += basicItemRenderGrid(product, i);
          }
        }
      });
      addToCart();
      description();
    }
  };
});

export function sortByPrice(arr) {
  const sortBy = document.querySelector(".sort-box__option").value;
  if (sortBy == "1") {
    return arr.sort(function (a, b) {
      return a.price - b.price;
    });
  } else {
    return arr.sort(function (a, b) {
      return b.price - a.price;
    });
  }
}

const sortBox = document.querySelector(".sort-box__option");
sortBox.onchange = function () {
  filterHandler();
};

function filterColorTypePrice(colorFil, typeCheck, filterPrice) {
  const productList = gItem("productList");

  productGridList.innerHTML = "";
  productListList.innerHTML = "";
  if (colorFil != null && typeCheck != null) {
    return sortByPrice(
      productList.filter(function (item) {
        if (
          item.price <= filterPrice.value - 1 &&
          item.color == colorFil.className.split(" ")[2] &&
          item.type == typeCheck.className.split(" ")[2]
        ) {
          return item;
        }
      })
    );
  } else {
    if (colorFil != null) {
      return sortByPrice(
        productList.filter(function (item) {
          if (
            colorFil.className.split(" ")[2] == item.color &&
            item.price <= filterPrice.value - 1
          ) {
            return item;
          }
        })
      );
    } else {
      if (typeCheck != null) {
        return sortByPrice(
          productList.filter(function (item) {
            if (
              item.type == typeCheck.className.split(" ")[2] &&
              item.price <= filterPrice.value - 1
            ) {
              return item;
            }
          })
        );
      } else {
        return sortByPrice(
          productList.filter(function (item) {
            if (item.price <= filterPrice.value - 1) {
              return item;
            }
          })
        );
      }
    }
  }
}
export function filterHandler() {
  const colorFil = document.querySelector(".color.checked ");
  const filterPrice = document.querySelector(".filter-price__input");
  const typeCheck = document.querySelector(".type.checked");
  paginationRender(filterColorTypePrice(colorFil, typeCheck, filterPrice));
}
