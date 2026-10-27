# Комментарий к статье

Покупатель заполняет форму и получает сообщение об отправке или ошибке.

**Где использовать:** шаблон статьи; комментарии должны быть включены

**Зависимости:** common.js v2 и jQuery; капча подключается настройками магазина.

## Код

```liquid
{% if blog.comments_enabled? %}
<form method="post" action="{{ article.url }}/comments#comment_form" data-comments-form-wrapper='{"reviews_moderated": {{ account.reviews_moderated? }}, "url": {{ article.url | json | escape }} }'>
  <div data-comments-form-success='{"showTime":10000,"message":"Сообщение отправлено","reloadPage":false}'>Сообщение отправлено</div>
  <div data-comments-form-field-area><label>Имя <input name="comment[author]" type="text" data-comments-form-field='{"isRequired":true,"errorMessage":"Заполните поле"}' required></label><div data-comments-form-field-error></div></div>
  <div data-comments-form-field-area><label>Email <input name="comment[email]" type="email" data-comments-form-field='{"isRequired":true,"errorMessage":"Заполните поле"}' required></label><div data-comments-form-field-error></div></div>
  <div data-comments-form-field-area><label>Комментарий <textarea name="comment[content]" data-comments-form-field='{"isRequired":true,"errorMessage":"Заполните поле"}' required></textarea></label><div data-comments-form-field-error></div></div>
  <div data-comments-form-field-area>
    <label><input type="checkbox" name="agree" data-comments-form-agree='{"errorMessage":"Необходимо согласие"}' required> Согласен на обработку данных</label>
    <div data-comments-form-field-error></div>
  </div>
  {% if comment.captcha_enabled? %}
    {% if account.captcha_type == 'google' %}
      <div data-comments-form-field-area>
        <div data-recaptcha-type="invisible" data-comments-form-recaptcha='{"isRequired":true,"errorMessage":"Подтвердите, что вы не робот"}'></div>
        <div data-comments-form-field-error></div>
      </div>
    {% elsif account.captcha_type == 'yandex' %}
      <div data-comments-form-field-area>
        <div data-yandex-captcha-type="invisible" data-comments-form-yandex-captcha='{"isRequired":true,"errorMessage":"Подтвердите, что вы не робот"}'></div>
        <div data-comments-form-field-error></div>
      </div>
    {% endif %}
  {% endif %}
  <button type="submit">Отправить</button>
</form>
{% endif %}
<style>
[data-comments-form-success] { display: none; }
[data-comments-form-success].is-show { display: block; }
[data-comments-form-field-error] { color: #a00; }
</style>
```

## Как это работает

Каждое поле и сообщение ошибки находятся в собственной области. Капча добавляется только при соответствующей настройке и типе магазина. Подтверждение отправки показывает common.js; для отзыва и комментария публикация может зависеть от модерации.

## См. также

[Форма обратной связи](feedback.md) · [Отзыв](reviews.md) · [Комментарий](comments.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
