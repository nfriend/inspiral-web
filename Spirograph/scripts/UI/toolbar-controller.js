/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (UI) {
        'use strict';

        var $toolbarContainer = $('#toolbar-container-right'), $clearButton = $('#clear-button'), $body = $('body'), $showHideGearsButton = $('#show-hide-gears-button'), $downloadButton = $('#download-button'), $uploadButton = $('#upload-button'), $galleryButton = $('#gallery-button'), $showHideCursorTrackerButton = $('#show-hide-cursor-tracker-button'), $helpButton = $('#help-button');

        $downloadButton.tooltip({
            title: 'Download image',
            placement: 'left',
            html: true,
            container: 'body'
        });

        $uploadButton.tooltip({
            title: 'Submit to the gallery',
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

        $showHideCursorTrackerButton.tooltip({
            title: 'Show/hide cursor tracker',
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
            placement: 'left',
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

        $showHideCursorTrackerButton.click(function () {
            Spirograph.isCursorTrackerVisible = !Spirograph.isCursorTrackerVisible;
            Spirograph.EventAggregator.publish('cursorTrackerVisibilityChanged', Spirograph.isCursorTrackerVisible);
        });

        $downloadButton.add($uploadButton).click(function (ev) {
            var $target = $(ev.currentTarget);
            var icon = $target.addClass('disabled').find('i').removeClass('fa-save fa-upload').addClass('fa-cog fa-spin');
            Spirograph.EventAggregator.publish('downloadImage', function () {
                icon.removeClass('fa-cog fa-spin').addClass($target.is($downloadButton) ? 'fa-save' : 'fa-upload');
                $target.removeClass('disabled');
            }, $target.is($downloadButton));
        });

        $galleryButton.click(function () {
            // there might be a better way to do this
            var $link = $('<a href="gallery.html" target="_blank" style="display: none;"></a>');
            $body.append($link);
            $link[0].click();
            $link.remove();
        });

        // prevent scrolling inside the help modal from triggering scrolling behind the modal
        $('#help-modal').on('mousewheel', function (e) {
            e.stopPropagation();
        });

        Spirograph.Interaction.KeyboardShortcutManager.add(112 /* F1 */, function (e) {
            $helpButton.click();
            e.preventDefault();
            e.stopPropagation();
        });

        Spirograph.Interaction.KeyboardShortcutManager.add(8 /* Backspace */, function (e) {
            if (e.ctrlKey) {
                Spirograph.EventAggregator.publish('clearCanvas');
            }
        });

        Spirograph.Interaction.KeyboardShortcutManager.add(71 /* G */, function () {
            $showHideGearsButton.click();
        });

        Spirograph.Interaction.KeyboardShortcutManager.add(83 /* S */, function (e) {
            if (e.ctrlKey) {
                $downloadButton.click();
                e.preventDefault();
                return false;
            }
        });

        Spirograph.Interaction.KeyboardShortcutManager.add(84 /* T */, function (e) {
            $showHideCursorTrackerButton.click();
        });
    })(Spirograph.UI || (Spirograph.UI = {}));
    var UI = Spirograph.UI;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=toolbar-controller.js.map
