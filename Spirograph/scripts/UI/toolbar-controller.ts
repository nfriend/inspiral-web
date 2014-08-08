/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    var $toolbarContainer = $('#toolbar-container'),
        $clearButton = $('#clear-button'),
        $body = $('body'),
        $showHideGearsButton = $('#show-hide-gears-button'),
        $downloadButton = $('#download-button'),
        $galleryButton = $('#gallery-button');

    $downloadButton.tooltip({
        title: 'Download and save<br />to the gallery',
        placement: 'bottom',
        html: true
    });

    $showHideGearsButton.tooltip({
        title: 'Show/hide gears',
        placement: 'bottom',
    });

    $clearButton.tooltip({
        title: 'Erase everything',
        placement: 'bottom',
    });

    $galleryButton.tooltip({
        title: 'View the gallery',
        placement: 'bottom'
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
        placement: 'bottom',
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

    $downloadButton.click(() => {
        var icon = $downloadButton.addClass('disabled').find('i').removeClass('fa-download').addClass('fa-cog fa-spin');
        EventAggregator.publish('downloadImage', () => {
            icon.removeClass('fa-cog fa-spin').addClass('fa-download');
            $downloadButton.removeClass('disabled');
        });
    });

    $galleryButton.click(() => {
        // there might be a better way to do this
        var $link = $('<a href="gallery.html" target="_blank" style="display: none;"></a>');
        $body.append($link);
        $link[0].click();
        $link.remove();
    });
} 