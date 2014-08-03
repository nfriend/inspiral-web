/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (UI) {
        'use strict';

        var $toolbarContainer = $('#toolbar-container'), $clearButton = $('#clear-button'), $body = $('body'), $showHideGearsButton = $('#show-hide-gears-button'), $downloadButton = $('#download-button'), gearsAreVisible = true;

        $downloadButton.tooltip({
            title: 'Download as image',
            placement: 'bottom'
        });

        $showHideGearsButton.tooltip({
            title: 'Show/hide gears',
            placement: 'bottom'
        });

        $clearButton.tooltip({
            title: 'Erase everything',
            placement: 'bottom'
        });

        // closes all modals, and then removes itself
        function closeAllPopoversOnClickHandler(ev) {
            if ($(ev.target).closest('.popover').length === 0) {
                $clearButton.popover('hide');
                $body.off('click', closeAllPopoversOnClickHandler);
            }
        }

        function attachCloseAllPopoversHandler() {
            $body.on('click', closeAllPopoversOnClickHandler);
        }

        $clearButton.popover({
            trigger: 'manual',
            content: '<div class="btn btn-danger clear-button-confirmation">Yes, erase it!</div>',
            title: 'Are you sure?',
            placement: 'bottom',
            html: true
        });

        $clearButton.on('click', function (e) {
            e.stopPropagation();
            $clearButton.popover('show');
            attachCloseAllPopoversHandler();
        });

        $toolbarContainer.on('click', '.clear-button-confirmation', function (e) {
            $clearButton.popover('hide');
            Spirograph.EventAggregator.publish('clearCanvas');
        });

        $showHideGearsButton.click(function () {
            if (gearsAreVisible) {
                $showHideGearsButton.find('i').removeClass('fa-eye').addClass('fa-eye-slash');
            } else {
                $showHideGearsButton.find('i').removeClass('fa-eye-slash').addClass('fa-eye');
            }
            gearsAreVisible = !gearsAreVisible;

            Spirograph.EventAggregator.publish('gearVisibilityChange', gearsAreVisible);
        });
    })(Spirograph.UI || (Spirograph.UI = {}));
    var UI = Spirograph.UI;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=toolbar-controller.js.map
