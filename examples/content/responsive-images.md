# Адаптивное изображение

Отдаёт изображение подходящего размера и откладывает загрузку.

**Где использовать:** шаблон товара или карточка товара.

**Зависимости:** Liquid и CSS.

## Код

```liquid
{% if product.first_image %}
  <img class="example-responsive-image"
    src="{{ product.first_image | image_url: 600 }}"
    srcset="{{ product.first_image | image_url: 300 }} 300w, {{ product.first_image | image_url: 600 }} 600w, {{ product.first_image | image_url: 1200 }} 1200w"
    sizes="(max-width: 600px) 100vw, 600px"
    alt="{{ product.title | escape }}" loading="lazy">
{% endif %}
<style>
.example-responsive-image { max-width: 100%; height: auto; }
</style>
```

## Как это работает

`sizes` должен соответствовать реальной ширине блока. Для главного изображения первого экрана уберите `loading="lazy"`, чтобы не задерживать его отображение.

## См. также

[Галерея варианта](../products/variant-gallery.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
