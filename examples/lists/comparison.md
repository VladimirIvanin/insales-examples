# Таблица сравнения товаров

Показывает свойства товаров, удаляет позицию и скрывает одинаковые строки.

**Где использовать:** шаблон страницы сравнения с объектами `products` и `properties`.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<div data-example-compare>
  <label><input type="checkbox" data-only-different> Только различия</label>
  <div style="overflow-x:auto">
    <table>
      <thead><tr><th>Свойство</th>{% for product in products %}
        <th data-product-column="{{ product.id }}">
          <a href="{{ product.url }}">{{ product.title | escape }}</a>
          <button type="button" data-compare-delete="{{ product.id }}">Удалить</button>
        </th>{% endfor %}</tr></thead>
      <tbody>{% for property in properties %}
        <tr data-property-row><th>{{ property.title | escape }}</th>
          {% for product in products %}
            <td data-product-column="{{ product.id }}">{% for value in product.properties[property.handle].characteristics %}{{ value.title | escape }}{% unless forloop.last %}, {% endunless %}{% else %}—{% endfor %}</td>
          {% endfor %}
        </tr>{% endfor %}</tbody>
    </table>
  </div>
  <p data-empty {% if products.size > 0 %}hidden{% endif %}>Нет товаров для сравнения</p>
</div>
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-example-compare]:not([data-ready])').forEach(function (root) {
      root.dataset.ready = 'true'; var toggle = root.querySelector('[data-only-different]');
      function refresh() {
        var count = root.querySelectorAll('thead [data-product-column]').length;
        root.querySelector('[data-empty]').hidden = count > 0;
        root.querySelectorAll('[data-property-row]').forEach(function (row) {
          var values = Array.from(row.querySelectorAll('td')).map(function (cell) { return cell.textContent.trim(); });
          row.hidden = toggle.checked && new Set(values).size <= 1;
        });
      }
      toggle.addEventListener('change', refresh);
      EventBus.subscribe('remove_item:insales:compares', function (data) {
        if (!data.action) return;
        root.querySelectorAll('[data-product-column]').forEach(function (cell) {
          if (cell.dataset.productColumn === String(data.action.item)) cell.remove();
        });
        refresh();
      });
      refresh();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

Таблица получает товары и свойства от шаблона страницы сравнения. Кнопка использует штатный обработчик common.js; одинаковость пересчитывается после удаления.

## См. также

[Кнопка избранного](favorites-button.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
