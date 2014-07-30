/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    $('.scroll-container').each((index: number, scrollContainer: Element) => {
        var $scrollContainer = $(scrollContainer);
        $scrollContainer.jScrollPane({
            mouseWheelSpeed: 16,
            animateDuration: 1000,
            horizontalGutter: 10,
            verticalGutter: 0,
            animateEase: 'ease-in-out',
            
            animateScroll: true
        });

        var api: JScrollPaneApi = $scrollContainer.data('jsp');
        var throttleTimeout;
        $(window).bind('resize', () => {
            if (!throttleTimeout) {
                throttleTimeout = setTimeout(() => {
                    api.reinitialise();
                    throttleTimeout = null;
                }, 50);
            }
        });
    });

    $('#gear-options-selector, #color-selector').on('mousewheel', (ev) => {
        ev.stopPropagation();
    });
} 