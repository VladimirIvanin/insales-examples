# Просмотр объекта

Безопасно выводит объект в консоль браузера.

**Где использовать:** JavaScript темы при разработке.

**Зависимости:** Без библиотек.

## Код

```js
function inspectObject(value) {
  console.dir(value, { depth: 3 });
}

inspectObject({ title: 'Товар', options: ['красный', 'синий'] });
```

## Как это работает

Вывод предназначен для диагностики и не изменяет страницу. В отличие от старой реализации не создаёт глобальные переменные и не использует jQuery.

## См. также

[Параметры URL](query-parameters.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
