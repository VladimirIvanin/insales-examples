# Промокод в корзине

Применяет или удаляет промокод и показывает сообщения корзины.

**Где использовать:** шаблон корзины.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<form action="{{ cart_url }}" method="post" data-cart-form data-example-coupon data-reload-on-coupon="false">
  <input type="hidden" name="_method" value="put">
  <label>Промокод <input name="cart[coupon]" value="{{ cart.coupon | escape }}"></label>
  <button type="submit" data-coupon-submit>Применить</button>
  <button type="button" data-coupon-remove>Удалить промокод</button>
  <div data-cart-discounts-error role="alert"></div>
  <span data-cart-total-price>{{ cart.total_price | money }}</span>
</form>
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-example-coupon]:not([data-ready])').forEach(function (form) {
      form.dataset.ready = 'true';
      form.querySelector('[data-coupon-remove]').addEventListener('click', function () {
        Cart.setCoupon({ coupon: ' ', form: $(form) });
      });
      EventBus.subscribe('set_coupon:insales:cart', function (cart) {
        var action = cart && cart.action;
        if (!action || !action.form || action.form[0] !== form || (cart.errors && cart.errors.length)) return;
        if (typeof action.coupon === 'string' && !action.coupon.trim()) {
          form.querySelector('[name="cart[coupon]"]').value = '';
        }
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

`data-coupon-submit` обрабатывается common.js. Пробел передаётся для удаления купона согласно реализации корзины. Поле очищается после подтверждённого удаления. Суммы и ошибки берутся из ответа платформы; проверка купона остаётся на стороне магазина.

## См. также

[Сумма корзины](summary.md) · [Изменение количества](update-quantity.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
