# Округление числа

Преобразует строку с десятичной запятой и округляет значение.

**Где использовать:** JavaScript темы.

**Зависимости:** Без библиотек.

## Код

```js
function roundNumber(value, digits = 2) {
  if (typeof value !== 'number' && typeof value !== 'string') return null;
  const normalized = typeof value === 'string' ? value.trim().replace(/\s/g, '').replace(',', '.') : value;
  if (normalized === '') return null;
  const number = Number(normalized);
  if (!Number.isFinite(number) || !Number.isInteger(digits) || digits < 0 || digits > 100) return null;
  return Number(number.toFixed(digits));
}
```

## Как это работает

В отличие от прежнего `patchNumber`, знак отрицательного числа сохраняется, а некорректный ввод возвращает `null`. Для денежных расчётов используйте данные и округление платформы, а не округление промежуточных сумм.

## См. также

[Параметры URL](query-parameters.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
