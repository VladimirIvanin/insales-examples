# Изменение количества и удаление позиции

Позволяет изменить количество позиции корзины и удалить её.

**Где использовать:** шаблон корзины.

**Зависимости:** common.js v2 и jQuery.

## Код

```liquid
<form action="{{ cart_url }}" method="post" data-cart-form data-example-cart>
  <input type="hidden" name="_method" value="put">
  {% for item in cart.items %}
    <div data-product-id="{{ item.product.id }}" data-item-id="{{ item.id }}">
      <a href="{{ item.product.url }}">{{ item.title | escape }}</a>
      <div data-quantity>
        <button type="button" data-quantity-change="-1" aria-label="Уменьшить">−</button>
        <label>Количество <input name="cart[quantity][{{ item.id }}]" value="{{ item.quantity }}" inputmode="decimal"></label>
        <button type="button" data-quantity-change="1" aria-label="Увеличить">+</button>
      </div>
      <span data-cart-item-total-price>{{ item.total_price | money }}</span>
      <button type="button" data-item-delete="{{ item.id }}">Удалить</button>
    </div>
  {% endfor %}
  <p data-empty {% if cart.items_count > 0 %}hidden{% endif %}>Корзина пуста</p>
  <button type="submit" data-cart-update>Обновить</button>
</form>
<script>
(function () {
  function initExample() {
    document.querySelectorAll('[data-example-cart]:not([data-ready])').forEach(function (form) {
      form.dataset.ready = 'true';
      EventBus.subscribe(['update_items:insales:cart:light', 'update_items:insales:cart'], function (cart) {
        if (!cart || !Array.isArray(cart.order_lines)) return;
        var ids = new Set(cart.order_lines.map(function (line) { return String(line.variant_id); }));
        form.querySelectorAll('[data-item-id]').forEach(function (row) {
          if (!ids.has(row.dataset.itemId)) row.remove();
        });
        form.querySelector('[data-empty]').hidden = cart.order_lines.length > 0;
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initExample, { once: true });
  else initExample();
})();
</script>
```

## Как это работает

Атрибуты формы и позиции используются обработчиками common.js. `item.id` — идентификатор для штатной формы корзины; пример рассчитан на обычные позиции без дополнительных опций. При обновлении корзины обработчик удаляет исчезнувшие строки и показывает пустое состояние. Для позиций с опциями нужна соответствующая штатная разметка и учёт значений опций.

## См. также

[Опции товара](../products/accessories.md) · [Сумма корзины](summary.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
