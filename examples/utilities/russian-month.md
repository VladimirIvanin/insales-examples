# Дата статьи с русским названием месяца

Выводит дату статьи в формате «25 февраля 2026».

**Где использовать:** шаблон статьи или список статей.

**Зависимости:** Liquid.

## Код

```liquid
{% if article.created_at %}
{% assign month_number = article.created_at | date: '%m' %}
{% assign months = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря' | split: ',' %}
{% assign month_index = month_number | plus: 0 | minus: 1 %}
<time datetime="{{ article.created_at | date: '%Y-%m-%d' }}">{{ article.created_at | date: '%d' }} {{ months[month_index] }} {{ article.created_at | date: '%Y' }}</time>
{% endif %}
```

## Как это работает

Числовой месяц не зависит от английской локали сервера. Два старых примера даты объединены в один.

## См. также

[Склонение слова «товар»](declension.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
