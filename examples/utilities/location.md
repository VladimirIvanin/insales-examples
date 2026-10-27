# Определение местоположения

Запрашивает приблизительное местоположение и позволяет сохранить результат на время сеанса.

**Где использовать:** JavaScript темы; сервис может быть недоступен или вернуть неполный ответ.

**Зависимости:** jQuery; публичный сервис определения местоположения InSales.

## Код

```js
function getLocation() {
  const key = 'shop-location';
  try {
    const cached = sessionStorage.getItem(key);
    if (cached) return Promise.resolve(JSON.parse(cached));
  } catch (error) { /* хранилище недоступно */ }
  return new Promise(function (resolve, reject) {
    $.ajax({ url: 'https://kladr.insales.ru/current_location.json', dataType: 'jsonp', timeout: 10000 })
      .done(function (data) {
        try { sessionStorage.setItem(key, JSON.stringify(data)); } catch (error) { /* хранилище недоступно */ }
        resolve(data);
      }).fail(reject);
  });
}

getLocation().then(function (location) { console.log(location); }).catch(function () { console.log('Местоположение не определено'); });
```

## Как это работает

Сервис определяет приблизительное местоположение и получает IP-адрес посетителя. Данные хранятся только в текущем сеансе браузера; прежние настройки localforage и обратный вызов `succes` заменены Promise. При отказе нужен выбор города вручную.

## См. также

[Параметры URL](query-parameters.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
