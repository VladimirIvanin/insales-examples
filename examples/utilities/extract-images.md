# Извлечь изображения из HTML

Возвращает адреса изображений, содержащихся во входной HTML-строке.

**Где использовать:** JavaScript темы.

**Зависимости:** DOMParser, без библиотек.

## Код

```js
function extractImages(html) {
  const documentFragment = new DOMParser().parseFromString(String(html || ''), 'text/html');
  return Array.from(documentFragment.querySelectorAll('img[src]'), image => image.getAttribute('src'));
}
```

## Как это работает

Пустой ввод даёт пустой массив. Функция возвращает атрибуты как указано в разметке и не вставляет HTML в документ.

## См. также

[Адаптивные изображения](../content/responsive-images.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
