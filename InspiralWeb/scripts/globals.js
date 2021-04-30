/// <reference path='definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    'use strict';
    InspiralWeb.isInDarkMode = false;
    InspiralWeb.areGearsVisible = true;
    InspiralWeb.isCursorTrackerVisible = false;
    InspiralWeb.isAnythingDrawn = false;
    InspiralWeb.isDev = document.location.hostname === 'localhost' || document.location.hostname === '127.0.0.1' || document.location.hostname.indexOf('dev.') !== -1;
    //export var isDev = false;
    InspiralWeb.imgurClientID = '4d93fc08cc27d37';
    // the main gallery
    InspiralWeb.imgurAlbumName = '2R9z5';
    InspiralWeb.imgurAlbumDeleteHash = 'splQJocFCJf7Rky';
    // the gallery used for downloading images only
    InspiralWeb.imgurDownloadAlbumName = '9HlaO';
    InspiralWeb.imgurDownloadAlbumDeleteHash = 'cUcZYYRwdQ5lkOW';
    // the dev version of the main gallery
    InspiralWeb.imgurAlbumNameDev = 'T6EZc';
    InspiralWeb.imgurAlbumDeleteHashDev = 'zYKofZIZqwwRrta';
    // the dev version of the downloading gallery
    InspiralWeb.imgurDownloadAlbumNameDev = '7Fixh';
    InspiralWeb.imgurDownloadAlbumDeleteHashDev = '8DwX9GjDU8mvJxF';
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=globals.js.map