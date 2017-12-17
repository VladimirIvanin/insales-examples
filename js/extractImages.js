/**
 * Извлечь ссылки на картинки из html
 * @param  {text} текст из блока html
 * @return {array} Массив изображений
 */
function extractImages(html) {
  var images = [];
  var $content = $(html);
  if ($content.find('img').length > 0) {
    $content = $content.find('img');
  }

  $content.each(function(index, el) {
    if ($(el).is('img')) {
      images.push($(el).prop('src'));
    }
  });

  return images;
}


/**
 * <script type="text/javascript">
 * var images = extractImages({{ block.html | json }})
 * </script>
 */
