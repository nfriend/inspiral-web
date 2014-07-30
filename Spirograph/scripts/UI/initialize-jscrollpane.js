/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (UI) {
        'use strict';

        $('.scroll-container').each(function (index, scrollContainer) {
            var $scrollContainer = $(scrollContainer);
            $scrollContainer.jScrollPane({
                mouseWheelSpeed: 16,
                animateDuration: 1000,
                horizontalGutter: 10,
                verticalGutter: 0,
                animateEase: 'ease-in-out',
                animateScroll: true
            });

            var api = $scrollContainer.data('jsp');
            var throttleTimeout;
            $(window).bind('resize', function () {
                if (!throttleTimeout) {
                    throttleTimeout = setTimeout(function () {
                        api.reinitialise();
                        throttleTimeout = null;
                    }, 50);
                }
            });
        });

        $('#gear-options-selector, #color-selector').on('mousewheel', function (ev) {
            ev.stopPropagation();
        });
    })(Spirograph.UI || (Spirograph.UI = {}));
    var UI = Spirograph.UI;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=initialize-jscrollpane.js.map
