$().ready(function() {
  var titleTop = 0;
  var initialFontSizeEm = 6;

  reset();
  $(window).resize(reset);
  $(window).scroll(updateTitle);
  $(window).scroll(updateStrips);

  function reset() {
    const $titleOverlayEl = $(".title-overlay");

    // recalculate base values we use to calculate everything else
    titleTop = $titleOverlayEl.position().top;

    // var fontSize =
    //     initialFontSizeEm = parseInt($titleOverlayEl.css("font-size");
    var fontSize = $titleOverlayEl.css("font-size");
    console.log(fontSize);
    // initialFontSizeEm = fontSize.substr(0, fontSize.length - 2);
    console.log("initialFontSizeEm: ", initialFontSizeEm);

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
      } else {
        $($el).css("font-size", "2" + "em");
      }

      // align items along X-axis if we get beloew a 4em font size
      var $socialIconsEl = $(".social-icons");
      if (newFontSize < 4) {
        $($socialIconsEl)
          .removeClass("grid-y")
          .addClass("grid-x")
          .css("padding-right", "4px");
      } else {
        $($socialIconsEl)
          .removeClass("grid-x")
          .addClass("grid-y")
          .css("padding-right", null);
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
    if (scrollTop > windowHeight * 0.8) {
      $el.addClass("fixed-strips");
    } else {
      $el.removeClass("fixed-strips");
    }
  }

  function scrollTo(id) {
    $("html, body").animate(
      {
        scrollTop: $(id).offset().top
      },
      750
    );
  }
});
