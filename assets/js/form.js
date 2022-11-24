import {
  products as defaultProducts,
  users as defaultUsers,
} from "./storage.js";

// const products = JSON.parse(gItem("productList")) || defaultProducts;

const userKey = "userList";
const userList = JSON.parse(localStorage.getItem(userKey)) || defaultUsers;
localStorage.setItem(userKey, JSON.stringify(userList));

//--------------- open/close form-----------
var formElemnt = document.querySelector(".modal-sign");
function openForm() {
  formElemnt.classList.toggle("open");
  formElemnt.classList.remove("close");
}

function closeForm() {
  formElemnt.classList.toggle("close");
  // formElemnt.classList.remove('open');
}

var loginButtons = document.querySelector("#loginBtn");
loginButtons.addEventListener("click", openForm);

formElemnt.addEventListener("click", closeForm);

// Ngăn nổi bọt
var modalForm = document.querySelector(".modal-form");
modalForm.onclick = function (event) {
  event.stopPropagation();
};

// form animation-------------------------------
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("modal-form");

signUpButton.addEventListener("click", () => {
  document.forms.sign_up_form.reset();
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  document.forms.sign_in_form.reset();
  container.classList.remove("right-panel-active");
});

//Login----------------------------------------------------------
//ckech xem có current user chưa

let isLogin = false;

if (!!localStorage.getItem("userCurrent")) {
  isLogin = !!localStorage.getItem("userCurrent");
} else {
  localStorage.setItem("userCurrent", "");
}

// mỗi khi load lại trang sẽ check
window.onload = function () {
  // showUserInfo();
  checkLogin();
};

function Login() {
  var username = document.getElementById("username").value;
  var pass = document.getElementById("password").value;
  var checkAccount = userList.some(
    (value) => value.username === username && value.pass === pass
  );
  console.log(checkAccount);

  //hàm some trả về true nếu tìm thấy
  // lưu lại account vào local storage
  if (checkAccount) {
    let user = userList.filter((value) => value.username === username)[0];
    let userCurrent = { username: user.name, userID: user.userID };
    localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
    isLogin = true;
    checkLogin();
    location.reload();
  } else {
    alert("Wrong username or pass!");
    container.classList.add("right-panel-active");
  }
}

var signIn = document.querySelector(".sign-in--btn");
signIn.addEventListener("click", Login);

// nếu có current user thì sẽ trong trạng thái login
function checkLogin() {
  if (isLogin) {
    formElemnt.classList.remove("open");
    formElemnt.classList.add("close");
    document.getElementById("loginBtn").classList.add("close");
    showUserInfo();
    isAdmin();
    isUser();
    mobileLogin.classList.add("close");
  } else {
    openForm();
    mobileLogin.classList.remove("close");
  }
}

function showUserInfo() {
  let user = JSON.parse(localStorage.getItem("userCurrent"));
  if (user) {
    document.querySelector(".user_menu_name").innerText = user.username;
    document.querySelector(".user-name").innerText = user.username;
  }
}

function isAdmin() {
  let user = JSON.parse(localStorage.getItem("userCurrent"));
  if (user.userID === 0) {
    document.querySelector(".user_role").innerText = "Go Setting";
    document.querySelector(".user_role").style.color = "red";
    document.querySelector(".user_role").onclick = function () {
      window.location.replace("./assets/js/test.html"); //doi sang trang admin
    };
  }
}

function isUser() {
  let user = JSON.parse(localStorage.getItem("userCurrent"));
  if (user.userID !== 0) {
    document.querySelector(".user_role").innerText = "Orders";
    document.querySelector(".user_role").style.color = "red";
    document.querySelector(".user_role").onclick = function () {
      // window.location.replace('./assets/js/test.html') //doi sang trang admin
    };
  }
}

// Log out -------------------------------
var logOutBtn = document.querySelector(".logout--btn");
logOutBtn.addEventListener("click", confirmLogout);

function confirmLogout() {
  if (confirm("Xác nhận đăng xuất?") == true) {
    Logout();
    userMenu.classList.add("close");
  }
}

// gỡ bỏ current user
function Logout() {
  isLogin = false;
  document.getElementById("loginBtn").style.display = "block";
  localStorage.setItem("userCurrent", "");
  checkLogin();
  // location.reload(); //load lại trang
}

//---- ------------------------------User Menu
var userMenu = document.querySelector(".user_menu");
var userIcon = document.querySelector("#user_icon");

userIcon.addEventListener("click", function () {
  if (!!isLogin) {
    userMenu.classList.toggle("close");
  } else {
    openForm();
    container.classList.add("left-panel-active");
  }
});

// userMenu.onclick = function(event) {
//     event.stopPropagation(); }

// userIcon.addEventListener('focusout',function(){
//     userMenu.classList.add('close');
// })

// form Validation-----------------------------------------------
function Validator(options) {
  var selectorRules = {};

  // Ham thuc hien validate
  function validate(inputElement, rule) {
    //value: inputElement.value
    //test func: rule.test
    var errorMessage = rule.test(inputElement.value);
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }

  // Lay elements cua form cua validate
  var formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach(function (rule) {
      // Lưu lại các Rules ccủa input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector] = push[rule.test];
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        //Xu ly truong hop blur khoi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        // Xu ly moi khi nguoi dung nhap vao input
        inputElement.oninput = function () {
          var errorElement = inputElement.parentElement.querySelector(
            options.errorSelector
          );
        };
      }
    });
  }
}

//  Định nghĩa các Rules
// Nguyen tac cua Rules
// 1. khi co loi => messages loi~
// 2  ko => undefined
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || "Vui lòng nhập trường này";
    },
  };
};

Validator.minLength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : `Vui long nhap toi thieu ${min} ky `;
    },
  };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue()
        ? undefined
        : message || "Giá trị nhập vào không chính xác";
    },
  };
};

// tao account------------------------------------

// check xem có local User hay chưa? có thì chép lại vào user / ko thì tạo
if (!!localStorage.getItem("userList")) {
  const userList = JSON.parse(localStorage.getItem(userKey)) || defaultUsers;
  localStorage.setItem(userKey, JSON.stringify(userList));
} else {
  localStorage.setItem("userList", JSON.stringify(userList));
}

var signUpbtn = document.getElementById("sign-up--btn");
signUpbtn.addEventListener("click", getAccount);

function getAccount() {
  userList = JSON.parse(localStorage.getItem("userList")); //tạo mảng user lấy data từ localStorage
  let username = document.querySelector("#su_username").value; //xài var sẽ tạo thêm ra null -> xài let
  let name = document.querySelector("#su_name").value;
  let pass = document.querySelector("#su_pass").value;

  if (userList.some((value) => value.username === username)) {
    //check có trùng tk ko
    alert("Username alert in use");
  } else {
    if (username == "" || pass == "" || name == "") {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      let userNumber = userList.length + 1;
      let newAccount = {
        username,
        pass,
        userID: userNumber,
        name,
      };
      userList.push(newAccount); // gắn vào mảng
      localStorage.setItem("userList", JSON.stringify(userList)); // đẩy mảng lên localStorage
      alert("Tạo tài khoản thành công");
      container.classList.remove("right-panel-active"); // chuyển qua form đăng nhập
    }
  }
}

// ----------------------- mobile
var menuIcon = document.querySelector(".mobile-menu__icon");
var overlaySideMenu = document.querySelector(".header__side-menu-container");
var sideMenu = document.querySelector(".header__side-menu");

menuIcon.addEventListener("click", function () {
  overlaySideMenu.classList.toggle("open");
  sideMenu.classList.toggle("open");
  sideMenu.classList.remove("hide");
});

overlaySideMenu.addEventListener("click", function () {
  sideMenu.classList.toggle("hide");
  setTimeout(hideMenu, 450);
});

sideMenu.addEventListener("click", function (event) {
  event.stopPropagation();
});

function hideMenu() {
  overlaySideMenu.classList.toggle("open");
  sideMenu.classList.toggle("open");
}

var mobileLogin = document.querySelector(".mobile-login");
mobileLogin.addEventListener("click", function () {
  openForm();
  hideMenu();
});
var mobileLogout = document.querySelector(".mobile-logout");
mobileLogout.addEventListener("click", function () {
  confirmLogout();
  hideMenu();
});
