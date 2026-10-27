# Шаблон корзины с Template

Рендерит список позиций при обновлении корзины.

**Где использовать:** шаблон темы.

**Зависимости:** common.js v2 и jQuery; отдельная глобальная библиотека Lodash не требуется.

## Код

```html
<div data-example-basket></div>
<script type="text/template" data-template-id="example-basket">
  <% if (!order_lines.length) { %><p>Корзина пуста</p><% } %>
  <ul><% order_lines.forEach(function (item) { %>
    <li><%- item.title %> — <%- item.quantity %> × <%- Shop.money.format(item.sale_price) %></li>
  <% }); %></ul>
  <p>Итого: <%- Shop.money.format(total_price) %></p>
</script>
<script>
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-example-basket]:not([data-ready])').forEach(function (root) {
    root.dataset.ready = 'true';
    EventBus.subscribe('update_items:insales:cart', function (cart) { root.innerHTML = Template.render(cart, 'example-basket'); });
  });
});
</script>
```

## Как это работает

`Template` компилирует шаблон после загрузки документа; `<%- ... %>` экранирует выводимые значения. Шаблон показывает состав и сумму, а для управления количеством используйте штатную форму корзины.

## См. также

[Сумма корзины](summary.md) · [Шаблон товара](../products/lodash-product-template.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
