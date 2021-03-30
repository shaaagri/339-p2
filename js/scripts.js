/*
   header todo
*/


"use strict";


/*              I N I T I A L I Z A T I O N            */
/* =================================================== */


/* 
    performing neccessary setups for all ui components  
*/

var dropdownUnderMouse = false;

/* handling the navigation bar dropdown */
$(".main-nav__central-item").hover(
    function() {
        /* moving the arrow to proper place depending on what we selected - womens or mens 
          they're supposed to be two different dropowns, but they're same in this iteration */
        showMainNavDropdown( $(this).attr('aria-label') );
    }, 
    function() {
        if (!dropdownUnderMouse) {
            /* Tutorial used: https://community.esri.com/t5/arcgis-appstudio-blog/ecmascript-7-settimeout-and-arrow-functions/ba-p/895514 */
            setTimeout(() => {if (!dropdownUnderMouse) { hideMainNavDropdown(); }}, 1000);
        }      
    }
);
$('#main-nav__dropdown').hover(
    /* this is used to keep the dropdown onscreen if the cursor went from the 
    WOMENS/MENS button to the menu */
    function() { dropdownUnderMouse = true; }, 
    function() { hideMainNavDropdown(); }
);
function showMainNavDropdown(section) {
    $('#main-nav__dropdown__arrow').removeClass('mens');
    $('#main-nav__dropdown__arrow').removeClass('womens');
    $('#main-nav__dropdown__arrow').addClass(section);
    $('#main-nav__dropdown').show();
}
function hideMainNavDropdown() {
    $('#main-nav__dropdown').fadeOut(100);   
    dropdownUnderMouse = false;
}

$(".accordion-title").click(function(e) {
    // Tutorials used:
    // https://www.w3schools.com/jquery/jquery_traversing_siblings.asp
    // https://www.w3schools.com/howto/howto_js_accordion.asp

    let accordionBody = $(e.target).siblings(".accordion-body");

    if ($(e.target).hasClass("active") && $(e.target).hasClass("unclosable")) {
        return;
    }

    accordionBody.toggle();
    $(e.target).toggleClass("active");

    if (accordionBody.is(":visible")) {
        accordionBody.css('max-height', accordionBody.prop('scrollHeight'));
    }
    else {
        accordionBody.css('max-height', '0');
    }
});

/* opening accordions that intended to be opened from the beginning */
$(".accordion.active .accordion-title").trigger("click");


/* 
    tabs
*/

$(".tab-control__tab").hide();

$(".tab-control__buttons li").click(function(e) {
    let tabIndex = $(e.target).parent().children().index(e.target);
     
    $(".tab-control__tab").hide();

    $(e.target).parent().parent().parent()
        .find(".tab-control__tab").eq(tabIndex).show();

    $(e.target).parent().children().removeClass('active');
    $(e.target).addClass('active');
});


/*
    text inputs
*/

/*  Enabling showing and hiding passwords inside password inputs  */ 
$(".inp-text__password-toggle").click(function(e) {
    let passwordInput = $(e.target).siblings("input");

    if (passwordInput.attr('type') == "password") {
        $(e.target).siblings("input").attr('type', 'text'); 

        $(e.target).removeClass("fa-eye");
        $(e.target).addClass("fa-eye-slash");
    }
    else {
        $(e.target).siblings("input").attr('type', 'password'); 

        $(e.target).removeClass("fa-eye-slash");
        $(e.target).addClass("fa-eye");
    }
});


/* 
    other
*/

/* handling wishlist hearts buttons */
$('.product-card__btn-wishlist-add').click(function(e) {
    /* for product cards, wishlist hearts are inside <a></a> anchors, but 
    we do not need the page to change when we click/tap them */
    e.preventDefault();
    
    $(e.target).parent().toggleClass('active');
});

/* handling product catalog side controls */
$(".catalog-control .accordion-body li").click(function(e) {
    $(e.target).siblings("li").removeClass('active');
    $(e.target).addClass('active');
});

/* shopping cart items table buttons */
$(".shopping-cart__table__item-qty i").click(function(e) {
    let qtyNumber = $(e.target).siblings(".shopping-cart__table__item-qty-number").text();
    
    if ($(e.target).hasClass("fa-caret-square-left") && qtyNumber > 1) {
        qtyNumber--;
    }
    else if ($(e.target).hasClass("fa-caret-square-right") && qtyNumber < 99) {
        qtyNumber++;
    }

    $(e.target).siblings(".shopping-cart__table__item-qty-number").text(qtyNumber);
});

/* randomized links for the under construction page */
var pages = [
    'about_us.htm',
    'citations.htm',
    'help.htm',
    'index.htm',
    'product_details.htm',
    'product_details_2.htm',
    'product_details_3.htm',
    'products.htm',
    'shopping_cart.htm',
    'sign_in.htm',
    'sign_up.htm'
];
$("#random-link").attr("href", pages[(Math.floor(Math.random() * pages.length-1) + 1)]);


/*         P O S T - I N I T I A L I Z A T I O N       */
/* =================================================== */
$('#main-nav__dropdown').css('visibility', 'visible');  // to prevent dropdown's flash upon the page load
$('#main-nav__dropdown').hide();

$(".tab-control__buttons li.active" ).trigger('click');

// for the Help page
if ($("main").attr("id") == "help") {
    // Citation: https://stackoverflow.com/questions/3552944/how-to-get-the-anchor-from-the-url-using-jquery

    /* This opens the demanded help section when opened from the footer */
    switch ($(location).attr('hash')) {
        case '#delivery':
            $(".tab-control__buttons li").eq(2).trigger("click");
            break;
        case '#payment':
            $(".tab-control__buttons li").eq(3).trigger("click");
            break;
        case '#club-membership':
            $(".tab-control__buttons li").eq(5).trigger("click");
            break;
     }
}

// temporary enabling buttons in the top nav dropdown (all lead to the product
// catalog mockup page) - bit ugly and bad SEO, but it is temporary, so...
$('#main-nav__dropdown li').click(function(e) {
    window.location.href = "products.htm";
});
