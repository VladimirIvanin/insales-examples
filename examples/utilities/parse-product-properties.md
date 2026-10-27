# Группировка характеристик и скидка

Группирует характеристики по свойствам и вычисляет скидку выбранного варианта.

**Где использовать:** JavaScript с объектом товара, полученным из API.

**Зависимости:** Без библиотек.

## Код

```js
function productProperties(product, variant) {
  const groups = Object.create(null);
  for (const property of product.properties || []) {
    groups[property.permalink] = {
      title: property.title,
      characteristics: (product.characteristics || []).filter(item => item.property_id === property.id)
    };
  }
  const price = Number(variant && variant.price), oldPrice = Number(variant && variant.old_price);
  const discount = Number.isFinite(price) && oldPrice > price && oldPrice > 0
    ? Math.round((oldPrice - price) / oldPrice * 100) : 0;
  return { groups, discount };
}
```

## Как это работает

Функция не изменяет исходный товар и считает скидку только для переданного варианта. Для цен и наличия, которые меняются при выборе варианта, используйте штатные атрибуты common.js.

## См. также

[Характеристики товара](../products/characteristics.md) · [Процент скидки](../products/discount-percentage.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
