# Сумма до порога доставки

Покажите покупателю, сколько осталось до установленного в магазине порога стоимости заказа. При изменении корзины индикатор обновляется без перезагрузки.

**Где использовать:** страница корзины или панель корзины. Значение `delivery_threshold` замените на порог, настроенный в магазине.

**Зависимости:** Liquid и common.js v2.

## Код

```liquid
{% assign delivery_threshold = 3000 %}
{% assign delivery_remaining = delivery_threshold | minus: cart.total_price | at_least: 0 %}
<div class="delivery-threshold" data-delivery-threshold="{{ delivery_threshold }}">
  <p data-message aria-live="polite">
    {% if delivery_remaining > 0 %}
      До порога доставки осталось {{ delivery_remaining | money }}
    {% else %}
      Порог суммы заказа для доставки достигнут
    {% endif %}
  </p>
  <progress data-progress max="{{ delivery_threshold }}" value="{{ cart.total_price | at_most: delivery_threshold }}"
    aria-label="Сумма заказа относительно порога доставки"></progress>
</div>

<style>
.delivery-threshold progress { display: block; width: 100%; }
</style>
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-delivery-threshold]:not([data-ready])').forEach(function (root) {
      var threshold = Number(root.dataset.deliveryThreshold);
      if (!Number.isFinite(threshold) || threshold <= 0) return;
      root.dataset.ready = 'true';
      EventBus.subscribe(['update_items:insales:cart:light', 'update_items:insales:cart'], function (cart) {
        if (!cart || cart.total_price == null) return;
        var total = Number(cart.total_price);
        if (!Number.isFinite(total)) return;
        var remaining = Math.max(0, threshold - total);
        root.querySelector('[data-progress]').value = Math.min(Math.max(total, 0), threshold);
        root.querySelector('[data-message]').textContent = remaining > 0
          ? 'До порога доставки осталось ' + Shop.money.format(remaining)
          : 'Порог суммы заказа для доставки достигнут';
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

Liquid выводит начальную сумму корзины, а события common.js обновляют индикатор после пересчёта. Порог в примере — условные 3 000 в валюте магазина.

Этот блок только сравнивает суммы и не управляет стоимостью доставки. Сверьте порог и дополнительные условия с настройками способов доставки: например, стоимость может зависеть от региона или выбранной службы.

## См. также

[Сумма и счётчик корзины](summary.md) · [Изменение количества](update-quantity.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
