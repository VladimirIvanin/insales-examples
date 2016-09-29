# Сниппет для постоения меню на платформе InSales

### Вызов сниппета

``` liquid
{% include "menu", class: 'main-menu', handle: 'all', type: 'collection' %}
```

### Код сниппета

``` liquid
{% unless class %}
  {% assign class = 'menu' %}
{% endunless %}

{% if type == 'collection' %}

  {% assign prev_link_level = 1 %}
  {% assign root_level = collections[handle].level %}

  <ul class="{{ class }} level-1">

    {% for link in collections[handle].flatten_branch %}

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

      <li class="{{ class }}-item menu-item level-{{ node_level }} {{ current }}">
          <span class="{{ class }}-icon menu-icon level-{{ node_level }}"></span>

          <a href="{{ link.url }}" class="{{ class }}-link level-{{ node_level }}">
            {{ link.title }}
          </a>

          {% if link.subcollections.size > 0 %}
            <button class="{{ class }}-marker menu-marker level-{{ node_level }}" type="button"></button>
          {% endif %}

        {% if link.subcollections.size > 0 %}
          <ul class="{{ class }} level-{{ node_level | plus: 1 }}">
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
  <ul class="{{ class }}">

    {% for link in linklists[handle].links %}

      {% assign current = '' %}
      {% if link.current? %}
        {% assign current = 'is-current' %}
      {% endif %}

      <li class="{{ class }}-item menu-item level-1 {{ current }}">
        <span class="{{ class }}-icon level-1"></span>
        <a href="{{ link.url }}" class="{{ class }}-link level-1">
          {{ link.title }}
        </a>
      </li>

    {% endfor %}
  </ul>

{% endif %}

{% assign prev_link_level = null %}
{% assign handle = null %}
{% assign class = null %}
{% assign type = null %}

```
