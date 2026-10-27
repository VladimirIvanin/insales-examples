# Добавление товара в корзину

Добавляет выбранный вариант товара без перезагрузки страницы.

**Где использовать:** шаблон товара или карточка в каталоге.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<form action="{{ cart_url }}" method="post" data-product-id="{{ product.id }}"
  data-product-updated-at="{{ product.updated_at }}">
  <label>Вариант
    <select name="variant_id" data-product-variants='{"default":"option-select"}'>
      {% for variant in product.variants %}<option value="{{ variant.id }}">{{ variant.title | escape }}</option>{% endfor %}
    </select>
  </label>
  <label>Количество <input name="quantity" type="number" value="1" min="1"></label>
  <button type="submit" data-item-add>В корзину</button>
  <a href="{{ cart_url }}">Открыть корзину</a>
</form>
```

## Как это работает

common.js обрабатывает `data-item-add` и использует выбранные вариант и количество. Форма оставляет обычный адрес корзины для перехода. Не добавляйте второй обработчик на эту кнопку.

## См. также

[Выбор варианта](../products/variant-selection.md) · [Уведомление о покупке](added-notice.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
