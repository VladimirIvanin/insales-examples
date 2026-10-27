# Динамическая загрузка карточек товаров

Загружает выбранные товары и инициализирует формы после вставки на страницу.

**Где использовать:** шаблон категории; список идентификаторов задаёт Liquid.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<div data-dynamic-products data-ids="{% for item in collection.products limit: 4 %}{{ item.id }}{% unless forloop.last %},{% endunless %}{% endfor %}">
  <p data-status role="status">Загрузка…</p><div data-items></div>
  <button type="button" data-retry hidden>Повторить</button>
</div>
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-dynamic-products]:not([data-ready])').forEach(function (root) {
      root.dataset.ready = 'true';
      var ids = root.dataset.ids.split(',').map(Number).filter(Boolean);
      var items = root.querySelector('[data-items]'), status = root.querySelector('[data-status]');
      var retry = root.querySelector('[data-retry]');
      function load() {
        retry.hidden = true; status.textContent = 'Загрузка…';
        if (!ids.length) { status.textContent = 'Товаров нет'; return; }
        Products.getList(ids).done(function (products) {
          items.replaceChildren();
          ids.forEach(function (id) {
            var product = products[id]; if (!product) return;
            var form = document.createElement('form');
            form.dataset.productId = id;
            form.action = '/cart_items'; form.method = 'post';
            var link = document.createElement('a'); link.href = product.url; link.textContent = product.title;
            var price = document.createElement('span'); price.dataset.productCardPrice = '';
            form.append(link, document.createTextNode(' '), price); items.append(form);
            Products.initInstance($(form));
          });
          status.textContent = items.children.length ? '' : 'Товаров нет';
        }).fail(function () { status.textContent = 'Не удалось загрузить товары'; retry.hidden = false; });
      }
      retry.addEventListener('click', load); load();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

`getList` возвращает объект, индексированный по ID; обход исходного списка сохраняет порядок. Текст вставляется через `textContent`. Повторная загрузка заменяет прежние карточки.

## См. также

[Просмотренные товары](../lists/recently-viewed.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
