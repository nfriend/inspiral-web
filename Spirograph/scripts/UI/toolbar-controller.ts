/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    var $toolbarContainer = $('#toolbar-container-right'),
        $clearButton = $('#clear-button'),
        $body = $('body'),
        $showHideGearsButton = $('#show-hide-gears-button'),
        $downloadButton = $('#download-button'),
        $uploadButton = $('#upload-button'),
        $disabledUploadButtonPlaceholder = $('#disabled-upload-button-placeholder'),
        $galleryButton = $('#gallery-button'),
        $showHideCursorTrackerButton = $('#show-hide-cursor-tracker-button'),
        $aboutButton = $('#about-button'),
        $keyboardShortcutsButton = $('#keyboard-shortcuts-button'),
        $mobileButton = $('#mobile-button'),
        $testButton = $('#test-button'),
        $downloadModal = $('#download-modal'),
        $downloadImageLink = $('#download-image-link'),
        inTimeout = false;

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

    $testButton.tooltip({
        title: 'Do something cool',
        placement: 'left',
        container: 'body'
    });

    //#region for testing/debugging purposes only
    /*
    var min = 5556;
    var max = 5556 + 200;

    function doStuff() {

        console.log('Beginning upload process for images ' + min + ' to ' + max);

        $.ajax({
            type: 'GET',
            url: 'http://nathanfriend.com/inspirograph/getallimagenames.php',
            data: {
                'p': 1,
                'i': 10000
            },
            success: function (data) {

                var images = data.images;
                var fileCount = parseInt(data.fileCount, 10) || 0;
                var pageCount = Math.ceil(fileCount / 1000);

                var counter = -1;
                for (var image in images) {
                    if (images.hasOwnProperty(image)) {
                        counter++;

                        if (counter < min || counter > max)
                            continue;

                        $.ajax({
                            type: 'POST',
                            async: false,
                            headers: {
                                Authorization: 'Client-ID ' + Spirograph.imgurClientID
                            },
                            url: 'https://api.imgur.com/3/image',
                            data: {
                                type: 'URL',
                                image: 'http://nathanfriend.com/inspirograph/' + images[image].imagepath,
                                album: Spirograph.imgurAlbumDeleteHash,
                                title: Utility.convertToHumanReadableDate(new Date(images[image].timestamp * 1000)),
                            },
                            dataType: 'json',
                            success: (e) => {
                                console.log('successfully uploaded http://nathanfriend.com/inspirograph/' + images[image].imagepath);
                            },
                            error: (e) => {
                                console.error('failed to upload ' + 'http://nathanfriend.com/inspirograph/' + images[image].imagepath);
                            }
                        });
                    }
                }

                console.log('Done!');

                min += 495;
                max += 495;

                //console.log('Waiting 75 mins...');

                //setTimeout(() => {
                //    doStuff();
                //}, 4500000);
            },
            dataType: 'JSON'
        });
    }
    */

    $testButton.click(() => {
        //$.ajax({
        //    type: 'POST',
        //    dataType: 'json',
        //    headers: {
        //        Authorization: 'Client-ID ' + Spirograph.imgurClientID
        //    },
        //    url: 'https://api.imgur.com/3/album/',
        //    success: (e) => {
        //        console.log(e);
        //    }
        //});

        //return;

        //console.log('Waiting 75 mins...');

        //setTimeout(() => {
        //    doStuff();
        //}, 4500000);

        //doStuff();

    });
    //#endregion

    // closes all modals, and then removes itself
    function closeClearButtonPopoverOnClickHandler(ev: JQueryEventObject) {
        if ($(ev.target).closest('.popover').length === 0) {
            $clearButton.popover('hide');
            $body.off('click', closeClearButtonPopoverOnClickHandler);
        }
    }

    // temporary
    $uploadButton.remove();
    $disabledUploadButtonPlaceholder.css('display', 'block').tooltip({
        title: 'Uploading to the gallery is temporarily disabled due to heavy traffic',
        placement: 'left',
        container: 'body'
    });

    if (browser.browser === Browser.IE && browser.version < 10) {
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
        EventAggregator.publish('downloadImage', (imageLink) => {
            if ($target.is($downloadButton)) {
                if (imageLink)
                    redirectToImage(imageLink);

                icon.removeClass('fa-cog fa-spin').addClass('fa-save');
                setTimeout(() => {
                    $target.removeClass('disabled');
                }, 5000);
            } else {
                icon.removeClass('fa-cog fa-spin').addClass('fa-thumbs-o-up');
                inTimeout = true;
                Spirograph.isAnythingDrawn = false;
                setTimeout(() => {
                    icon.removeClass('fa-thumbs-o-up').addClass('fa-upload');
                    if (Spirograph.isAnythingDrawn) {
                        $target.removeClass('disabled');
                    }
                    inTimeout = false;
                }, 30000);
            }
        }, $target.is($downloadButton));
    });

    $downloadImageLink.click(() => {
        $downloadModal.modal('hide');
    });

    function redirectToImage(imageLink) {
        if (browser.browser == Browser.Chrome) {
            var filetypeMatches = imageLink.match(/\.[a-zA-Z0-9]+$/);
            var filetype = '.jpg';
            if (filetypeMatches.length > 0) {
                filetype = filetypeMatches[0];
            }

            var $link = $('<a href="' + imageLink + '" download="inspirograph' + filetype + '" style="display: none">');
            $body.append($link);
            $link[0].click();
            $link.remove();
        } else {
            $downloadImageLink.attr('href', 'download.html?image=' + encodeURI(imageLink));
            $downloadModal.modal('show');
        }
    };

    // prevent scrolling inside the help modal from triggering scrolling behind the modal
    $('#help-modal').on('mousewheel', (e) => {
        e.stopPropagation();
    });

    Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.F1, (e) => {
        $aboutButton.click();
        e.preventDefault();
        e.stopPropagation();
    });

    Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Backspace, (e) => {
        if (e.ctrlKey || e.metaKey) {
            EventAggregator.publish('clearCanvas');
        }
    });

    Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.G, () => {
        $showHideGearsButton.click();
    });

    Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.S, (e) => {
        if (e.ctrlKey || e.metaKey) {
            $downloadButton.click();
            e.preventDefault();
            return false;
        }
    });

    Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.T, (e) => {
        $showHideCursorTrackerButton.click();
    });

    EventAggregator.subscribe('canvasDrawn', () => {
        if (!inTimeout) {
            $uploadButton.removeClass('disabled');
        }
    });
} 