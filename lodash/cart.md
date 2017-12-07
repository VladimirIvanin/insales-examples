```html
<script type="text/template" data-template-id="basket">

  <form action="{{ cart_url }}" method="post" data-cart-form>
    <input type="hidden" name="_method" value="put">
    <input type="hidden" name="make_order" value="">

  <div class="basket-list">
    <% if(order_lines.length == 0){ %>
      <div class="basket-empty text-center">
        Корзина пуста
      </div>
    <% } %>
    <% _.forEach(order_lines, function (value){  %>
      <div class="basket_item" data-item-id="<%= value.id %>" data-product-id="<%= value.product_id %>">
        <div class="row">
          <div class="cell-4">
            <a href="" class="basket_item-image">
              <span class="image-container is-square">
                <img src="<%= value.first_image.medium_url %>">
              </span>
            </a>
          </div>
          <div class="cell-6">
            <div class="basket_item-title">
              <%= value.title  %>
            </div>
            <div class="basket_item-quantity">
              <%= Shop.money.format(value.sale_price) %> х <%= value.quantity  %>
            </div>
          </div>
          <div class="cell-2 text-right">
            <button class="basket_item-del" data-item-delete="<%= value.id %>">
              &times;
            </button>
          </div>
        </div>
      </div>
    <% }) %>

  </div>

  <% if(order_lines.length > 0){ %>
  <div class="basket-total row flex-middle">
    <div class="cell-6 row flex-center">
      итого
    </div>
    <div class="cell-6 row flex-center">
      <%= Shop.money.format(total_price) %>
    </div>
  </div>

  <input type="submit" value="оформить покупки" data-cart-submit class="basket-submit">
  <% } %>
  </form>
</script>
```
