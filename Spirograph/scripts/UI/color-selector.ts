/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.UI {

    interface Color {
        r: number;
        g: number;
        b: number;
        a: number;
    }

    var containerSize = 35;

    var initialColors: Array<Color> = [
        { r: 255, g: 0, b: 0, a: .4 },
        { r: 255, g: 150, b: 0, a: .7 },
        { r: 255, g: 255, b: 0, a: .7 },
        { r: 0, g: 150, b: 0, a: .5 },
        { r: 0, g: 0, b: 255, a: .4 },
        { r: 150, g: 0, b: 150, a: .5 },
        { r: 200, g: 200, b: 200, a: .8 },
        { r: 150, g: 150, b: 150, a: .8 },
        { r: 100, g: 100, b: 100, a: .8 },
    ]

    initialColors.forEach((color) => {
        ['#color-selector .foreground-container', '#color-selector .background-container'].forEach((container) => {
            var colorContainer = $('<div>').addClass('color-container').attr({
                'data-r': color.r,
                'data-g': color.g,
                'data-b': color.b,
                'data-a': color.a
            });

            $('<div>').addClass('color')
                .css('background-color', Utility.getRgbaString(color.r, color.g, color.b, color.a))
                .appendTo(colorContainer);

            colorContainer.appendTo(container);
        });
    });

    $('#color-selector').on('click', '.color-container', (ev) => {
        var $target = $(ev.currentTarget);
        $target.addClass('selected').siblings().removeClass('selected');
        var fixedOrRotating = $target.parent('.foreground-container').length !== 0 ? 'foreground' : 'background';

        EventAggregator.publish('colorSelected', $target.attr('data-r'), $target.attr('data-g'), $target.attr('data-b'), $target.attr('data-a'), fixedOrRotating);
    });
}