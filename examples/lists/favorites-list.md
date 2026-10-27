# Список избранных товаров

Выводит товары из избранного и обновляет список после удаления.

**Где использовать:** страница избранного.

**Зависимости:** common.js v2 и jQuery.

## Код

```html
<div data-example-favorites>
  <p data-status role="status">Загрузка…</p><ul data-items></ul>
</div>
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-example-favorites]:not([data-ready])').forEach(function (root) {
      root.dataset.ready = 'true'; var serial = 0;
      EventBus.subscribe('update_items:insales:favorites_products', function (data) {
        var current = ++serial, ids = (data.products || []).map(function (item) { return item.id; });
        var list = root.querySelector('[data-items]'), status = root.querySelector('[data-status]');
        if (!ids.length) { list.replaceChildren(); status.textContent = 'В избранном пока нет товаров'; return; }
        status.textContent = 'Загрузка…';
        Products.getList(ids).done(function (products) {
          if (current !== serial) return;
          list.replaceChildren();
          ids.forEach(function (id) {
            var product = products[id]; if (!product) return;
            var li = document.createElement('li'), link = document.createElement('a'), button = document.createElement('button');
            link.href = product.url; link.textContent = product.title;
            button.type = 'button'; button.dataset.uiFavoritesDelete = id; button.textContent = 'Удалить';
            li.append(link, ' ', button); list.append(li);
          });
          status.textContent = list.children.length ? '' : 'Товары недоступны';
        }).fail(function () { if (current === serial) status.textContent = 'Не удалось загрузить товары'; });
      });
      FavoritesProducts.update();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

Событие передаёт массив объектов избранного. `Products.getList` возвращает карточки по ID; номер запроса защищает от устаревшего ответа. Удаление выполняет штатный обработчик кнопки common.js.

## См. также

[Кнопка избранного](favorites-button.md) · [Просмотренные товары](recently-viewed.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
