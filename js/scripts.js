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




/*         P O S T - I N I T I A L I Z A T I O N       */
/* =================================================== */
$('#main-nav__dropdown').css('visibility', 'visible');  // to prevent dropdown's flash upon the page load
$('#main-nav__dropdown').hide();

$(".tab-control__buttons li.active" ).trigger('click');