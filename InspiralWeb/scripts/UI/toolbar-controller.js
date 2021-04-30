/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var UI;
    (function (UI) {
        'use strict';
        var $toolbarContainer = $('#toolbar-container-right'), $clearButton = $('#clear-button'), $body = $('body'), $showHideGearsButton = $('#show-hide-gears-button'), $downloadButton = $('#download-button'), $uploadButton = $('#upload-button'), $disabledUploadButtonPlaceholder = $('#disabled-upload-button-placeholder'), $galleryButton = $('#gallery-button'), $showHideCursorTrackerButton = $('#show-hide-cursor-tracker-button'), $aboutButton = $('#about-button'), $keyboardShortcutsButton = $('#keyboard-shortcuts-button'), $mobileButton = $('#mobile-button'), $realThingButton = $('#real-thing-button'), $testButton = $('#test-button'), $downloadModal = $('#download-modal'), $downloadImageLink = $('#download-image-link'), inTimeout = false;
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
        $aboutButton.tooltip({
            title: 'About',
            placement: 'left',
            container: 'body'
        });
        $keyboardShortcutsButton.tooltip({
            title: 'Keyboard shortcuts',
            placement: 'left',
            container: 'body'
        });
        $showHideCursorTrackerButton.tooltip({
            title: 'Show/hide cursor tracker',
            placement: 'left',
            container: 'body'
        });
        $mobileButton.tooltip({
            title: 'Get the app',
            placement: 'left',
            container: 'body'
        });
        $realThingButton.tooltip({
            title: 'Get the real thing',
            placement: 'left',
            container: 'body'
        });
        $testButton.tooltip({
            title: 'Do something cool',
            placement: 'left',
            container: 'body'
        });
        $testButton.click(function () {
            UI.copyAllCurrentImagesToDB();
        });
        // closes all modals, and then removes itself
        function closeClearButtonPopoverOnClickHandler(ev) {
            if ($(ev.target).closest('.popover').length === 0) {
                $clearButton.popover('hide');
                $body.off('click', closeClearButtonPopoverOnClickHandler);
            }
        }
        // temporary
        //$uploadButton.remove();
        //$disabledUploadButtonPlaceholder.css('display', 'block').tooltip({
        //    title: 'Uploading to the gallery is temporarily disabled due to heavy traffic',
        //    placement: 'left',
        //    container: 'body'
        //});
        if (InspiralWeb.browser.browser === InspiralWeb.Browser.IE && InspiralWeb.browser.version < 10) {
            //disable uploading to the gallery if IE 9 or less... for some reason it's failing
            $uploadButton.remove();
            $disabledUploadButtonPlaceholder.css('display', 'block').tooltip({
                title: 'Your browser is too old to support uploading to the gallery.  Try switching to Chrome, Firefox, or the latest version of Internet Explorer.',
                placement: 'left',
                container: 'body'
            });
            $galleryButton.attr('href', 'gallery/old-browser.html');
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
            InspiralWeb.EventAggregator.publish('clearCanvas');
        });
        $showHideGearsButton.click(function () {
            if (InspiralWeb.areGearsVisible) {
                $showHideGearsButton.find('i').removeClass('fa-eye').addClass('fa-eye-slash');
            }
            else {
                $showHideGearsButton.find('i').removeClass('fa-eye-slash').addClass('fa-eye');
            }
            InspiralWeb.areGearsVisible = !InspiralWeb.areGearsVisible;
            InspiralWeb.EventAggregator.publish('gearVisibilityChange', InspiralWeb.areGearsVisible);
        });
        $showHideCursorTrackerButton.click(function () {
            InspiralWeb.isCursorTrackerVisible = !InspiralWeb.isCursorTrackerVisible;
            InspiralWeb.EventAggregator.publish('cursorTrackerVisibilityChanged', InspiralWeb.isCursorTrackerVisible);
        });
        $downloadButton.add($uploadButton).click(function (ev) {
            var $target = $(ev.currentTarget);
            var icon = $target.addClass('disabled').find('i').removeClass('fa-save fa-upload').addClass('fa-cog fa-spin');
            InspiralWeb.EventAggregator.publish('downloadImage', function (imageLink) {
                if ($target.is($downloadButton)) {
                    if (imageLink)
                        redirectToImage(imageLink);
                    icon.removeClass('fa-cog fa-spin').addClass('fa-save');
                    setTimeout(function () {
                        $target.removeClass('disabled');
                    }, 5000);
                }
                else {
                    icon.removeClass('fa-cog fa-spin').addClass('fa-thumbs-o-up');
                    inTimeout = true;
                    InspiralWeb.isAnythingDrawn = false;
                    setTimeout(function () {
                        icon.removeClass('fa-thumbs-o-up').addClass('fa-upload');
                        if (InspiralWeb.isAnythingDrawn) {
                            $target.removeClass('disabled');
                        }
                        inTimeout = false;
                    }, 30000);
                }
            }, $target.is($downloadButton));
        });
        $downloadImageLink.click(function () {
            $downloadModal.modal('hide');
        });
        function redirectToImage(imageLink) {
            $downloadImageLink.attr('href', 'download.html?image=' + encodeURI(imageLink));
            $downloadModal.modal('show');
        }
        ;
        // prevent scrolling inside the help modal from triggering scrolling behind the modal
        $('#help-modal').on('mousewheel', function (e) {
            e.stopPropagation();
        });
        InspiralWeb.Interaction.KeyboardShortcutManager.add(InspiralWeb.Interaction.KeyboardShortcutManager.Key.F1, function (e) {
            $aboutButton.click();
            e.preventDefault();
            e.stopPropagation();
        });
        InspiralWeb.Interaction.KeyboardShortcutManager.add(InspiralWeb.Interaction.KeyboardShortcutManager.Key.Backspace, function (e) {
            if (e.ctrlKey || e.metaKey) {
                InspiralWeb.EventAggregator.publish('clearCanvas');
            }
        });
        InspiralWeb.Interaction.KeyboardShortcutManager.add(InspiralWeb.Interaction.KeyboardShortcutManager.Key.G, function () {
            $showHideGearsButton.click();
        });
        InspiralWeb.Interaction.KeyboardShortcutManager.add(InspiralWeb.Interaction.KeyboardShortcutManager.Key.S, function (e) {
            if (e.ctrlKey || e.metaKey) {
                $downloadButton.click();
                e.preventDefault();
                return false;
            }
        });
        InspiralWeb.Interaction.KeyboardShortcutManager.add(InspiralWeb.Interaction.KeyboardShortcutManager.Key.T, function (e) {
            $showHideCursorTrackerButton.click();
        });
        InspiralWeb.EventAggregator.subscribe('canvasDrawn', function () {
            if (!inTimeout) {
                $uploadButton.removeClass('disabled');
            }
        });
    })(UI = InspiralWeb.UI || (InspiralWeb.UI = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=toolbar-controller.js.map