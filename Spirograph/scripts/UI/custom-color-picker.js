/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (UI) {
        'use strict';

        function initializeCustomColorPicker() {
            $('.color-picker').popover({
                trigger: 'manual',
                content: '<div class="spectrum-color-picker" style="width:167px; height: 177px; position: relative;"></div>',
                title: 'Choose a color',
                placement: 'left',
                html: true,
                container: 'body'
            }).on('click', function (ev) {
                $(ev.currentTarget).popover('show');
                $('.spectrum-color-picker').spectrum({
                    showAlpha: true,
                    clickkoutfireschange: true,
                    flat: true,
                    showButtons: false,
                    containerClassName: 'spectrum-color-picker-container'
                });
            });
        }
        UI.initializeCustomColorPicker = initializeCustomColorPicker;
    })(Spirograph.UI || (Spirograph.UI = {}));
    var UI = Spirograph.UI;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=custom-color-picker.js.map
