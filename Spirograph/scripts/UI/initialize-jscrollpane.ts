/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    var $fixedContainer = <any>$('#gear-options-selector .fixed-container .scroll-container'),
        $rotatingContainer = <any>$('#gear-options-selector .rotating-container .scroll-container'),
        $backgroundContainer = <any>$('#color-selector .background-container .scroll-container'),
        $foregroundContainer = <any>$('#color-selector .foreground-container .scroll-container'),
        $allScrollContainers = <any>$('.scroll-container')

    $allScrollContainers.each((index: number, scrollContainer: Element) => {
        var $scrollContainer = $(scrollContainer);
        $scrollContainer.jScrollPane({
            mouseWheelSpeed: 16,
            animateDuration: 1000,
            horizontalGutter: 10,
            verticalGutter: 0
        });

        var api: JScrollPaneApi = $scrollContainer.data('jsp');
        var throttleTimeout;
        $(window).bind('resize', () => {
            if (!throttleTimeout) {
                throttleTimeout = setTimeout(() => {
                    api.reinitialise();
                    throttleTimeout = null;
                    console.log('getIsScrollabelV: ' + api.getIsScrollableV());
                }, 50);
            }
        });
    });

    $('#gear-options-selector, #color-selector').on('mousewheel', (ev) => {
        ev.stopPropagation();
    });

    // scroll handlers
    var fixedContainerScrollHandler = (ev, posY, isAtTop, isAtBottom) => {
        // remove the handler on the linked scroll bar so we don't create an infinite scrolling loop
        $rotatingContainer.off('jsp-scroll-y', rotatingContainerScrollHandler);
        // scroll the other bar to match this bar
        $rotatingContainer.data('jsp').scrollToY(posY);
        // reattach the handler
        $rotatingContainer.on('jsp-scroll-y', rotatingContainerScrollHandler);
    };

    var rotatingContainerScrollHandler = (ev, posY, isAtTop, isAtBottom) => {
        // remove the handler on the linked scroll bar so we don't create an infinite scrolling loop
        $fixedContainer.off('jsp-scroll-y', fixedContainerScrollHandler);
        // scroll the other bar to match this bar
        $fixedContainer.data('jsp').scrollToY(posY);
        // reattach the handler
        $fixedContainer.on('jsp-scroll-y', fixedContainerScrollHandler);
    };

    var backgroundContainerScrollHandler = (ev, posY, isAtTop, isAtBottom) => {
        // remove the handler on the linked scroll bar so we don't create an infinite scrolling loop
        $foregroundContainer.off('jsp-scroll-y', foregroundContainerScrollHandler);
        // scroll the other bar to match this bar
        $foregroundContainer.data('jsp').scrollToY(posY);
        // reattach the handler
        $foregroundContainer.on('jsp-scroll-y', foregroundContainerScrollHandler);
    };

    var foregroundContainerScrollHandler = (ev, posY, isAtTop, isAtBottom) => {
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
} 