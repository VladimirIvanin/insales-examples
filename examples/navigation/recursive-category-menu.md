# Многоуровневое меню категорий

Рекурсивно выводит дочерние категории до заданной глубины.

**Где использовать:** создайте сниппет `category-menu.liquid`, затем вызовите его в шаблоне.

**Зависимости:** Liquid.

## Код

Сниппет `category-menu.liquid`:

```liquid
{% if depth > 0 and parent.subcollections.size > 0 %}
  <ul>
    {% assign next_depth = depth | minus: 1 %}
    {% for child in parent.subcollections %}
      <li><a href="{{ child.url }}" {% if child.current? %}aria-current="page"{% endif %}>{{ child.title | escape }}</a>
        {% include 'category-menu', parent: child, depth: next_depth %}
      </li>
    {% endfor %}
  </ul>
{% endif %}
```

Вызов:

```liquid
<nav aria-label="Каталог">{% include 'category-menu', parent: collections.all, depth: 3 %}</nav>
```

## Как это работает

Параметр `depth` ограничивает глубину, а каждый вложенный список находится внутри родительского пункта. Замените `collections.all` другой корневой категорией при необходимости.

## См. также

[Меню и категории](menu.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
