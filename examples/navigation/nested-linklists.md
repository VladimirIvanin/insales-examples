# Связанные списки меню

Раскрывает ссылки на другие списки меню, сохраняя обычные ссылки.

**Где использовать:** шаблон темы; замените `main` на handle своего меню.

**Зависимости:** Liquid.

## Код

```liquid
<ul>
{% for link in linklists.main.links %}
  {% if link.url contains '/linklists/' %}
    {% assign handle = link.url | split: '/linklists/' | last %}
    {% if linklists[handle].links.size > 0 %}
      <li>{{ link.title | escape }}<ul>
        {% for child in linklists[handle].links %}<li><a href="{{ child.url }}">{{ child.title | escape }}</a></li>{% endfor %}
      </ul></li>
    {% else %}<li><a href="{{ link.url }}">{{ link.title | escape }}</a></li>{% endif %}
  {% else %}<li><a href="{{ link.url }}">{{ link.title | escape }}</a></li>{% endif %}
{% endfor %}
</ul>
```

## Как это работает

Ссылка вида `/linklists/footer` используется как указатель на список с handle `footer`. Если список пуст или отсутствует, ссылка остаётся обычной.

## См. также

[Меню и категории](menu.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
