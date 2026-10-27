# Сортировка с сохранением фильтров

Меняйте порядок товаров, не теряя выбранные характеристики, значения свойств, диапазоны и поиск.

**Где использовать:** шаблон категории с включёнными фильтрами.

**Зависимости:** Liquid.

## Код

```liquid
<form action="{{ collection.url }}" method="get">
  <label>Сортировка
    <select name="order">
      {{ '' | select_option: order, 'По умолчанию' }}
      {{ 'price' | select_option: order, 'Цена по возрастанию' }}
      {{ 'descending_price' | select_option: order, 'Цена по убыванию' }}
      {{ 'descending_age' | select_option: order, 'Сначала новые' }}
      {{ 'title' | select_option: order, 'По названию' }}
    </select>
  </label>

  {% for characteristic in collection.current_characteristics %}
    <input type="hidden" name="characteristics[]" value="{{ characteristic.id }}">
  {% endfor %}
  {% for property in collection.current_numeric_properties %}
    {% if property.is_numeric? and property.gt_value %}
      <input type="hidden" name="properties_gt[{{ property.id }}]" value="{{ property.gt_value | escape }}">
    {% endif %}
    {% if property.is_numeric? and property.lt_value %}
      <input type="hidden" name="properties_lt[{{ property.id }}]" value="{{ property.lt_value | escape }}">
    {% endif %}
  {% endfor %}
  {% for value in collection.current_option_values %}
    <input type="hidden" name="options[{{ value.option_name.id }}][]" value="{{ value.id }}">
  {% endfor %}
  {% if price_min %}<input type="hidden" name="price_min" value="{{ price_min | escape }}">{% endif %}
  {% if price_max %}<input type="hidden" name="price_max" value="{{ price_max | escape }}">{% endif %}
  {% if page_size %}<input type="hidden" name="page_size" value="{{ page_size | escape }}">{% endif %}
  {% if search.query != '' %}<input type="hidden" name="q" value="{{ search.query | escape }}">{% endif %}
  {% if language.not_default? %}<input type="hidden" name="lang" value="{{ language.locale | escape }}">{% endif %}

  <button type="submit">Применить</button>
</form>
```

## Как это работает

Скрытые поля передают выбранные характеристики, числовые диапазоны, значения свойств, цену, поиск, язык и размер страницы. Фильтр `select_option` выбирает текущий порядок сортировки. Номер страницы не передаётся: после сортировки покупатель увидит первую страницу результата.

Если в вашей теме есть дополнительные параметры фильтрации, добавьте их в форму отдельно.

## См. также

[Фильтр цены](ajax-filter.md) · [Сортировка и размер страницы](sort-and-page-size.md) · [Пагинация](../navigation/pagination.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
