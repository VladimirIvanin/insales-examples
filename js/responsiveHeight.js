/*
responsiveHeight('.js-gallery-thumbs', [{
    minWidth: 320,
    height: 'initial',
    onUpdate: function () {
      // callback
    }
  },
  {
    minWidth: 769,
    heightBlock: $('.masonry-item'),
    height: $('.galleryMain').height(),
    onUpdate: function () {
      // callback
    }
  }])
 */

function responsiveHeight(selector, breakpoints) {
  var self = this;

  var defaults = {
    minWidth: 320,
    heightBlock: null, // Можно указать jquery селектор, будет браться его высота
    height: 'initial',
    onUpdate: function () {}
  }

  updateHeight();
  $(window).on('resize', function(event) {
    setTimeout(function () {
      updateHeight();
    }, 100)
  });

  function updateHeight() {
    var winWidth = $(window).width();
    var breakpoint = defaults.minWidth;
    var elementHeight = defaults.height;
    var onUpdate = defaults.onUpdate;
    var _breakpoints = [];
    $.each(breakpoints, function(index, el) {
      if (el.minWidth <= winWidth) {
        _breakpoints.push( el.minWidth );
      }
    });

    _breakpoints.sort(function(a, b) {
      return a - b;
    });

    breakpoint = (_breakpoints[_breakpoints.length - 1]) ? _breakpoints[_breakpoints.length - 1] : breakpoint;

    $.each(breakpoints, function(index, el) {
      if (el.minWidth == breakpoint) {
        if (el.heightBlock) {
          elementHeight = el.heightBlock.outerHeight();
        }else{
          elementHeight = el.height;
        }
        onUpdate = el.onUpdate;
      }
    });

    $(selector).height(elementHeight);

    if (onUpdate) {
      onUpdate(elementHeight);
    }
  }

  return self;
}
