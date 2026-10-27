# Характеристики товара

Выводит названия свойств и значений товара.

**Где использовать:** шаблон товара или карточка товара.

**Зависимости:** Liquid, без JavaScript.

## Код

```liquid
{% if product.characteristics.size > 0 %}
  <dl>
    {% for characteristic in product.characteristics %}
      <dt>{{ characteristic.property.title | escape }}</dt>
      <dd>{{ characteristic.title | escape }}</dd>
    {% endfor %}
  </dl>
{% endif %}
```

## Как это работает

Если у одного свойства несколько значений, каждое выводится отдельно. Значения экранируются как текст.

## См. также

[Процент скидки](discount-percentage.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
