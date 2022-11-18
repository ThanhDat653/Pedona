import { products as defaultProducts } from "./storage.js";
import { outputProd } from "./product.js";
import { prodKey } from "./main.js";
//*================================================================================================================//
//*==================================================Modal=========================================================//
//*================================================================================================================//

let modal = document.getElementById("modal-wrapper");

// Turn on off Modal :Start

let exitModal = document.querySelectorAll(".toggle-modal");

for (let i = 0; i < exitModal.length; i++) {
  exitModal[i].onclick = () => {
    const validModal = document.querySelectorAll(".modal__body label");
    validModal.forEach(function (item) {
      item.classList.remove("invalid");
    });
    form_add.reset();
    modal.classList.toggle("open-flex");
    modal.classList.toggle("close");
    imgReset();
  };
}
// :End
//*===============================================================================================================================//
//*================================================ Preview Img when upload :Start =================================================//
//*===============================================================================================================================//

let prodImg = document.getElementById("img-input");
let showImg = document.getElementById("img-show");
var preview = document.getElementById("img-preview");
let uploadIcon = document.getElementById("upload-icon");

//*================================================ valid values for images ================================================//

var valid = [".png", ".jpec", ".jpg"];

//*================================================ Image Reset :Start ================================================//

function imgReset() {
  preview.style.display = "none";
  uploadIcon.style.display = "block";
  prodImg.value = "";
  showImg.style.border = "3px solid #e7e7e7";
}

//*================================================ Image Reset :End =============================================================

//*======================================= Check for valid filetype================================//
export function checkImg(filename) {
  let filetype = "." + filename.split(".").splice(-1)[0];

  if (valid.indexOf(filetype) != -1) {
    return true;
  } else {
    return false;
  }
}

//*Preview Image before upload to server:Start

prodImg.addEventListener("change", function showPre(event) {
  let path = prodImg.value;
  var temparr = path.split("\\");
  var filename = temparr.slice(-1)[0];
  if (checkImg(filename)) {
    //*====================================== Create Blob object ================================//
    //
    var src = URL.createObjectURL(prodImg.files[0]); //* URL object create upon Media-Src
    //
    preview.src = src;
    preview.style.display = "block";
    uploadIcon.style.display = "none";
    showImg.style.border = "3px solid #242424";
    localStorage.setItem("imgsrc", JSON.stringify(src));
  } else {
    //
    alert("Vui lòng Chọn File là Hình Ảnh");
    imgReset();
    //
  }
});
//*===============================================================================================================================//
//*================================================ Preview Img when upload :End =================================================//
//*===============================================================================================================================//

//
//

//*==============================================================================================================================//
//*====================================================Price input check :Start =================================================//
//*==============================================================================================================================//

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

//*==============================================================================================================================//
//*==================================================== Price input check :End =================================================//
//*==============================================================================================================================//

//!================================================================================================================
//!============================================== IS BEING FIXED =================================================//
//!============================================================================================================================
let validInput = false;
function addObject() {
  const productList =
    JSON.parse(localStorage.getItem("productList")) || defaultProducts;

  const id = document.getElementById("product__id").value;
  const name = document.getElementById("product__name").value;
  const color = document.form_add.name.value;
  const price = document.getElementById("product__price").value;
  const desc = document.getElementById("product__desc").value;

  if (validInput) {
    // if (validName(name)) {
    const temp = {
      name,
      id,
      color,
      price,
      desc,
      img: JSON.parse(localStorage.getItem("imgsrc")) || "null",
    };
    productList.push(temp);

    imgReset();
    form_add.reset();
    modal.classList.toggle("close");

    localStorage.setItem(prodKey, JSON.stringify(productList));
    outputProd();
  } else {
    validId();
    validDesc();
    validName();
    validImg();
  }
}

function validId() {
  const id = document.getElementById("id__label");
  if (idInput.value == null || idInput.value == "") {
    id.classList.add("invalid");
    validInput = false;
    return false;
  } else {
    id.classList.remove("invalid");
    validInput = true;

    return true;
  }
}
function validName() {
  const name = document.getElementById("name__label");
  if (nameInput.value == null || nameInput.value == "") {
    name.classList.add("invalid");
    validInput = false;
    return false;
  } else {
    name.classList.remove("invalid");
    validInput = true;
    return true;
  }
}
function validDesc() {
  const desc = document.getElementById("desc__label");
  if (descInput.value == null || descInput.value == "") {
    desc.classList.add("invalid");
    validInput = false;
    return false;
  } else {
    desc.classList.remove("invalid");
    validInput = true;

    return true;
  }
}

function validImg() {
  const img = document.getElementById("img__label");
  if (prodImg.files[0] == undefined) {
    img.classList.add("invalid");

    validInput = false;

    return false;
  } else {
    img.classList.remove("invalid");
    validInput = true;

    return true;
  }
}

//!================================================================================================================================
//!================================================================================================================================
//!================================================================================================================================
const submitButton = document.getElementById("submit-prod");

submitButton.addEventListener("click", addObject);

let descInput = document.getElementById("product__desc");
let nameInput = document.getElementById("product__name");
let idInput = document.getElementById("product__id");

descInput.addEventListener("blur", validDesc);
nameInput.addEventListener("blur", validName);
idInput.addEventListener("blur", validId);
