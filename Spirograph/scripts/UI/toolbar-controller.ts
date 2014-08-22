/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    var $toolbarContainer = $('#toolbar-container-right'),
        $clearButton = $('#clear-button'),
        $body = $('body'),
        $showHideGearsButton = $('#show-hide-gears-button'),
        $downloadButton = $('#download-button'),
        $uploadButton = $('#upload-button'),
        $galleryButton = $('#gallery-button'),
        $showHideCursorTrackerButton = $('#show-hide-cursor-tracker-button'),
        $helpButton = $('#help-button');

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
    function closeClearButtonPopoverOnClickHandler(ev: JQueryEventObject) {
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

    $clearButton.on('click', (e) => {
        e.stopPropagation();
        $clearButton.popover('show');
        $clearButton.tooltip('hide');
        attachCloseClearButtonPopoverHandler();
    });

    $toolbarContainer.on('click', '.clear-button-confirmation', (e) => {
        $clearButton.popover('hide');
        EventAggregator.publish('clearCanvas');
    });

    $showHideGearsButton.click(() => {
        if (areGearsVisible) {
            $showHideGearsButton.find('i').removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            $showHideGearsButton.find('i').removeClass('fa-eye-slash').addClass('fa-eye');
        }
        areGearsVisible = !areGearsVisible;

        EventAggregator.publish('gearVisibilityChange', areGearsVisible);
    });

    $showHideCursorTrackerButton.click(() => {
        isCursorTrackerVisible = !isCursorTrackerVisible;
        EventAggregator.publish('cursorTrackerVisibilityChanged', isCursorTrackerVisible);
    });

    $downloadButton.add($uploadButton).click((ev) => {
        var $target = $(ev.currentTarget);
        var icon = $target.addClass('disabled').find('i').removeClass('fa-save fa-upload').addClass('fa-cog fa-spin');
        EventAggregator.publish('downloadImage', () => {
            icon.removeClass('fa-cog fa-spin').addClass($target.is($downloadButton) ? 'fa-save' : 'fa-upload');
            $target.removeClass('disabled');
        }, $target.is($downloadButton));
    });

    $galleryButton.click(() => {
        // there might be a better way to do this
        var $link = $('<a href="./gallery" target="_blank" style="display: none;"></a>');
        $body.append($link);
        $link[0].click();
        $link.remove();
    });

    // prevent scrolling inside the help modal from triggering scrolling behind the modal
    $('#help-modal').on('mousewheel', (e) => {
        e.stopPropagation();
    });

    Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.F1, (e) => {
        $helpButton.click();
        e.preventDefault();
        e.stopPropagation();
    });

    Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Backspace, (e) => {
        if (e.ctrlKey) {
            EventAggregator.publish('clearCanvas');
        }
    });

    Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.G, () => {
        $showHideGearsButton.click();
    });

    Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.S, (e) => {
        if (e.ctrlKey) {
            $downloadButton.click();
            e.preventDefault();
            return false;
        }
    });

    Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.T, (e) => {
        $showHideCursorTrackerButton.click();
    });
} 