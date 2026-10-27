# Кнопка покупки со счётчиком

После добавления товара кнопка превращается в счётчик: покупатель может увеличить или уменьшить количество и перейти в корзину.

**Где использовать:** карточка или страница товара. Для выбора варианта нужен объект `product`.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<form action="{{ cart_url }}" method="post" data-product-id="{{ product.id }}"
  data-product-updated-at="{{ product.updated_at }}">
  {% if product.show_variants? and product.variants.size > 1 %}
    <select name="variant_id" data-product-variants='{"default":"option-select"}' aria-label="Вариант товара">
      {% for variant in product.variants %}
        <option value="{{ variant.id }}">{{ variant.title | escape }}</option>
      {% endfor %}
    </select>
  {% else %}
    <input type="hidden" name="variant_id" value="{{ product.variants.first.id }}">
  {% endif %}

  <div class="cart-counter" data-add-cart-counter='{"step":1}'>
    <button class="cart-counter__buy" type="button" data-add-cart-counter-btn>В корзину</button>
    <div class="cart-counter__controls">
      <button type="button" data-add-cart-counter-minus aria-label="Уменьшить количество">−</button>
      <a href="{{ cart_url }}">В корзине: <span data-add-cart-counter-count>0</span></a>
      <button type="button" data-add-cart-counter-plus aria-label="Увеличить количество">+</button>
    </div>
  </div>
</form>

<style>
.cart-counter__controls { display: none; align-items: center; gap: 8px; }
.cart-counter.is-add-cart .cart-counter__buy { display: none; }
.cart-counter.is-add-cart .cart-counter__controls { display: inline-flex; }
.cart-counter button { min-width: 44px; min-height: 44px; }
</style>
```

## Как это работает

common.js управляет кнопками и количеством через data-атрибуты, а класс `is-add-cart` переключает два состояния. `step` в примере равен единице; для товара с другой единицей измерения задайте допустимый шаг.

Разместите счётчик внутри формы товара. Для опций с дополнительной стоимостью используйте также [разметку опций](accessories.md); не добавляйте параллельный обработчик покупки на эту кнопку.

## См. также

[Выбор варианта](variant-selection.md) · [Изменение количества в корзине](../cart/update-quantity.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
