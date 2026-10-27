# Корзина через HTTP

Добавляет или удаляет позицию с помощью HTTP-запроса без common.js.

**Где использовать:** JavaScript темы, когда common.js не используется.

**Зависимости:** jQuery.

## Код

```js
function addToCart(variantId, quantity) {
  return $.ajax({ url: '/cart_items.json', method: 'POST', dataType: 'json', data: { variant_id: variantId, quantity: quantity } });
}
function removeFromCart(itemId) {
  return $.ajax({ url: '/cart_items/' + encodeURIComponent(itemId) + '.json', method: 'POST', dataType: 'json', data: { _method: 'delete' } });
}

// addToCart(variantId, 1).done(renderCart).fail(showError);
```

## Как это работает

`variantId` и `itemId` берите из данных текущего товара и позиции корзины; это разные контексты. Этот низкоуровневый вариант не обновляет состояние common.js автоматически. Для опций товара используйте штатную форму корзины.

## См. также

[Добавление через common.js](add-product.md) · [Изменение количества](update-quantity.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
