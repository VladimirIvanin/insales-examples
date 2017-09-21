/**
 * Извлечь ссылки на картинки из html
 * @param  {text} текст из блока html
 * @return {array} Массив изображений
 */
function insertImages(html) {
  var images = [];
  var $content = $(html);
  $content.find('img').each(function(index, el) {
    images.push($(el).prop('src'));
  });

  return images;
}
