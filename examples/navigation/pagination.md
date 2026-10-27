# Пагинация

Выводит ссылки на страницы, предыдущую и следующую страницу.

**Где использовать:** внутри Liquid-блока `paginate` в шаблоне категории.

**Зависимости:** Liquid и CSS.

## Код

```liquid
{% paginate collection.products by 12 %}
  {% for product in collection.products %}<a href="{{ product.url }}">{{ product.title | escape }}</a>{% endfor %}
  {% if paginate.parts.size > 1 %}
    <nav aria-label="Страницы каталога"><ul class="example-pagination">
      {% if paginate.previous %}<li><a href="{{ paginate.previous.url }}">Назад</a></li>{% endif %}
      {% for part in paginate.parts %}
        <li>{% if part.is_link %}<a href="{{ part.url }}">{{ part.title }}</a>{% elsif part.title == paginate.current_page %}<span aria-current="page">{{ part.title }}</span>{% else %}<span>{{ part.title }}</span>{% endif %}</li>
      {% endfor %}
      {% if paginate.next %}<li><a href="{{ paginate.next.url }}">Вперёд</a></li>{% endif %}
    </ul></nav>
  {% endif %}
{% endpaginate %}
<style>.example-pagination { display:flex; gap:.75rem; list-style:none; padding:0; }.example-pagination [aria-current] { font-weight:bold; }</style>
```

## Как это работает

Адреса страниц формирует платформа. Элементы без ссылки могут быть текущим номером или многоточием.

## См. также

[Показать ещё](../catalog/load-more.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
