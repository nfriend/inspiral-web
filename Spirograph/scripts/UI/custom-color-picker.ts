/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    var $body = $('body'),
        currentlySelectedColor: any,
        foregroundOrBackground: string;

    export function initializeCustomColorPicker() {
        $('.color-picker').popover({
            trigger: 'manual',
            content: '<div><div class="spectrum-color-picker" style="width:167px; height: 157px; position: relative;"></div><br /><div class="btn btn-default choose-color-button" style="width:100%"><i class="fa fa-check" style="margin-right:10px"></i>OK</div></div>',
            title: 'Choose a color',
            placement: 'left',
            html: true,
            container: 'body'
        }).on('click', (ev) => {
                // close the other color picker modal, if it's open
                $('.color-picker').not($(ev.currentTarget)).popover('hide');

                // which color picker are we in?
                foregroundOrBackground = $(ev.currentTarget).closest('.foreground-container').length !== 0 ? 'foreground' : 'background';

                // stop propogation so the body's newly-added on-click doesn't get triggered
                // and close this modal right away
                ev.stopPropagation();
                $(ev.currentTarget).popover('show');

                // create a new spectrum color picker inside the popover
                (<any>$('.spectrum-color-picker')).spectrum({
                    showAlpha: true,
                    clickkoutfireschange: true,
                    flat: true,
                    showButtons: false,
                    containerClassName: 'spectrum-color-picker-container',
                    move: (color) => {
                        currentlySelectedColor = color;
                    }
                });

                attachColorPickerPopoverHandler();
            });
    }

    function onChange(color) {
        console.log(color);
    }

    // closes all modals, and then removes itself
    function closeColorPickerPopoverOnClickHandler(ev: JQueryEventObject) {
        var $target = $(ev.target);
        if ($target.closest('.popover').length === 0) {
            $('.color-picker').popover('hide');
            $body.off('click', closeColorPickerPopoverOnClickHandler);
        } else if ($target.is('.choose-color-button') || $target.closest('.choose-color-button').length !== 0) {
            var rgba = currentlySelectedColor ? currentlySelectedColor.toRgb() : { r: 0, g: 0, b: 0, a: 1 };
            var newColor: Color = {
                r: rgba.r,
                g: rgba.g,
                b: rgba.b,
                a: rgba.a
            }
            addAndSelectNewColor(newColor, foregroundOrBackground);

            // make sure the scrollbars adjust for the new height
            $('#color-selector .scroll-container').each((index, scrollContainer) => {
                var api: JScrollPaneApi = $(scrollContainer).data('jsp');
                api.reinitialise();
            });

            // close the popover
            $('.color-picker').popover('hide');
        }
    }

    function attachColorPickerPopoverHandler() {
        $body.on('click', closeColorPickerPopoverOnClickHandler);
    }
}