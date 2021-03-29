/*
    Requires: jQuery 
    Tested with: jQuery 3.6.0
*/

var index = 1;
var slideCount = $("#product-view__gallery > img").length;

$("#product-view__gallery_thumbnails > img").click(function(e) {
    let imgIndex = $("#product-view__gallery_thumbnails > img").index(e.target) + 1;
    carouselGoTo(imgIndex);
});

carouselUpdate();

function carouselRotate(value) {
    if ((value < 0 && (index + value >= 1)) || 
        (value > 0 && (index + value <= slideCount))) {
        index += value;
    }
    else if (value > 0) {
        index = 1;
    }
    else if (value < 0) {
        index = slideCount;
    }

    carouselUpdate();
}

function carouselUpdate() {
    $("#product-view__gallery > img").hide();
    $("#product-view__gallery_thumbnails > img").removeClass("active");
    $("#product-view__gallery > img").eq(index-1).show();
    $("#product-view__gallery_thumbnails > img").eq(index-1).addClass("active");
    $("#product-view__gallery__image__number").text(index + "/" + slideCount);  
}

function carouselGoTo(value) {
    index = value;
    carouselUpdate();
}
