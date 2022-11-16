import { tableBodyProduct } from "./main.js";
import { products as defaultProducts } from "./storage.js";
import { sItem, gItem } from "./storage.js";
import { deleteObject, createEditable, createArr, prodKey } from "./main.js";

// Extract product list:Start
let productList = gItem("productList") || defaultProducts;

export function outputProd() {
  const productList =
    JSON.parse(localStorage.getItem(prodKey)) || defaultProducts;

  tableBodyProduct.innerHTML = "";
  // for (let i = 0; i < productList.length; i++) {

  for (let i = 0; i < productList.length; i++) {
    tableBodyProduct.innerHTML +=
      ' <div class="row js-mid table__row no-gutters spc-even--mobile ">' +
      '<div class="col l-1 m-1 c-12 prod number ">' +
      (i + 1) +
      "</div>" +
      '<div class="col l-2 m-2 c-10 c-o-2  color--id id">' +
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
      '<div class="col l-1 m-1 c-10 c-o-2 color--price price">' +
      (productList[i].price || 200) +
      "$" +
      "</div>" +
      '<div class="col l-3 m-0 c-0 desc">' +
      productList[i].desc +
      "</div>" +
      '<div class="col l-2 m-1 m-o-2 c-12">' +
      '<button class="product table__fix-btn"><i class="fa-solid fa-pencil"></i></button>' +
      '<button class="product table__del-btn"><i class="fa-solid fa-trash-can"></i></button>' +
      '<button class="table__fix-submit close">Submit</button>' +
      "</div>" +
      "</div>";
  }
  const prodNumber = createArr(document.querySelectorAll(".prod.number"));

  let check = false;
  let change = false;
  let delButton = createArr(
    document.querySelectorAll(".product.table__del-btn")
  );
  const fixSubmitButton = createArr(
    document.querySelectorAll(".table__fix-submit")
  );
  delButton.forEach((item, index) => {
    item.onclick = () => {
      if (confirm("Chắc chưa ?")) {
        deleteObject(index, productList, prodKey);
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
        alert("chỉ được sửa 1 đối tượng một lần ");
      } else {
        toggleButton(index);
        createEditable(
          editableId[parseInt(prodNumber[index].innerHTML) - 1],
          parseInt(prodNumber[index].innerHTML) - 1
        );
        createEditable(
          editableName[parseInt(prodNumber[index].innerHTML) - 1],
          parseInt(prodNumber[index].innerHTML) - 1
        );
        createEditable(
          editableDesc[parseInt(prodNumber[index].innerHTML) - 1],
          parseInt(prodNumber[index].innerHTML) - 1
        );
        createEditablePrice(
          editablePrice[parseInt(prodNumber[index].innerHTML) - 1],
          parseInt(prodNumber[index].innerHTML) - 1
        );
        createEditableImg(
          editableImg[parseInt(prodNumber[index].innerHTML) - 1],
          parseInt(prodNumber[index].innerHTML) - 1
        );
        check = true;
      }
    };
  });

  fixSubmitButton.forEach((item, index) => {
    item.onclick = () => {
      if (!check) {
        toggleButton(index);
      }
      if (confirm("Bạn có chắc muốn thay đổi sản phẩm này?")) {
        let changedArea = createArr(document.querySelectorAll(".textarea"));

        productList[index].id = changedArea[0].value;
        productList[index].name = changedArea[1].value;
        productList[index].price = changedArea[2].value;
        productList[index].desc = changedArea[3].value;

        if (change) {
          productList[index].img = gItem("imgconfig");
        }
        localStorage.setItem(prodKey, JSON.stringify(productList));
        location.reload();
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
  const editablePrice = createArr(document.querySelectorAll(".price"));

  function createEditablePrice(item, index) {
    let area = document.createElement("textarea");
    area.className = item.className + " textarea";
    area.value = item.innerHTML.split("$")[0];
    item.replaceWith(area);
  }

  function createEditableImg(img, index) {
    let area = document.createElement("label");
    area.className = img.className;
    area.id = "img-area";
    area.innerHTML =
      '<input type="file" name="productImg" id="productImg" accept="image/png, image/jpeg" visiblity="hidden"> <img src="" alt="" id="img" class="product__img">';
    area.htmlFor = "productImg";
    img.replaceWith(area);
    const preview = document.getElementById("img");

    const input = document.getElementById("productImg");
    preview.style.display = "block";

    preview.src = productList[index].img;
    sItem("imgconfig", preview.src);
    area.addEventListener("change", () => {
      change = true;
      let path = input.value;
      var temparr = path.split("\\");
      var filename = temparr.slice(-1)[0];
      if (checkImg(filename)) {
        //Check for valid filetype

        var src = URL.createObjectURL(input.files[0]); // URL object create upon Media-Src

        preview.src = src;
        preview.style.display = "block";
        preview.style.border = "1px solid #cc2424";

        sItem("imgconfig", src);
      } else {
        alert("Vui lòng Chọn File là Hình Ảnh");
      }
    });
  }

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
      tableBodyProduct.innerHTML +=
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
        '<img class="product__img" src="' +
        item.img +
        '" alt="">' +
        "</div>" +
        '<div class="col l-1 m-1 c-10 c-o-2 color--price price">' +
        (item.price || 200) +
        "$" +
        "</div>" +
        '<div class="col l-3 m-0 c-0 desc">' +
        item.desc +
        "</div>" +
        '<div class="col l-2 m-1 m-o-2 c-12">' +
        '<button class="product table__fix-btn"><i class="fa-solid fa-pencil"></i></button>' +
        '<button class="product table__del-btn"><i class="fa-solid fa-trash-can"></i></button>' +
        '<button class="table__fix-submit close">Submit</button>' +
        "</div>" +
        "</div>";
    }
    let prodNumber = createArr(document.querySelectorAll(".prod.number"));

    let check = false;
    let change = false;
    let delButton = createArr(
      document.querySelectorAll(".product.table__del-btn")
    );
    const fixSubmitButton = createArr(
      document.querySelectorAll(".table__fix-submit")
    );
    delButton.forEach((item, index) => {
      item.onclick = () => {
        if (confirm("Chắc chưa ?")) {
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
          alert("chỉ được sửa 1 đối tượng một lần ");
        } else {
          toggleButton(index);
          createEditable(editableId[index], index);
          createEditable(editableName[index], index);
          createEditable(editableDesc[index], index);
          createEditablePrice(editablePrice[index], index);
          createEditableImg(
            editableImg[index],
            parseInt(prodNumber[index].innerHTML) - 1
          );
          check = true;
        }
      };
    });

    fixSubmitButton.forEach((item, index) => {
      item.onclick = () => {
        if (!check) {
          toggleButton(index);
        }
        if (confirm("Bạn có chắc muốn thay đổi sản phẩm này?")) {
          let changedArea = createArr(document.querySelectorAll(".textarea"));
          productList[parseInt(prodNumber[index].innerHTML) - 1].id =
            changedArea[0].value;
          productList[parseInt(prodNumber[index].innerHTML) - 1].name =
            changedArea[1].value;
          productList[parseInt(prodNumber[index].innerHTML) - 1].price =
            changedArea[2].value;
          productList[parseInt(prodNumber[index].innerHTML) - 1].desc =
            changedArea[3].value;
          if (change) {
            productList[parseInt(prodNumber[index].innerHTML) - 1].img =
              gItem("imgconfig");
          }
          localStorage.setItem(prodKey, JSON.stringify(productList));
          location.reload();
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
    const editablePrice = createArr(document.querySelectorAll(".price"));

    function createEditablePrice(item, index) {
      let area = document.createElement("textarea");
      area.className = item.className + " textarea";
      area.value = item.innerHTML.split("$")[0];
      item.replaceWith(area);
    }

    function createEditableImg(img, index) {
      let area = document.createElement("label");
      area.className = img.className;
      area.id = "img-area";
      area.innerHTML =
        '<input type="file" name="productImg" id="productImg" accept="image/png, image/jpeg" visiblity="hidden"> <img src="" alt="" id="img" class="product__img">';
      area.htmlFor = "productImg";
      img.replaceWith(area);
      const preview = document.getElementById("img");
      const input = document.getElementById("productImg");
      preview.style.display = "block";

      preview.src = productList[index].img;
      sItem("imgconfig", preview.src);
      area.addEventListener("change", () => {
        change = true;
        let path = input.value;
        var temparr = path.split("\\");
        var filename = temparr.slice(-1)[0];
        if (checkImg(filename)) {
          //Check for valid filetype

          var src = URL.createObjectURL(input.files[0]); // URL object create upon Media-Src

          preview.src = src;
          preview.style.display = "block";
          preview.style.border = "1px solid #cc2424";

          sItem("imgconfig", src);
        } else {
          alert("Vui lòng Chọn File là Hình Ảnh");
        }
      });
    }

    // :End
  });
}
searchInput.addEventListener("keypress", searchProductList);
searchInput.addEventListener("input", searchProductList);
searchInput.addEventListener("paste", searchProductList);
searchInput.addEventListener("change", searchProductList);
