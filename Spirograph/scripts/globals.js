/// <reference path='definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    'use strict';

    Spirograph.isInDarkMode = false;
    Spirograph.areGearsVisible = true;
    Spirograph.isCursorTrackerVisible = false;
    Spirograph.isAnythingDrawn = false;

    //export var isDev = document.location.hostname === 'localhost' || document.location.hostname === '127.0.0.1' || document.location.hostname.indexOf('dev.') !== -1;
    Spirograph.isDev = false;

    Spirograph.imgurClientID = '4d93fc08cc27d37';

    // the main gallery
    Spirograph.imgurAlbumName = '2R9z5';
    Spirograph.imgurAlbumDeleteHash = 'splQJocFCJf7Rky';

    // the gallery used for downloading images only
    Spirograph.imgurDownloadAlbumName = '9HlaO';
    Spirograph.imgurDownloadAlbumDeleteHash = 'cUcZYYRwdQ5lkOW';

    // the dev version of the main gallery
    Spirograph.imgurAlbumNameDev = 'T6EZc';
    Spirograph.imgurAlbumDeleteHashDev = 'zYKofZIZqwwRrta';

    // the dev version of the downloading gallery
    Spirograph.imgurDownloadAlbumNameDev = '7Fixh';
    Spirograph.imgurDownloadAlbumDeleteHashDev = '8DwX9GjDU8mvJxF';
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=globals.js.map
