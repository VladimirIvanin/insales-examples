# Сниппет для склонения слова «товар» относительно количества товаров в коллекции или в корзине.

Для корзины нужно использовать `cart.items_count`.

Для коллекции нужно использовать `collection.products_count`.

```liquid
{% assign itemsize = cart.items_count | modulo: 100 %}
{% assign itemsizex = itemsize | modulo: 10 %}
{% if itemsizex == 1 %}
  {% assign productnames = 'товар' %}
{% endif %}
{% if itemsizex == 0 %}
  {% assign productnames = 'товаров' %}
{% endif %}
{% if itemsizex > 4 and itemsizex < 10 %}
  {% assign productnames = 'товаров' %}
{% endif %}
{% if itemsizex > 1 and itemsizex < 5 %}
  {% assign productnames = 'товара' %}
{% endif %}
{% if itemsize > 4 and itemsize < 20 %}
  {% assign productnames = 'товаров' %}
{% endif %}
```
