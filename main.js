var titleTop = 0;
var initialFontSizeEm = 6;

$().ready(function() {
  titleTop = $(".title-overlay").position().top;
  $(window).scroll(updateTitle);
  $(window).scroll(updateStrips);
  $(window).resize(onResize);
});

function onResize() {
  // recalculate base values we use to calculate everything else
  titleTop = $(".title-overlay").position().top;
  updateTitle();
  updateStrips();
}

function updateTitle() {
  var scrollTop = $(window).scrollTop();
  var $el = $(".title-overlay");
  if (scrollTop >= titleTop) {
    $el.addClass("fixed-title");
    const newFontSize = initialFontSizeEm - (scrollTop - titleTop) / 100;
    if (newFontSize > 2) {
      $($el).css("font-size", newFontSize + "em");
    }
  } else {
    $el.removeClass("fixed-title");
    $($el).css("font-size", initialFontSizeEm + "em");
  }
}

function updateStrips() {
  var scrollTop = $(window).scrollTop();
  var windowHeight = $(window).height();
  var $el = $(".image-strips");
  console.log("windowHeight: ", windowHeight);
  console.log("scrollTop: ", scrollTop);
  if (scrollTop > windowHeight * 0.8) {
    $el.addClass("fixed-strips");
  } else {
    $el.removeClass("fixed-strips");
  }
}
