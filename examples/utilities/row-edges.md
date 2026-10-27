# Элементы на краях строк

Отмечает первый и последний элемент каждой строки переносимой сетки.

**Где использовать:** контейнер с дочерними элементами сетки.

**Зависимости:** JavaScript и CSS.

## Код

```html
<div class="example-grid" data-edge-grid><div>Один</div><div>Два</div><div>Три</div></div>
<style>
.example-grid { display:flex; flex-wrap:wrap; gap:12px; }
.example-grid > * { flex:0 1 180px; padding:16px; box-sizing:border-box; background:#eee; }
.example-grid .is-row-first, .example-grid .is-row-last { outline:2px solid #555; }
</style>
<script>
function markRowEdges(container) {
  const rows = new Map();
  for (const item of container.children) {
    item.classList.remove('is-row-first', 'is-row-last');
    if (!item.getClientRects().length) continue;
    const top = Math.round(item.getBoundingClientRect().top);
    if (!rows.has(top)) rows.set(top, []);
    rows.get(top).push(item);
  }
  for (const items of rows.values()) {
    items[0].classList.add('is-row-first'); items[items.length - 1].classList.add('is-row-last');
  }
}
document.querySelectorAll('[data-edge-grid]').forEach(function (grid) {
  markRowEdges(grid);
  new ResizeObserver(function () { markRowEdges(grid); }).observe(grid);
});
</script>
```

## Как это работает

Строки определяются по положению элементов после раскладки. В отличие от старого примера не требуется неописанная функция `getOffset`.

## См. также

[Выравнивание карточек](equal-height.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
