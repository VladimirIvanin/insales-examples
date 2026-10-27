# Изображение выбранного варианта

При смене варианта главное изображение меняется, а миниатюры остаются доступными.

**Где использовать:** шаблон товара.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<div data-example-gallery>
  {% if product.first_image %}
    <img data-main-image src="{{ product.first_image.large_url }}" alt="{{ product.title | escape }}">
  {% endif %}
  <div>
    {% for image in product.images %}
      <button type="button" data-image-url="{{ image.large_url | escape }}" aria-label="Показать изображение {{ forloop.index }}">
        <img src="{{ image.small_url }}" alt="" loading="lazy">
      </button>
    {% endfor %}
  </div>
  <form data-product-id="{{ product.id }}" data-product-updated-at="{{ product.updated_at }}">
    <select name="variant_id" data-product-variants='{"default":"option-select"}'>
      {% for variant in product.variants %}<option value="{{ variant.id }}">{{ variant.title | escape }}</option>{% endfor %}
    </select>
  </form>
</div>
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-example-gallery]:not([data-ready])').forEach(function (root) {
      root.dataset.ready = 'true';
      var image = root.querySelector('[data-main-image]');
      root.addEventListener('click', function (event) {
        var button = event.target.closest('[data-image-url]');
        if (button && image) image.src = button.dataset.imageUrl;
      });
      EventBus.subscribe('change_variant:insales:product', function (data) {
        var form = data.action && data.action.product && data.action.product[0];
        if (image && form && root.contains(form) && data.first_image && data.first_image.large_url) {
          image.src = data.first_image.large_url;
        }
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
<style>
[data-example-gallery] [data-main-image] { max-width: 100%; height: auto; }
[data-example-gallery] button img { width: 64px; height: 64px; object-fit: cover; }
</style>
```

## Как это работает

У каждого блока свой корень; событие другого товара не меняет изображение. Если изображение варианта отсутствует, остаётся выбранная ранее фотография.

## См. также

[Выбор варианта](variant-selection.md) · [Адаптивные изображения](../content/responsive-images.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
