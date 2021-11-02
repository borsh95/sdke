"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// break points site
var breakPoint = {
  desctop: 1920,
  desctopMid: 1450,
  desctopMin: 1230,
  table: 1024,
  mobile: 768,
  tel: 480
};
/***** INITIALIZING PLUGINS ******/
// скрол страницы к нужной координате

var scrollingWindow = scrollWindow(); //AOS плагин

if (isElem('[data-aos]')) {
  AOS.init({
    disable: "mobile",
    duration: 2500,
    offset: 0,
    once: true,
    anchorPlacement: 'bottom-bottom'
  });
} // 	main slider 


if (isElem('.main-slider')) {
  var sliderNode = document.querySelector('.main-slider');
  var swiper = slider(sliderNode, {
    grabCursor: true,
    noSwipingClass: 'btnGo',
    watchSlidesVisibility: true,
    watchOverflow: true,
    speed: 1000
  });
} //	band slider	


if (isElem('.band-slider')) {
  var _sliderNode = document.querySelector('.band-slider');

  var _swiper = slider(_sliderNode, {
    grabCursor: true,
    noSwipingClass: 'btnGo',
    watchSlidesVisibility: true,
    watchOverflow: true,
    speed: 1000,
    slidesPerView: 'auto',
    spaceBetween: 29,
    breakpoints: _defineProperty({
      300: {
        centeredSlides: true
      }
    }, breakPoint.table + 1, {
      centeredSlides: false
    })
  });
} // window modal


if (isElem('.v-modal')) {
  modalWindow();
}
/****** CUSTOM PLUGIN ******/


if (isElem('header')) {
  var setPaddingTop = function setPaddingTop() {
    if (positionHeaderStyle === 'fixed') {
      document.documentElement.style.paddingTop = $header.offsetHeight + 'px';
    }
  };

  var $header = document.querySelector('header');
  var positionHeaderStyle = getComputedStyle($header).position;
  setPaddingTop();
  window.addEventListener('resize', setPaddingTop);
} //Hamburger открытия мобильного меню


if (isElem('.header__hamburger')) {
  var hamburgerClassName = '.header__hamburger';
  var burgerBlockClassName = '.header__burger';
  var burgerInnerClassName = '.header__burger-inner';
  var $body = document.querySelector('body');

  var _$header = document.querySelector('header');

  var $hamburger = document.querySelector(hamburgerClassName);
  var $burgerBlock = document.querySelector(burgerBlockClassName);
  var $burgerInner = document.querySelector(burgerInnerClassName);
  var mediaQuery = window.matchMedia("(max-width: ".concat(breakPoint.desctopMin, "px)"));
  document.addEventListener('click', function (e) {
    if (e.target.closest(hamburgerClassName)) {
      var offsetRight = window.innerWidth - $body.offsetWidth;
      $hamburger.classList.toggle('active');
      $burgerBlock.style.top = _$header.offsetHeight + 'px';
      var isActive = $hamburger.classList.contains('active');
      $burgerBlock.classList[isActive ? 'add' : 'remove']('open');
      $burgerInner.style.maxHeight = isActive ? "calc(100vh - ".concat(_$header.offsetHeight, "px)") : '';
      $body.style.overflow = isActive ? 'hidden' : '';
    } else if ($burgerBlock.classList.contains('open') && !$burgerInner.contains(e.target)) {
      $hamburger.classList.remove('active');
      $burgerBlock.classList.remove('open');
      $body.style.overflow = '';
    }
  });
  window.addEventListener('resize', throttle(function () {
    $burgerBlock.style.top = _$header.offsetHeight + 'px';
  }, 100));
  mediaQuery.addListener(function (e) {
    if (!e.matches && $burgerBlock.classList.contains('open')) {
      $hamburger.classList.remove('active');
      $burgerBlock.classList.remove('open');
      $body.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    }
  });
} // v-up кнопка вверх


(function () {
  document.querySelector('body').insertAdjacentHTML('afterbegin', "\n\t\t<div class=\"v-up\"></div>\n\t");
  var btnDown = document.querySelector('.v-up');
  var vUpTriggerTimer = undefined;
  vUp(btnDown, getScroledWindow);
  btnDown.addEventListener('click', function () {
    scrollingWindow.startAmimationScroll(1);
  });
  window.addEventListener('scroll', function () {
    clearTimeout(vUpTriggerTimer);
    vUpTriggerTimer = setTimeout(function () {
      vUp(btnDown, getScroledWindow);
    }, 200);
  }); //пролистываине окна вверх при клике на кнопку

  function vUp(btn, scroled) {
    if (scroled() > window.innerHeight / 2) {
      btn.classList.add('active');
    } else if (scroled() < window.innerHeight / 2 || btn.classList.contains('active')) {
      btn.classList.remove('active');
    }
  } //на сколько прокручено окно


  function getScroledWindow() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
})(); // под меню с гамбургером внутри основного меню


if (isElem('.menu__item--drop')) {
  var menuDrop = document.querySelector('.menu__item--drop');
  var toggle = menuDrop.querySelector('.menu__item-toggle');
  var linkbtn = menuDrop.querySelector('.menu__item-toggle ~ .menu__link');
  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    menuDrop.classList.toggle('active');
  });
  linkbtn.addEventListener('click', function (e) {
    e.preventDefault();
    toggle.classList.toggle('active');
    menuDrop.classList.toggle('active');
  });
  document.addEventListener('click', function (ev) {
    if (!ev.target.closest('.menu__item--drop')) {
      if (menuDrop.classList.contains('active')) {
        toggle.classList.remove('active');
        menuDrop.classList.remove('active');
      }
    }
  });
}

if (isElem('[href*="#scroll-"]')) {
  var linkSelectorShare = '[href*="#scroll-"]';

  var _$header2 = document.querySelector('header');

  document.addEventListener('click', function (e) {
    var $link = e.target.closest(linkSelectorShare);

    if ($link) {
      var sectionSelector = $link.getAttribute('href');
      var $section = document.querySelector(sectionSelector);
      if (!$section) return;
      var sectionOffsetTop = getOffsetTop($section);
      var isFixedHeader = getComputedStyle(_$header2).position === 'fixed';

      if (isFixedHeader) {
        sectionOffsetTop = sectionOffsetTop - _$header2.offsetHeight + 10;
      }

      scrollingWindow.startAmimationScroll(sectionOffsetTop + 2);
    }
  });
}
/***** FUNCTION PLUGIN ******/
// Меню дерево, применятся непосредственно 
// на DOM эелементе ul


(function treeMenu() {
  var $menus = document.querySelectorAll('.js-tree-menu');

  for (var i = 0; i < $menus.length; i++) {
    setupTreeMenu($menus[i]);
  }

  function setupTreeMenu(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var $el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    var openItemClass = 'js-tree-menu__item--open';
    var setings = {
      openItemClass: 'js-tree-menu__item--open',
      openSelector: '.js-tree-menu__btn'
    };

    $el.onclick = function (e) {
      var $btn = e.target.closest(setings.openSelector);
      if (!$btn) return;
      var $parentElement = $btn.closest('li');
      var $childrenContainer = $parentElement.querySelector('ul');
      if (!$childrenContainer) return;
      var isOpenItem = $parentElement.classList.contains(setings.openItemClass);
      $parentElement.classList[isOpenItem ? 'remove' : 'add'](setings.openItemClass);
      $childrenContainer.style.minHeight = !isOpenItem ? $childrenContainer.scrollHeight + "px" : "";
    };
  }
})(); //	modal window


function modalWindow() {
  var body = document.querySelector('body'),
      modalEls = document.querySelectorAll('.v-modal'),
      btnOpenClassName = "js-openModal",
      btnCloseClassName = 'js-closeModal';
  document.addEventListener('click', function (e) {
    if (e.target.closest(".".concat(btnOpenClassName)) && e.target.dataset.typeModal) {
      e.preventDefault();
      var typeModal = e.target.dataset['typeModal'];

      var _iterator = _createForOfIteratorHelper(modalEls),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var $modal = _step.value;

          if ($modal.dataset && $modal.dataset['typeModal'] === typeModal) {
            $modal.classList.add('active');
            e.preventDefault();
            var scrollBarWidth = window.innerWidth - body.offsetWidth;
            body.style.overflow = 'hidden';
            body.style.paddingRight = scrollBarWidth + "px";
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else if (e.target.classList.contains('v-modal__inner') || e.target.closest(".".concat(btnCloseClassName))) {
      e.target.closest('.v-modal').classList.remove('active');
      body.style.overflow = '';
      body.style.paddingRight = "";
    }
  });
} // анимация скрола окна браузера


function scrollWindow() {
  var scrollAnimationId = 0;
  var currentScroll = window.pageYOffset;
  var scrolls = false;

  function startAmimationScroll(newScrollY, callback) {
    if (!scrolls) {
      currentScroll = window.pageYOffset;
      scrolls = true;
    }

    scrollAnimationId++;
    var deltaScroll = newScrollY - currentScroll;
    currentScroll += deltaScroll * 0.15;
    window.scrollTo(0, currentScroll);

    if (Math.abs(deltaScroll) > 5) {
      scrollAnimationId = window.requestAnimationFrame(function () {
        startAmimationScroll(newScrollY);
      });
    } else {
      window.scrollTo(0, newScrollY);
      stopAnimationScroll();
      scrolls = false;
      if (typeof callback === 'function') callback();
    }
  }

  function stopAnimationScroll() {
    window.cancelAnimationFrame(scrollAnimationId);
    scrollAnimationId = undefined;
    scrolls = false;
  }

  return {
    get scrollAnimationId() {
      return scrollAnimationId;
    },

    startAmimationScroll: startAmimationScroll,
    stopAnimationScroll: stopAnimationScroll
  };
} //slider 


function slider(selector) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var $slider = typeof selector === 'string' ? document.querySelector(selector) : selector;
  var $sliderWrap = $slider.closest('.slider-wrap');
  var setings = {
    navigation: $sliderWrap.querySelector('.slider-nav'),
    pagination: $sliderWrap.querySelector('.slider-pagination'),
    options: _objectSpread({
      watchOverflow: true
    }, option)
  };
  Object.assign(setings.options, {
    autoplay: +$slider.dataset.swiperAutoplay > 0 ? {
      delay: +$slider.dataset.swiperAutoplay,
      pauseOnMouseEnter: true,
      disableOnInteraction: false
    } : '',
    navigation: setings.navigation ? {
      nextEl: $sliderWrap.querySelector('.slider-arr--next'),
      prevEl: $sliderWrap.querySelector('.slider-arr--prev')
    } : '',
    pagination: setings.pagination ? {
      el: $sliderWrap.querySelector('.slider-pagination'),
      clickable: true
    } : ''
  });
  return new Swiper($slider, setings.options);
}
/****** UTILS ******/


function isElem(selector) {
  return document.querySelector(selector) ? true : false;
} // координаты элемента от верха документа


function getOffsetTop(node) {
  return window.pageYOffset + node.getBoundingClientRect().top;
} // c учетом закрепленного сверху элемента


function pageYOffsetByNode(node) {
  return window.pageYOffset + node.offsetHeight || 0;
} // функция отлащивающая вызов колбэка события на указанный промежуток


function throttle(func) {
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  var locked = false;
  return function () {
    if (locked) return;
    var context = this;
    var args = arguments;
    locked = true;
    setTimeout(function () {
      func.apply(context, args);
      locked = false;
    }, ms);
  };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwidWkuanMiLCJoZWxwZXJzLmpzIl0sIm5hbWVzIjpbImJyZWFrUG9pbnQiLCJkZXNjdG9wIiwiZGVzY3RvcE1pZCIsImRlc2N0b3BNaW4iLCJ0YWJsZSIsIm1vYmlsZSIsInRlbCIsInNjcm9sbGluZ1dpbmRvdyIsInNjcm9sbFdpbmRvdyIsImlzRWxlbSIsIkFPUyIsImluaXQiLCJkaXNhYmxlIiwiZHVyYXRpb24iLCJvZmZzZXQiLCJvbmNlIiwiYW5jaG9yUGxhY2VtZW50Iiwic2xpZGVyTm9kZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN3aXBlciIsInNsaWRlciIsImdyYWJDdXJzb3IiLCJub1N3aXBpbmdDbGFzcyIsIndhdGNoU2xpZGVzVmlzaWJpbGl0eSIsIndhdGNoT3ZlcmZsb3ciLCJzcGVlZCIsInNsaWRlc1BlclZpZXciLCJzcGFjZUJldHdlZW4iLCJicmVha3BvaW50cyIsImNlbnRlcmVkU2xpZGVzIiwibW9kYWxXaW5kb3ciLCJzZXRQYWRkaW5nVG9wIiwicG9zaXRpb25IZWFkZXJTdHlsZSIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwicGFkZGluZ1RvcCIsIiRoZWFkZXIiLCJvZmZzZXRIZWlnaHQiLCJnZXRDb21wdXRlZFN0eWxlIiwicG9zaXRpb24iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiaGFtYnVyZ2VyQ2xhc3NOYW1lIiwiYnVyZ2VyQmxvY2tDbGFzc05hbWUiLCJidXJnZXJJbm5lckNsYXNzTmFtZSIsIiRib2R5IiwiJGhhbWJ1cmdlciIsIiRidXJnZXJCbG9jayIsIiRidXJnZXJJbm5lciIsIm1lZGlhUXVlcnkiLCJtYXRjaE1lZGlhIiwiZSIsInRhcmdldCIsImNsb3Nlc3QiLCJvZmZzZXRSaWdodCIsImlubmVyV2lkdGgiLCJvZmZzZXRXaWR0aCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInRvcCIsImlzQWN0aXZlIiwiY29udGFpbnMiLCJtYXhIZWlnaHQiLCJvdmVyZmxvdyIsInJlbW92ZSIsInRocm90dGxlIiwiYWRkTGlzdGVuZXIiLCJtYXRjaGVzIiwicGFkZGluZ1JpZ2h0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiYnRuRG93biIsInZVcFRyaWdnZXJUaW1lciIsInVuZGVmaW5lZCIsInZVcCIsImdldFNjcm9sZWRXaW5kb3ciLCJzdGFydEFtaW1hdGlvblNjcm9sbCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJidG4iLCJzY3JvbGVkIiwiaW5uZXJIZWlnaHQiLCJhZGQiLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvcCIsIm1lbnVEcm9wIiwibGlua2J0biIsInByZXZlbnREZWZhdWx0IiwiZXYiLCJsaW5rU2VsZWN0b3JTaGFyZSIsIiRsaW5rIiwic2VjdGlvblNlbGVjdG9yIiwiZ2V0QXR0cmlidXRlIiwiJHNlY3Rpb24iLCJzZWN0aW9uT2Zmc2V0VG9wIiwiZ2V0T2Zmc2V0VG9wIiwiaXNGaXhlZEhlYWRlciIsInRyZWVNZW51IiwiJG1lbnVzIiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJsZW5ndGgiLCJzZXR1cFRyZWVNZW51Iiwic2VsZWN0b3IiLCJvcHRpb25zIiwiJGVsIiwib3Blbkl0ZW1DbGFzcyIsInNldGluZ3MiLCJvcGVuU2VsZWN0b3IiLCJvbmNsaWNrIiwiJGJ0biIsIiRwYXJlbnRFbGVtZW50IiwiJGNoaWxkcmVuQ29udGFpbmVyIiwiaXNPcGVuSXRlbSIsIm1pbkhlaWdodCIsInNjcm9sbEhlaWdodCIsImJvZHkiLCJtb2RhbEVscyIsImJ0bk9wZW5DbGFzc05hbWUiLCJidG5DbG9zZUNsYXNzTmFtZSIsImRhdGFzZXQiLCJ0eXBlTW9kYWwiLCIkbW9kYWwiLCJzY3JvbGxCYXJXaWR0aCIsInNjcm9sbEFuaW1hdGlvbklkIiwiY3VycmVudFNjcm9sbCIsInNjcm9sbHMiLCJuZXdTY3JvbGxZIiwiY2FsbGJhY2siLCJkZWx0YVNjcm9sbCIsInNjcm9sbFRvIiwiTWF0aCIsImFicyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInN0b3BBbmltYXRpb25TY3JvbGwiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIm9wdGlvbiIsIiRzbGlkZXIiLCIkc2xpZGVyV3JhcCIsIm5hdmlnYXRpb24iLCJwYWdpbmF0aW9uIiwiT2JqZWN0IiwiYXNzaWduIiwiYXV0b3BsYXkiLCJzd2lwZXJBdXRvcGxheSIsImRlbGF5IiwicGF1c2VPbk1vdXNlRW50ZXIiLCJkaXNhYmxlT25JbnRlcmFjdGlvbiIsIm5leHRFbCIsInByZXZFbCIsImVsIiwiY2xpY2thYmxlIiwiU3dpcGVyIiwibm9kZSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VZT2Zmc2V0QnlOb2RlIiwiZnVuYyIsIm1zIiwibG9ja2VkIiwiY29udGV4dCIsImFyZ3MiLCJhcmd1bWVudHMiLCJhcHBseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUFBLFVBQUEsR0FBQTtBQUNBQyxFQUFBQSxPQUFBLEVBQUEsSUFEQTtBQUVBQyxFQUFBQSxVQUFBLEVBQUEsSUFGQTtBQUdBQyxFQUFBQSxVQUFBLEVBQUEsSUFIQTtBQUlBQyxFQUFBQSxLQUFBLEVBQUEsSUFKQTtBQUtBQyxFQUFBQSxNQUFBLEVBQUEsR0FMQTtBQU1BQyxFQUFBQSxHQUFBLEVBQUE7QUFOQSxDQUFBO0FBU0E7QUFFQTs7QUFDQSxJQUFBQyxlQUFBLEdBQUFDLFlBQUEsRUFBQSxDLENBRUE7O0FBQ0EsSUFBQUMsTUFBQSxDQUFBLFlBQUEsQ0FBQSxFQUFBO0FBQ0FDLEVBQUFBLEdBQUEsQ0FBQUMsSUFBQSxDQUFBO0FBQ0FDLElBQUFBLE9BQUEsRUFBQSxRQURBO0FBRUFDLElBQUFBLFFBQUEsRUFBQSxJQUZBO0FBR0FDLElBQUFBLE1BQUEsRUFBQSxDQUhBO0FBSUFDLElBQUFBLElBQUEsRUFBQSxJQUpBO0FBS0FDLElBQUFBLGVBQUEsRUFBQTtBQUxBLEdBQUE7QUFPQSxDLENBRUE7OztBQUNBLElBQUFQLE1BQUEsQ0FBQSxjQUFBLENBQUEsRUFBQTtBQUNBLE1BQUFRLFVBQUEsR0FBQUMsUUFB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QUEsRUFBQTtBQUZBLEtBQUEsR0FHQTtBQWJBLEdBQUE7QUFnQkEsU0FBQSxJQUFBQyxNQUFBLENBQUFmLE9BQUEsRUFBQTlCLE9BQUEsQ0FBQUgsT0FBQSxDQUFBO0FBQ0E7QUNoSkE7OztBQUNBLFNBQUEvRixNQUFBLENBQUE4RixRQUFBLEVBQUE7QUFDQSxTQUFBckYsUUFBQSxDQUFBQyxhQUFBLENBQUFvRixRQUFBLENBQUEsR0FBQSxJQUFBLEdBQUEsS0FBQTtBQUNBLEMsQ0FFQTs7O0FBQ0EsU0FBQVIsWUFBQSxDQUFBMEQsSUFBQSxFQUFBO0FBQ0EsU0FBQWhILE1BQUEsQ0FBQTBDLFdBQUEsR0FBQXNFLElBQUEsQ0FBQUMscUJBQUEsR0FBQTlGLEdBQUE7QUFDQSxDLENBRUE7OztBQUNBLFNBQUErRixpQkFBQSxDQUFBRixJQUFBLEVBQUE7QUFDQSxTQUFBaEgsTUFBQSxDQUFBMEMsV0FBQSxHQUFBc0UsSUFBQSxDQUFBbkgsWUFBQSxJQUFBLENBQUE7QUFDQSxDLENBRUE7OztBQUNBLFNBQUE0QixRQUFBLENBQUEwRixJQUFBLEVBQUE7QUFBQSxNQUFBQyxFQUFBLHVFQUFBLEVBQUE7QUFDQSxNQUFBQyxNQUFBLEdBQUEsS0FBQTtBQUVBLFNBQUEsWUFBQTtBQUNBLFFBQUFBLE1BQUEsRUFBQTtBQUVBLFFBQUFDLE9BQUEsR0FBQSxJQUFBO0FBQ0EsUUFBQUMsSUFBQSxHQUFBQyxTQUFBO0FBQ0FILElBQUFBLE1BQUEsR0FBQSxJQUFBO0FBRUFoRixJQUFBQSxVQUFBLENBQUEsWUFBQTtBQUNBOEUsTUFBQUEsSUFBQSxDQUFBTSxLQUFBLENBQUFILE9BQUEsRUFBQUMsSUFBQTtBQUNBRixNQUFBQSxNQUFBLEdBQUEsS0FBQTtBQUNBLEtBSEEsRUFHQUQsRUFIQSxDQUFBO0FBSUEsR0FYQTtBQVlBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBicmVhayBwb2ludHMgc2l0ZVxyXG5jb25zdCBicmVha1BvaW50ID0ge1xyXG5cdGRlc2N0b3A6IDE5MjAsXHJcblx0ZGVzY3RvcE1pZDogMTQ1MCxcclxuXHRkZXNjdG9wTWluOiAxMjMwLFxyXG5cdHRhYmxlOiAxMDI0LFxyXG5cdG1vYmlsZTogNzY4LFxyXG5cdHRlbDogNDgwLFxyXG59XHJcblxyXG4vKioqKiogSU5JVElBTElaSU5HIFBMVUdJTlMgKioqKioqL1xyXG5cclxuLy8g0YHQutGA0L7QuyDRgdGC0YDQsNC90LjRhtGLINC6INC90YPQttC90L7QuSDQutC+0L7RgNC00LjQvdCw0YLQtVxyXG5sZXQgc2Nyb2xsaW5nV2luZG93ID0gc2Nyb2xsV2luZG93KCk7XHJcblxyXG4vL0FPUyDQv9C70LDQs9C40L1cclxuaWYgKGlzRWxlbSgnW2RhdGEtYW9zXScpKSB7XHJcblx0QU9TLmluaXQoe1xyXG5cdFx0ZGlzYWJsZTogXCJtb2JpbGVcIixcclxuXHRcdGR1cmF0aW9uOiAyNTAwLFxyXG5cdFx0b2Zmc2V0OiAwLFxyXG5cdFx0b25jZTogdHJ1ZSxcclxuXHRcdGFuY2hvclBsYWNlbWVudDogJ2JvdHRvbS1ib3R0b20nXHJcblx0fSk7XHJcbn1cclxuXHJcbi8vIFx0bWFpbiBzbGlkZXIgXHJcbmlmIChpc0VsZW0oJy5tYWluLXNsaWRlcicpKSB7XHJcblx0Y29uc3Qgc2xpZGVyTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXNsaWRlcicpO1xyXG5cclxuXHRjb25zdCBzd2lwZXIgPSBzbGlkZXIoc2xpZGVyTm9kZSwge1xyXG5cdFx0Z3JhYkN1cnNvcjogdHJ1ZSxcclxuXHRcdG5vU3dpcGluZ0NsYXNzOiAnYnRuR28nLFxyXG5cdFx0d2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiB0cnVlLFxyXG5cdFx0d2F0Y2hPdmVyZmxvdzogdHJ1ZSxcclxuXHRcdHNwZWVkOiAxMDAwLFxyXG5cdH0pO1xyXG59XHJcblxyXG4vL1x0YmFuZCBzbGlkZXJcdFxyXG5pZiAoaXNFbGVtKCcuYmFuZC1zbGlkZXInKSkge1xyXG5cdGNvbnN0IHNsaWRlck5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFuZC1zbGlkZXInKTtcclxuXHJcblx0Y29uc3Qgc3dpcGVyID0gc2xpZGVyKHNsaWRlck5vZGUsIHtcclxuXHRcdGdyYWJDdXJzb3I6IHRydWUsXHJcblx0XHRub1N3aXBpbmdDbGFzczogJ2J0bkdvJyxcclxuXHRcdHdhdGNoU2xpZGVzVmlzaWJpbGl0eTogdHJ1ZSxcclxuXHRcdHdhdGNoT3ZlcmZsb3c6IHRydWUsXHJcblx0XHRzcGVlZDogMTAwMCxcclxuXHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuXHRcdHNwYWNlQmV0d2VlbjogMjksXHJcblx0XHRicmVha3BvaW50czoge1xyXG5cdFx0XHQzMDA6IHtcclxuXHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuXHRcdFx0fSxcclxuXHRcdFx0W2JyZWFrUG9pbnQudGFibGUgKyAxXToge1xyXG5cdFx0XHRcdGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vLyB3aW5kb3cgbW9kYWxcclxuaWYgKGlzRWxlbSgnLnYtbW9kYWwnKSkge1xyXG5cdG1vZGFsV2luZG93KCk7XHJcbn1cclxuXHJcbi8qKioqKiogQ1VTVE9NIFBMVUdJTiAqKioqKiovXHJcbmlmIChpc0VsZW0oJ2hlYWRlcicpKSB7XHJcblx0Y29uc3QgJGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG5cdGNvbnN0IHBvc2l0aW9uSGVhZGVyU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKCRoZWFkZXIpLnBvc2l0aW9uO1xyXG5cclxuXHRzZXRQYWRkaW5nVG9wKCk7XHJcblxyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRQYWRkaW5nVG9wKTtcclxuXHJcblx0ZnVuY3Rpb24gc2V0UGFkZGluZ1RvcCgpIHtcclxuXHRcdGlmIChwb3NpdGlvbkhlYWRlclN0eWxlID09PSAnZml4ZWQnKSB7XHJcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5wYWRkaW5nVG9wID0gJGhlYWRlci5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLy9IYW1idXJnZXIg0L7RgtC60YDRi9GC0LjRjyDQvNC+0LHQuNC70YzQvdC+0LPQviDQvNC10L3RjlxyXG5pZiAoaXNFbGVtKCcuaGVhZGVyX19oYW1idXJnZXInKSkge1xyXG5cdGNvbnN0IGhhbWJ1cmdlckNsYXNzTmFtZSA9ICcuaGVhZGVyX19oYW1idXJnZXInO1xyXG5cdGNvbnN0IGJ1cmdlckJsb2NrQ2xhc3NOYW1lID0gJy5oZWFkZXJfX2J1cmdlcic7XHJcblx0Y29uc3QgYnVyZ2VySW5uZXJDbGFzc05hbWUgPSAnLmhlYWRlcl9fYnVyZ2VyLWlubmVyJztcclxuXHRjb25zdCAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHRjb25zdCAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XHJcblx0Y29uc3QgJGhhbWJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGFtYnVyZ2VyQ2xhc3NOYW1lKTtcclxuXHRjb25zdCAkYnVyZ2VyQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1cmdlckJsb2NrQ2xhc3NOYW1lKTtcclxuXHRjb25zdCAkYnVyZ2VySW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1cmdlcklubmVyQ2xhc3NOYW1lKTtcclxuXHRjb25zdCBtZWRpYVF1ZXJ5ID0gd2luZG93Lm1hdGNoTWVkaWEoYChtYXgtd2lkdGg6ICR7YnJlYWtQb2ludC5kZXNjdG9wTWlufXB4KWApO1xyXG5cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoZS50YXJnZXQuY2xvc2VzdChoYW1idXJnZXJDbGFzc05hbWUpKSB7XHJcblx0XHRcdGNvbnN0IG9mZnNldFJpZ2h0ID0gd2luZG93LmlubmVyV2lkdGggLSAkYm9keS5vZmZzZXRXaWR0aDtcclxuXHRcdFx0JGhhbWJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHRcdFx0JGJ1cmdlckJsb2NrLnN0eWxlLnRvcCA9ICRoZWFkZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuXHJcblx0XHRcdGxldCBpc0FjdGl2ZSA9ICRoYW1idXJnZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKTtcclxuXHRcdFx0JGJ1cmdlckJsb2NrLmNsYXNzTGlzdFtpc0FjdGl2ZSA/ICdhZGQnIDogJ3JlbW92ZSddKCdvcGVuJyk7XHJcblx0XHRcdCRidXJnZXJJbm5lci5zdHlsZS5tYXhIZWlnaHQgPSAoaXNBY3RpdmUpID8gYGNhbGMoMTAwdmggLSAkeyRoZWFkZXIub2Zmc2V0SGVpZ2h0fXB4KWAgOiAnJztcclxuXHRcdFx0JGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAoaXNBY3RpdmUpID8gJ2hpZGRlbicgOiAnJztcclxuXHRcdH0gZWxzZSBpZiAoJGJ1cmdlckJsb2NrLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpICYmICEkYnVyZ2VySW5uZXIuY29udGFpbnMoZS50YXJnZXQpKSB7XHJcblx0XHRcdCRoYW1idXJnZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdCRidXJnZXJCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblx0XHRcdCRib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aHJvdHRsZShmdW5jdGlvbiAoKSB7XHJcblx0XHQkYnVyZ2VyQmxvY2suc3R5bGUudG9wID0gJGhlYWRlci5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG5cdH0sIDEwMCkpO1xyXG5cclxuXHRtZWRpYVF1ZXJ5LmFkZExpc3RlbmVyKGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoIWUubWF0Y2hlcyAmJiAkYnVyZ2VyQmxvY2suY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcclxuXHRcdFx0JGhhbWJ1cmdlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0JGJ1cmdlckJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuXHRcdFx0JGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuXHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcnO1xyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbi8vIHYtdXAg0LrQvdC+0L/QutCwINCy0LLQtdGA0YVcclxuKGZ1bmN0aW9uICgpIHtcclxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgYFxyXG5cdFx0PGRpdiBjbGFzcz1cInYtdXBcIj48L2Rpdj5cclxuXHRgKTtcclxuXHJcblx0Y29uc3QgYnRuRG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52LXVwJyk7XHJcblx0bGV0IHZVcFRyaWdnZXJUaW1lciA9IHVuZGVmaW5lZDtcclxuXHJcblx0dlVwKGJ0bkRvd24sIGdldFNjcm9sZWRXaW5kb3cpO1xyXG5cclxuXHRidG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0c2Nyb2xsaW5nV2luZG93LnN0YXJ0QW1pbWF0aW9uU2Nyb2xsKDEpO1xyXG5cdH0pO1xyXG5cclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0Y2xlYXJUaW1lb3V0KHZVcFRyaWdnZXJUaW1lcik7XHJcblx0XHR2VXBUcmlnZ2VyVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0dlVwKGJ0bkRvd24sIGdldFNjcm9sZWRXaW5kb3cpO1xyXG5cdFx0fSwgMjAwKVxyXG5cdH0pO1xyXG5cclxuXHQvL9C/0YDQvtC70LjRgdGC0YvQstCw0LjQvdC1INC+0LrQvdCwINCy0LLQtdGA0YUg0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YNcclxuXHRmdW5jdGlvbiB2VXAoYnRuLCBzY3JvbGVkKSB7XHJcblx0XHRpZiAoc2Nyb2xlZCgpID4gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpKSB7XHJcblx0XHRcdGJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdH0gZWxzZSBpZiAoc2Nyb2xlZCgpIDwgKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIHx8IGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8v0L3QsCDRgdC60L7Qu9GM0LrQviDQv9GA0L7QutGA0YPRh9C10L3QviDQvtC60L3QvlxyXG5cdGZ1bmN0aW9uIGdldFNjcm9sZWRXaW5kb3coKSB7XHJcblx0XHRyZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcblx0fVxyXG59KCkpO1xyXG5cclxuLy8g0L/QvtC0INC80LXQvdGOINGBINCz0LDQvNCx0YPRgNCz0LXRgNC+0Lwg0LLQvdGD0YLRgNC4INC+0YHQvdC+0LLQvdC+0LPQviDQvNC10L3RjlxyXG5pZiAoaXNFbGVtKCcubWVudV9faXRlbS0tZHJvcCcpKSB7XHJcblx0Y29uc3QgbWVudURyb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9faXRlbS0tZHJvcCcpO1xyXG5cdGNvbnN0IHRvZ2dsZSA9IG1lbnVEcm9wLnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19pdGVtLXRvZ2dsZScpO1xyXG5cdGNvbnN0IGxpbmtidG4gPSBtZW51RHJvcC5xdWVyeVNlbGVjdG9yKCcubWVudV9faXRlbS10b2dnbGUgfiAubWVudV9fbGluaycpO1xyXG5cclxuXHR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHR0b2dnbGUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblx0XHRtZW51RHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHR9KTtcclxuXHJcblx0bGlua2J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR0b2dnbGUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblx0XHRtZW51RHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHR9KTtcclxuXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXYpIHtcclxuXHRcdGlmICghZXYudGFyZ2V0LmNsb3Nlc3QoJy5tZW51X19pdGVtLS1kcm9wJykpIHtcclxuXHRcdFx0aWYgKG1lbnVEcm9wLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuXHRcdFx0XHR0b2dnbGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdFx0bWVudURyb3AuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5pZiAoaXNFbGVtKCdbaHJlZio9XCIjc2Nyb2xsLVwiXScpKSB7XHJcblx0Y29uc3QgbGlua1NlbGVjdG9yU2hhcmUgPSAnW2hyZWYqPVwiI3Njcm9sbC1cIl0nO1xyXG5cdGNvbnN0ICRoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcclxuXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0Y29uc3QgJGxpbmsgPSBlLnRhcmdldC5jbG9zZXN0KGxpbmtTZWxlY3RvclNoYXJlKTtcclxuXHJcblx0XHRpZiAoJGxpbmspIHtcclxuXHRcdFx0Y29uc3Qgc2VjdGlvblNlbGVjdG9yID0gJGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblx0XHRcdGNvbnN0ICRzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWN0aW9uU2VsZWN0b3IpO1xyXG5cclxuXHRcdFx0aWYgKCEkc2VjdGlvbikgcmV0dXJuO1xyXG5cclxuXHRcdFx0bGV0IHNlY3Rpb25PZmZzZXRUb3AgPSBnZXRPZmZzZXRUb3AoJHNlY3Rpb24pO1xyXG5cdFx0XHRjb25zdCBpc0ZpeGVkSGVhZGVyID0gZ2V0Q29tcHV0ZWRTdHlsZSgkaGVhZGVyKS5wb3NpdGlvbiA9PT0gJ2ZpeGVkJztcclxuXHJcblx0XHRcdGlmIChpc0ZpeGVkSGVhZGVyKSB7XHJcblx0XHRcdFx0c2VjdGlvbk9mZnNldFRvcCA9IHNlY3Rpb25PZmZzZXRUb3AgLSAkaGVhZGVyLm9mZnNldEhlaWdodCArIDEwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzY3JvbGxpbmdXaW5kb3cuc3RhcnRBbWltYXRpb25TY3JvbGwoc2VjdGlvbk9mZnNldFRvcCArIDIpO1xyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbiIsIi8qKioqKiBGVU5DVElPTiBQTFVHSU4gKioqKioqL1xyXG5cclxuLy8g0JzQtdC90Y4g0LTQtdGA0LXQstC+LCDQv9GA0LjQvNC10L3Rj9GC0YHRjyDQvdC10L/QvtGB0YDQtdC00YHRgtCy0LXQvdC90L4gXHJcbi8vINC90LAgRE9NINGN0LXQu9C10LzQtdC90YLQtSB1bFxyXG4oZnVuY3Rpb24gdHJlZU1lbnUoKSB7XHJcblx0bGV0ICRtZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy10cmVlLW1lbnUnKTtcclxuXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAkbWVudXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHNldHVwVHJlZU1lbnUoJG1lbnVzW2ldKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNldHVwVHJlZU1lbnUoc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xyXG5cdFx0Y29uc3QgJGVsID0gKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgOiBzZWxlY3RvcjtcclxuXHRcdGNvbnN0IG9wZW5JdGVtQ2xhc3MgPSAnanMtdHJlZS1tZW51X19pdGVtLS1vcGVuJztcclxuXHJcblx0XHRjb25zdCBzZXRpbmdzID0ge1xyXG5cdFx0XHRvcGVuSXRlbUNsYXNzOiAnanMtdHJlZS1tZW51X19pdGVtLS1vcGVuJyxcclxuXHRcdFx0b3BlblNlbGVjdG9yOiAnLmpzLXRyZWUtbWVudV9fYnRuJ1xyXG5cdFx0fVxyXG5cclxuXHRcdCRlbC5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0Y29uc3QgJGJ0biA9IGUudGFyZ2V0LmNsb3Nlc3Qoc2V0aW5ncy5vcGVuU2VsZWN0b3IpO1xyXG5cdFx0XHRpZiAoISRidG4pIHJldHVybjtcclxuXHJcblx0XHRcdGxldCAkcGFyZW50RWxlbWVudCA9ICRidG4uY2xvc2VzdCgnbGknKTtcclxuXHRcdFx0bGV0ICRjaGlsZHJlbkNvbnRhaW5lciA9ICRwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XHJcblxyXG5cdFx0XHRpZiAoISRjaGlsZHJlbkNvbnRhaW5lcikgcmV0dXJuO1xyXG5cdFx0XHRjb25zdCBpc09wZW5JdGVtID0gJHBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHNldGluZ3Mub3Blbkl0ZW1DbGFzcyk7XHJcblx0XHRcdCRwYXJlbnRFbGVtZW50LmNsYXNzTGlzdFtpc09wZW5JdGVtID8gJ3JlbW92ZScgOiAnYWRkJ10oc2V0aW5ncy5vcGVuSXRlbUNsYXNzKTtcclxuXHRcdFx0JGNoaWxkcmVuQ29udGFpbmVyLnN0eWxlLm1pbkhlaWdodCA9ICFpc09wZW5JdGVtID8gJGNoaWxkcmVuQ29udGFpbmVyLnNjcm9sbEhlaWdodCArIFwicHhcIiA6IFwiXCI7XHJcblx0XHR9XHJcblx0fVxyXG59KCkpO1xyXG5cclxuLy9cdG1vZGFsIHdpbmRvd1xyXG5mdW5jdGlvbiBtb2RhbFdpbmRvdygpIHtcclxuXHRjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLFxyXG5cdFx0bW9kYWxFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudi1tb2RhbCcpLFxyXG5cdFx0YnRuT3BlbkNsYXNzTmFtZSA9IFwianMtb3Blbk1vZGFsXCIsXHJcblx0XHRidG5DbG9zZUNsYXNzTmFtZSA9ICdqcy1jbG9zZU1vZGFsJztcclxuXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKGUudGFyZ2V0LmNsb3Nlc3QoYC4ke2J0bk9wZW5DbGFzc05hbWV9YCkgJiYgZS50YXJnZXQuZGF0YXNldC50eXBlTW9kYWwpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRjb25zdCB0eXBlTW9kYWwgPSBlLnRhcmdldC5kYXRhc2V0Wyd0eXBlTW9kYWwnXTtcclxuXHJcblx0XHRcdGZvciAobGV0ICRtb2RhbCBvZiBtb2RhbEVscykge1xyXG5cclxuXHRcdFx0XHRpZiAoJG1vZGFsLmRhdGFzZXQgJiYgJG1vZGFsLmRhdGFzZXRbJ3R5cGVNb2RhbCddID09PSB0eXBlTW9kYWwpIHtcclxuXHRcdFx0XHRcdCRtb2RhbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRjb25zdCBzY3JvbGxCYXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gYm9keS5vZmZzZXRXaWR0aDtcclxuXHRcdFx0XHRcdGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHRcdFx0XHRcdGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gc2Nyb2xsQmFyV2lkdGggKyBcInB4XCI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndi1tb2RhbF9faW5uZXInKSB8fCBlLnRhcmdldC5jbG9zZXN0KGAuJHtidG5DbG9zZUNsYXNzTmFtZX1gKSkge1xyXG5cdFx0XHRlLnRhcmdldC5jbG9zZXN0KCcudi1tb2RhbCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcblx0XHRcdGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gXCJcIjtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuLy8g0LDQvdC40LzQsNGG0LjRjyDRgdC60YDQvtC70LAg0L7QutC90LAg0LHRgNCw0YPQt9C10YDQsFxyXG5mdW5jdGlvbiBzY3JvbGxXaW5kb3coKSB7XHJcblx0bGV0IHNjcm9sbEFuaW1hdGlvbklkID0gMDtcclxuXHRsZXQgY3VycmVudFNjcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRsZXQgc2Nyb2xscyA9IGZhbHNlO1xyXG5cclxuXHRmdW5jdGlvbiBzdGFydEFtaW1hdGlvblNjcm9sbChuZXdTY3JvbGxZLCBjYWxsYmFjaykge1xyXG5cdFx0aWYgKCFzY3JvbGxzKSB7XHJcblx0XHRcdGN1cnJlbnRTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblx0XHRcdHNjcm9sbHMgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0c2Nyb2xsQW5pbWF0aW9uSWQrKztcclxuXHRcdGNvbnN0IGRlbHRhU2Nyb2xsID0gKG5ld1Njcm9sbFkgLSBjdXJyZW50U2Nyb2xsKTtcclxuXHJcblx0XHRjdXJyZW50U2Nyb2xsICs9IGRlbHRhU2Nyb2xsICogMC4xNTtcclxuXHRcdHdpbmRvdy5zY3JvbGxUbygwLCBjdXJyZW50U2Nyb2xsKTtcclxuXHJcblx0XHRpZiAoTWF0aC5hYnMoZGVsdGFTY3JvbGwpID4gNSkge1xyXG5cdFx0XHRzY3JvbGxBbmltYXRpb25JZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHN0YXJ0QW1pbWF0aW9uU2Nyb2xsKG5ld1Njcm9sbFkpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0d2luZG93LnNjcm9sbFRvKDAsIG5ld1Njcm9sbFkpO1xyXG5cdFx0XHRzdG9wQW5pbWF0aW9uU2Nyb2xsKCk7XHJcblx0XHRcdHNjcm9sbHMgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzdG9wQW5pbWF0aW9uU2Nyb2xsKCkge1xyXG5cdFx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHNjcm9sbEFuaW1hdGlvbklkKTtcclxuXHRcdHNjcm9sbEFuaW1hdGlvbklkID0gdW5kZWZpbmVkO1xyXG5cdFx0c2Nyb2xscyA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGdldCBzY3JvbGxBbmltYXRpb25JZCgpIHtcclxuXHRcdFx0cmV0dXJuIHNjcm9sbEFuaW1hdGlvbklkO1xyXG5cdFx0fSxcclxuXHRcdHN0YXJ0QW1pbWF0aW9uU2Nyb2xsLFxyXG5cdFx0c3RvcEFuaW1hdGlvblNjcm9sbCxcclxuXHR9XHJcbn1cclxuXHJcbi8vc2xpZGVyIFxyXG5mdW5jdGlvbiBzbGlkZXIoc2VsZWN0b3IsIG9wdGlvbiA9IHt9KSB7XHJcblx0Y29uc3QgJHNsaWRlciA9ICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIDogc2VsZWN0b3I7XHJcblx0Y29uc3QgJHNsaWRlcldyYXAgPSAkc2xpZGVyLmNsb3Nlc3QoJy5zbGlkZXItd3JhcCcpO1xyXG5cclxuXHRjb25zdCBzZXRpbmdzID0ge1xyXG5cdFx0bmF2aWdhdGlvbjogJHNsaWRlcldyYXAucXVlcnlTZWxlY3RvcignLnNsaWRlci1uYXYnKSxcclxuXHRcdHBhZ2luYXRpb246ICRzbGlkZXJXcmFwLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItcGFnaW5hdGlvbicpLFxyXG5cdFx0b3B0aW9uczoge1xyXG5cdFx0XHR3YXRjaE92ZXJmbG93OiB0cnVlLFxyXG5cdFx0XHQuLi5vcHRpb24sXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRPYmplY3QuYXNzaWduKHNldGluZ3Mub3B0aW9ucywge1xyXG5cdFx0YXV0b3BsYXk6ICgrJHNsaWRlci5kYXRhc2V0LnN3aXBlckF1dG9wbGF5ID4gMCkgPyB7XHJcblx0XHRcdGRlbGF5OiArJHNsaWRlci5kYXRhc2V0LnN3aXBlckF1dG9wbGF5LFxyXG5cdFx0XHRwYXVzZU9uTW91c2VFbnRlcjogdHJ1ZSxcclxuXHRcdFx0ZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxyXG5cdFx0fSA6ICcnLFxyXG5cdFx0bmF2aWdhdGlvbjogc2V0aW5ncy5uYXZpZ2F0aW9uID8ge1xyXG5cdFx0XHRuZXh0RWw6ICRzbGlkZXJXcmFwLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItYXJyLS1uZXh0JyksXHJcblx0XHRcdHByZXZFbDogJHNsaWRlcldyYXAucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLXByZXYnKSxcclxuXHRcdH0gOiAnJyxcclxuXHRcdHBhZ2luYXRpb246IHNldGluZ3MucGFnaW5hdGlvbiA/IHtcclxuXHRcdFx0ZWw6ICRzbGlkZXJXcmFwLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItcGFnaW5hdGlvbicpLFxyXG5cdFx0XHRjbGlja2FibGU6IHRydWUsXHJcblx0XHR9IDogJycsXHJcblx0fSlcclxuXHJcblx0cmV0dXJuIG5ldyBTd2lwZXIoJHNsaWRlciwgc2V0aW5ncy5vcHRpb25zKTtcclxufSIsIi8qKioqKiogVVRJTFMgKioqKioqL1xyXG5mdW5jdGlvbiBpc0VsZW0oc2VsZWN0b3IpIHtcclxuXHRyZXR1cm4gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSA/IHRydWUgOiBmYWxzZTtcclxufVxyXG5cclxuLy8g0LrQvtC+0YDQtNC40L3QsNGC0Ysg0Y3Qu9C10LzQtdC90YLQsCDQvtGCINCy0LXRgNGF0LAg0LTQvtC60YPQvNC10L3RgtCwXHJcbmZ1bmN0aW9uIGdldE9mZnNldFRvcChub2RlKSB7XHJcblx0cmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCArIG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG59XHJcblxyXG4vLyBjINGD0YfQtdGC0L7QvCDQt9Cw0LrRgNC10L/Qu9C10L3QvdC+0LPQviDRgdCy0LXRgNGF0YMg0Y3Qu9C10LzQtdC90YLQsFxyXG5mdW5jdGlvbiBwYWdlWU9mZnNldEJ5Tm9kZShub2RlKSB7XHJcblx0cmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCArIG5vZGUub2Zmc2V0SGVpZ2h0IHx8IDA7XHJcbn1cclxuXHJcbi8vINGE0YPQvdC60YbQuNGPINC+0YLQu9Cw0YnQuNCy0LDRjtGJ0LDRjyDQstGL0LfQvtCyINC60L7Qu9Cx0Y3QutCwINGB0L7QsdGL0YLQuNGPINC90LAg0YPQutCw0LfQsNC90L3Ri9C5INC/0YDQvtC80LXQttGD0YLQvtC6XHJcbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIG1zID0gNTApIHtcclxuXHRsZXQgbG9ja2VkID0gZmFsc2U7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAobG9ja2VkKSByZXR1cm47XHJcblxyXG5cdFx0Y29uc3QgY29udGV4dCA9IHRoaXM7XHJcblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG5cdFx0bG9ja2VkID0gdHJ1ZTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuXHRcdFx0bG9ja2VkID0gZmFsc2U7XHJcblx0XHR9LCBtcylcclxuXHR9XHJcbn0iXX0=
