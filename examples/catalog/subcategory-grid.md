# Сетка подкатегорий с изображениями

Выводит дочерние категории и их изображения меню.

**Где использовать:** шаблон категории.

**Зависимости:** Liquid и CSS.

## Код

```liquid
{% if collection.subcollections_cacheless.size > 0 %}
  <div class="example-subcategories">
    {% for child in collection.subcollections_cacheless %}
      <a href="{{ child.url }}">
        <img src="{{ child.menu_image.large_url }}" alt="" loading="lazy">
        <span>{{ child.title | escape }}</span>
      </a>
    {% endfor %}
  </div>
{% endif %}
<style>
.example-subcategories { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; }
.example-subcategories img { display: block; max-width: 100%; height: auto; }
</style>
```

## Как это работает

`subcollections_cacheless` возвращает дочерние категории, а `menu_image` — их изображение для меню. Если категории нет изображения, платформа может вернуть изображение-заглушку.

## См. также

[Меню категорий](../navigation/menu.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
