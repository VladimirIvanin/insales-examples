```
<script type="text/template">
Цена
<%= Shop.money.format(product.variants[0].price) %>

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
