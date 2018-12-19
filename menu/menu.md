## Вывести субколлекции в цикле linklists

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

## Связать разные linklists через пункт меню.

Добавляя ссылку в меню нужно придерживаться конструкции `/linklists/` + `пермалинк нужного линклиста`

Например `/linklists/footer`

Мы храним в одном меню, пермалинки на другие меню (linklists). 

```
<ul>
  <!-- linklists.top-menu.links - основной массив меню -->
  {% for link in linklists.top-menu.links %}
    <!-- если ссылка содержит /drop/ то вытаскиваем пермалинк для выпадающего меню -->
    {% if link.url contains '/drop/' %}
      {% assign menu_handle = link.url | split: '/drop/' | last %}
        <!-- если есть меню с пермалинком который мы вытащили в menu_handle то выводим выпадающее меню, иначе выводим ссылку -->
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
        {% else %}
          <li class="{% if link.current? %}active{% endif %}" ><a href="{{ link.url }}">{{ link.title }}</a></li>
      {% endif %}
    {% endfor %}
  </ul>
```
