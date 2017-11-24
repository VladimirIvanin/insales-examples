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
    height: $('.galleryMain').height(),
    onUpdate: function () {
      // callback
    }
  }])
 */

function responsiveHeight(selector, breakpoints) {
  var defaults = [{
    minWidth: 320,
    height: 'initial',
    onUpdate: function () {}
  }]

  updateHeight();
  $(window).on('resize', function(event) {
    updateHeight();
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
        elementHeight = el.height;
        onUpdate = el.onUpdate;
      }
    });

    $(selector).height(elementHeight);

    if (onUpdate) {
      onUpdate(elementHeight);
    }
  }
}
