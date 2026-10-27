# Уведомление о добавлении товара

После успешного добавления показывает название товара и позволяет закрыть сообщение.

**Где использовать:** общая часть темы, например рядом с шапкой.

**Зависимости:** common.js v2.

## Код

```html
<div data-cart-notice role="status" hidden>
  <span data-message></span>
  <button type="button" data-close aria-label="Закрыть уведомление">×</button>
</div>
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-cart-notice]:not([data-ready])').forEach(function (root) {
      root.dataset.ready = 'true';
      root.querySelector('[data-close]').addEventListener('click', function () { root.hidden = true; });
      EventBus.subscribe('add_items:insales:cart', function (cart) {
        if (!cart || (cart.errors && cart.errors.length)) return;
        var item = cart.action && cart.action.currentItems && cart.action.currentItems[0];
        var line = item && cart.order_lines && cart.order_lines.find(function (entry) { return entry.variant_id === item.variant_id; });
        if (!line) return;
        root.querySelector('[data-message]').textContent = 'Добавлено: ' + line.title;
        root.hidden = false;
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

Сообщение выводится только при наличии добавленной позиции в ответе. Текст товара вставляется безопасно как текст. Для вариантов с разными опциями используйте дополнительную идентификацию позиции.

## См. также

[Добавление товара](add-product.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
