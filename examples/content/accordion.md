# Аккордеон на details

Раскрывает ответы по нажатию и с клавиатуры.

**Где использовать:** любой шаблон или сниппет темы.

**Зависимости:** HTML и CSS, JavaScript не нужен.

## Код

```html
<div class="example-accordion">
  <details><summary>Как оформить заказ?</summary><p>Добавьте товар в корзину и оформите заказ.</p></details>
  <details><summary>Как узнать о доставке?</summary><p>Способы доставки показаны при оформлении.</p></details>
</div>
<style>
.example-accordion details { border-bottom: 1px solid #ddd; padding: 12px 0; }
.example-accordion summary { cursor: pointer; font-weight: 600; }
</style>
```

## Как это работает

`details` и `summary` предоставляют раскрытие и работу с клавиатурой средствами браузера. Тексты замените содержимым своей темы.

## См. также

[Вкладки с товарами](lazy-product-tabs.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
