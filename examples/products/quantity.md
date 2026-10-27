# Количество с минимальным значением и шагом

Покупатель меняет количество кнопками или вводит его вручную.

**Где использовать:** внутри формы товара с `data-product-id`.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<form action="{{ cart_url }}" method="post" data-product-id="{{ product.id }}"
  data-product-updated-at="{{ product.updated_at }}">
  <input type="hidden" name="variant_id" value="{{ product.variants.first.id }}">
  <div data-quantity data-min="1" data-step="1">
    <button type="button" data-quantity-change="-1" aria-label="Уменьшить количество">−</button>
    <label>Количество <input name="quantity" type="number" min="1" step="1" value="1"></label>
    <button type="button" data-quantity-change="1" aria-label="Увеличить количество">+</button>
  </div>
  <button type="submit" data-item-add>В корзину</button>
</form>
```

## Как это работает

Для товара с вариантами замените скрытое поле селектором из связанного примера. Минимум и шаг здесь равны единице; если магазин продаёт дробное количество, используйте допустимые единицы и шаг товара.

## См. также

[Выбор варианта](variant-selection.md) · [Количество в корзине](../cart/update-quantity.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
