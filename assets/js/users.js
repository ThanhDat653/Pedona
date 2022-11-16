import { gItem, sItem, users as defaultUsers } from "./storage.js";
import { tableBodyUser as tableBodyUser } from "./main.js";
import { deleteObject, createEditable, createArr } from "./main.js";

const userList = gItem("userList") || defaultUsers;

function displayID(userID) {
  if (userID === 0) {
    return "Admin";
  } else {
    return userID;
  }
}
export function outputUsers() {
  tableBodyUser.innerHTML += "";

  for (let i = 0; i < userList.length; i++) {
    tableBodyUser.innerHTML +=
      '<div class="row table__row js-mid no-gutters spc-even--mobile"><div class="col l-2 m-2 c-2">' +
      (i + 1) +
      "</div>" +
      '<div class="col l-2 m-12 c-12">' +
      displayID(parseInt(userList[i].userID)) +
      "</div>" +
      '<div class="col l-2 m-3 c-12  username" >' +
      userList[i].username +
      "</div>" +
      '<div class="col l-2 m-3 c-12 password" >' +
      userList[i].pass +
      "</div>" +
      '<div class="col l-2 m-2 c-12 user name" >' +
      userList[i].name +
      "</div>" +
      '<div class="col l-2 m-2 c-12">' +
      '<button class=" user table__fix-btn"><i class="fa-solid fa-pencil"></i></button>' +
      '<button class=" user table__del-btn"><i class="fa-solid fa-trash-can"></i></button>' +
      '<button class=" user table__fix-submit close">Submit</button>' +
      "</div>" +
      "</div>";
  }
  var check = false;
  const fixButtonUser = createArr(
    document.querySelectorAll(".user.table__fix-btn")
  );
  const delButtonUser = createArr(
    document.querySelectorAll(".user.table__del-btn")
  );
  const fixSubmitButtonUser = createArr(
    document.querySelectorAll(".user.table__fix-submit")
  );

  const editableUserName = createArr(document.querySelectorAll(".username"));
  const editablePassword = createArr(document.querySelectorAll(".password"));
  const editableName = createArr(document.querySelectorAll(".user.name"));

  function toggleButton(index) {
    fixButtonUser[index].classList.toggle("close");
    delButtonUser[index].classList.toggle("close");
    fixSubmitButtonUser[index].classList.toggle("close");
  }
  delButtonUser.forEach((item, index) => {
    item.onclick = () => {
      if (confirm("Chắc chưa ?")) {
        deleteObject(index, userList, userKey);
        location.reload();
      }
    };
  });
  fixButtonUser.forEach((item, index) => {
    item.onclick = () => {
      if (check) {
        alert("Chỉ được chỉnh 1 đối tượng 1 lần");
      } else {
        toggleButton(index);
        fixSubmitButtonUser[index].style.animation = "button-full .25s linear";
        createEditable(editableUserName[index], index);
        createEditable(editableName[index], index);
        createEditable(editablePassword[index], index);
        check = true;
      }
    };
  });
  fixSubmitButtonUser.forEach((item, index) => {
    item.onclick = () => {
      if (!check) {
        toggleButton(index);
      }
      if (confirm("Bạn có chắc muốn thay đổi sản phẩm này?")) {
        let changedArea = createArr(document.querySelectorAll(".textarea"));

        userList[index].username = changedArea[0].value;
        userList[index].pass = changedArea[1].value;
        userList[index].name = changedArea[2].value;
        localStorage.setItem("userList", JSON.stringify(userList));
        location.reload();
      }
    };
  });

  sItem("userList", userList);
}
const searchInput = document.querySelector(".user.search-input");

function searchUserList() {
  const searchValue = searchInput.value;
  tableBodyUser.innerHTML = "";
  userList.filter((item, i) => {
    if (item.userID.includes(searchValue)) {
      tableBodyUser.innerHTML +=
        '<div class="row table__row js-mid no-gutters spc-even--mobile"><div class="col l-2 m-2 c-2 user number">' +
        (i + 1) +
        "</div>" +
        '<div class="col l-2 m-12 c-12">' +
        displayID(parseInt(userList[i].userID)) +
        "</div>" +
        '<div class="col l-2 m-3 c-12  username" >' +
        userList[i].username +
        "</div>" +
        '<div class="col l-2 m-3 c-12 password" >' +
        userList[i].pass +
        "</div>" +
        '<div class="col l-2 m-2 c-12 user name" >' +
        userList[i].name +
        "</div>" +
        '<div class="col l-2 m-2 c-12">' +
        '<button class=" user table__fix-btn"><i class="fa-solid fa-pencil"></i></button>' +
        '<button class=" user table__del-btn"><i class="fa-solid fa-trash-can"></i></button>' +
        '<button class=" user table__fix-submit close">Submit</button>' +
        "</div>" +
        "</div>";
    }
    const userNumber = document.querySelectorAll(".user.number");
    var check = false;
    const fixButtonUser = createArr(
      document.querySelectorAll(".user.table__fix-btn")
    );
    const delButtonUser = createArr(
      document.querySelectorAll(".user.table__del-btn")
    );
    const fixSubmitButtonUser = createArr(
      document.querySelectorAll(".user.table__fix-submit")
    );

    const editableUserName = createArr(document.querySelectorAll(".username"));
    const editablePassword = createArr(document.querySelectorAll(".password"));
    const editableName = createArr(document.querySelectorAll(".user.name"));

    function toggleButton(index) {
      fixButtonUser[index].classList.toggle("close");
      delButtonUser[index].classList.toggle("close");
      fixSubmitButtonUser[index].classList.toggle("close");
    }
    delButtonUser.forEach((item, index) => {
      item.onclick = () => {
        if (confirm("Chắc chưa ?")) {
          deleteObject(index, userList, userKey);
          location.reload();
        }
      };
    });
    fixButtonUser.forEach((item, index) => {
      item.onclick = () => {
        if (check) {
          alert("Chỉ được chỉnh 1 đối tượng 1 lần");
        } else {
          toggleButton(index);
          fixSubmitButtonUser[index].style.animation =
            "button-full .25s linear";
          createEditable(editableUserName[index], index);
          createEditable(editableName[index], index);
          createEditable(editablePassword[index], index);
          check = true;
        }
      };
    });
    fixSubmitButtonUser.forEach((item, index) => {
      item.onclick = () => {
        if (!check) {
          toggleButton(index);
        }
        if (confirm("Bạn có chắc muốn thay đổi sản phẩm này?")) {
          let changedArea = createArr(document.querySelectorAll(".textarea"));

          userList[parseInt(userNumber[index].innerHTML) - 1].username =
            changedArea[0].value;
          userList[parseInt(userNumber[index].innerHTML) - 1].pass =
            changedArea[1].value;
          userList[parseInt(userNumber[index].innerHTML) - 1].name =
            changedArea[2].value;
          localStorage.setItem("userList", JSON.stringify(userList));
          location.reload();
        }
      };
    });
  });
}
sItem("userList", userList);
searchInput.addEventListener("keypress", searchUserList);
searchInput.addEventListener("input", searchUserList);
searchInput.addEventListener("paste", searchUserList);
searchInput.addEventListener("change", searchUserList);
