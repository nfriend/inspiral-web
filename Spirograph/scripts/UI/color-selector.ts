/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    interface Color {
        r: number;
        g: number;
        b: number;
        a: number;
        bordered?: boolean;
    }

    var containerSize = 35;

    var penColors: Array<Color> = [
        { r: 255, g: 0, b: 0, a: .4 },
        { r: 255, g: 150, b: 0, a: .7 },
        { r: 255, g: 255, b: 0, a: .7 },
        { r: 0, g: 150, b: 0, a: .5 },
        { r: 0, g: 0, b: 255, a: .4 },
        { r: 150, g: 0, b: 150, a: .5 },
        { r: 255, g: 255, b: 255, a: .8, bordered: true },
        { r: 200, g: 200, b: 200, a: .8 },
        { r: 150, g: 150, b: 150, a: .8 },
        { r: 100, g: 100, b: 100, a: .8 },
    ]

    var backgroundColors: Array<Color> = [
        { r: 255, g: 255, b: 255, a: 1, bordered: true },
        { r: 240, g: 240, b: 240, a: 1, bordered: true },
        { r: 227, g: 227, b: 227, a: 1, bordered: true },
        { r: 247, g: 239, b: 218, a: 1, bordered: true },
        { r: 59, g: 37, b: 7, a: 1, bordered: true },
        { r: 14, g: 18, b: 71, a: 1, bordered: true },
        { r: 51, g: 51, b: 51, a: 1, bordered: true },
        { r: 18, g: 18, b: 18, a: 1, bordered: true },
    ]

    function addColorToContainer(color: Color, container: string) {
        var colorContainer = $('<div>').addClass('color-container').attr({
            'data-r': color.r,
            'data-g': color.g,
            'data-b': color.b,
            'data-a': color.a
        });

        var colorDiv = $('<div>').addClass('color')
            .css('background-color', Utility.getRgbaString(color.r, color.g, color.b, color.a))
            .appendTo(colorContainer);

        if (color.bordered) {
            colorDiv.addClass('bordered');
        }

        colorContainer.appendTo(container);
    }

    penColors.forEach((color) => {
        addColorToContainer(color, '#color-selector .foreground-container .scroll-container');
    });

    backgroundColors.forEach((color) => {
        addColorToContainer(color, '#color-selector .background-container .scroll-container');
    });

    $('#color-selector').on('click', '.color-container', (ev) => {
        var $target = $(ev.currentTarget);
        $target.addClass('selected').siblings().removeClass('selected');
        var fixedOrRotating = $target.parent('.foreground-container').length !== 0 ? 'foreground' : 'background';

        EventAggregator.publish('colorSelected', $target.attr('data-r'), $target.attr('data-g'), $target.attr('data-b'), $target.attr('data-a'), fixedOrRotating);
    });
}