# Шаблон карточки товара с Template

Рендерит название и цену динамически полученного товара.

**Где использовать:** шаблон товара.

**Зависимости:** common.js v2 и jQuery; отдельный глобальный Lodash не нужен.

## Код

```liquid
<div data-example-product-template data-id="{{ product.id }}"><p data-status>Загрузка…</p><div data-result></div></div>
<script type="text/template" data-template-id="example-product">
  <a href="<%- product.url %>"><%- product.title %></a>
  <span><%- Shop.money.format(product.price_min) %></span>
</script>
<script>
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-example-product-template]:not([data-ready])').forEach(function (root) {
    root.dataset.ready = 'true';
    Products.get(Number(root.dataset.id)).done(function (product) {
      root.querySelector('[data-result]').innerHTML = Template.render({ product: product }, 'example-product');
      root.querySelector('[data-status]').textContent = '';
    }).fail(function () { root.querySelector('[data-status]').textContent = 'Не удалось загрузить товар'; });
  });
});
</script>
```

## Как это работает

`Template.render` использует встроенный компилятор; `<%- ... %>` экранирует HTML. В отличие от старого примера проверка и покупка вариантов вынесены в отдельные рецепты.

## См. также

[Выбор варианта](variant-selection.md) · [Шаблон корзины](../cart/lodash-cart-template.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
