# Фильтр цены без перезагрузки

Отправляет границы цены и заменяет список товаров ответом категории.

**Где использовать:** шаблон категории; цены и выборки должны поддерживаться магазином.

**Зависимости:** Liquid и JavaScript.

## Код

```liquid
<div data-price-filter>
  <form action="{{ collection.url }}" method="get">
    <label>Цена от <input type="number" min="0" name="price_min" value="{{ price_min | escape }}"></label>
    <label>Цена до <input type="number" min="0" name="price_max" value="{{ price_max | escape }}"></label>
    <button>Показать</button>
  </form>
  <p data-status role="status"></p>
  <div data-results>
    {% for product in collection.products %}
      <article><a href="{{ product.url }}">{{ product.title | escape }}</a> — {{ product.price | money }}</article>
    {% else %}<p>Товары не найдены.</p>{% endfor %}
  </div>
</div>
<script>
(function () {
  document.querySelectorAll('[data-price-filter]:not([data-ready])').forEach(function (root) {
    root.dataset.ready = 'true'; var form = root.querySelector('form'), serial = 0;
    form.addEventListener('submit', async function (event) {
      event.preventDefault(); var current = ++serial, url = new URL(form.action, location.href);
      new FormData(form).forEach(function (value, key) { if (value !== '') url.searchParams.append(key, value); });
      var status = root.querySelector('[data-status]'); status.textContent = 'Загрузка…';
      try {
        var response = await fetch(url); if (!response.ok) throw new Error('HTTP ' + response.status);
        var page = new DOMParser().parseFromString(await response.text(), 'text/html');
        var results = page.querySelector('[data-price-filter] [data-results]');
        if (!results) throw new Error('Нет списка товаров');
        if (current !== serial) return;
        root.querySelector('[data-results]').replaceChildren(...results.children);
        history.replaceState(null, '', url); status.textContent = 'Фильтр применён';
      } catch (error) { if (current === serial) status.textContent = 'Не удалось применить фильтр. Повторите попытку.'; }
    });
  });
})();
</script>
```

## Как это работает

Без JavaScript форма отправляется обычным способом. Номер запроса не даёт позднему ответу заменить более свежий. Пример выводит ссылки на товары; для интерактивных карточек после замены нужна их инициализация.

## См. также

[Сброс фильтров](reset-filter.md) · [Сортировка](sort-and-page-size.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
