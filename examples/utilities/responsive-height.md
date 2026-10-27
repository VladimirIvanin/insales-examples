# Адаптивная высота промобаннера

Выведите изображение категории с текстом и ссылкой. Баннер заполняет ширину контейнера, а его высота меняется вместе с шириной экрана. Если текст занимает несколько строк, баннер остаётся достаточно высоким, чтобы текст не обрезался.

**Где использовать:** шаблон главной страницы или сниппет темы. Замените `new` на handle нужной категории и измените текст.

**Зависимости:** Liquid и CSS.

## Код

```liquid
{% assign promo_collection = collections['new'] %}
{% if promo_collection %}
  <section class="promo-banner" aria-label="Подборка товаров">
    {% if promo_collection.menu_image %}
      <img class="promo-banner__image"
        src="{{ promo_collection.menu_image.large_url }}"
        alt="" loading="lazy">
    {% endif %}
    <div class="promo-banner__content">
      <p>Подборка товаров</p>
      <h2>{{ promo_collection.title | escape }}</h2>
      <a href="{{ promo_collection.url }}">Посмотреть товары</a>
    </div>
  </section>
{% endif %}

<style>
.promo-banner {
  position: relative;
  display: flex;
  align-items: end;
  min-height: clamp(280px, 40vw, 520px);
  overflow: hidden;
  background: #303030;
  color: #fff;
}
.promo-banner__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.promo-banner__content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: clamp(20px, 4vw, 48px);
  background: linear-gradient(transparent, rgba(0, 0, 0, .8));
}
.promo-banner__content a { color: inherit; }
@media (max-width: 600px) {
  .promo-banner { min-height: 380px; }
}
</style>
```

## Как это работает

`clamp()` ограничивает высоту баннера на широких экранах, а `min-height` позволяет содержимому увеличить блок. Изображение заполняет область через `object-fit: cover`, поэтому его края могут обрезаться. Градиент повышает контраст текста; проверьте читаемость на выбранной фотографии. Если категории нет, блок не выводится.

Для баннера первого экрана удалите `loading="lazy"`, чтобы не откладывать загрузку главного изображения.

## См. также

[Адаптивное изображение](../content/responsive-images.md) · [Сетка карточек товара](../catalog/product-grid.md) · [Выравнивание карточек](equal-height.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
