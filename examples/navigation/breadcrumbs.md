# Хлебные крошки

Показывает путь к текущей странице, категории или товару.

**Где использовать:** общий шаблон темы.

**Зависимости:** Liquid и CSS.

## Код

```liquid
<nav aria-label="Хлебные крошки">
  <ol class="example-breadcrumbs">
    <li><a href="/">Главная</a></li>
    {% if template contains 'product' %}
      {% assign path = current_collections %}
      {% if path.size == 0 and product.canonical_collection %}
        {% assign path = product.canonical_collection.current_collections %}
      {% endif %}
      {% for category in path %}{% if category.level > 0 %}
        <li><a href="{{ category.url }}">{{ category.title | escape }}</a></li>
      {% endif %}{% endfor %}
      <li aria-current="page">{{ product.title | escape }}</li>
    {% elsif template contains 'collection' %}
      {% for category in current_collections %}{% if category.level > 0 %}
        <li>{% if forloop.last %}<span aria-current="page">{{ category.title | escape }}</span>{% else %}<a href="{{ category.url }}">{{ category.title | escape }}</a>{% endif %}</li>
      {% endif %}{% endfor %}
    {% elsif template contains 'article' %}
      <li><a href="{{ blog.url }}">{{ blog.title | escape }}</a></li><li aria-current="page">{{ article.title | escape }}</li>
    {% elsif template contains 'blog' %}<li aria-current="page">{{ blog.title | escape }}</li>
    {% elsif template contains 'page' %}<li aria-current="page">{{ page.title | escape }}</li>
    {% elsif template contains 'cart' %}<li aria-current="page">Корзина</li>
    {% elsif template contains 'search' %}<li aria-current="page">Поиск</li>
    {% elsif template contains 'compare' %}<li aria-current="page">Сравнение</li>{% endif %}
  </ol>
</nav>
<style>.example-breadcrumbs { display:flex; flex-wrap:wrap; gap:.5em; list-style:none; padding:0; }.example-breadcrumbs li + li::before { content:'/'; margin-right:.5em; }</style>
```

## Как это работает

Для товара используется текущий путь категорий или каноническая категория. Если ни одна категория не доступна, путь состоит из главной и названия товара.

## См. также

[Меню](menu.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
