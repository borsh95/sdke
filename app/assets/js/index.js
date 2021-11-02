// break points site
const breakPoint = {
	desctop: 1920,
	desctopMid: 1450,
	desctopMin: 1230,
	table: 1024,
	mobile: 768,
	tel: 480,
}

/***** INITIALIZING PLUGINS ******/

// скрол страницы к нужной координате
let scrollingWindow = scrollWindow();

//AOS плагин
if (isElem('[data-aos]')) {
	AOS.init({
		disable: "mobile",
		duration: 2500,
		offset: 0,
		once: true,
		anchorPlacement: 'bottom-bottom'
	});
}

// 	main slider 
if (isElem('.main-slider')) {
	const sliderNode = document.querySelector('.main-slider');

	const swiper = slider(sliderNode, {
		grabCursor: true,
		noSwipingClass: 'btnGo',
		watchSlidesVisibility: true,
		watchOverflow: true,
		speed: 1000,
	});
}

//	band slider	
if (isElem('.band-slider')) {
	const sliderNode = document.querySelector('.band-slider');

	const swiper = slider(sliderNode, {
		grabCursor: true,
		noSwipingClass: 'btnGo',
		watchSlidesVisibility: true,
		watchOverflow: true,
		speed: 1000,
		slidesPerView: 'auto',
		spaceBetween: 29,
		breakpoints: {
			300: {
				centeredSlides: true,
			},
			[breakPoint.table + 1]: {
				centeredSlides: false,
			}
		}
	});
}

// window modal
if (isElem('.v-modal')) {
	modalWindow();
}

/****** CUSTOM PLUGIN ******/
if (isElem('header')) {
	const $header = document.querySelector('header');
	const positionHeaderStyle = getComputedStyle($header).position;

	setPaddingTop();

	window.addEventListener('resize', setPaddingTop);

	function setPaddingTop() {
		if (positionHeaderStyle === 'fixed') {
			document.documentElement.style.paddingTop = $header.offsetHeight + 'px';
		}
	}
}

//Hamburger открытия мобильного меню
if (isElem('.header__hamburger')) {
	const hamburgerClassName = '.header__hamburger';
	const burgerBlockClassName = '.header__burger';
	const burgerInnerClassName = '.header__burger-inner';
	const $body = document.querySelector('body');
	const $header = document.querySelector('header');
	const $hamburger = document.querySelector(hamburgerClassName);
	const $burgerBlock = document.querySelector(burgerBlockClassName);
	const $burgerInner = document.querySelector(burgerInnerClassName);
	const mediaQuery = window.matchMedia(`(max-width: ${breakPoint.desctopMin}px)`);

	document.addEventListener('click', function (e) {
		if (e.target.closest(hamburgerClassName)) {
			const offsetRight = window.innerWidth - $body.offsetWidth;
			$hamburger.classList.toggle('active');
			$burgerBlock.style.top = $header.offsetHeight + 'px';

			let isActive = $hamburger.classList.contains('active');
			$burgerBlock.classList[isActive ? 'add' : 'remove']('open');
			$burgerInner.style.maxHeight = (isActive) ? `calc(100vh - ${$header.offsetHeight}px)` : '';
			$body.style.overflow = (isActive) ? 'hidden' : '';
		} else if ($burgerBlock.classList.contains('open') && !$burgerInner.contains(e.target)) {
			$hamburger.classList.remove('active');
			$burgerBlock.classList.remove('open');
			$body.style.overflow = '';
		}
	});

	window.addEventListener('resize', throttle(function () {
		$burgerBlock.style.top = $header.offsetHeight + 'px';
	}, 100));

	mediaQuery.addListener(function (e) {
		if (!e.matches && $burgerBlock.classList.contains('open')) {
			$hamburger.classList.remove('active');
			$burgerBlock.classList.remove('open');
			$body.style.overflow = '';
			document.documentElement.style.paddingRight = '';
		}
	})
}

// v-up кнопка вверх
(function () {
	document.querySelector('body').insertAdjacentHTML('afterbegin', `
		<div class="v-up"></div>
	`);

	const btnDown = document.querySelector('.v-up');
	let vUpTriggerTimer = undefined;

	vUp(btnDown, getScroledWindow);

	btnDown.addEventListener('click', function () {
		scrollingWindow.startAmimationScroll(1);
	});

	window.addEventListener('scroll', function () {
		clearTimeout(vUpTriggerTimer);
		vUpTriggerTimer = setTimeout(() => {
			vUp(btnDown, getScroledWindow);
		}, 200)
	});

	//пролистываине окна вверх при клике на кнопку
	function vUp(btn, scroled) {
		if (scroled() > (window.innerHeight / 2)) {
			btn.classList.add('active');
		} else if (scroled() < (window.innerHeight / 2) || btn.classList.contains('active')) {
			btn.classList.remove('active');
		}
	}

	//на сколько прокручено окно
	function getScroledWindow() {
		return window.pageYOffset || document.documentElement.scrollTop;
	}
}());

// под меню с гамбургером внутри основного меню
if (isElem('.menu__item--drop')) {
	const menuDrop = document.querySelector('.menu__item--drop');
	const toggle = menuDrop.querySelector('.menu__item-toggle');
	const linkbtn = menuDrop.querySelector('.menu__item-toggle ~ .menu__link');

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
	})
}

if (isElem('[href*="#scroll-"]')) {
	const linkSelectorShare = '[href*="#scroll-"]';
	const $header = document.querySelector('header');

	document.addEventListener('click', function (e) {
		const $link = e.target.closest(linkSelectorShare);

		if ($link) {
			const sectionSelector = $link.getAttribute('href');
			const $section = document.querySelector(sectionSelector);

			if (!$section) return;

			let sectionOffsetTop = getOffsetTop($section);
			const isFixedHeader = getComputedStyle($header).position === 'fixed';

			if (isFixedHeader) {
				sectionOffsetTop = sectionOffsetTop - $header.offsetHeight + 10;
			}

			scrollingWindow.startAmimationScroll(sectionOffsetTop + 2);
		}
	})
}

