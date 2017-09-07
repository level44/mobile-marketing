(function(){
	var classNames = {
		toggleMenu: 'cl-toggle-menu',
		togglePosition: 'cl-toggle-position',

		positionStatic: 'position-static',
		positionFixed: 'position-fixed'
	};

	var ids = {};

	var selectors = cl.buildSelectors(classNames, ids);

	var $toggleMenu,
		$togglePosition,
		togglePositionOffset;

	var render = function() {
		if ($toggleMenu.exists()) {
			var $this = $(this),
				thisScrollTop = $this.scrollTop();

			if ((thisScrollTop > togglePositionOffset.top) && $toggleMenu.hasClass(classNames.positionStatic)) {
				$toggleMenu.fadeIn('fast', function () {
					$(this).removeClass(classNames.positionStatic).addClass(classNames.positionFixed).fadeIn('fast');
				});
			}
			if ((thisScrollTop <= togglePositionOffset.top) && $toggleMenu.hasClass(classNames.positionFixed)) {
				$toggleMenu.fadeIn('fast', function () {
					$(this).removeClass(classNames.positionFixed).addClass(classNames.positionStatic).fadeIn('fast');
				});
			}

		}
	};

	$(function(){
		$toggleMenu = $(selectors.toggleMenu);
		$togglePosition = $(selectors.togglePosition);
		togglePositionOffset = $togglePosition.offset();
		render();
	});

	$(document).on('resize', function(){
		togglePositionOffset = $togglePosition.offset();
	});

	$(document).on('scroll', render);
})();