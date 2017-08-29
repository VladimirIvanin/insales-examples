/*
  Не рабатает в ie 11
  Для ie 11 подключать https://github.com/WebReflection/dom4

  var myProgress = new PageLoadProgress({
      elements: '.promo-wrap img, header img',
      onUpdate: function (onUpdate) {
        console.log(onUpdate.percentage)
        console.log(onUpdate.finish)
      }
    })

 */

function PageLoadProgress(_options) {
  var self = this;
  var options = _options || {};

  self.state = {
    loadImages: 0,
    percentage: 0,
    finish: false,
    imagesLength: 0
  };

  self.system = {
    flag: 'isLoadElement',
    eventName: 'imageIsloaded'
  }

  self.event = new Event(self.system.eventName);

  var defaults = {
    elements: 'img', // сюда селекторы картинок которые нужно подождать
    finishOnWindowLoad: true, // принудительный финиш
    debug: false, // дебаг
    onFinish: function () {},
    onUpdate: function () {}, // любое событие
    onStart: function () {}
  }

  self.options = self.extendObject(defaults, options);

  var images = document.querySelectorAll(self.options.elements);

  // Старт плагина
  self.setState({imagesLength: images.length}, 'onStart');

  self.bindImages( images );

  setTimeout(function () {
    self.loadCache( images );
  }, 1000)

  if (images.length === 0) {
    if (!self.state.finish) {
      var finishState = {
        finish: true,
        loadImages: self.state.imagesLength,
        percentage: 100
      }
      self.setLog('images.length === 0');
      self.setState(finishState, 'onUpdate');
      self.setState(finishState, 'onFinish');
    }
  }

  if (self.options.finishOnWindowLoad) {
    self.bindWindow();
  }

}

PageLoadProgress.prototype.bindWindow = function () {
  var self = this;
  window.addEventListener("load", function(event) {
    if (!self.state.finish) {
      var finishState = {
        finish: true,
        loadImages: self.state.imagesLength,
        percentage: 100
      }
      self.setLog('load bindWindow')
      setTimeout(function () {
        self.setLog('setState bindWindow')
        self.setState(finishState, 'onUpdate');
        self.setState(finishState, 'onFinish');
      }, 30000)
    }
  });
}

PageLoadProgress.prototype.loadCache = function (images) {
  var self = this;
  var events = self.system.eventName + " load error";
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    if (image.complete && typeof image[self.system.flag] == 'undefined' && !self.state.finish) {
      image.dispatchEvent(self.event);
    }
  }
}

PageLoadProgress.prototype.bindImages = function (images) {
  var self = this;
  var events = ['load', 'error'];
  events.push(self.system.eventName)
  var i = 0;
  for (i; i < images.length; i++) {
    var image = images[i];
    var j = 0;
    for (j; j < events.length; j++) {

      self.addEvent(image, events[j], function(event) {
        var _image = event.target;

        if (typeof _image[self.system.flag] == 'undefined' && !self.state.finish) {

          _image[self.system.flag] = true;

          var newState = {};
          newState.loadImages = self.state.loadImages + 1;

          var percent = newState.loadImages / (self.state.imagesLength / 100);
          newState.percentage = self.patchNumber(percent);

          if (newState.loadImages == self.state.imagesLength || newState.percentage == 100) {
            newState.finish = true;
          };

          self.setLog('setState bindImages', newState);
          self.setState(newState, 'onUpdate');

          if (newState.finish) {
            self.setLog('finish bindImages')
            self.setState(newState, 'onFinish');
          }
        }
      })

    }
  }
};

PageLoadProgress.prototype.setState = function (newState, stateCallBackName) {
  var self = this;

  self.state = self.extendObject(self.state, newState);

  var stateCallBack = self.options[stateCallBackName]
  if (typeof stateCallBack == 'function') {
    stateCallBack(self.state);
  }
};

PageLoadProgress.prototype.addEvent = function (target, type, handler) {
  if (target.addEventListener)
    target.addEventListener(type, handler, false);
  else
    target.attachEvent("on" + type,
      function(event) {
              // Вызвать обработчик как метод цели,
                // и передать ему объект события
                return handler.call(target, event);
      });
}

PageLoadProgress.prototype.extendObject = function (defaults, options) {
  var extended = {};
  var prop;
  for (prop in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
      extended[prop] = defaults[prop];
    }
  }
  for (prop in options) {
    if (Object.prototype.hasOwnProperty.call(options, prop)) {
      extended[prop] = options[prop] || defaults[prop];
    }
  }
  return extended;
};

PageLoadProgress.prototype.patchNumber = function  (num){
  var isString = typeof num == 'string';
  if(isString){
    num = num.replace(/,/g, '.');
  }
  var thisNums = (isNaN(+num)) ? 1 : +num;
  function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }
  return Number( (isFloat(thisNums)) ? thisNums.toFixed(0) : thisNums );
}


PageLoadProgress.prototype.setLog = function(_name, _variable) {
  var self = this;
  if (self.options.debug) {
    console.info('==PageLoadProgress==');
    console.log(_name);
    if (_variable) {
      console.log(_variable);
    }
    console.log('/////////////////');
    console.log('///PageLoadProgress///');
    console.log('///////////////');
  }
};
