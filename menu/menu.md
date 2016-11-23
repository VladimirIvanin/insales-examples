```liquid
<ul>
{% for link in linklists.main.links %}
  {% if link.url contains '/collection/' %}
    {% assign collection_handle = link.url | split: '/collection/' | last %}
    <li class="{% if link.current? %}active{% endif %}" >
      <a href="{{ link.url }}">{{ link.title }}</a>
      {% if collections[collection_handle].subcollections.size > 0 %}
        <ul>
          {% for collection in collections[collection_handle].subcollections %}
          <li class="{% if collection.current? %}active{% endif %}" ><a href="{{ collection.url }}">{{ collection.title }}</a></li>
          {% endfor %}
        </ul>
      {% endif %}
    </li>
    {% else %}
    <li class="{% if link.current? %}active{% endif %}" ><a href="{{ link.url }}">{{ link.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>
```

Связать разные linklists через пункт меню.
Добавляя ссылку в меню нужно придерживаться конструкции `/linklists/` + `пермалинк нужного линклиста`
Например `/linklists/footer`

```
<ul>
{% for link in linklists.main.links %}
  {% if link.url contains '/linklists/' %}
    {% assign menu_handle = link.url | split: '/linklists/' | last %}
    {% if linklists[menu_handle].links.size > 0 %}
    <li>
      <span>{{ link.title }}</a>
        <ul>
          {% for link_level_2 in linklists[menu_handle].links %}
          <li class="{% if link_level_2.current? %}active{% endif %}" ><a href="{{ link_level_2.url }}">{{ link_level_2.title }}</a></li>
          {% endfor %}
        </ul>
      </li>
    {% endif %}
  {% endif %}
{% endfor %}
</ul>
```
