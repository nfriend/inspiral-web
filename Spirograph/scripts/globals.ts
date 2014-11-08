/// <reference path='definitions/references.d.ts' />

module Spirograph {
    'use strict';

    export var isInDarkMode = false;
    export var areGearsVisible = true;
    export var isCursorTrackerVisible = false;
    export var isAnythingDrawn = false;

    export var isDev = document.location.hostname === 'localhost' || document.location.hostname === '127.0.0.1' || document.location.hostname.indexOf('dev.') !== -1;

    export var imgurClientID = '4d93fc08cc27d37';

    // the main gallery
    export var imgurAlbumName = '2R9z5';
    export var imgurAlbumDeleteHash = 'splQJocFCJf7Rky';

    // the gallery used for downloading images only
    export var imgurDownloadAlbumName = '9HlaO';
    export var imgurDownloadAlbumDeleteHash = 'cUcZYYRwdQ5lkOW';

    // the dev version of the main gallery
    export var imgurAlbumNameDev = 'T6EZc';
    export var imgurAlbumDeleteHashDev = 'zYKofZIZqwwRrta';

    // the dev version of the downloading gallery
    export var imgurDownloadAlbumNameDev = '7Fixh';
    export var imgurDownloadAlbumDeleteHashDev = '8DwX9GjDU8mvJxF';
}