/**
 * Created by Shnur on 04.07.2017.
 */
(function(){
	window.cl = {};

	$.fn.exists = function () {
		return this.length !== 0;
	};

	$.fn.isVisible = function() {
		var coords = this[0].getBoundingClientRect();

		var windowHeight = document.documentElement.clientHeight;

		var topVisible = coords.top > 0 && coords.top < windowHeight;
		var bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

		return topVisible || bottomVisible;
	};

	$.fn.anchorScroll = function(_options) {
		var sections = [];
		var $anchorScroll = $(this);
		var $a = $anchorScroll.find('a[href*="#"]:not([href="#"])');
		var options = {
			speed: 600,
			marginTop: 0
		};
		_options = $.extend({}, options, _options);

		$a.each(function(){
			var thisOffset = $(this.hash).offset();
			if (!thisOffset) {
				return false;
			}
			sections.push({
				link: $(this).parent(),
				top : (thisOffset.top - _options.marginTop).toFixed(0),
				bottom : (thisOffset.top + $(this.hash).outerHeight(true) - (_options.marginTop + 2)).toFixed(0)
			});
		});
		$a.off('click');
		$a.on('click', function(e){
			var $this = $(this.hash);
			var scrollTop = ($this.offset().top - (_options.marginTop)).toFixed(0);
			var $clCheckedMenu = $(selectors.clCheckedMenu);
			if ($clCheckedMenu.is(':checked')) {
				$clCheckedMenu.removeAttr('checked');
			}
			$('html, body').stop().animate({
				scrollTop: scrollTop
			}, _options.speed);
			e.preventDefault();
			e.stopPropagation();
		});

		$(window).on('scroll', function(e){
			for (var index in sections) {
				if ($(window).scrollTop() >= sections[index].top - 1 && $(window).scrollTop() <= sections[index].bottom) {
					sections[index].link.addClass(classNames.active).siblings().removeClass(classNames.active);
				}
			}
		});
	};

	var classNames = {
		mobile: 'mobile',
		tablet: 'tablet',
		active: 'active',
		effectNav: 'cl-navigation',
		clCheckedMenu: 'cl-checked-menu'
	};

	var ids = {
		mobilnyyMarketing: 'mobilnyy-marketing',
		kommunikatsiyaKliyentami: 'kommunikatsiya-s-kliyentami',
		podderzhkaProyekta: 'podderzhka-proyekta',
		dlyaKogo: 'dlya-kogo'
	};

	var buildSelectors = function (selectors, source, characterToPrependWith) {
		$.each(source, function (propertyName, value) {
			selectors[propertyName] = characterToPrependWith + value;
		});
	};

	cl.buildSelectors = function (classNames, ids) {
		var selectors = {};
		if (classNames) {
			buildSelectors(selectors, classNames, ".");
		}
		if (ids) {
			buildSelectors(selectors, ids, "#");
		}
		return selectors;
	};

	var selectors = cl.buildSelectors(classNames, ids);

	$(function(){
		$(selectors.effectNav).anchorScroll({marginTop: 30, speed: 500});
		var $html = $('html');
		if (!$html.hasClass(classNames.mobile) && !$html.hasClass(classNames.tablet)) {
			// console.log('scroll');
			// $(selectors.mobilnyyMarketing).parallax('50%', 0.1);
			// $(selectors.kommunikatsiyaKliyentami).parallax("50%", 0.6);
			// $(selectors.podderzhkaProyekta).parallax('50%', 0.6);
			// $(selectors.dlyaKogo).parallax('50%', 0.6);
			// $(selectors.shPageSocietyFourContainer).parallax('50%', 0.6);
		}
	});
})();