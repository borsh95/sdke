/****** UTILS ******/
function isElem(selector) {
	return (document.querySelector(selector)) ? true : false;
}

// координаты элемента от верха документа
function getOffsetTop(node) {
	return window.pageYOffset + node.getBoundingClientRect().top;
}

// c учетом закрепленного сверху элемента
function pageYOffsetByNode(node) {
	return window.pageYOffset + node.offsetHeight || 0;
}

// функция отлащивающая вызов колбэка события на указанный промежуток
function throttle(func, ms = 50) {
	let locked = false;

	return function () {
		if (locked) return;

		const context = this;
		const args = arguments;
		locked = true;

		setTimeout(() => {
			func.apply(context, args);
			locked = false;
		}, ms)
	}
}