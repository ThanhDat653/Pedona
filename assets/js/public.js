document.querySelector(".back-to-top").addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`
    })
})


// let products = JSON.parse(localStorage.getItem('productList'))

// // chọn sản phẩm cần lọc
// function chon()
// {
//     //màu 
//     var arr1= document.getElementsByClassName("mausac");
//     var mausac__arr=[];
//     for(var i=0; i<arr1.length; i++)
//     {
//         if(arr1[i].checked==true) mausac__arr.push(arr1[i].value);
//     }

//     // giá 
//     var arr2= document.getElementsByClassName("giaban");
//     var giaban__arr=[];
//     for(var i=0; i<arr2.length; i++)
//     {
//         if(arr2[i].checked==true) giaban__arr.push(arr2[i].value);
//     }
//     // showProduct(mausac__arr, giaban__arr);
// }
//     //Tìm kiếm sản phẩm
// function search(){
//     var arr3 = document.getElementsByClassName("header--search__input");
//     var search_arr =[];
//     for(var i=0; i<arr3.length;i++)
//     {
//         if(arr3[i]!=null) 
//             search_arr.push(arr3[i].value);
                                
//     }            
// }

// search();
// chon();

// //---tim kiếm tên - giá ---

// var search__input=document.querySelector('.form-input input');

// //-- tắt sự kiện nhấn phím Enter load lại trang trên thẻ input
// var inputSearch = document.querySelector(".header--search__input");

// inputSearch.addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//       event.preventDefault();
//     }
// });
    

// function searchProductList() {
//    let searchValue = document.querySelector(".header--search__input").value;
//    let searchProductList = [];

//    products.filter((item, i) => {
//       if (item.name.includes(searchValue)) {
//          searchProductList.push(item)
//       }
//    });

//    console.log(searchProductList);
  
// }


// searchProductList();





