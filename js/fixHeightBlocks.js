/**
 * Выравнивание блоков по высоте
 * @param  {string} selector      блоки которые нужно выровнять
 * @param  {string} innerSelector внутренний блок
 * @param  {string} _cssValue     css свойство для подстановки значения
 *
  fixHeightBlocks('.card', '.card-title', 'padding-bottom')

   $(window).on('resize', function(event) {
     fixHeightBlocks('.card', '.card-title', 'padding-bottom')
   });
 */
function fixHeightBlocks(selector, innerSelector, _cssValue) {
  var cssValue = _cssValue || 'margin-bottom';
  var $blocks = $(selector);
  var groups = {};

  $blocks.each(function(index, el) {
    if ($(el).is(':visible')) {
      var scrolltop = $(el).offset().top;

      if (!groups[scrolltop]) {
        groups[scrolltop] = {
          isMax: 0,
          items: []
        }
      }

      groups[scrolltop].items.push(el);

      if ($(el).outerHeight() > groups[scrolltop].isMax) {
        groups[scrolltop].isMax = $(el).outerHeight();
      }

    }
  });

  $.each(groups, function(index, group) {
    var isMax = group.isMax;
    var $blocks = group.items;
    var _margin = 0;
    $.each($blocks, function(index, el) {
      var $item = $(el);
      if (innerSelector) {
        $item = $(el).find(innerSelector);
      }
      var delta = patchNumber($item.css(cssValue));
      var mainHeight = $item.outerHeight() - delta;
      _margin = isMax - mainHeight;

      if (_margin < 0) {
        _margin = 0;
      }

      $item.css(cssValue, _margin);

    });
  });

  function patchNumber (num) {
    var isString = typeof num == 'string';
    var isNumber = typeof num == 'number';

    if (!isNumber && !isString) {
      return 0;
    }

    if(isString){
      num = num.replace(/,/g, '.');
      num = num.replace(/px/g, '');
      num = (isNaN(+num)) ? 1 : +num;
    }

    function isFloat(n){
      return Number(n) === n && n % 1 !== 0;
    }

    return Number( (isFloat(num)) ? num.toFixed(2) : num );
  }
}
