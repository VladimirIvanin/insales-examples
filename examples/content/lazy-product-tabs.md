# Вкладки с отложенной загрузкой товаров

Загружает товары категории при первом открытии вкладки.

**Где использовать:** шаблон темы; замените адреса категорий на существующие в магазине.

**Зависимости:** JavaScript и CSS.

## Код

```html
<div data-example-tabs>
  <div role="group" aria-label="Категории товаров">
    <button type="button" data-tab="new" aria-pressed="true">Новинки</button>
    <button type="button" data-tab="sale" aria-pressed="false">Скидки</button>
  </div>
  <div data-panel="new" data-url="/collection/new"><p>Загрузка…</p></div>
  <div data-panel="sale" data-url="/collection/sale" hidden><p>Загрузка…</p></div>
  <p data-status role="status"></p>
</div>
<script>
(function () {
  document.querySelectorAll('[data-example-tabs]:not([data-ready])').forEach(function (root) {
    root.dataset.ready = 'true';
    async function open(button) {
      var panel = Array.from(root.querySelectorAll('[data-panel]')).find(function (item) { return item.dataset.panel === button.dataset.tab; });
      if (!panel) return;
      root.querySelectorAll('[data-tab]').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
      root.querySelectorAll('[data-panel]').forEach(function (item) { item.hidden = item !== panel; });
      if (panel.dataset.loaded || panel.dataset.loading) return;
      panel.dataset.loading = 'true'; root.querySelector('[data-status]').textContent = 'Загрузка…';
      try {
        var response = await fetch(panel.dataset.url); if (!response.ok) throw new Error('HTTP ' + response.status);
        var page = new DOMParser().parseFromString(await response.text(), 'text/html');
        var source = page.querySelector('[data-example-tab-products]');
        if (!source) throw new Error('Нет списка товаров');
        panel.replaceChildren(...source.children); panel.dataset.loaded = 'true';
        root.querySelector('[data-status]').textContent = '';
      } catch (error) {
        root.querySelector('[data-status]').textContent = 'Не удалось загрузить товары. Нажмите вкладку ещё раз.';
      } finally { delete panel.dataset.loading; }
    }
    root.addEventListener('click', function (event) { var button = event.target.closest('[data-tab]'); if (button) open(button); });
    open(root.querySelector('[data-tab]'));
  });
})();
</script>
```

На странице каждой категории оберните нужные карточки в `<div data-example-tab-products>…</div>`.

## Как это работает

Код загружает только выбранную вкладку, сохраняет полученный результат и разрешает повтор после ошибки. Для карточек с интерактивными формами после вставки отдельно инициализируйте common.js.

## См. также

[Динамические карточки](../products/dynamic-products.md) · [Аккордеон](accordion.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
