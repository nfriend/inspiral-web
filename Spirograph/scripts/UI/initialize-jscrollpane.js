/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (UI) {
        'use strict';

        var $fixedContainer = $('#gear-options-selector .fixed-container .scroll-container'), $rotatingContainer = $('#gear-options-selector .rotating-container .scroll-container'), $backgroundContainer = $('#color-selector .background-container .scroll-container'), $foregroundContainer = $('#color-selector .foreground-container .scroll-container'), $allScrollContainers = $('.scroll-container');

        $allScrollContainers.each(function (index, scrollContainer) {
            var $scrollContainer = $(scrollContainer);
            $scrollContainer.jScrollPane({
                mouseWheelSpeed: 16,
                animateDuration: 1000,
                horizontalGutter: 10,
                verticalGutter: 0
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

        // scroll handlers
        var fixedContainerScrollHandler = function (ev, posY, isAtTop, isAtBottom) {
            // remove the handler on the linked scroll bar so we don't create an infinite scrolling loop
            $rotatingContainer.off('jsp-scroll-y', rotatingContainerScrollHandler);

            // scroll the other bar to match this bar
            $rotatingContainer.data('jsp').scrollToY(posY);

            // reattach the handler
            $rotatingContainer.on('jsp-scroll-y', rotatingContainerScrollHandler);
        };

        var rotatingContainerScrollHandler = function (ev, posY, isAtTop, isAtBottom) {
            // remove the handler on the linked scroll bar so we don't create an infinite scrolling loop
            $fixedContainer.off('jsp-scroll-y', fixedContainerScrollHandler);

            // scroll the other bar to match this bar
            $fixedContainer.data('jsp').scrollToY(posY);

            // reattach the handler
            $fixedContainer.on('jsp-scroll-y', fixedContainerScrollHandler);
        };

        var backgroundContainerScrollHandler = function (ev, posY, isAtTop, isAtBottom) {
            // remove the handler on the linked scroll bar so we don't create an infinite scrolling loop
            $foregroundContainer.off('jsp-scroll-y', foregroundContainerScrollHandler);

            // scroll the other bar to match this bar
            $foregroundContainer.data('jsp').scrollToY(posY);

            // reattach the handler
            $foregroundContainer.on('jsp-scroll-y', foregroundContainerScrollHandler);
        };

        var foregroundContainerScrollHandler = function (ev, posY, isAtTop, isAtBottom) {
            // remove the handler on the linked scroll bar so we don't create an infinite scrolling loop
            $backgroundContainer.off('jsp-scroll-y', backgroundContainerScrollHandler);

            // scroll the other bar to match this bar
            $backgroundContainer.data('jsp').scrollToY(posY);

            // reattach the handler
            $backgroundContainer.on('jsp-scroll-y', backgroundContainerScrollHandler);
        };

        $rotatingContainer.on('jsp-scroll-y', rotatingContainerScrollHandler);
        $fixedContainer.on('jsp-scroll-y', fixedContainerScrollHandler);
        $backgroundContainer.on('jsp-scroll-y', backgroundContainerScrollHandler);
        $foregroundContainer.on('jsp-scroll-y', foregroundContainerScrollHandler);
    })(Spirograph.UI || (Spirograph.UI = {}));
    var UI = Spirograph.UI;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=initialize-jscrollpane.js.map
