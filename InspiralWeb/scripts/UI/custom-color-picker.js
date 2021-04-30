/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var UI;
    (function (UI) {
        'use strict';
        var $body = $('body'), currentlySelectedColor, foregroundOrBackground, lastSelectedForegroundColor = 'rgba(44,167,155,0.77)', lastSelectedBackgroundColor = 'rgba(1,36,9, 1)';
        function initializeCustomColorPicker() {
            $('.color-picker').popover({
                trigger: 'manual',
                content: '<div class="spectrum-color-picker-popover"><div class="spectrum-color-picker"></div><br /><div class="color-preview"></div><div class="btn btn-default choose-color-button"><i class="fa fa-check"></i>OK</div></div>',
                title: 'Choose a color',
                placement: 'left',
                html: true,
                container: 'body'
            }).on('click', function (ev) {
                // close the other color picker modal, if it's open
                $('.color-picker').not($(ev.currentTarget)).popover('hide');
                // which color picker are we in?
                foregroundOrBackground = $(ev.currentTarget).closest('.foreground-container').length !== 0 ? 'foreground' : 'background';
                // stop propogation so the body's newly-added on-click doesn't get triggered
                // and close this modal right away
                ev.stopPropagation();
                $(ev.currentTarget).popover('show');
                // create a new spectrum color picker inside the popover
                $('.spectrum-color-picker').spectrum({
                    showAlpha: true,
                    clickkoutfireschange: true,
                    flat: true,
                    showButtons: false,
                    containerClassName: 'spectrum-color-picker-container',
                    move: onSpectrumMove
                });
                // add a class to the containing popover so we can isolate it for styling
                $('.spectrum-color-picker-popover').parents('.popover').addClass('spectrum-popover');
                if (foregroundOrBackground === 'foreground') {
                    onSpectrumMove(lastSelectedForegroundColor);
                }
                else if (foregroundOrBackground === 'background') {
                    onSpectrumMove(lastSelectedBackgroundColor);
                }
                else {
                    throw 'unexpected foreground/background identifier: ' + foregroundOrBackground;
                }
                attachColorPickerPopoverHandler();
                $(ev.currentTarget).on('mousedown', function (innerEvent) {
                    innerEvent.stopPropagation();
                    return false;
                });
            });
        }
        UI.initializeCustomColorPicker = initializeCustomColorPicker;
        // can be called with either a spectrum Color object or a css color string
        function onSpectrumMove(color) {
            var colorString = color.toRgbString ? color.toRgbString() : color;
            currentlySelectedColor = colorString;
            $('.color-preview').css('background-color', colorString);
            if (foregroundOrBackground === 'foreground') {
                lastSelectedForegroundColor = colorString;
            }
            else if (foregroundOrBackground === 'background') {
                lastSelectedBackgroundColor = colorString;
            }
            else {
                throw 'unexpected foreground/background identifier: ' + foregroundOrBackground;
            }
            // if we called this manually, also make sure the spectrum control is up to date with this color
            if (!color.toRgbString) {
                $('.spectrum-color-picker').spectrum('set', color);
            }
        }
        // closes all modals, and then removes itself
        function closeColorPickerPopoverOnClickHandler(ev) {
            var $target = $(ev.target);
            if ($target.closest('.popover').length === 0) {
                $('.color-picker').popover('hide');
                $body.off('mousedown', closeColorPickerPopoverOnClickHandler);
            }
            else if ($target.is('.choose-color-button') || $target.closest('.choose-color-button').length !== 0) {
                UI.addAndSelectNewColor(InspiralWeb.Utility.toColor(currentlySelectedColor), foregroundOrBackground);
                // make sure the scrollbars adjust for the new height
                $('#color-selector .scroll-container').each(function (index, scrollContainer) {
                    var api = $(scrollContainer).data('jsp');
                    api.reinitialise();
                });
                // close the popover
                $('.color-picker').popover('hide');
                // stop listening for mousedown events
                $body.off('mousedown', closeColorPickerPopoverOnClickHandler);
            }
        }
        function attachColorPickerPopoverHandler() {
            $body.on('mousedown', closeColorPickerPopoverOnClickHandler);
        }
    })(UI = InspiralWeb.UI || (InspiralWeb.UI = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=custom-color-picker.js.map