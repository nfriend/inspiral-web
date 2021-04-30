/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var UI;
    (function (UI) {
        'use strict';
        var containerSize = 35, foregroundContainer = '#color-selector .foreground-container .scroll-container', backgroundContainer = '#color-selector .background-container .scroll-container';
        var penColors = [
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
        ];
        var backgroundColors = [
            { r: 255, g: 255, b: 255, a: 1, bordered: true },
            { r: 240, g: 240, b: 240, a: 1, bordered: true },
            { r: 227, g: 227, b: 227, a: 1, bordered: true },
            { r: 247, g: 239, b: 218, a: 1, bordered: true },
            { r: 59, g: 37, b: 7, a: 1, bordered: true },
            { r: 14, g: 18, b: 71, a: 1, bordered: true },
            { r: 51, g: 51, b: 51, a: 1, bordered: true },
            { r: 18, g: 18, b: 18, a: 1, bordered: true },
        ];
        function addColorToContainer(color, container) {
            var colorContainer = $('<div>').addClass('color-container').attr({
                'data-r': color.r,
                'data-g': color.g,
                'data-b': color.b,
                'data-a': color.a
            });
            var colorDiv = $('<div>').addClass('color')
                .css('background-color', InspiralWeb.Utility.getRgbaString(color.r, color.g, color.b, color.a))
                .appendTo(colorContainer);
            if (color.bordered) {
                colorDiv.addClass('bordered');
            }
            $(container).find('.color-picker').before(colorContainer);
            return colorContainer;
        }
        // add the custom color adder square
        [backgroundContainer, foregroundContainer].forEach(function (container) {
            d3.select(container).append('div').attr({
                'class': 'color-container color-picker color-changing',
                'color-picker': true
            }).append('i').attr({
                'class': 'fa fa-plus fa-2x'
            });
        });
        penColors.forEach(function (color) {
            addColorToContainer(color, foregroundContainer);
        });
        backgroundColors.forEach(function (color) {
            addColorToContainer(color, backgroundContainer);
        });
        UI.initializeCustomColorPicker();
        // add placeholders to the smaller list to ensure that the lists keep the same visual height
        if (penColors.length > backgroundColors.length) {
            for (var i = 0; i < penColors.length - backgroundColors.length; i++) {
                $('<div>').addClass('color-container placeholder').attr('placeholder', 'true').appendTo(backgroundContainer);
            }
        }
        else if (penColors.length < backgroundColors.length) {
            for (var i = 0; i < backgroundColors.length - penColors.length; i++) {
                $('<div>').addClass('color-container placeholder').attr('placeholder', 'true').appendTo(foregroundContainer);
            }
        }
        addPlaceholders();
        // add click events for all color options
        $('#color-selector').on('click', '.color-container', function (ev) {
            var $target = $(ev.currentTarget);
            var isPlaceholder = $target.is('[placeholder]');
            var isColorPicker = $target.is('[color-picker]');
            if (isColorPicker) {
            }
            else if (!isPlaceholder) {
                $target.addClass('selected').siblings().removeClass('selected');
                var foregroundOrBackground = $target.parents('.foreground-container').length !== 0 ? 'foreground' : 'background';
                InspiralWeb.EventAggregator.publish('colorSelected', $target.attr('data-r'), $target.attr('data-g'), $target.attr('data-b'), $target.attr('data-a'), foregroundOrBackground);
            }
        });
        // adds placeholders to the appropriate list in order to keep
        // the same visual length for scrolling purposes
        function addPlaceholders() {
            var foregroundCount = $(foregroundContainer).find('.color-container').length, backgroundCount = $(backgroundContainer).find('.color-container').length, lengthDifference = Math.abs(foregroundCount - backgroundCount), foregroundContentPane = $(foregroundContainer).jScrollPane().data('jsp').getContentPane(), backgroundContentPane = $(backgroundContainer).jScrollPane().data('jsp').getContentPane(), smallerContentPane = foregroundCount > backgroundCount ? backgroundContentPane : foregroundContentPane;
            // first, add placeholders to the smaller list until the lists are the same size
            for (var i = 0; i < lengthDifference; i++) {
                $('<div>').addClass('color-container placeholder').prop('placeholder', 'true').appendTo(smallerContentPane);
            }
            // add one more placeholder to each list, for breathing room
            [foregroundContentPane, backgroundContentPane].forEach(function (contentPane) {
                $('<div>').addClass('color-container placeholder').prop('placeholder', 'true').appendTo(contentPane);
            });
            while ($(foregroundContainer).find('.placeholder').length > 1 && $(backgroundContainer).find('.placeholder').length > 1) {
                [foregroundContentPane, backgroundContentPane].forEach(function (contentPane) {
                    contentPane.find('.placeholder').last().remove();
                });
            }
        }
        function addAndSelectNewColor(color, foregroundOrBackground) {
            if (foregroundOrBackground === 'foreground') {
                addColorToContainer(color, foregroundContainer).click();
            }
            else if (foregroundOrBackground === 'background') {
                addColorToContainer(color, backgroundContainer).click();
                InspiralWeb.EventAggregator.publish('colorSelected', color.r, color.g, color.b, color.a, foregroundOrBackground);
            }
            else {
                throw 'unexpected color type: ' + foregroundOrBackground;
            }
            addPlaceholders();
            UI.reinitializeAllScrollBars();
        }
        UI.addAndSelectNewColor = addAndSelectNewColor;
    })(UI = InspiralWeb.UI || (InspiralWeb.UI = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=color-selector.js.map