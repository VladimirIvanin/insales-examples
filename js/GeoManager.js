/**
 * Определение geo позиции
 *
 *
 * Зависимости:
 * jQuery
 * localforage (//cdnjs.cloudflare.com/ajax/libs/localforage/1.4.3/localforage.min.js)
 *
 * Параметры:
 * succes - колбек на получение данных
 * debug - выводит уведомления о процессах
 * use_forage - юзать localforage
 * clear_forage - очистить localforage при запуске
 * keyParameters - ключ в котором хранятся данные localforage
 *
  Пример вызова:
  var myGeo = new GeoManager({
   succes: function (geoData) {
     console.log(geoData);
   },
   debug: true
 })
 *
 */
 var GeoManager = function (options) {
   var self = this;

   var DEFAULT_OPTIONS = {
     debug: false,
     clear_forage: false,
     use_forage: true,
     keyParameters: 'user_geo',
     succes: function () {}
   }

  self.option = $.extend(DEFAULT_OPTIONS, options);

  self.setLog('Настройки плагина', self.option);

  self.init();
}

/**
 * Инициализация
 */
GeoManager.prototype.init = function () {
  var self = this;

  // Если в настройка очистить сторадж при запуске
  if (self.option.clear_forage && localforage) {
    localforage.removeItem(self.option.keyParameters, function () {
      self.setLog('Локальное хранилище очищено', 'Ключ: ' + self.option.keyParameters);
    })
  }

  if (typeof window.localforage == "undefined") {
    console.warn('Не подключен плагин localforage!');
  }

  // получить гео данные
  self.getGeoData().done(function (geoData) {
    self.setLog('Вызов колбека succes');
    self.option.succes(geoData);

  }).fail(function (err) {
    self.setLog('Не удалось получить данные', err);
  });
};

/**
 * Получаем гео данные
 */
GeoManager.prototype.getGeoData = function () {
  var self = this;
  return $.when(_getGeoData())

  function _getGeoData() {
    var dfd = jQuery.Deferred();

    if (window.localforage && self.option.use_forage) {
      // пробуем забрать данные из хранилища
      self.getLocalData().done(function (geoData) {
        dfd.resolve( geoData );
      }).fail(function () {
        // если хранилище пусто, забираем из kladr.insales.ru
        self.getKladrData().done(function (geoData) {
          dfd.resolve( geoData );
        }).fail(function (err) {
          dfd.reject( err );
        });
      });
    }else{
      self.getKladrData().done(function (geoData) {
        dfd.resolve( geoData );
      }).fail(function (err) {
        dfd.reject( err );
      });
    }

    return dfd.promise();
  }
};

// Получить данные из хранилища
GeoManager.prototype.getLocalData = function () {
  var self = this;
  return $.when(_getLocalData())

  function _getLocalData() {
    var dfd = jQuery.Deferred();

    localforage.getItem(self.option.keyParameters, function(err, localData) {
      if (localData) {
        self.setLog('Данные получены из хранилища', localData);

        dfd.resolve( localData );
      }else{
        self.setLog('Хранилище пусто, данные будут запрошены в kladr.insales.ru');

        dfd.reject('Хранилище пусто');
      }
    });

    return dfd.promise();
  }
};

// Получить данные из kladr.insales.ru
GeoManager.prototype.getKladrData = function () {
  var self = this;
  return $.when(_getKladrData())

  function _getKladrData() {
    var dfd = jQuery.Deferred();

    $.ajax({
      url: 'https://kladr.insales.ru/current_location.json',
      type: 'get',
      dataType: 'jsonp',
    })
    .done(function(kladrData) {
      self.setLog('Данные получены из kladr.insales.ru', kladrData);
      if (window.localforage && self.option.use_forage) {
        localforage.setItem(self.option.keyParameters, kladrData);
      }
                          
      dfd.resolve( kladrData );
    })
    .fail(function(err) {
      self.setLog('Произошла ошибка при получении данных из kladr.insales.ru', err);
      dfd.reject( err );
    })

    return dfd.promise();
  }
};

// Установить свои данные
GeoManager.prototype.setLocalData = function (newLocals, _setCallback) {
  var self = this;
  var setCallback = _setCallback || function () {};
  if (window.localforage && self.option.use_forage) {
    localforage.setItem(self.option.keyParameters, newLocals, function(err, newlocalData) {
      if (newlocalData) {
        self.setLog('В хранилище обновлены данные через метод setLocalData', newlocalData);
        setCallback(newlocalData);
      }else{
        self.setLog('Не удалось обновить данные');
      }
    });
  }
};

// Дебагер
GeoManager.prototype.setLog = function (_name, _variable) {
  var self = this;
  if (self.option.debug) {
    console.info('==GeoManager==');
    console.log(_name);
    if (_variable) {
      console.log(_variable);
    }
    console.log('/////////////////');
    console.log('///GeoManager///');
    console.log('///////////////');
  }
};
