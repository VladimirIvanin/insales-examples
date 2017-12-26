function edgeElements(containerClass) {

    var list = [].slice.call(document.querySelectorAll(containerClass));

    list.forEach(function (elem, idx) {

      var items = [].slice.call(elem.children);

      var maxWidth = elem.clientWidth,
      marginWidth = 0,
      summaryWidth = 0,
      sideElements = [],
      previousElem = {};

      if (maxWidth) {

        items.forEach(function (elem, idx) {
          elem.classList.remove('on-edge');
          summaryWidth += elem.clientWidth + getOffset(elem);
          if (summaryWidth > maxWidth) {
            previousElem.classList.add('on-edge');
            if (items[idx - 2]) {
              items[idx - 2].classList.add('on-edge');
            }
            if (items[idx - 3]) {
              items[idx - 3].classList.add('on-edge');
            }
            sideElements.push(previousElem);
            summaryWidth = elem.clientWidth + getOffset(elem);
          }
          previousElem = elem;
        });
      }

    })
  }
