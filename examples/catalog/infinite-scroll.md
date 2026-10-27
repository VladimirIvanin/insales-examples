# Автоматическая подгрузка страниц

Подгружает следующую страницу, когда ссылка попадает в область просмотра. При ошибке покупатель может повторить загрузку вручную.

**Где использовать:** шаблон категории внутри блока `paginate`.

**Зависимости:** common.js v2 и jQuery для инициализации добавленных карточек; IntersectionObserver.

## Код

```liquid
{% paginate collection.products by 12 %}
<div data-infinite-catalog>
  <div data-items>
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
    document.querySelectorAll('[data-infinite-catalog]:not([data-ready])').forEach(function (root) {
      root.dataset.ready = 'true';
      var link = root.querySelector('[data-next]'), status = root.querySelector('[data-status]');
      if (!link) return;
      var loading = false;
      var observer = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) load();
      }, { rootMargin: '200px' });
      async function load() {
        if (loading || !link.isConnected) return;
        loading = true; observer.unobserve(link); status.textContent = 'Загрузка…';
        try {
          var response = await fetch(link.href);
          if (!response.ok) throw new Error('HTTP ' + response.status);
          var page = new DOMParser().parseFromString(await response.text(), 'text/html');
          var nextRoot = page.querySelector('[data-infinite-catalog]');
          if (!nextRoot) throw new Error('Нет списка товаров');
          var items = Array.from(nextRoot.querySelector('[data-items]').children);
          items.forEach(function (item) { root.querySelector('[data-items]').append(item); Products.initInstance($(item)); });
          var next = nextRoot.querySelector('[data-next]');
          if (next) link.href = next.href; else link.remove();
          status.textContent = next ? 'Товары загружены' : 'Больше товаров нет';
          loading = false;
          if (next) observer.observe(link);
        } catch (error) {
          loading = false;
          status.textContent = 'Не удалось загрузить товары. Нажмите «Показать ещё» для повтора.';
        }
      }
      link.addEventListener('click', function (event) { event.preventDefault(); load(); });
      observer.observe(link);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

Во время запроса ссылка временно отключается от наблюдателя. После ошибки наблюдатель остаётся отключённым, чтобы избежать бесконечных повторов; клик по ссылке запускает запрос снова. Без JavaScript ссылка ведёт на следующую страницу. Для разных списков задайте уникальные селекторы соответствующих блоков в ответе.

## См. также

[Кнопка «Показать ещё»](load-more.md) · [Пагинация](../navigation/pagination.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
