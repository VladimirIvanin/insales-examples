# Живой поиск InSales

Пример для ознакомления.

Для автокомплита результатов используется плагин: [jquery.autocomplete.js](https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.2.24/jquery.autocomplete.js).

CSS прописывается по вкусу.

## HTML

```html
<form action="/search" method="get" class="search-form">
  <input name="q" type="text" placeholder="поиск" class="search-input js-search-input">
  <div class="autocomplete-suggestions"></div>
</form>
```

## liquid/JS
```
<script type="text/javascript">
jQuery(document).ready(function($) {
  //Поиск
  $('.js-search-input').autocomplete({
    serviceUrl: '/search_suggestions',
    onSelect: function (suggestion) {
      window.location.href = '/product_by_id/' + suggestion.data;
    },
    params: {
      account_id: {{ account.id }},
      locale:'{{ language.locale }}',
      hide_items_out_of_stock: '{{ account.hide_items_out_of_stock }}'
    },
  });
});
</script>
```


