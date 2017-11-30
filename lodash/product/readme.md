```
Цена
<% Shop.money.format(product.variants[0].price) %>

Id варианта
<%= product.variants[0].id %>

Стикеры
<%= var labels_list = ''; %>
<% _.forEach(characteristics, function (characteristic){  %>
  <% if(characteristic.property.permalink == 'stiker'){ %>
    <%= var labels_list += '<div class="stiker stiker-' %>
    <%= var labels_list += characteristic.permalink %>
    <%= var labels_list += '">' %>
    <%= var labels_list += characteristic.title %>
    <%= var labels_list += '</div>' %>
  <% } %>
<% }); %>
```
