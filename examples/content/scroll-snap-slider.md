# Слайдер на CSS Scroll Snap

Перелистывает карточки кнопками, прокруткой и свайпом.

**Где использовать:** любой шаблон или сниппет темы.

**Зависимости:** HTML, CSS и JavaScript.

## Код

```html
<div class="example-slider" data-example-slider>
  <div class="example-slider__track" data-track tabindex="0" aria-label="Слайды">
    <article>Первый слайд</article><article>Второй слайд</article><article>Третий слайд</article>
  </div>
  <button type="button" data-direction="-1" aria-label="Предыдущий слайд">←</button>
  <button type="button" data-direction="1" aria-label="Следующий слайд">→</button>
</div>
<style>
.example-slider__track { display: flex; overflow-x: auto; gap: 16px; scroll-snap-type: x mandatory; scroll-behavior: smooth; }
.example-slider__track > * { flex: 0 0 min(80%, 320px); scroll-snap-align: start; padding: 24px; box-sizing: border-box; background: #eee; }
</style>
<script>
(function () {
  document.querySelectorAll('[data-example-slider]:not([data-ready])').forEach(function (root) {
    root.dataset.ready = 'true'; var track = root.querySelector('[data-track]');
    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-direction]');
      if (!button || !track.firstElementChild) return;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      track.scrollBy({ left: Number(button.dataset.direction) * (track.firstElementChild.getBoundingClientRect().width + gap), behavior: 'smooth' });
    });
  });
})();
</script>
```

## Как это работает

Каждый блок управляет только своей лентой. Фокусируемая область доступна для прокрутки с клавиатуры; браузер ограничивает прокрутку краями списка.

## См. также

[Аккордеон](accordion.md) · [Адаптивные изображения](responsive-images.md)

[Все примеры раздела](README.md) · [Руководство по подключению](../../docs/usage.md) · [Навык insales-coder](https://github.com/VladimirIvanin/insales-coder)
