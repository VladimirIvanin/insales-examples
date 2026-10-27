# Кнопка «Показать ещё»

Добавляет товары следующей страницы, сохраняя обычную ссылку на неё.

**Где использовать:** шаблон категории, внутри блока `paginate`.

**Зависимости:** Liquid и JavaScript; common.js v2 и jQuery для инициализации новых карточек.

## Код

```liquid
{% paginate collection.products by 12 %}
<div data-load-more>
  <div data-products>
    {% for product in collection.products %}
      <article data-product-id="{{ product.id }}" data-product-updated-at="{{ product.updated_at }}">
        <a href="{{ product.url }}">{{ product.title | escape }}</a>
        <span data-product-card-price>{{ product.price | money }}</span>
      </article>
    {% endfor %}
  </div>
  {% if paginate.next %}<a data-next href="{{ paginate.next.url }}">Показать ещё</a>{% endif %}
  <p data-status role="status"></p>
</div>
{% endpaginate %}
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-load-more]:not([data-ready])').forEach(function (root) {
      root.dataset.ready = 'true';
      root.addEventListener('click', async function (event) {
        var link = event.target.closest('[data-next]');
        if (!link || link.dataset.loading) return;
        event.preventDefault(); link.dataset.loading = 'true';
        var status = root.querySelector('[data-status]'); status.textContent = 'Загрузка…';
        try {
          var response = await fetch(link.href); if (!response.ok) throw new Error('HTTP ' + response.status);
          var page = new DOMParser().parseFromString(await response.text(), 'text/html');
          var nextRoot = page.querySelector('[data-load-more]');
          if (!nextRoot) throw new Error('Нет списка товаров');
          var nodes = Array.from(nextRoot.querySelector('[data-products]').children);
          nodes.forEach(function (node) { root.querySelector('[data-products]').append(node); Products.initInstance($(node)); });
          var next = nextRoot.querySelector('[data-next]');
          if (next) link.href = next.href; else link.remove();
          status.textContent = nodes.length ? 'Товары загружены' : 'Больше товаров нет';
        } catch (error) { status.textContent = 'Не удалось загрузить товары. Попробуйте ещё раз.'; }
        finally { delete link.dataset.loading; }
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

Ссылка работает и без JavaScript. После ошибки её адрес не меняется, поэтому действие можно повторить. Для нескольких разных списков используйте разные селекторы при поиске соответствующего блока в ответе.

## См. также

[Сортировка и размер страницы](sort-and-page-size.md) · [Пагинация](../navigation/pagination.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
