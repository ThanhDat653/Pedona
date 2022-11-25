document.querySelector(".back-to-top").addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`
    })
})


let products = JSON.parse(localStorage.getItem('productList'))

// chọn sản phẩm cần lọc
function chon()
{
    //màu 
    var arr1= document.getElementsByClassName("mausac");
    var mausac__arr=[];
    for(var i=0; i<arr1.length; i++)
    {
        if(arr1[i].checked==true) mausac__arr.push(arr1[i].value);
    }

    // giá 
    var arr2= document.getElementsByClassName("giaban");
    var giaban__arr=[];
    for(var i=0; i<arr2.length; i++)
    {
        if(arr2[i].checked==true) giaban__arr.push(arr2[i].value);
    }
    // showProduct(mausac__arr, giaban__arr);
}
    //Tìm kiếm sản phẩm
function search(){
    var arr3 = document.getElementsByClassName("header--search__input");
    var search_arr =[];
    for(var i=0; i<arr3.length;i++)
    {
        if(arr3[i]!=null) 
            search_arr.push(arr3[i].value);
                                
    }            
}

search();
chon();

//---tim kiếm tên - giá ---

var search__input=document.querySelector('.form-input input');

// search__input.addEventListener('input',function(e){
//     let txtSearch = e.target.value.trim().toLowerCase()
//     let listP=document.querySelectorAll('.product')
//     listP.forEach(item=>{
//         console.log(item.innerText.toLowerCase().includes(txtSearch));
//         if(item.innerText.toLowerCase().includes(txtSearch)){
//             item.classList.remove('none')
//         }
//         else
//         {
//             item.classList.add('none')
//         }
        
//     })
// })

//-- tắt sự kiện nhấn phím Enter load lại trang trên thẻ input
var inputSearch = document.querySelector(".header--search__input");

inputSearch.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
});
    

   // show sản phẩm
   
// function showProduct(mausac__arr=[], giaban__arr=[]){
//     var listProduct = document.querySelector(".list-product__grid");
    
//     listProduct.innerHTML='';
    
//     products.forEach(function(product, index)
//     {
//         // console.log(product);
//         // var name=product.name;
//         // var type=product.type;
//         // var id=product.id;
//         var mau=product.mau;
//         var gia=product.price; 
//         // var img=product.img;
//         // var desc=product.desc; 

//         // lọc theo màu
//         if(mausac__arr.length>0)
//         {
//             if(mausac__arr.includes(mau)==false) 
//             {   
                
//             }
            
//         }  

//         // loc theo gia
//         if(giaban__arr.length>0)
//         {
//             if(gia<200 && giaban__arr.includes('1')==false) 
//             {
                    
//             }
            
//             if(gia>=200 && gia <500 && giaban__arr.includes('2')==false) 
//             {

//             }
//             if(gia>=500 && giaban__arr.includes('3')==false) 
//             {   
                
//             }
            
//         }
        

//         listProduct.innerHTML+=
//         `<div class="l-4 m-6 c-12 product">
//             <div class="product__link">
//                 <div class="product-item product__img">
//                     <img src="${product.img}"></img>
//                 </div>

//                 <div class="product__description-layer">
//                     <div class="product__description">
//                         <div class="product__description--close">
//                             <i class="fa-solid fa-xmark"></i>
//                         </div>

//                         <div class="product-item">
//                             <div class="product-item__img">
//                                 <div class="dscr--product__img">
//                                     <img src="${product.img}" alt="">
//                                 </div>
//                             </div>
//                         </div>

//                         <div class="product__information">
//                             <div class="product-item dscr--product__name">${product.name}</div>
//                             <p class="dscr--product__detail">${product.desc}.</p>
                            
//                             <div class="wrap-price">
//                                 <div class="product-item product__price">$${product.price}</div>
//                                 <div class="buttons__added">
//                                     <input class="minus quantity-btn" type="button" value="-">
//                                     <input class="input-qty" name="" type="text" inputmode="numeric" value="1" min="1" max="10">
//                                     <input class="plus quantity-btn" type="button" value="+">
//                                 </div>
//                             </div>

//                             <div class="buy-btn grid_buy-btn">
//                                 <button type="submit" value=${index}>Add to Cart</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                

//                 <div class="product-item product__name">${product.name}</div>
//                 <p class="product__detail">${product.desc}.</p>
//                 <div class="product-item product__price">$${product.price}</div>

//                 <div class="mobile-product__information">
//                     <div class="product-item dscr--product__name">${product.name}</div>
//                     <p class="dscr--product__detail">${product.desc}.</p>
                    
//                     <div class="wrap-price">
//                         <div class="product-item product__price">$${product.price}</div>
//                         <div class="buttons__added">
//                             <input class="minus quantity-btn" type="button" value="-">
//                             <input class="input-qty" name="" type="text" inputmode="numeric" value="1" min="1" max="10">
//                             <input class="plus quantity-btn" type="button" value="+">
//                         </div>
//                     </div>

//                     <div class="buy-btn grid_buy-btn">
//                         <button type="submit" value=${index}>Add to Cart</button>
//                     </div>
//                 </div>
//             </div>
//         </div>`;
//     })
// }


function searchProductList() {
   let searchValue = document.querySelector(".header--search__input").value;
   let searchProductList = [];

   products.filter((item, i) => {
      if (item.name.includes(searchValue)) {
         searchProductList.push(item)
      }
   });

   console.log(searchProductList);
  
}


searchProductList();





