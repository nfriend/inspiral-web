/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    var $toolbarContainer = $('#toolbar-container'),
        $clearButton = $('#clear-button'),
        $body = $('body'),
        $showHideGearsButton = $('#show-hide-gears-button'),
        $downloadButton = $('#download-button'),
        gearsAreVisible = true;

    $downloadButton.tooltip({
        title: 'Download as image<br />(coming soon)',
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

    // closes all modals, and then removes itself
    function closeAllPopoversOnClickHandler(ev: JQueryEventObject) {
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

    $clearButton.on('click', (e) => {
        e.stopPropagation();
        $clearButton.popover('show');
        $clearButton.tooltip('hide');
        attachCloseAllPopoversHandler();
    });

    $toolbarContainer.on('click', '.clear-button-confirmation', (e) => {
        $clearButton.popover('hide');
        EventAggregator.publish('clearCanvas');
    });

    $showHideGearsButton.click(() => {
        if (gearsAreVisible) {
            $showHideGearsButton.find('i').removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            $showHideGearsButton.find('i').removeClass('fa-eye-slash').addClass('fa-eye');
        }
        gearsAreVisible = !gearsAreVisible;

        EventAggregator.publish('gearVisibilityChange', gearsAreVisible);
    });

    $downloadButton.click(() => {
        EventAggregator.publish('downloadImage');
    });
} 