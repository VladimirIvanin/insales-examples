# Сниппет для склонения даты в статьях.

Стандартного вывода даты в формате 25 февраля, к сожалению, нет.
Для этого следуюет использовать следующий сниппет:

```
      {% assign month = '' %}
      {% assign monthdate = article.created_at | date: "%B" %}
      {% case monthdate %}

      {% when 'January' %}
          {% assign month = 'января' %}
      {% when 'February' %}
            {% assign month = 'февраля' %}
      {% when 'March' %}
            {% assign month = 'марта' %}
      {% when 'April' %}
            {% assign month = 'апреля' %}
      {% when 'May' %}
            {% assign month = 'мая' %}
      {% when 'June' %}
            {% assign month = 'июня' %}
      {% when 'July' %}
            {% assign month = 'июля' %}
      {% when 'August' %}
            {% assign month = 'августа' %}
      {% when 'September' %}
            {% assign month = 'сентября' %}
      {% when 'October' %}
            {% assign month = 'октября' %}
      {% when 'November' %}
            {% assign month = 'ноября' %}
      {% when 'December' %}
            {% assign month = 'декабря' %}
      {% else %}
          {% assign month = '' %}
      {% endcase %}

```

Сам вывод даты:

```
{{ article.created_at | date: "%d" }} {{ month }}
```
