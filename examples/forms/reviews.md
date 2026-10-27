# Отзыв о товаре

Покупатель заполняет форму и получает сообщение об отправке или ошибке.

**Где использовать:** шаблон товара; отзывы должны быть включены

**Зависимости:** common.js v2 и jQuery; капча подключается настройками магазина.

## Код

```liquid
{% if account.reviews_enabled? %}
<form method="post" action="{{ product.url }}/reviews#review_form" data-reviews-form-wrapper='{"reviews_moderated": {{ account.reviews_moderated? }}, "url": {{ product.url | json | escape }} }'>
  <div data-reviews-form-success='{"showTime":10000,"message":"Сообщение отправлено","reloadPage":false}'>Сообщение отправлено</div>
  <div data-reviews-form-field-area>
    <label>Оценка <select name="review[rating]" data-reviews-form-field>
      <option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option>
    </select></label><div data-reviews-form-field-error></div>
  </div>
  <div data-reviews-form-field-area><label>Имя <input name="review[author]" type="text" data-reviews-form-field='{"isRequired":true,"errorMessage":"Заполните поле"}' required></label><div data-reviews-form-field-error></div></div>
  <div data-reviews-form-field-area><label>Email <input name="review[email]" type="email" data-reviews-form-field='{"isRequired":true,"errorMessage":"Заполните поле"}' required></label><div data-reviews-form-field-error></div></div>
  <div data-reviews-form-field-area><label>Отзыв <textarea name="review[content]" data-reviews-form-field='{"isRequired":true,"errorMessage":"Заполните поле"}' required></textarea></label><div data-reviews-form-field-error></div></div>
  <div data-reviews-form-field-area>
    <label><input type="checkbox" name="agree" data-reviews-form-agree='{"errorMessage":"Необходимо согласие"}' required> Согласен на обработку данных</label>
    <div data-reviews-form-field-error></div>
  </div>
  {% if review.captcha_enabled? %}
    {% if account.captcha_type == 'google' %}
      <div data-reviews-form-field-area>
        <div data-recaptcha-type="invisible" data-reviews-form-recaptcha='{"isRequired":true,"errorMessage":"Подтвердите, что вы не робот"}'></div>
        <div data-reviews-form-field-error></div>
      </div>
    {% elsif account.captcha_type == 'yandex' %}
      <div data-reviews-form-field-area>
        <div data-yandex-captcha-type="invisible" data-reviews-form-yandex-captcha='{"isRequired":true,"errorMessage":"Подтвердите, что вы не робот"}'></div>
        <div data-reviews-form-field-error></div>
      </div>
    {% endif %}
  {% endif %}
  <button type="submit">Отправить</button>
</form>
{% endif %}
<style>
[data-reviews-form-success] { display: none; }
[data-reviews-form-success].is-show { display: block; }
[data-reviews-form-field-error] { color: #a00; }
</style>
```

## Как это работает

Каждое поле и сообщение ошибки находятся в собственной области. Капча добавляется только при соответствующей настройке и типе магазина. Подтверждение отправки показывает common.js; для отзыва и комментария публикация может зависеть от модерации.

## См. также

[Форма обратной связи](feedback.md) · [Отзыв](reviews.md) · [Комментарий](comments.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
