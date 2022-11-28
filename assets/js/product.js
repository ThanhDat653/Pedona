import { tableBodyProduct } from "./main.js";
import { sItem, gItem } from "./storage.js";
import { deleteObject, createEditable, createArr, prodKey } from "./main.js";
import { checkImg, setColor } from "./modal.js";

// Extract product list:Start
let productList = gItem("productList");
//

//

function createEditablePrice(item) {
  let area = document.createElement("div");
  area.className = item.className;
  area.innerHTML =
    `<textarea class="textarea price" inputmode="numeric" rows="2" cols="2">` +
    item.innerHTML.split("$")[0].trim() +
    `</textarea>` +
    `<span class="col l-12 invalid-input ">Please input product price</span>
`;

  item.replaceWith(area);
}
//

//

function basicProductRender(item, i) {
  return (
    ' <div class="row js-mid table__row no-gutters spc-even--mobile ">' +
    '<div class="col l-1 m-1 c-12 prod number ">' +
    (i + 1) +
    "</div>" +
    '<div class="col l-2 m-2 c-10 c-o-2  color--id id">' +
    item.id +
    "</div>" +
    '<div class="col l-2 m-3 c-12 product name ">' +
    item.name +
    "</div>" +
    '<div class="col l-1 m-3 img">' +
    '<img class="product__img" src="./assets/image/' +
    item.img +
    '" alt="">' +
    "</div>" +
    '<div class="col l-1 m-1 c-10 c-o-2 color--price price">' +
    item.price +
    "$" +
    "</div>" +
    '<div class="col l-3 m-0 c-0 desc">' +
    item.desc +
    "</div>" +
    '<div class="col l-2 m-1 m-o-2 c-12">' +
    '<button class="product table__fix-btn"><i class="fa-solid fa-pencil"></i></button>' +
    '<button class="product table__del-btn"><i class="fa-solid fa-trash-can"></i></button>' +
    '<button class="product table__fix-submit close">Submit  ✓</button>' +
    '<button class="product table__fix-cancel close">X</button>' +
    "</div>" +
    "</div>"
  );
}
//

//

function createEditableImg(img, index) {
  let area = document.createElement("label");
  area.className = img.className;
  area.id = "img-area";
  area.innerHTML =
    '<input type="file" name="" id="productImg" accept="image/png, image/jpeg" visiblity="hidden"> <img src="./assets/image/" alt="" id="img" class="product__img">';
  area.htmlFor = "productImg";
  img.replaceWith(area);
  const preview = document.getElementById("img");
  const input = document.getElementById("productImg");
  preview.style.display = "block";
  //

  //

  preview.src = "./assets/image/" + productList[index].img;
  localStorage.setItem("imgconfig", JSON.stringify(productList[index].img));
  //

  //

  area.addEventListener("change", () => {
    let productList = gItem(prodKey);
    let path = input.value;
    let temparr = path.split("\\");
    let filename = temparr.slice(-1)[0];
    if (checkImg(filename)) {
      //Check for valid filetype

      let src = "./assets/image/" + filename; // URL object create upon Media-Src
      //

      //

      preview.src = src;
      preview.style.display = "block";
      preview.style.border = "3px solid #cc2424";
      //

      //
      productList[index].img = filename;
      localStorage.setItem("imgconfig", JSON.stringify(filename));
      console.log(productList[index].img);
    } else {
      //

      //
      alert("Only images are supported");
      imgReset();
    }
  });
}
//

//

const searchInput = document.querySelector(".product.search-input");
//

//
function editRow(index) {
  const rowList = document.querySelectorAll("#table__body--products .row");
  rowList[index].style.border = "3px solid #cc2424";
  rowList[index].classList.add("shadow-wrap");
}
//
function productFeatures() {
  let prodNumber = createArr(document.querySelectorAll(".prod.number"));

  let check = false;
  const fixSubmitButton = createArr(
    document.querySelectorAll(".product.table__fix-submit")
  );
  let fixCancelButton = createArr(
    document.querySelectorAll(".product.table__fix-cancel")
  );
  fixCancelButton.forEach(function (item) {
    item.onclick = function () {
      if (confirm("Do you want to cancel?")) {
        location.reload();
      }
    };
  });
  let delButton = createArr(
    document.querySelectorAll(".product.table__del-btn")
  );
  delButton.forEach((item, index) => {
    item.onclick = () => {
      if (
        confirm(
          "Do you want to delete product No." +
            parseInt(prodNumber[index].innerHTML) +
            " in the Store?"
        )
      ) {
        deleteObject(
          parseInt(prodNumber[index].innerHTML) - 1,
          productList,
          prodKey
        );
        location.reload();
      }
    };
  });

  let fixButton = createArr(
    document.querySelectorAll(".product.table__fix-btn")
  );

  fixButton.forEach((item, index) => {
    item.onclick = () => {
      if (check) {
        alert("Only change one item per time");
      } else {
        toggleButton(index);
        createEditable(editableId[index]);
        createEditable(editableName[index]);
        createEditable(editableDesc[index]);
        createEditablePrice(editablePrice[index]);
        createEditableImg(
          editableImg[index],
          parseInt(prodNumber[index].innerHTML) - 1
        );

        check = true;
        let changedArea = createArr(document.querySelectorAll(".textarea"));

        const errorShow = createArr(
          document.querySelectorAll("textarea.textarea + span")
        );
        function validCheck() {
          for (let i = 0; i < errorShow.length; i++) {
            if (errorShow[i].classList.contains("invalid")) {
              return false;
            }
          }
          return true;
        }
        editRow(index);
        fixSubmitButton.forEach((item) => {
          changedArea.forEach(function (itemCheck, index) {
            itemCheck.onblur = function () {
              const itemValue = itemCheck.value.trim();
              if (itemValue == null || itemValue == "") {
                errorShow[index].classList.add("invalid");
              } else {
                errorShow[index].classList.remove("invalid");
              }
            };
          });
          item.onclick = () => {
            if (!check) {
              toggleButton(index);
            }
            if (
              confirm(
                "Do you want to change product No." +
                  parseInt(prodNumber[index].innerHTML) +
                  " in the Store ?"
              )
            ) {
              if (validCheck()) {
                setColor();
                productList[parseInt(prodNumber[index].innerHTML) - 1].id =
                  changedArea[0].value.trim();
                productList[parseInt(prodNumber[index].innerHTML) - 1].name =
                  changedArea[1].value.trim();
                productList[parseInt(prodNumber[index].innerHTML) - 1].price =
                  changedArea[2].value.trim();
                productList[parseInt(prodNumber[index].innerHTML) - 1].desc =
                  changedArea[3].value.trim();
                productList[parseInt(prodNumber[index].innerHTML) - 1].img =
                  gItem("imgconfig");
                localStorage.setItem(prodKey, JSON.stringify(productList));
                location.reload();
              } else {
                alert("Please input all product values");
              }
            }
          };
        });
      }
    };
  });

  function toggleButton(index) {
    fixButton[index].classList.toggle("close");
    delButton[index].classList.toggle("close");
    fixSubmitButton[index].classList.toggle("close");
    fixCancelButton[index].classList.toggle("close");
  }
  const editableImg = createArr(document.querySelectorAll(".img"));
  const editableId = createArr(document.querySelectorAll(".id"));
  const editableName = createArr(document.querySelectorAll(".product.name"));
  const editableDesc = createArr(document.querySelectorAll(".desc"));
  const editablePrice = createArr(document.querySelectorAll(".price"));
}
//
function searchProductList() {
  const searchValue = searchInput.value.toLowerCase().trim();
  tableBodyProduct.innerHTML = "";
  productList = gItem(prodKey);

  let filteredArr = productList.filter((item, i) => {
    if (
      item.name.toLowerCase().includes(searchValue) ||
      item.id.toString().toLowerCase().includes(searchValue)
    ) {
      return item;
    }
  });
  newOutPut(filteredArr);
}
//

//

searchInput.addEventListener("keypress", searchProductList);
searchInput.addEventListener("input", searchProductList);
searchInput.addEventListener("paste", searchProductList);
searchInput.addEventListener("change", searchProductList);

export function newOutPut(productList) {
  const nextPage = document.querySelector(".nextPage");
  const prevPage = document.querySelector(".prevPage");
  const productPerPage = 5;
  const numberOfProducts = productList.length;
  let curPage = 1;
  changePage(1);
  const onPage = document.querySelector(".currPage");
  let numberOfPages = Math.ceil(numberOfProducts / productPerPage);
  if (numberOfPages == 0) {
    curPage = 0;
  }
  if (curPage == numberOfPages) {
    prevPage.classList.add("fade");
    nextPage.classList.add("fade");
  } else {
    prevPage.classList.add("fade");
    nextPage.classList.remove("fade");
  }
  nextPage.onclick = function () {
    if (curPage < numberOfPages) {
      curPage++;
      prevPage.classList.remove("fade");

      changePage(curPage);

      showPage();
      if (curPage == numberOfPages) {
        this.classList.add("fade");
      }
    }
  };

  prevPage.onclick = function () {
    if (1 < curPage) {
      curPage--;
      nextPage.classList.remove("fade");
      changePage(curPage);
      showPage();
      if (curPage == 1) {
        this.classList.add("fade");
      }
    }
  };
  function showPage() {
    onPage.innerHTML = curPage + "/" + numberOfPages;
  }
  onPage.innerHTML = curPage + "/" + numberOfPages;

  function changePage(curPage) {
    tableBodyProduct.innerHTML = "";
    productList.forEach(function (product, i) {
      if ((curPage - 1) * productPerPage <= i && i < curPage * productPerPage) {
        tableBodyProduct.innerHTML += basicProductRender(product, i);
      }
    });
    productFeatures();
  }
}
