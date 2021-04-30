/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Interaction;
    (function (Interaction) {
        'use strict';
        var backgroundRed = 0, backgroundGreen = 0, backgroundBlue = 0, backgroundAlpha = 0;
        InspiralWeb.EventAggregator.subscribe('downloadImage', function (callback, downloadImage) {
            if (downloadImage === void 0) { downloadImage = false; }
            var canvas = d3.select('#inspiral-web-canvas').node();
            var tempCanvas = ($('<canvas width="' + canvas.width + '" height="' + canvas.height + '">')[0]);
            var tempCanvasContext = tempCanvas.getContext('2d');
            tempCanvasContext.fillStyle = 'rgba(' + backgroundRed + ', ' + backgroundGreen + ', ' + backgroundBlue + ', ' + backgroundAlpha + ')';
            tempCanvasContext.fillRect(0, 0, canvas.width, canvas.height);
            var userImage = new Image();
            userImage.src = canvas.toDataURL();
            userImage.onload = function () {
                tempCanvasContext.drawImage(userImage, 0, 0);
                try {
                    var imageData = tempCanvas.toDataURL('image/jpeg', 0.9).split(',')[1];
                }
                catch (e) {
                    var imageData = tempCanvas.toDataURL().split(',')[1];
                }
                var album;
                if (InspiralWeb.isDev) {
                    album = downloadImage ? InspiralWeb.imgurDownloadAlbumDeleteHashDev : InspiralWeb.imgurAlbumDeleteHashDev;
                }
                else {
                    album = downloadImage ? InspiralWeb.imgurDownloadAlbumDeleteHash : InspiralWeb.imgurAlbumDeleteHash;
                }
                $.ajax({
                    type: 'POST',
                    headers: {
                        Authorization: 'Client-ID ' + InspiralWeb.imgurClientID
                    },
                    url: 'https://api.imgur.com/3/image',
                    data: {
                        type: 'base64',
                        image: imageData,
                        album: album,
                        title: InspiralWeb.Utility.convertToHumanReadableDate(new Date())
                    },
                    dataType: 'json',
                    success: function (response) {
                        if (!downloadImage) {
                            var image = response.data;
                            image.datetime = InspiralWeb.Utility.convertToMysqlFriendlyString(new Date(image.datetime * 1000));
                            image.imgur_id = image.id;
                            $.ajax({
                                type: 'POST',
                                url: InspiralWeb.isDev ? 'http://dev.nathanfriend.com/inspiral-web/saveimage.php' : 'saveimage.php',
                                data: image,
                                success: function (response) {
                                    if (callback) {
                                        callback(image.link);
                                    }
                                },
                                error: function (response) {
                                    console.log(response);
                                }
                            });
                        }
                        else {
                            if (callback) {
                                callback(response.data.link);
                            }
                        }
                    },
                    error: function (e) {
                        console.error('Unable to upload image to the gallery!');
                    }
                });
            };
        });
        InspiralWeb.EventAggregator.subscribe('colorSelected', function (r, g, b, a, foregroundOrBackground) {
            if (foregroundOrBackground === 'background') {
                backgroundRed = r;
                backgroundGreen = g;
                backgroundBlue = b;
                backgroundAlpha = a;
            }
        });
    })(Interaction = InspiralWeb.Interaction || (InspiralWeb.Interaction = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=download-image.js.map