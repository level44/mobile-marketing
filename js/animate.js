/**
 * Created by Shnur on 04.07.2017.
 */
(function(){
	var classNames = {
		animateContainer: 'animate-container',
		animateLeftOpacity: 'animate-left-opacity',
		animateRightOpacity: 'animate-right-opacity',
		animateBottomOpacity: 'animate-bottom-opacity',
		animateTopOpacity: 'animate-top-opacity',
		animateOpacity: 'animate-opacity'
	};

	var ids = {};

	var selectors = cl.buildSelectors(classNames, ids);

	$(window).on('scroll', function(){
		var $animateContainers = $(selectors.animateContainer);
		var removeClasses = [classNames.animateLeftOpacity, classNames.animateOpacity, classNames.animateRightOpacity, classNames.animateBottomOpacity, classNames.animateTopOpacity];
		$animateContainers.each(function(){
			var $this = $(this);
			if ($this.isVisible()) {
				$this.removeClass(removeClasses.join(' '));
			}
		});
	});
})();