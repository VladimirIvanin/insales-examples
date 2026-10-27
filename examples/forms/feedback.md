# Форма обратной связи

Покупатель заполняет форму и получает сообщение об отправке или ошибке.

**Где использовать:** страница обратной связи

**Зависимости:** common.js v2 и jQuery; капча подключается настройками магазина.

## Код

```liquid
<form method="post" action="/client_account/feedback" data-feedback-form-wrapper>
  <div data-feedback-form-success='{"showTime":10000,"message":"Сообщение отправлено","reloadPage":false}'>Сообщение отправлено</div>
  <div data-feedback-form-field-area><label>Имя <input name="name" type="text" data-feedback-form-field='{"isRequired":true,"errorMessage":"Заполните поле"}' required></label><div data-feedback-form-field-error></div></div>
  <div data-feedback-form-field-area><label>Email <input name="from" type="email" data-feedback-form-field='{"isRequired":true,"errorMessage":"Заполните поле"}' required></label><div data-feedback-form-field-error></div></div>
  <div data-feedback-form-field-area><label>Сообщение <textarea name="content" data-feedback-form-field='{"isRequired":true,"errorMessage":"Заполните поле"}' required></textarea></label><div data-feedback-form-field-error></div></div>
  <div data-feedback-form-field-area>
    <label><input type="checkbox" name="agree" data-feedback-form-agree='{"errorMessage":"Необходимо согласие"}' required> Согласен на обработку данных</label>
    <div data-feedback-form-field-error></div>
  </div>
  {% if settings.feedback_captcha_enabled %}
    {% if account.captcha_type == 'google' %}
      <div data-feedback-form-field-area>
        <div data-recaptcha-type="invisible" data-feedback-form-recaptcha='{"isRequired":true,"errorMessage":"Подтвердите, что вы не робот"}'></div>
        <div data-feedback-form-field-error></div>
      </div>
    {% elsif account.captcha_type == 'yandex' %}
      <div data-feedback-form-field-area>
        <div data-yandex-captcha-type="invisible" data-feedback-form-yandex-captcha='{"isRequired":true,"errorMessage":"Подтвердите, что вы не робот"}'></div>
        <div data-feedback-form-field-error></div>
      </div>
    {% endif %}
  {% endif %}
  <input type="hidden" name="subject" value="Обратная связь">
  <button type="submit">Отправить</button>
</form>
<style>
[data-feedback-form-success] { display: none; }
[data-feedback-form-success].is-show { display: block; }
[data-feedback-form-field-error] { color: #a00; }
</style>
```

## Как это работает

Каждое поле и сообщение ошибки находятся в собственной области. Капча добавляется только при соответствующей настройке и типе магазина. Подтверждение отправки показывает common.js; для отзыва и комментария публикация может зависеть от модерации.

## См. также

[Форма обратной связи](feedback.md) · [Отзыв](reviews.md) · [Комментарий](comments.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
