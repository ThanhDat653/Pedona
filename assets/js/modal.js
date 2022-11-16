import { products as defaultProducts } from "./storage.js";
import { outputProd } from "./product.js";
import { prodKey } from "./main.js";
//         Modal
let modal = document.getElementById("modal-wrapper");

// Turn on off Modal :Start

let exitModal = document.querySelectorAll(".toggle-modal");

for (let i = 0; i < exitModal.length; i++) {
  exitModal[i].onclick = () => {
    modal.classList.toggle("open-flex");
    modal.classList.toggle("close");
  };
}
// :End

// Preview Img when upload :Start

let prodImg = document.getElementById("img-input");
let showImg = document.getElementById("img-show");
var preview = document.getElementById("img-preview");
let uploadIcon = document.getElementById("upload-icon");

var valid = [".png", ".jpec", ".jpg"]; // valid values for images

function imgReset() {
  preview.style.display = "none";
  uploadIcon.style.display = "block";
  prodImg.value = "";
  showImg.style.border = "3px solid #e7e7e7";
}

function checkImg(filename) {
  let filetype = "." + filename.split(".").splice(-1)[0];

  if (valid.indexOf(filetype) != -1) {
    return true;
  } else {
    return false;
  }
}

//Preview Image before upload to server:Start

prodImg.addEventListener("change", function showPre(event) {
  let path = prodImg.value;
  var temparr = path.split("\\");
  var filename = temparr.slice(-1)[0];
  if (checkImg(filename)) {
    //Check for valid filetype

    var src = URL.createObjectURL(prodImg.files[0]); // URL object create upon Media-Src

    preview.src = src;
    preview.style.display = "block";
    uploadIcon.style.display = "none";
    showImg.style.border = "3px solid #242424";
    localStorage.setItem("imgsrc", JSON.stringify(src));
  } else {
    alert("Vui lòng Chọn File là Hình Ảnh");
    imgReset();
  }
});

// Preview Image before upload to server:End

//Price_check  :Start
const inputPrice = document.getElementById("product__price");

// Check every case :Start
// LIST ----------
inputPrice.addEventListener("keypress", checkInput);
inputPrice.addEventListener("input", checkInput);
inputPrice.addEventListener("paste", checkInput);
inputPrice.addEventListener("change", checkInput);

function checkInput() {
  if (this.max)
    this.value = Math.min(parseInt(this.max), parseInt(this.value) || 200);
  // if max value is less than input value means that value is out of range
}
// :End

function addObject() {
  const productList =
    JSON.parse(localStorage.getItem("productList")) || defaultProducts;

  const id = validId(document.getElementById("product__id").value);
  const name = document.getElementById("product__name").value;
  const color = document.form_add.name.value;
  const price = document.getElementById("product__price").value;
  const desc = document.getElementById("product__desc").value;
  if (validId(id) && validName(name) && validDesc(desc)) {
    const temp = {
      name,
      id,
      color,
      price,
      desc,
      img: JSON.parse(localStorage.getItem("imgsrc")) || "null",
    };

    productList.push(temp);
    localStorage.setItem(prodKey, JSON.stringify(productList));
    outputProd();
  }
}

function validId(idValue) {
  if (idValue == null || idValue == "") {
    const id = document.getElementById("id__label");
    let area = document.createElement("span");
    // area.style.display = "inline-block";
    area.textContent = "Vui lòng nhập mã sản phẩm";
    area.className = "col mt-4 l-5 l-o-7 end-row ";
    area.style.fontSize = "13px";
    area.style.color = "#cc2424";
    id.after(area);
    return false;
  }
  return true;
}
function validName(nameValue) {
  if (nameValue == null || nameValue == "") {
    const name = document.getElementById("name__label");
    let area = document.createElement("span");
    // area.style.display = "inline-block";
    area.textContent = "Vui lòng nhập tên sản phẩm";
    area.className = "col mt-4 l-5 l-o-7 end-row ";
    area.style.fontSize = "13px";
    area.style.color = "#cc2424";
    name.after(area);
    return false;
  }
  return true;
}
function validDesc(descValue) {
  if (descValue == null || descValue == "") {
    const desc = document.getElementById("desc__label");
    let area = document.createElement("span");
    // area.style.display = "inline-block";
    area.textContent = "Vui lòng nhập mô tả sản phẩm";
    area.className = "col mt-4 l-5 l-o-7 end-row ";
    area.style.fontSize = "13px";
    area.style.color = "#cc2424";
    desc.after(area);
    return false;
  }
  return true;
}

const submitButton = document.getElementById("submit-prod");

submitButton.addEventListener("click", addObject);
