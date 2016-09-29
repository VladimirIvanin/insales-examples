# Сниппет для постоения меню на платформе InSales

### Вызов сниппета

``` liquid
{% include "menu", menu_class: 'main-menu', menu_handle: 'all', menu_type: 'collection' %}
```

### Код сниппета

``` liquid
{% unless menu_class %}
  {% assign menu_class = 'menu' %}
{% endunless %}

{% if menu_type == 'collection' %}

  {% assign prev_link_level = 1 %}
  {% assign root_level = collections[menu_handle].level %}

  <ul class="{{ menu_class }} level-1">

    {% for link in collections[menu_handle].flatten_branch %}

      {% assign current = '' %}
      {% if link.current? %}
        {% assign current = 'is-current' %}
      {% endif %}

      {% assign level_difference = prev_link_level | minus: link.level | minus: root_level %}

      {% if level_difference > 0 %}
        {% for i in (1..level_difference) %}
          </ul>
        {% endfor %}
      {% endif %}

      {% assign node_level = link.level | minus: root_level %}

      <li class="{{ menu_class }}-item menu-item level-{{ node_level }} {{ current }}">
          <span class="{{ menu_class }}-icon menu-icon level-{{ node_level }}"></span>

          <a href="{{ link.url }}" class="{{ menu_class }}-link level-{{ node_level }}">
            {{ link.title }}
          </a>

          {% if link.subcollections.size > 0 %}
            <button class="{{ menu_class }}-marker menu-marker level-{{ node_level }}" type="button"></button>
          {% endif %}

        {% if link.subcollections.size > 0 %}
          <ul class="{{ menu_class }} level-{{ node_level | plus: 1 }}">
        {% endif %}

      </li>

      {% assign prev_link_level = node_level %}
      {% if forloop.last %}
        {% assign prev_link_level = node_level | minus: 1 %}
        {% for i in (1..prev_link_level) %}
          </ul>
        {% endfor %}
      {% endif %}

    {% endfor %}
  </ul>

{% else %}
  <ul class="{{ menu_class }}">

    {% for link in linklists[menu_handle].links %}

      {% assign current = '' %}
      {% if link.current? %}
        {% assign current = 'is-current' %}
      {% endif %}

      <li class="{{ menu_class }}-item menu-item level-1 {{ current }}">
        <span class="{{ menu_class }}-icon level-1"></span>
        <a href="{{ link.url }}" class="{{ menu_class }}-link level-1">
          {{ link.title }}
        </a>
      </li>

    {% endfor %}
  </ul>

{% endif %}

{% assign prev_link_level = null %}
{% assign menu_handle = null %}
{% assign menu_class = null %}
{% assign menu_type = null %}

```
