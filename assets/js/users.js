import { gItem, sItem } from "./storage.js";
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
//
function validCheck() {
  const errorShow = createArr(
    document.querySelectorAll("textarea.textarea + span")
  );
  for (let i = 0; i < errorShow.length; i++) {
    if (errorShow[i].classList.contains("invalid")) {
      return false;
    }
  }
  return true;
}
//
function basicUserRender(item, i) {
  return (
    '<div class="row table__row js-mid no-gutters spc-even--mobile"><div class="col l-2 m-2 c-2 user number">' +
    (i + 1) +
    "</div>" +
    '<div class="col l-2 m-12 c-12">' +
    displayID(parseInt(item.userID)) +
    "</div>" +
    '<div class="col l-2 m-3 c-12  username" >' +
    item.username +
    "</div>" +
    '<div class="col l-2 m-3 c-12 password" >' +
    item.pass +
    "</div>" +
    '<div class="col l-2 m-2 c-12 user name" >' +
    item.name +
    "</div>" +
    '<div class="col l-2 m-2 c-12">' +
    '<button class=" user table__fix-btn"><i class="fa-solid fa-pencil"></i></button>' +
    '<button class=" user table__del-btn"><i class="fa-solid fa-trash-can"></i></button>' +
    '<button class="user table__fix-submit close">Submit  ✓</button>' +
    '<button class="user table__fix-cancel close">X</button>' +
    "</div>" +
    "</div>"
  );
}
export function outputUsers() {
  tableBodyUser.innerHTML += "";

  userList.forEach(function (user, i) {
    tableBodyUser.innerHTML += basicUserRender(user, i);
  });
  let check = false;
  const fixButtonUser = createArr(
    document.querySelectorAll(".user.table__fix-btn")
  );
  const delButtonUser = createArr(
    document.querySelectorAll(".user.table__del-btn")
  );
  const fixSubmitButtonUser = createArr(
    document.querySelectorAll(".user.table__fix-submit")
  );
  const fixCancelButtonUser = createArr(
    document.querySelectorAll(".user.table__fix-cancel")
  );
  //

  //

  const userNumber = createArr(document.querySelectorAll(".user.number"));
  const editableUserName = createArr(document.querySelectorAll(".username"));
  const editablePassword = createArr(document.querySelectorAll(".password"));
  const editableName = createArr(document.querySelectorAll(".user.name"));
  //

  //

  function toggleButton(index) {
    fixButtonUser[index].classList.toggle("close");
    delButtonUser[index].classList.toggle("close");
    fixSubmitButtonUser[index].classList.toggle("close");
    fixCancelButtonUser[index].classList.toggle("close");
  }

  delButtonUser.forEach((item, index) => {
    item.onclick = () => {
      if (confirm("Chắc chưa ?")) {
        deleteObject(index, userList, userKey);
        location.reload();
      }
    };
  });
  fixCancelButtonUser.forEach(function (item) {
    item.onclick = function () {
      if(confirm("Do you want to cancel?")){

        location.reload();
      }
    };
  });
  fixButtonUser.forEach((item, index) => {
    item.onclick = () => {
      if (check) {
        alert("Only change one item per time");
      } else {
        toggleButton(index);        createEditable(
          editableUserName[parseInt(userNumber[index].innerHTML) - 1]
        );
        createEditable(editableName[parseInt(userNumber[index].innerHTML) - 1]);
        createEditable(
          editablePassword[parseInt(userNumber[index].innerHTML) - 1]
        );
        check = true;

        editRow(index);
        let changedArea = createArr(document.querySelectorAll(".textarea"));

        fixSubmitButtonUser.forEach((item, index) => {
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
                "Do you want to change user No." +
                  parseInt(userNumber[index].innerHTML) +
                  " in the Data ?"
              ) &&
              validCheck()
            ) {
              userList[index].username = changedArea[0].value.trim();
              userList[index].pass = changedArea[1].value.trim();
              userList[index].name = changedArea[2].value.trim();
              localStorage.setItem("userList", JSON.stringify(userList));
              location.reload();
            } else {
              alert("Please input all user values");
            }
          };
        });
      }
    };
  });
}
const searchInput = document.querySelector(".user.search-input");

function searchUserList() {
  const searchValue = searchInput.value;
  tableBodyUser.innerHTML = "";
  userList.forEach((item, i) => {
    if (item.userID.includes(searchValue)) {
      tableBodyUser.innerHTML += basicUserRender(item, i);
    }
    let check = false;
    const fixButtonUser = createArr(
      document.querySelectorAll(".user.table__fix-btn")
    );
    const delButtonUser = createArr(
      document.querySelectorAll(".user.table__del-btn")
    );
    const fixSubmitButtonUser = createArr(
      document.querySelectorAll(".user.table__fix-submit")
    );
    const fixCancelButtonUser = createArr(
      document.querySelectorAll(".user.table__fix-cancel")
    );
    //

    //
    const userNumber = createArr(document.querySelectorAll(".user.number"));
    const editableUserName = createArr(document.querySelectorAll(".username"));
    const editablePassword = createArr(document.querySelectorAll(".password"));
    const editableName = createArr(document.querySelectorAll(".user.name"));
    //

    //

    function toggleButton(index) {
      fixButtonUser[index].classList.toggle("close");
      delButtonUser[index].classList.toggle("close");
      fixSubmitButtonUser[index].classList.toggle("close");
      fixCancelButtonUser[index].classList.toggle("close");
    }
    fixCancelButtonUser.forEach(function (item) {
      item.onclick = function () {
        if(confirm("Do you want to cancel?")){
  
          location.reload();
        }
      };
    });
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
          alert("Only change one item per time");
        } else {
          toggleButton(index);
          createEditable(editableUserName[index]);
          createEditable(editableName[index]);
          createEditable(editablePassword[index]);
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
          fixSubmitButtonUser.forEach((item, index) => {
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
                  "Do you want to change user No." +
                    parseInt(userNumber[index].innerHTML) +
                    " in the Data ?"
                ) &&
                validCheck()
              ) {
                userList[parseInt(userNumber[index].innerHTML) - 1].username =
                  changedArea[0].value;
                userList[parseInt(userNumber[index].innerHTML) - 1].pass =
                  changedArea[1].value;
                userList[parseInt(userNumber[index].innerHTML) - 1].name =
                  changedArea[2].value;
                localStorage.setItem("userList", JSON.stringify(userList));
                location.reload();
              } else {
                alert("Please input all user values");
              }
            };
          });
        }
      };
    });
  });
}
function editRow(index) {
  const rowList = document.querySelectorAll("#table__body--users .row");
  rowList[index].style.border = "3px solid #cc2424";
  rowList[index].classList.add("shadow-wrap");
}
sItem("userList", userList);
searchInput.addEventListener("keypress", searchUserList);
searchInput.addEventListener("input", searchUserList);
searchInput.addEventListener("paste", searchUserList);
searchInput.addEventListener("change", searchUserList);
