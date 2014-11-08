/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Interaction) {
        'use strict';

        var backgroundRed = 0, backgroundGreen = 0, backgroundBlue = 0, backgroundAlpha = 0;

        Spirograph.EventAggregator.subscribe('downloadImage', function (callback, downloadImage) {
            if (typeof downloadImage === "undefined") { downloadImage = false; }
            var canvas = d3.select('#spirograph-canvas').node();

            var tempCanvas = ($('<canvas width="' + canvas.width + '" height="' + canvas.height + '">')[0]);
            var tempCanvasContext = tempCanvas.getContext('2d');
            tempCanvasContext.fillStyle = 'rgba(' + backgroundRed + ', ' + backgroundGreen + ', ' + backgroundBlue + ', ' + backgroundAlpha + ')';
            tempCanvasContext.fillRect(0, 0, canvas.width, canvas.height);
            var userImage = new Image();
            userImage.src = canvas.toDataURL();
            userImage.onload = function () {
                tempCanvasContext.drawImage(userImage, 0, 0);

                try  {
                    var imageData = tempCanvas.toDataURL('image/jpeg', 0.9).split(',')[1];
                } catch (e) {
                    var imageData = tempCanvas.toDataURL().split(',')[1];
                }

                var album;
                if (Spirograph.isDev) {
                    album = downloadImage ? Spirograph.imgurDownloadAlbumDeleteHashDev : Spirograph.imgurAlbumDeleteHashDev;
                } else {
                    album = downloadImage ? Spirograph.imgurDownloadAlbumDeleteHash : Spirograph.imgurAlbumDeleteHash;
                }

                $.ajax({
                    type: 'POST',
                    async: Spirograph.browser.browser === 0 /* Chrome */ || !downloadImage,
                    headers: {
                        Authorization: 'Client-ID ' + Spirograph.imgurClientID
                    },
                    url: 'https://api.imgur.com/3/image',
                    data: {
                        type: 'base64',
                        image: imageData,
                        album: album,
                        title: Spirograph.Utility.convertToHumanReadableDate(new Date())
                    },
                    dataType: 'json',
                    success: function (e) {
                        console.log(e);
                        if (callback) {
                            callback(e.data.link);
                        }
                    },
                    error: function (e) {
                        console.error('Unable to upload image to the gallery!');
                    }
                });
            };
        });

        Spirograph.EventAggregator.subscribe('colorSelected', function (r, g, b, a, foregroundOrBackground) {
            if (foregroundOrBackground === 'background') {
                backgroundRed = r;
                backgroundGreen = g;
                backgroundBlue = b;
                backgroundAlpha = a;
            }
        });
    })(Spirograph.Interaction || (Spirograph.Interaction = {}));
    var Interaction = Spirograph.Interaction;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=download-image.js.map
