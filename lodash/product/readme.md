```html
<script type="text/template">

Цены
<%= Shop.money.format(product.variants[0].price) %>

<% if (product.variants[0].old_price){ %>
<div class="card-old_price">
  <%= Shop.money.format(product.variants[0].old_price) %>
</div>
<% } %>
<div class="card-price">
  <%= Shop.money.format(product.variants[0].price) %>
</div>


Купить/Подробнее
<% if (product.variants.size > 1){ %>
  <a href="<%= product.url %>" class="bttn-prim">Подробнее</a>
<% }else{ %>
  <button data-item-add class="bttn-prim" type="button">В корзину</button>
<% } %>


Id варианта
<%= product.variants[0].id %>

Стикеры
<%= getStiker('stiker', product.characteristics) %>

// js файл
function getStiker (name, characteristics) {
  var labels_list = '';
  _.forEach(characteristics, function (characteristic){
    if(characteristic.property.permalink == name){
      labels_list += '<div class="stiker stiker-';
      labels_list += characteristic.permalink;
      labels_list += '">';
      labels_list += characteristic.title;
      labels_list += '</div>';
    }
  });

  return labels_list;
}
</script>
```
