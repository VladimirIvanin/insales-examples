# Процент скидки

Показывает скидку текущего варианта, когда старая цена выше текущей.

**Где использовать:** внутри формы товара с `data-product-id`.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<form data-product-id="{{ product.id }}" data-product-updated-at="{{ product.updated_at }}">
  <select name="variant_id" data-product-variants='{"default":"option-select"}'>
    {% for variant in product.variants %}<option value="{{ variant.id }}">{{ variant.title | escape }}</option>{% endfor %}
  </select>
  <span data-product-card-price></span>
  <s data-product-card-old-price></s>
  <span data-product-card-sale-value></span>
</form>
```

## Как это работает

Расчёт и форматирование выполняет common.js при обновлении варианта. При отсутствии старой цены компонент очищает отметку; не делите на ноль самостоятельно.

## См. также

[Выбор варианта](variant-selection.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
