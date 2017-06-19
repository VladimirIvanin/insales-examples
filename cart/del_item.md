# Удаление товара из корзины

Необходимые данные:

* id позиции товара в корзине

/cart_items/81869763.json

_method=delete

```js
$.post('/cart_items/81869763.json', {
    _method: "delete"
  })
  .done(function (cart) {
    console.log(cart);
  })
```

```liquid
<div class="cart">
  {% for item in cart.items %}
    <div class="cart-item">
      <div class="cart-item-title">
        {{ item.title }}
      </div>
      <div class="cart-quantity">
        {{ item.quantity }}
      </div>
      <div class="cart-delete" data-item-del="{{ item.id }}">
        &times;
      </div>
    </div>
  {% endfor %}
</div>

<script>
  $('[data-item-del]').click(function(event) {
  event.preventDefault();
    var idItem = $(this).data('itemDel');
        urlItem = '/cart_items/' + idItem + '.json';

    $.ajax({
      url: urlItem,
      type: 'delete',
      dataType: 'json'
    })
    .done(function(response) {
      //Эта функция отработает на удачное удаление позиции товара из корзины.
      //В response json объект обновленной корзины.
    })
    .fail(function(response) {
      //Эта функция отработает если, что то пошло не так.
    })
    .always(function(response) {
      //Эта функция отработает в любом случае.
    });
    

  });
</script>
```
