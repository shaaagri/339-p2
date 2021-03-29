


/*
   Performing neccessary setups for all ui elements
*/

$(".accordion-title").click(function(e) {
    // Tutorials used:
    // https://www.w3schools.com/jquery/jquery_traversing_siblings.asp
    // https://www.w3schools.com/howto/howto_js_accordion.asp

    let accordionBody = $(e.target).siblings(".accordion-body");

    accordionBody.toggle();
    $(e.target).toggleClass("active");

    if (accordionBody.is(":visible")) {
        accordionBody.css('max-height', accordionBody.prop('scrollHeight'));
    }
    else {
        accordionBody.css('max-height', '0');
    }
});

/* for product cards, wishlist hearts are inside <a></a> anchors, but 
we do not need the page to change when we click/tap them */
$('.product-card__btn-wishlist-add').click(function(e) {
    e.preventDefault();
});