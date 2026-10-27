# Сортировка и размер страницы

Отправляет порядок сортировки и количество товаров на странице.

**Где использовать:** шаблон категории.

**Зависимости:** Liquid, без JavaScript.

## Код

```liquid
{% assign selected_page_size = page_size | plus: 0 %}
<form action="{{ collection.url }}" method="get">
  <label>Сортировка
    <select name="order">
      <option value="">По умолчанию</option>
      <option value="price" {% if order == 'price' %}selected{% endif %}>Цена по возрастанию</option>
      <option value="descending_price" {% if order == 'descending_price' %}selected{% endif %}>Цена по убыванию</option>
    </select>
  </label>
  <label>Товаров на странице
    <select name="page_size">
      <option value="12" {% if selected_page_size == 12 %}selected{% endif %}>12</option>
      <option value="24" {% if selected_page_size == 24 %}selected{% endif %}>24</option>
      <option value="48" {% if selected_page_size == 48 %}selected{% endif %}>48</option>
    </select>
  </label>
  <button>Применить</button>
</form>
```

## Как это работает

При добавлении формы к существующему фильтру перенесите его активные поля в эту форму, чтобы не потерять выбранные условия. Допустимые значения сортировки зависят от контракта магазина.

## См. также

[Фильтр цены](ajax-filter.md) · [Пагинация](../navigation/pagination.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
