# Кнопка избранного и счётчик

Добавляет товар в избранное и показывает число сохранённых товаров.

**Где использовать:** карточка товара; счётчик можно разместить в шапке.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<button type="button" data-ui-favorites-trigger="{{ product.id }}">
  <span data-ui-favorites-trigger-added-text="В избранном"
    data-ui-favorites-trigger-not-added-text="В избранное">В избранное</span>
</button>
<a href="/favorites">Избранное: <span data-ui-favorites-counter>0</span></a>
```

## Как это работает

common.js синхронизирует состояние всех кнопок и счётчиков на странице. После вставки карточек через AJAX вызовите `FavoritesProducts.update()`.

## См. также

[Список избранного](favorites-list.md) · [Сравнение товаров](comparison.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
