/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    export function initializeCustomColorPicker() {
        $('.color-picker').popover({
            trigger: 'manual',
            content: '<div class="spectrum-color-picker" style="width:167px; height: 177px; position: relative;"></div>',
            title: 'Choose a color',
            placement: 'left',
            html: true,
            container: 'body'
        }).on('click', (ev) => {
                $(ev.currentTarget).popover('show');
                (<any>$('.spectrum-color-picker')).spectrum({
                    showAlpha: true,
                    clickkoutfireschange: true,
                    flat: true,
                    showButtons: false,
                    containerClassName: 'spectrum-color-picker-container'
                });
            });
    }
}