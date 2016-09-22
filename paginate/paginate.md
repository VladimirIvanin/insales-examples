Сниппет пагинации для платформы InSales

```liquid
{% if paginate.parts.size > 1 %}

  <div class="sm-center xs-center">
    <ul class="pagination pagination--horizontal">

    {% if paginate.previous %}
      {% comment %}
      <li class="pagination-page">
        <span class="pagination-node pagination-node--block">
          <i class="fa fa-angle-double-left"></i>
        </span>
      </li>
      {% endcomment %}
      <li class="pagination-page">
        <a href="{{ paginate.previous.url }}"
            class="pagination-node pagination-node--link"
        >
          <i class="fa fa-angle-left"></i>
        </a>
      </li>
    {% else %}
      {% comment %}
      <li class="pagination-page">
        <i class="fa fa-angle-left"></i>
      </li>
      {% endcomment %}
    {% endif %}

    {% for part in paginate.parts %}
      {% if part.is_link %}
        <li class="pagination-page">
          <a href="{{ part.url }}"
              class="pagination-node pagination-node--link"
          >
            {{ part.title }}
          </a>
        </li>
      {% else %}
        <li class="pagination-page">
          {% if part.title == paginate['current_page'] %}
            <span class="pagination-node pagination-node--block pagination-node--current">
              {{ part.title }}
            </span>
          {% else %}
            <span class="pagination-node--block">
              {{ part.title }}
            </span>
          {% endif %}
        </li>
      {% endif %}
    {% endfor %}

    {% if paginate.next %}
      <li  class="pagination-page">
        <a href="{{ paginate.next.url }}"
            class="pagination-node pagination-node--link"
        >
          <i class="fa fa-angle-right"></i>
        </a>
      </li>
      {% comment %}
      <li class="pagination-page">
        <a href="{{ paginate.parts.last.url }}"
            class="pagination-node pagination-node--link"
        >
          <i class="fa fa-angle-double-right"></i> 
        </a>
      </li>
      {% endcomment %}
    {% else %}
      {% comment %}
      <li>
        <span class="pagination-node pagination-node--block">
          <i class="fa fa-angle-right"></i> 
        </span>
      </li>
      {% endcomment %}
    {% endif %}

    </ul>
  </div>
{% endif %}

{% if settings.pagination-show_hint %}
  <div class="pagination-counter
              sm-hidden xs-hidden"
  >
    {% assign from = paginate.current_offset %}

    {% if paginate['current_page'] == paginate.parts.last.title %}
      {% assign to = paginate.items %}
    {% else %}
      {% assign to = from | plus: paginate.page_size %}
    {% endif %}

    {% if paginate.pages == 1 and paginate.items <= paginate.page_size %}
      {% assign to = paginate.items %}
    {% endif %}

    Показано с {{ from | plus: 1 }} по {{ to }} из {{ paginate.items }}
  </div>
{% endif %}
```
