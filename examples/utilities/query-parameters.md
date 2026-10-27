# Параметры строки запроса

Читает повторяющиеся параметры и значения из URL.

**Где использовать:** JavaScript темы.

**Зависимости:** Современный браузер; без библиотек.

## Код

```js
function queryToObject(query) {
  const result = Object.create(null);
  const params = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query);
  for (const [key, value] of params) {
    if (!result[key]) result[key] = [];
    result[key].push(value);
  }
  return result;
}

// queryToObject('?color=red&color=blue') → { color: ['red', 'blue'] }
```

## Как это работает

По сравнению со старой утилитой все значения представлены массивами, включая одиночные. Имена с квадратными скобками сохраняются буквально; URLSearchParams корректно декодирует `+`, `=` и проценты.

## См. также

[Округление числа](round-number.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
