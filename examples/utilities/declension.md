# Склонение слова по количеству

Выбирает форму «товар», «товара» или «товаров».

**Где использовать:** Liquid-шаблон или JavaScript темы.

**Зависимости:** Liquid; JavaScript-вариант не требует библиотек.

## Код

```liquid
{% assign count = cart.items_count %}
{% assign last_two = count | modulo: 100 %}
{% assign last = count | modulo: 10 %}
{% assign word = 'товаров' %}
{% if last_two < 11 or last_two > 14 %}
  {% if last == 1 %}{% assign word = 'товар' %}{% elsif last >= 2 and last <= 4 %}{% assign word = 'товара' %}{% endif %}
{% endif %}
{{ count }} {{ word }}
```

```js
function decline(number, forms = ['товар', 'товара', 'товаров']) {
  const n = Math.abs(Math.trunc(Number(number)));
  if (!Number.isFinite(n)) return forms[2];
  const last = n % 10, lastTwo = n % 100;
  return forms[lastTwo >= 11 && lastTwo <= 14 ? 2 : last === 1 ? 0 : last >= 2 && last <= 4 ? 1 : 2];
}
```

## Как это работает

Для коллекции используйте `collection.products_count`. JavaScript-функция берёт абсолютную целую часть и возвращает множественную форму для нечислового значения.

## См. также

[Дата статьи](russian-month.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
