//  HEADER SCROLL 

var headerElement = document.querySelector('.header');
var stickyHeaderElement = document.querySelector('.header-sticky');

window.onscroll = function(){
    if(document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        stickyHeaderElement.style.top = '0';
    }
    
    else {
        stickyHeaderElement.style.top = '-60px';  
    }
}


var menuIcon = document.querySelector('.mobile-menu__icon');
var overlaySideMenu = document.querySelector('.header__side-menu-container');
var sideMenu = document.querySelector('.header__side-menu');

menuIcon.addEventListener('click', function() {
    overlaySideMenu.classList.toggle('open');
    sideMenu.classList.toggle('open');
    sideMenu.classList.remove('hide');
})

overlaySideMenu.addEventListener('click', function() {
    sideMenu.classList.toggle('hide');
    setTimeout(hideMenu, 450);
    
})

sideMenu.addEventListener('click', function(event) {
    event.stopPropagation();
})

function hideMenu() {
    overlaySideMenu.classList.toggle('open');
    sideMenu.classList.toggle('open');
}

// ----- PRODUCT DESCRIPTION -----

var productImageElement = document.querySelector(".product-item__img");
var descriptionLayer = document.querySelector(".product__description-layer");
var productDescriptionElement = document.querySelector(".product__description");
var closeDescription = document.querySelector(".product__description--close");

function open_closeDescription() {
    productDescriptionElement.classList.toggle("open-description");
    descriptionLayer.classList.toggle("open-description--layer");
    stopPropagation();
}

productImageElement.addEventListener("click", open_closeDescription);

productDescriptionElement.addEventListener("click", function() {
    stopPropagation();
})

function noClosing(event) {
    event.stopPropagation();
}

closeDescription.addEventListener("click", open_closeDescription);
descriptionLayer.addEventListener("click", open_closeDescription);