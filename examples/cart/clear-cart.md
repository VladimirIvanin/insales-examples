# Очистка корзины

Очищает корзину и показывает пустое состояние после обновления.

**Где использовать:** страница корзины.

**Зависимости:** common.js v2.

## Код

```liquid
<div data-example-cart-clear>
  <p data-state>{% if cart.items_count == 0 %}Корзина пуста{% else %}Товаров: {{ cart.items_count }}{% endif %}</p>
  <button type="button" data-clear {% if cart.items_count == 0 %}disabled{% endif %}>Очистить корзину</button>
</div>
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-example-cart-clear]:not([data-ready])').forEach(function (root) {
      root.dataset.ready = 'true';
      var button = root.querySelector('[data-clear]');
      button.addEventListener('click', function () { Cart.clear(); });
      EventBus.subscribe(['update_items:insales:cart:light', 'update_items:insales:cart'], function (cart) {
        if (!cart || cart.items_count == null) return;
        button.disabled = cart.items_count === 0;
        root.querySelector('[data-state]').textContent = cart.items_count ? 'Товаров: ' + cart.items_count : 'Корзина пуста';
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

`Cart.clear()` отправляет действие через очередь корзины; состояние обновляется из события, а не заранее. Если список позиций выведен отдельно, его также нужно обновлять по событию.

## См. также

[Сумма корзины](summary.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
