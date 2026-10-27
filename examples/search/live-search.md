# Живой поиск

Показывает подсказки товаров при вводе, сообщает об отсутствии совпадений и позволяет открыть полную страницу поиска.

**Где использовать:** шапка или отдельная страница поиска.

**Зависимости:** common.js v2 для настроек магазина; Fetch API.

## Код

```liquid
<form action="/search" method="get" data-example-search>
  <label>Поиск <input name="q" value="{{ search.query | escape }}" autocomplete="off"></label>
  <button type="submit">Найти</button>
  <ul data-results></ul>
  <p data-status role="status"></p>
</form>
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-example-search]:not([data-ready])').forEach(function (form) {
      form.dataset.ready = 'true';
      var input = form.querySelector('[name="q"]');
      var results = form.querySelector('[data-results]');
      var status = form.querySelector('[data-status]');
      var timer, controller, version = 0;

      input.addEventListener('input', function () {
        var query = input.value.trim(), current = ++version;
        clearTimeout(timer);
        if (controller) controller.abort();
        results.replaceChildren(); status.textContent = '';
        if (query.length < 3) return;
        status.textContent = 'Поиск…';
        timer = setTimeout(async function () {
          controller = new AbortController();
          try {
            var url = new URL('/search_suggestions', location.origin);
            var config = Shop.config.get(['account_id', 'locale', 'hide_items_out_of_stock']);
            Object.keys(config).forEach(function (key) {
              if (config[key] != null) url.searchParams.set(key, config[key]);
            });
            url.searchParams.set('query', query);
            url.searchParams.append('fields[]', 'price_min');
            url.searchParams.append('fields[]', 'price_min_available');
            var response = await fetch(url, { signal: controller.signal });
            if (!response.ok) throw new Error('HTTP ' + response.status);
            var data = await response.json();
            if (current !== version) return;
            var suggestions = Array.isArray(data.suggestions) ? data.suggestions : [];
            suggestions.forEach(function (item) {
              var row = document.createElement('li'), link = document.createElement('a');
              var productUrl = new URL('/product_by_id/' + encodeURIComponent(item.data), location.origin);
              var lang = new URL(location.href).searchParams.get('lang');
              if (lang) productUrl.searchParams.set('lang', lang);
              link.href = productUrl.href;
              link.textContent = item.value;
              row.append(link); results.append(row);
            });
            status.textContent = suggestions.length ? 'Найдены товары' : 'Ничего не найдено';
          } catch (error) {
            if (error.name !== 'AbortError' && current === version) status.textContent = 'Не удалось выполнить поиск';
          }
        }, 500);
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

`Shop.config` предоставляет настройки текущего магазина. Запрос отправляется после паузы в 500 мс; изменение ввода отменяет предыдущий запрос и очищает старые подсказки. Для обычной отправки формы остаётся страница поиска. Поле не имеет `data-search-field`, чтобы штатный обработчик common.js не отправлял второй запрос.

## См. также

[Каталог](../catalog/README.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
