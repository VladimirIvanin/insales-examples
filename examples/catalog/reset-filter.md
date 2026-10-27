# Сброс фильтров категории

Убирает выбранные фильтры и возвращает исходный список категории.

**Где использовать:** шаблон категории.

**Зависимости:** Liquid, без JavaScript.

## Код

```liquid
<form action="{{ collection.url }}" method="get">
  <label>Цена от <input type="number" min="0" name="price_min" value="{{ price_min | escape }}"></label>
  <label>Цена до <input type="number" min="0" name="price_max" value="{{ price_max | escape }}"></label>
  <button type="submit">Применить</button>
  <a href="{{ collection.url }}">Сбросить фильтры</a>
</form>
```

## Как это работает

Ссылка открывает адрес категории без параметров фильтра. Она также сбрасывает сортировку и страницу: если их нужно сохранить, добавьте разрешённые параметры в ссылку явно.

## См. также

[Фильтр цены](ajax-filter.md) · [Сортировка](sort-and-page-size.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
