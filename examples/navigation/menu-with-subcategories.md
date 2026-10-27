# Подкатегории в ссылочном меню

Добавляет дочерние категории к пунктам меню, ведущим в каталог.

**Где использовать:** общий шаблон темы; замените `main` на нужное меню.

**Зависимости:** Liquid.

## Код

```liquid
<ul>
{% for link in linklists.main.links %}
  <li><a href="{{ link.url }}">{{ link.title | escape }}</a>
    {% if link.url contains '/collection/' %}
      {% assign category_handle = link.url | split: '/collection/' | last | split: '?' | first %}
      {% assign category = collections[category_handle] %}
      {% if category.subcollections.size > 0 %}<ul>
        {% for child in category.subcollections %}<li><a href="{{ child.url }}">{{ child.title | escape }}</a></li>{% endfor %}
      </ul>{% endif %}
    {% endif %}
  </li>
{% endfor %}
</ul>
```

## Как это работает

Пример рассчитан на стандартные адреса категорий вида `/collection/handle`; при собственных адресах связывайте пункт меню с категорией явно.

## См. также

[Меню категорий](menu.md) · [Связанные списки меню](nested-linklists.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
