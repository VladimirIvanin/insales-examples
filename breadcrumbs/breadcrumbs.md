# Пример хлебных крошек для платформы InSales

В примере используются шрифтовые иконки fontawesome.

```liquid
{% assign home_sign = '<i class="fa fa-home"></i>' %}
{% assign pipe_sign = '<i class="fa fa-angle-right"></i>' %}

<div class="breadcrumbs">

  <a href="/{% if language.not_default? %}?lang={{ language.locale }}{% endif %}"
      class="breadcrumbs-page breadcrumbs-page--home"
  >
    {{ home_sign }}
  </a>

  <span class="breadcrumbs-pipe">
    {{ pipe_sign }}
  </span>

  {% case template %}
    {% when 'page' %}
      <span class="breadcrumbs-page">{{ page.title }}</span>

    {% when 'search' %}
      <span class="breadcrumbs-page">Поиск</span>

    {% when 'blog' %}
      <span class="breadcrumbs-page">{{ blog.title }}</span>

    {% when 'article' %}
      <a href="{{ blog.url }}">{{ blog.title }}</a>
      <span class="breadcrumbs-pipe">
        {{ pipe_sign }}
      </span>
      <span class="breadcrumbs-page">{{ article.title }}</span>

    {% when 'cart' %}
      <span class="breadcrumbs-page">Корзина</span>

    {% when 'compare' %}
      <span class="breadcrumbs-page">Сравнение</span>

    {% when 'collection' %}

      {% if current_collections.size > 0  %}

        {% for collection in current_collections %}
          {% if collection.level > 0 %}
            {% if forloop.last %}
              <span class="breadcrumbs-page">{{ collection.title }}</span>
            {% else %}
              <a href="{{ collection.url }}" class="breadcrumbs-page">{{ collection.title }}</a>
              <span class="breadcrumbs-pipe">
                {{ pipe_sign }}
              </span>
            {% endif %}
          {% endif %}
        {% endfor %}

      {% else %}

        {% if product.collections.size > 0 %}
          {% assign deep_collection = product.collections.first %}
          {% for collection in product.collections %}
            {% if deep_collection.level < collection.level %}
              {% assign deep_collection = collection %}
            {% endif %}
          {% endfor %}

          {% for collection in deep_collection.current_collections %}
            {% if collection.level > 0 %}
              {% if forloop.last %}
                <span class="breadcrumbs-page">{{ collection.title }}</span>
              {% else %}
                <a href="{{ collection.url }}" class="breadcrumbs-page">{{ collection.title }}</a>
                <span class="breadcrumbs-pipe">
                  {{ pipe_sign }}
                </span>
              {% endif %}
            {% endif %}
          {% endfor %}
        {% endif %}

      {% endif %}

    {% when 'product' %}

      {% if current_collections.size > 0 and collection.handle != 'frontpage' %}

        {% for collection in current_collections %}
          {% if collection.level > 0 %}
            {% if forloop.last %}
              {% if template == 'product' %}
                <a href="{{ collection.url }}" class="breadcrumbs-page">{{ collection.title }}</a>
                <span class="breadcrumbs-pipe">
                  {{ pipe_sign }}
                </span>
                <span class="breadcrumbs-page">{{ product.title }}</span>
              {% else %}
                <span class="breadcrumbs-page">{{ collection.title }}</span>
              {% endif %}
            {% else %}
              <a href="{{ collection.url }}" class="breadcrumbs-page">{{ collection.title }}</a>
              <span class="breadcrumbs-pipe">
                {{ pipe_sign }}
              </span>
            {% endif %}
          {% endif %}
        {% endfor %}

      {% else %}

        {% if product.collections.size > 0 %}
          {% assign deep_collection = product.collections.first %}
          {% for collection in product.collections %}
            {% if deep_collection.level < collection.level %}
              {% assign deep_collection = collection %}
            {% endif %}
          {% endfor %}

          {% for collection in deep_collection.current_collections %}
            {% if collection.level > 0 %}
              {% if forloop.last %}
                <a href="{{ collection.url }}" class="breadcrumbs-page">{{ collection.title }}</a>
                <span class="breadcrumbs-pipe">
                  {{ pipe_sign }}
                </span>
                <span class="breadcrumbs-page">{{ product.title }}</span>
              {% else %}
                <a href="{{ collection.url }}" class="breadcrumbs-page">{{ collection.title }}</a>
                <span class="breadcrumbs-pipe">
                  {{ pipe_sign }}
                </span>
              {% endif %}
            {% endif %}
          {% endfor %}
        {% endif %}
      {% endif %}

    {% else %}
  {% endcase %}
</div>
```
