/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (UI) {
        'use strict';

        var $toolbarContainer = $('#toolbar-container'), $clearButton = $('#clear-button'), $body = $('body'), $showHideGearsButton = $('#show-hide-gears-button'), $downloadButton = $('#download-button'), $uploadButton = $('#upload-button'), $galleryButton = $('#gallery-button'), $helpButton = $('#help-button');

        $downloadButton.tooltip({
            title: 'Download image',
            placement: 'left',
            container: 'body'
        });

        $uploadButton.tooltip({
            title: 'Upload to the gallery',
            placement: 'left',
            container: 'body'
        });

        $showHideGearsButton.tooltip({
            title: 'Show/hide gears',
            placement: 'left',
            container: 'body'
        });

        $clearButton.tooltip({
            title: 'Erase everything',
            placement: 'left',
            container: 'body'
        });

        $galleryButton.tooltip({
            title: 'View the gallery',
            placement: 'left',
            container: 'body'
        });

        $helpButton.tooltip({
            title: 'Help/about',
            placement: 'left',
            container: 'body'
        });

        // closes all modals, and then removes itself
        function closeClearButtonPopoverOnClickHandler(ev) {
            if ($(ev.target).closest('.popover').length === 0) {
                $clearButton.popover('hide');
                $body.off('click', closeClearButtonPopoverOnClickHandler);
            }
        }

        function attachCloseClearButtonPopoverHandler() {
            $body.on('click', closeClearButtonPopoverOnClickHandler);
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
            $clearButton.tooltip('hide');
            attachCloseClearButtonPopoverHandler();
        });

        $toolbarContainer.on('click', '.clear-button-confirmation', function (e) {
            $clearButton.popover('hide');
            Spirograph.EventAggregator.publish('clearCanvas');
        });

        $showHideGearsButton.click(function () {
            if (Spirograph.areGearsVisible) {
                $showHideGearsButton.find('i').removeClass('fa-eye').addClass('fa-eye-slash');
            } else {
                $showHideGearsButton.find('i').removeClass('fa-eye-slash').addClass('fa-eye');
            }
            Spirograph.areGearsVisible = !Spirograph.areGearsVisible;

            Spirograph.EventAggregator.publish('gearVisibilityChange', Spirograph.areGearsVisible);
        });

        $downloadButton.click(function () {
            var icon = $downloadButton.addClass('disabled').find('i').removeClass('fa-download').addClass('fa-cog fa-spin');
            Spirograph.EventAggregator.publish('downloadImage', function () {
                icon.removeClass('fa-cog fa-spin').addClass('fa-download');
                $downloadButton.removeClass('disabled');
            });
        });

        $galleryButton.click(function () {
            // there might be a better way to do this
            var $link = $('<a href="gallery.html" target="_blank" style="display: none;"></a>');
            $body.append($link);
            $link[0].click();
            $link.remove();
        });
    })(Spirograph.UI || (Spirograph.UI = {}));
    var UI = Spirograph.UI;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=toolbar-controller.js.map
