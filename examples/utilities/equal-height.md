# Одинаковая высота карточек

Выравнивает элементы внутри одной строки без вычисления отступов.

**Где использовать:** сетка карточек.

**Зависимости:** CSS.

## Код

```html
<div class="example-equal-height">
  <article><h3>Короткий заголовок</h3><p>Описание</p></article>
  <article><h3>Заголовок, который занимает две строки</h3><p>Описание</p></article>
</div>
<style>
.example-equal-height { display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:16px; align-items:stretch; }
.example-equal-height article { display:flex; flex-direction:column; padding:16px; border:1px solid #ddd; }
</style>
```

## Как это работает

CSS Grid выравнивает внешнюю высоту карточек в строке. Это заменяет прежний расчёт высот и отступов в JavaScript; выравнивание отдельных внутренних элементов потребует общей сетки содержимого.

## См. также

[Края строк](row-edges.md) · [Адаптивная высота](responsive-height.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
