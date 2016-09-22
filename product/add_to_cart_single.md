# Самый простой пример добавления товара в корзину.

Задача: добавить в корзину товар у которого нет модификаций

Для добавления товара в корзину нам нужны:
* URL корзины
* Id варианта товара
* Колличество отправляемого товара


### 1. URL корзины
Как правило URL корзины /cart_items.
Если добавляем товар не через AJAX то в action формы пишем '/cart_items'.
Для AJAX запроса используем  /cart_items.json

### 2. Id варианта товара
Id варианта товара находится в переменной product.variants.first.id
В инпуте следует указать name="variant_id"

### 3. Колличество отправляемого товара
Колличество указывается в input c name="quantity"


**Пример строки запроса /cart_items.json?variant_id=81869763&quantity=1**

URL: /cart_items.json

variant_id: 81869763

quantity: 1

## liquid

```liquid
<form action="{{ cart_url }}" method="post">

  <input type="hidden" name="variant_id" value="{{ product.variants.first.id }}" />

  <input type="text" name="quantity" value="1" />

  <button type="submit" data-buy>Купить</button>

</form>
```

## JavaScript
```js
//===========================================
//Простой пример добавления товара через AJAX
//===========================================

$(function(){
  //Функция добавления товара в корзину
  /*
  *  Переменные:
  *  formProduct - форма внутри которой лежат необходимые инпуты
  *  pathJson - URL корзины
  *  dataParam - собранные значения для отправки формы
  */
  function addToCart($form) {
    var
    formProduct = $form,
    path        = formProduct.attr('action') || '/cart_items',
    pathJson    = path + '.json',
    dataParam   = formProduct.serialize();

      //Отправка товара в корзину
      $.ajax({
        url: pathJson,
        type: 'POST',
        datatype: 'json',
        data: dataParam,
        success: function(response){
          //Эта функция отработает на удачное добавление товара.
          //В response json объект обновленной корзины.
        },
        error: function(response) {
          //Эта функция отработает если, что то пошло не так
        }
      })
    }
  //Вешаем вызов функций addToCart на клик по элементу с data атрибутом 'data-buy'
  $('[data-buy]').click(function(event) {
    event.preventDefault();
    addToCart( $(this).parents('form:first') );
  });
});

```
