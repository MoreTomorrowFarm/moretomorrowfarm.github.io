$().ready(function() {
  var titleTop = 0;

  // the initialFontSizePx should match px size from .title-overlay in the css
  // file, e.g. 6em * 16px = 96
  var initialFontSizePx = 96;

  var $titleOverlayEl = $(".title-overlay");
  var fontSize = $titleOverlayEl.css("font-size");
  initialFontSizePx = fontSize.substr(0, fontSize.length - 2);

  reset();
  $(window).resize(reset);
  $(window).scroll(updateTitle);

  //
  var elements = document.querySelectorAll("#first-page");
  Stickyfill.add(elements);

  function reset() {
    var $titleOverlayEl = $(".title-overlay");

    // recalculate base values we use to calculate everything else
    titleTop = $titleOverlayEl.position().top;

    updateTitle();
  }

  function updateTitle() {
    var scrollTop = $(window).scrollTop();
    var $el = $(".title-overlay");

    // if we've scrolled passed the top of the title
    if (scrollTop >= titleTop) {
      $el.addClass("fixed-title");

      // scale the title font size as we scroll
      var newFontSize = initialFontSizePx - (scrollTop - titleTop) / 10;
      if (newFontSize > 32) {
        $($el).css("font-size", newFontSize + "px");
      } else {
        $($el).css("font-size", "32" + "px");
      }

      // align items along X-axis if we get beloew a 4em font size
      var $socialIconsEl = $(".social-icons");
      if (newFontSize < 64) {
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
      $($el).css("font-size", initialFontSizePx + "px");
    }
  }
});

function scrollTo(id) {
  $("html, body").animate(
    {
      scrollTop: $(id).offset().top
    },
    750
  );
}
