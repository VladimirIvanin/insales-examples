# Дополнительные опции товара

Добавляет к форме товара выбираемые покупателем дополнительные опции.

**Где использовать:** форма товара; у товара должны быть настроены дополнительные опции.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<form action="{{ cart_url }}" method="post" data-product-id="{{ product.id }}"
  data-product-updated-at="{{ product.updated_at }}">
  <select name="variant_id" data-product-variants='{"default":"option-select"}'>
    {% for variant in product.variants %}<option value="{{ variant.id }}">{{ variant.title | escape }}</option>{% endfor %}
  </select>
  {% unless product.is_bundle %}{% if product.accessories.size > 0 %}
    <div data-product-accessories></div>
    <template data-product-accessories-template>
      <div data-product-accessories-item>
        <strong data-product-accessory-name></strong>
        <span data-product-accessory-minmax-count='{"minCountMessage":"от","maxCountMessage":"до"}'></span>
        <div data-product-accessory-values></div>
        <div data-product-accessory-error='{"lessThenMinCount":"Выбрано меньше минимума","moreThenMaxCount":"Выбрано больше максимума","scrollEnabled":"true"}'></div>
      </div>
    </template>
    <template data-product-accessory-values-template>
      <label data-product-accessory-values-item data-product-accessory-values-item-id>
        <span data-product-accessory-values-item-name></span> (+<span data-product-accessory-values-item-price></span>)
      </label>
    </template>
  {% endif %}{% endunless %}
  <span data-product-card-price-from-cart></span>
  <button type="submit" data-item-add>В корзину</button>
</form>
```

## Как это работает

Шаблоны остаются внутри формы. Компонент подставляет варианты опций, учитывает ограничения и передаёт выбранные значения в корзину.

## См. также

[Выбор варианта](variant-selection.md) · [Количество в корзине](../cart/update-quantity.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
