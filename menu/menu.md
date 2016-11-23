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
