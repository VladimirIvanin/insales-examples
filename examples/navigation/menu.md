# Меню и категории

Выводит меню из linklists и вложенные категории без некорректной вложенности списков.

**Где использовать:** общая часть темы; замените `main` на handle своего меню.

**Зависимости:** Liquid и CSS.

## Код

```liquid
<nav aria-label="Основное меню">
  <ul class="example-menu">
    {% for link in linklists.main.links %}
      <li><a href="{{ link.url }}" {% if link.current? %}aria-current="page"{% endif %}>{{ link.title | escape }}</a></li>
    {% endfor %}
  </ul>
</nav>
<nav aria-label="Категории">
  <ul class="example-menu">
    {% for category in collections.all.subcollections %}
      <li><a href="{{ category.url }}">{{ category.title | escape }}</a>
        {% if category.subcollections.size > 0 %}
          <ul>{% for child in category.subcollections %}<li><a href="{{ child.url }}">{{ child.title | escape }}</a></li>{% endfor %}</ul>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
</nav>
<style>.example-menu { list-style: none; padding: 0; } .example-menu ul { padding-left: 1.5em; }</style>
```

## Как это работает

Пример выводит два уровня категорий и одноуровневое меню ссылок. При необходимости глубокой вложенности создайте рекурсивный сниппет с ограничением глубины; имена и адреса выводятся из объектов магазина.

## См. также

[Сетка подкатегорий](../catalog/subcategory-grid.md) · [Хлебные крошки](breadcrumbs.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
