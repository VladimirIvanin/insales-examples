# Прогресс загрузки изображений

Отслеживает загрузку и ошибки изображений и вызывает функцию с текущим состоянием.

**Где использовать:** JavaScript темы после появления целевых изображений.

**Зависимости:** Без библиотек.

## Код

```js
function imageProgress(images, onUpdate) {
  const list = Array.from(images), state = { total: list.length, loaded: 0, failed: 0, finished: false };
  function report() {
    state.finished = state.loaded + state.failed === state.total;
    onUpdate({ ...state, percentage: state.total ? Math.round((state.loaded + state.failed) * 100 / state.total) : 100 });
  }
  if (!list.length) { report(); return; }
  list.forEach(function (image) {
    let settled = false;
    function complete(ok) {
      if (settled) return; settled = true;
      image.removeEventListener('load', onLoad); image.removeEventListener('error', onError);
      if (ok) state.loaded++; else state.failed++;
      report();
    }
    function onLoad() { complete(true); }
    function onError() { complete(false); }
    image.addEventListener('load', onLoad); image.addEventListener('error', onError);
    if (image.complete) complete(image.naturalWidth > 0);
  });
}

imageProgress(document.querySelectorAll('.gallery img'), state => console.log(state.percentage));
```

## Как это работает

Ошибки считаются завершёнными отдельно от успешно загруженных изображений. Пустой список сразу завершён; кэшированные изображения учитываются без повторного события.

## См. также

[Извлечение изображений](extract-images.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
