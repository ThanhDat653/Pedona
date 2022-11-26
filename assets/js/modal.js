import { gItem, sItem } from "./storage.js";
import { outputProd } from "./product.js";
import { createArr, prodKey } from "./main.js";
//*================================================================================================================//
//*==================================================Modal=========================================================//
//*================================================================================================================//
const productList =
  JSON.parse(localStorage.getItem("productList")) || defaultProducts;
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
let preview = document.getElementById("img-preview");
let uploadIcon = document.getElementById("upload-icon");

//*================================================ valid values for images ================================================//

let valid = [".png", ".jpec", ".jpg"];

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
  let temparr = path.split("\\");
  let filename = temparr.slice(-1)[0];
  console.log("🚀 ~ file: modal.js ~ line 70 ~ showPre ~ filename", filename);
  if (checkImg(filename)) {
    //*====================================== Create Blob object ================================//
    //
    let src = URL.createObjectURL(prodImg.files[0]); //* URL object create upon Media-Src

    console.log(src);
    //
    preview.src = src;
    preview.style.display = "block";
    uploadIcon.style.display = "none";
    showImg.style.border = "3px solid #242424";
    sItem("imgsrc", filename);
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
let colorList = [];
productList.forEach(function (item) {
  if (colorList.indexOf(item.color) == -1) {
    colorList.push(item.color);
  }
});
console.log(colorList);
function colorConfig(item) {
  if (item.includes("-")) {
    const splited = item.split("-");
    console.log(splited);
    return (
      "linear-gradient(to right, " +
      splited[0] +
      " 50%, " +
      splited[1] +
      " 50%) left"
    );
  } else {
    return item;
  }
}
const renderColor = document.querySelector(".color__render");
renderColor.innerHTML += "";
colorList.forEach(function (item, index) {
  renderColor.innerHTML +=
    `<label for="product__color--` +
    item +
    `" class=" mt-8 col l-3 l-o-1 spc-btw">
   <div class="row no-gutters ">
  <input class="color" type="radio" name="color" id="product__color--` +
    item +
    `" value="` +
    (index + 1) +
    `"/>
  <div class=" col l-3 modal__text" >
  <div class="row spc-btw">
  <div class= "col l-4 box" style="background:` +
    colorConfig(item) +
    `"> </div>` +
    `<span class="col l-5">
    ` +
    item +
    `
    </span></div>
    </div>
</label>`;
  console.log(colorConfig(item));
});
let colorArr = document.querySelectorAll("input.color");
console.log("🚀 ~ file: modal.js ~ line 145 ~ colorArr", colorArr);
const inputOthers = document.getElementById("input_others");
let checkOther = document.getElementById("product__color--orthers");
inputOthers.onclick = function () {
  checkOther.checked = "true";
  document.querySelector("#input_others + span").classList.remove("invalid");
};

//
//

checkOther.onchange = function () {
  if (checkOther.checked) {
    document.querySelector("#input_others + span").classList.remove("invalid");
    inputOthers.focus();
  }
};

//
//

colorArr.forEach(function (color) {
  color.onchange = function () {
    inputOthers.value = "";
    document.querySelector("#input_others + span").classList.remove("invalid");
  };
});

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

function getColor(value) {
  if (value == 0) {
    return inputOthers.value;
  } else {
    return colorList[value - 1];
  }
}

function addObject() {
  const id = document.getElementById("product__id").value;
  const name = document.getElementById("product__name").value;
  const color = getColor(document.form_add.color.value);
  const type = document.getElementById("product__type").value;
  const price = document.getElementById("product__price").value;
  const desc = document.getElementById("product__desc").value;

  // if (validInput) {
  // if (validName(name)) {
  let temp = {
    name,
    id,
    color,
    price,
    desc,
    type,
    img: gItem("imgsrc") || "null",
  };
  productList.push(temp);

  imgReset();
  form_add.reset();
  modal.classList.toggle("close");

  localStorage.setItem(prodKey, JSON.stringify(productList));
  outputProd();
  // }
}

const submitButton = document.getElementById("submit-prod");
let id = document.getElementById("product__id");
let name = document.getElementById("product__name");
let desc = document.getElementById("product__desc");
let type = document.getElementById("product__type");
let modalInputs = [id, name, desc, type];
function validModal() {
  let otherValue = document.form_add.color.value;
  if (otherValue == 0) {
    if (modalInputs.indexOf(inputOthers) == -1) {
      modalInputs.push(inputOthers);
    }
  } else {
    if (modalInputs.indexOf(inputOthers) != -1) {
      document
        .querySelector("#" + inputOthers.id + " + span")
        .classList.remove("invalid");
      modalInputs.splice(modalInputs.indexOf(inputOthers), 1);
    }
  }
  if (prodImg.files[0] == null) {
    document
      .querySelector("#img-show + span.invalid-input")
      .classList.add("invalid");
    return false;
  }
  for (let i = 0; i < modalInputs.length; i++) {
    let errorShow = document
      .querySelector("#" + modalInputs[i].id + "+ span")
      .classList.contains("invalid");
    console.log(errorShow);
    if (errorShow) {
      return false;
    }
  }
  return true;
}

if (modalInputs.indexOf(inputOthers) == -1) {
  modalInputs.push(inputOthers);
}

modalInputs.forEach((item) => {
  let otherValue = document.form_add.color.value;
  if (otherValue == 0) {
    if (modalInputs.indexOf(inputOthers) == -1) {
      modalInputs.push(inputOthers);
    }
  } else {
    if (modalInputs.indexOf(inputOthers) != -1) {
      document
        .querySelector("#" + inputOthers.id + " + span")
        .classList.remove("invalid");
      modalInputs.splice(modalInputs.indexOf(inputOthers), 1);
    }
  }
  item.onblur = () => {
    let errorShow = document.querySelector("#" + item.id + " + span");
    console.log(
      "🚀 ~ file: modal.js ~ line 249 ~ modalInputs.forEach ~ errorShow",
      errorShow
    );
    if (item.value.trim() == "" || item.value == undefined) {
      item.value = "";
      errorShow.classList.add("invalid");
    } else {
      errorShow.classList.remove("invalid");
    }
  };
});
submitButton.onclick = function () {
  let otherValue = document.form_add.color.value;
  if (otherValue == 0) {
    if (modalInputs.indexOf(inputOthers) == -1) {
      modalInputs.push(inputOthers);
    }
  } else {
    if (modalInputs.indexOf(inputOthers) != -1) {
      document
        .querySelector("#" + inputOthers.id + " + span")
        .classList.remove("invalid");
      modalInputs.splice(modalInputs.indexOf(inputOthers), 1);
    }
  }
  modalInputs.forEach((item) => {
    let errorShow = document.querySelector("#" + item.id + " + span");

    if (item.value == "" || item.value == undefined) {
      errorShow.classList.add("invalid");
    }
  });
  if (validModal()) {
    if (confirm("Are you sure?")) {
      addObject();
    }
  } else {
    alert("Invalid modal");
  }
};
