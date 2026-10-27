# Ранее просмотренные товары

Показывает товары в порядке просмотра, кроме текущего товара.

**Где использовать:** любая страница темы.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<div data-example-viewed data-current-product="{{ product.id }}">
  <p data-status role="status">Загрузка…</p><ul data-items></ul>
  <button type="button" data-retry hidden>Повторить</button>
</div>
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-example-viewed]:not([data-ready])').forEach(function (root) {
      root.dataset.ready = 'true'; var status = root.querySelector('[data-status]'), list = root.querySelector('[data-items]');
      var retry = root.querySelector('[data-retry]');
      function load() {
        retry.hidden = true; status.textContent = 'Загрузка…';
        Products.getRecentlyViewed().then(function (ids) {
          ids = (ids || []).filter(function (id) { return String(id) !== root.dataset.currentProduct; });
          if (!ids.length) { list.replaceChildren(); status.textContent = 'Просмотренных товаров пока нет'; return; }
          Products.getList(ids).done(function (products) {
            list.replaceChildren();
            ids.forEach(function (id) {
              var product = products[id]; if (!product) return;
              var li = document.createElement('li'), link = document.createElement('a');
              link.href = product.url; link.textContent = product.title; li.append(link); list.append(li);
            });
            status.textContent = list.children.length ? '' : 'Товары недоступны';
          }).fail(fail);
        }).catch(fail);
      }
      function fail() { status.textContent = 'Не удалось загрузить товары'; retry.hidden = false; }
      retry.addEventListener('click', load); load();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

История возвращает массив ID, а `getList` — объект товаров по ID. Исходный массив определяет порядок; отсутствующие товары пропускаются.

## См. также

[Список избранного](favorites-list.md) · [Динамические карточки](../products/dynamic-products.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
