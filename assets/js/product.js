import { tableBodyProduct } from "./main.js";
import { products as defaultProducts } from "./storage.js";
import { sItem, gItem } from "./storage.js";
import { deleteObject, createEditable, createArr, prodKey } from "./main.js";
import { checkImg } from "./modal.js";

// Extract product list:Start
let productList = gItem("productList") || defaultProducts;

function baseRenderProducts(i) {
  return (
    ' <div class="row js-mid table__row no-gutters spc-even--mobile ">' +
    '<div class="col l-1 m-1 c-12 prod number ">' +
    (i + 1) +
    "</div>" +
    '<div class="col l-2 m-2 c-12 color--id id">' +
    productList[i].id +
    "</div>" +
    '<div class="col l-2 m-3 c-12 product name ">' +
    productList[i].name +
    "</div>" +
    '<div class="col l-1 m-3 img">' +
    '<img class="product__img" src="' +
    productList[i].img +
    '" alt="">' +
    "</div>" +
    '<div class="col l-1 m-1 c-12 color--price price">' +
    (productList[i].price || 200) +
    "$" +
    "</div>" +
    '<div class="col l-3 m-10 c-12 mt-32 desc line--tablet">' +
    productList[i].desc +
    "</div>" +
    '<div class="col l-2 m-2 m-o-10 mt-8 c-12 bordered--tablet">' +
    '<button class="product table__fix-btn"><i class="fa-solid fa-pencil"></i></button>' +
    '<button class="product table__del-btn"><i class="fa-solid fa-trash-can"></i></button>' +
    '<button class="product table__fix-submit close submit--tablet ">Submit</button>' +
    "</div>" +
    "</div>"
  );
}

function createEditablePrice(item) {
  let area = document.createElement("div");
  area.className = item.className;
  area.innerHTML =
    `<textarea class="textarea col c-12 color--price price" rows="1" cols="3">` +
    item.innerHTML.split("$")[0].trim() +
    `</textarea>` +
    `<span class="col l-12 invalid-input ">Please input product price</span>
`;

  item.replaceWith(area);
}

let change = false;
function createEditableImg(img, index) {
  let area = document.createElement("label");
  area.className = img.className + " c-12";
  area.id = "img-area";
  area.innerHTML =
    '<input type="file" name="" id="productImg" accept="image/png, image/jpeg" visiblity="hidden"> <img src="" alt="" id="img" class="product__img">';
  area.htmlFor = "productImg";
  img.replaceWith(area);
  const preview = document.getElementById("img");
  const input = document.getElementById("productImg");
  preview.style.display = "block";

  preview.src = productList[index].img;
  area.addEventListener("change", () => {
    change = true;
    let path = input.value;
    let temparr = path.split("\\");
    let filename = temparr.slice(-1)[0];
    if (checkImg(filename)) {
      //Check for valid filetype

      let src = URL.createObjectURL(input.files[0]); // URL object create upon Media-Src
      //
      preview.src = src;
      preview.style.display = "block";
      preview.style.border = "1px solid #cc2424";
      //\
      console.log(src);
      sItem("imgconfig", src);
    } else {
      alert("Only images are supported");
      imgReset();
    }
  });
}

function productFunctions() {
  let prodNumber = createArr(document.querySelectorAll(".prod.number"));

  let check = false;
  let change = false;
  let delButton = createArr(
    document.querySelectorAll(".product.table__del-btn")
  );
  const fixSubmitButton = createArr(
    document.querySelectorAll(".product.table__fix-submit")
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
        fixSubmitButton[index].style.animation = "button-full .25s linear";
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
              ) &&
              validCheck()
            ) {
              productList[parseInt(prodNumber[index].innerHTML) - 1].id =
                changedArea[0].value.trim();
              productList[parseInt(prodNumber[index].innerHTML) - 1].name =
                changedArea[1].value.trim();
              productList[parseInt(prodNumber[index].innerHTML) - 1].price =
                changedArea[2].value.trim();
              productList[parseInt(prodNumber[index].innerHTML) - 1].desc =
                changedArea[3].value.trim();
              if (change) {
                productList[parseInt(prodNumber[index].innerHTML) - 1].img =
                  gItem("imgconfig");
              }
              localStorage.setItem(prodKey, JSON.stringify(productList));
              location.reload();
            } else {
              alert("Please input all product values");
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
  }
  const editableImg = createArr(document.querySelectorAll(".img"));
  const editableId = createArr(document.querySelectorAll(".id"));
  const editableName = createArr(document.querySelectorAll(".product.name"));
  const editableDesc = createArr(document.querySelectorAll(".desc"));
  const editablePrice = createArr(
    document.querySelectorAll(".color--price.price")
  );
}
export function outputProd() {
  const productList =
    JSON.parse(localStorage.getItem(prodKey)) || defaultProducts;

  tableBodyProduct.innerHTML = "";
  // for (let i = 0; i < productList.length; i++) {

  for (let i = 0; i < productList.length; i++) {
    tableBodyProduct.innerHTML += baseRenderProducts(i);
  }
  productFunctions();
  // :End
}
const searchInput = document.querySelector(".product.search-input");
function searchProductList() {
  // this.onkeydown = () => {
  const searchValue = searchInput.value;
  tableBodyProduct.innerHTML = "";
  productList = gItem(prodKey) || defaultProducts;

  productList.filter((item, i) => {
    // if (item.name.includes(searchValue)) {
    if (
      item.name.includes(searchValue) ||
      item.id.toString().includes(searchValue)
    ) {
      tableBodyProduct.innerHTML += baseRenderProducts(i);
    }
    productFunctions();
    // :End
  });
}
searchInput.addEventListener("keypress", searchProductList);
searchInput.addEventListener("input", searchProductList);
searchInput.addEventListener("paste", searchProductList);
searchInput.addEventListener("change", searchProductList);
