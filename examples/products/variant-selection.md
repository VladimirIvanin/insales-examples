# Выбор варианта товара

Покупатель выбирает вариант и видит его цену, артикул и наличие.

**Где использовать:** шаблон товара или карточка внутри цикла товаров.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<form action="{{ cart_url }}" method="post"
  data-product-id="{{ product.id }}" data-product-updated-at="{{ product.updated_at }}">
  <label>Вариант
    <select name="variant_id" data-product-variants='{"default":"option-select"}'>
      {% for variant in product.variants %}
        <option value="{{ variant.id }}">{{ variant.title | escape }}</option>
      {% endfor %}
    </select>
  </label>
  <p>Цена: <span data-product-card-price></span> <s data-product-card-old-price></s></p>
  <p data-product-card-sku='{"skuLabel":"Артикул: "}'></p>
  <p data-product-card-available='{"availableText":"В наличии","notAvailableText":"Нет в наличии"}'></p>
  <input type="number" name="quantity" min="1" value="1">
  <button type="submit" data-item-add>В корзину</button>
</form>
```

## Как это работает

common.js инициализирует каждую форму по `data-product-id` и обновляет поля при выборе варианта. Доступность покупки зависит от настроек магазина; не определяйте её только по тексту на странице.

## См. также

[Количество товара](quantity.md) · [Добавление в корзину](../cart/add-product.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
