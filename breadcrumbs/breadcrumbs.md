# Пример хлебных крошек для платформы InSales

```liquid
<div class="breadcrumb-wrapper is-{{ template }}">

  <ul class="breadcrumb">

    <li class="breadcrumb-item home">
      <a class="breadcrumb-link" title='{{ messages.breadcrumb_home }}' href="/">Главная</a>
    </li>

      {% if template contains 'page.' or template == 'page' %}
        <li class="breadcrumb-item">
          <span class="breadcrumb-link current-page">{{ page.title }}</span>
        </li>

      {% elsif template contains 'search.' or template == 'search' %}
        <li class="breadcrumb-item">
          <span class="breadcrumb-link current-page">{{ messages.search_title }}</span>
        </li>

      {% elsif template contains 'blog.' or template == 'blog' %}
        <li class="breadcrumb-item">
          <span class="breadcrumb-link current-page">{{ blog.title }}</span>
        </li>

      {% elsif template contains 'article.' or template == 'article' %}
        <li class="breadcrumb-item">
          <a class="breadcrumb-link" title='{{ blog.title }}' href="{{ blog.url }}">{{ blog.title }}</a>
        </li>

        <li class="breadcrumb-item">
          <span class="breadcrumb-link current-page">{{ article.title }}</span>
        </li>

      {% elsif template contains 'cart.' or template == 'cart' %}
        <li class="breadcrumb-item">
          <span class="breadcrumb-link current-page">{{ messages.cart_title }}</span>
        </li>

      {% elsif template contains 'compare.' or template == 'compare' %}
        <li class="breadcrumb-item">
          <span class="breadcrumb-link current-page">{{ messages.comparison_title }}</span>
        </li>

      {% elsif template contains 'collection.' or template == 'collection' %}
        {% if current_collections.size > 0 %}

          {% for collection in current_collections %}
            {% if collection.level > 0 %}
              {% if forloop.last %}
                <li class="breadcrumb-item">
                  <span class="breadcrumb-link current-page">{{ collection.title }}</span>
                </li>
              {% else %}
                <li class="breadcrumb-item">
                  <a class="breadcrumb-link" title='{{ collection.title }}' href="{{ collection.url }}">{{ collection.title }}</a>
                </li>
              {% endif %}
            {% endif %}
          {% endfor %}

        {% endif %}

      {% elsif template contains 'product.' or template == 'product' %}
        {% comment %}
          исключаем варик, что мы перешли в товар из корня каталога
        {% endcomment %}
        {% if current_collections.size > 1 %}
          {% assign path = current_collections %}
        {% else %}

          {% assign deep_collection = product.collections.first %}
          {% if product.collections.size > 1 %}
            {% for collection in product.collections %}
              {% if deep_collection.level < collection.level %}
                {% assign deep_collection = collection %}
              {% endif %}
            {% endfor %}
          {% endif %}

          {% assign path = deep_collection.current_collections %}

        {% endif %}

        {% for collection in path %}
          {% if collection.level > 0 %}
            <li class="breadcrumb-item">
              <a class="breadcrumb-link" title='{{ collection.title }}' href="{{ collection.url }}">{{ collection.title }}</a>
            </li>
          {% endif %}
        {% endfor %}

        <li class="breadcrumb-item">
          <span class="breadcrumb-link current-page">{{ product.title }}</span>
        </li>

    {% endif %}

  </ul>

</div>
```
