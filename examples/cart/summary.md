# Сумма и счётчик корзины

Показывает количество товаров и сумму и обновляет их после действий с корзиной.

**Где использовать:** шапка, боковая панель или страница корзины.

**Зависимости:** common.js v2.

## Код

```liquid
<div data-example-cart-summary>
  <a href="{{ cart_url }}">Корзина: <span data-count>{{ cart.items_count }}</span></a>
  <span data-total>{{ cart.total_price | money }}</span>
</div>
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-example-cart-summary]:not([data-ready])').forEach(function (root) {
      root.dataset.ready = 'true';
      EventBus.subscribe(['update_items:insales:cart:light', 'update_items:insales:cart'], function (cart) {
        if (!cart || cart.items_count == null || cart.total_price == null) return;
        root.querySelector('[data-count]').textContent = cart.items_count;
        root.querySelector('[data-total]').textContent = Shop.money.format(cart.total_price);
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

Начальные значения выводит Liquid, следующие — событие обновления корзины. Используйте `Shop.money.format`, чтобы соблюдать настройки валюты магазина.

## См. также

[Изменение количества](update-quantity.md) · [Очистка корзины](clear-cart.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
