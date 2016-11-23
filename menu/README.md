# Сниппет для генерации меню

Основная задача - построение единообразной верстки меню из

* указанной коллекции, с поддержкой многоуровневости
* меню `linklists`, одноуровневое

## Применение

* Скопировать файл `menu.liquid` в папку `snippets` темы
* Вызвать в нужном месте сниппет
* Застилить результат

# Пример

Вызов

````liquid
{% include "menu", menu_class: 'main-menu', source_type: 'collection', source_handle: 'all', show_icon: true %}
````

Результат

````html
<ul class="main-menu menu level-1">
  <li class="main-menu-item menu-item level-1">
    <span class="main-menu-icon menu-icon level-1"></span>

    <a href="/link/url" class="main-menu-link menu-link level-1">
      <!-- link.title -->
    </a>

    <button class="main-menu-marker menu-marker menu-marker level-1" type="button"></button>

    <ul class="main-menu menu level-2">
      <li class="main-menu-item menu-item level-2">
        <span class="main-menu-icon menu-icon level-2"></span>

        <a href="/link/url" class="main-menu-link menu-link level-2">
          <!-- link.title -->
        </a>
      </li>

      <li class="main-menu-item menu-item level-2">
        <span class="main-menu-icon menu-icon level-2"></span>

        <a href="/link/url" class="main-menu-link menu-link level-2">
          <!-- link.title -->
        </a>
      </li>

      <li class="main-menu-item menu-item level-2">
        <span class="main-menu-icon menu-icon level-2"></span>

        <a href="/link/url" class="main-menu-link menu-link level-2">
          <!-- link.title -->
        </a>
      </li>
    </ul>
  </li>

  <li class="main-menu-item menu-item level-1">
    <span class="main-menu-icon menu-icon level-1"></span>

    <a href="/link/url" class="main-menu-link menu-link level-1">
      <!-- link.title -->
    </a>
  </li>

  <li class="main-menu-item menu-item level-1">
    <span class="main-menu-icon menu-icon level-1"></span>

    <a href="/link/url" class="main-menu-link menu-link level-1">
      <!-- link.title -->
    </a>
  </li>
</ul>
````

## Элементы

* `menu` - главный контейнер
* `menu-item` - пункт меню
* `menu-icon` - место под иконку/маркер, опционален, выводится для всех пунктов
* `menu-link` - ссылка
* `meni-marker` - маркер, выводится, если данный пункт является родителем для ещё одного уровня

`level-{{ x }}` - класс-модификатор, указывает, на каком уровне меню находится данный элемент. Автоматически добавляется для любого элемента.

## Настройка

При вызове сниппета передаются следующие параметры

* `source_type` - **объязателн** `collection` | `linklists`, указывает, что мы рендерим
* `source_handle` - **объязателн** handle источника, коллекции или меню
* `menu_class` - **опционально** опорный класс для вывода в данном месте, добавляется ко всем узлам
* `show_icon` - **опционально** генерить ли азметку под иконки.
* `level_limit` - **опционально** ограничение глубины меню.

## Дополнительные миксины

ННада?
