# Сетка товаров категории

Выведите карточки товаров с изображением, ценой и наличием. Карточки одной строки имеют одинаковую высоту, а блок цены остаётся у нижнего края карточки, даже если названия товаров разной длины.

**Где использовать:** шаблон категории внутри блока пагинации или сниппет, которому доступен объект `collection`.

**Зависимости:** Liquid и CSS.

## Код

```liquid
<div class="catalog-cards">
  {% for product in collection.products %}
    <article class="catalog-card">
      <a class="catalog-card__image" href="{{ product.url }}" aria-label="{{ product.title | escape }}">
        {% if product.first_image %}
          <img src="{{ product.first_image.medium_url }}" alt="" loading="lazy">
        {% endif %}
      </a>
      <div class="catalog-card__body">
        <h2 class="catalog-card__title">
          <a href="{{ product.url }}">{{ product.title | escape }}</a>
        </h2>
        <p class="catalog-card__availability">
          {% if product.available %}В наличии{% else %}Нет в наличии{% endif %}
        </p>
        <p class="catalog-card__price">
          {% if product.price_varies? %}от {% endif %}{{ product.price_min | money }}
        </p>
        <a class="catalog-card__link" href="{{ product.url }}">Подробнее</a>
      </div>
    </article>
  {% else %}
    <p>В этой категории пока нет товаров.</p>
  {% endfor %}
</div>

<style>
.catalog-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 16px;
}
.catalog-card { display: flex; flex-direction: column; min-width: 0; border: 1px solid #ddd; }
.catalog-card__image { display: block; aspect-ratio: 1; background: #f5f5f5; }
.catalog-card__image img { display: block; width: 100%; height: 100%; object-fit: contain; }
.catalog-card__body { display: flex; flex: 1; flex-direction: column; gap: 8px; padding: 16px; }
.catalog-card__title, .catalog-card__availability, .catalog-card__price { margin: 0; }
.catalog-card__title { font-size: 1rem; overflow-wrap: anywhere; }
.catalog-card__price { margin-top: auto; font-weight: 700; }
.catalog-card__link { align-self: flex-start; }
</style>
```

## Как это работает

Изображения занимают одинаковую квадратную область; `contain` показывает товар целиком. Цена отодвигается вниз с помощью `margin-top: auto`. Если варианты товара имеют разную цену, показана минимальная цена с подписью «от».

Ссылка «Подробнее» ведёт на страницу товара, где покупатель может выбрать вариант. Добавление в корзину и правила заказа при отсутствии товара настраиваются отдельно.

## См. также

[Выбор варианта товара](../products/variant-selection.md) · [Кнопка покупки со счётчиком](../products/cart-counter.md) · [Пагинация](../navigation/pagination.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
