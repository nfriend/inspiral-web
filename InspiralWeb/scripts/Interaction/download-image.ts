/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Interaction {
    'use strict';

    var backgroundRed = 0,
        backgroundGreen = 0,
        backgroundBlue = 0,
        backgroundAlpha = 0;

    EventAggregator.subscribe('downloadImage', (callback: (any) => any, downloadImage: boolean = false) => {
        var canvas = <HTMLCanvasElement> d3.select('#inspiral-web-canvas').node();

        var tempCanvas = <HTMLCanvasElement>($('<canvas width="' + canvas.width + '" height="' + canvas.height + '">')[0]);
        var tempCanvasContext = <CanvasRenderingContext2D>tempCanvas.getContext('2d');
        tempCanvasContext.fillStyle = 'rgba(' + backgroundRed + ', ' + backgroundGreen + ', ' + backgroundBlue + ', ' + backgroundAlpha + ')';
        tempCanvasContext.fillRect(0, 0, canvas.width, canvas.height);
        var userImage = new Image();
        userImage.src = canvas.toDataURL();
        userImage.onload = () => {
            tempCanvasContext.drawImage(userImage, 0, 0);

            try {
                var imageData = tempCanvas.toDataURL('image/jpeg', 0.9).split(',')[1];
            } catch (e) {
                var imageData = tempCanvas.toDataURL().split(',')[1];
            }

            var album: string;
            if (InspiralWeb.isDev) {
                album = downloadImage ? imgurDownloadAlbumDeleteHashDev : imgurAlbumDeleteHashDev;
            } else {
                album = downloadImage ? imgurDownloadAlbumDeleteHash : imgurAlbumDeleteHash;
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
                    title: Utility.convertToHumanReadableDate(new Date()),
                },
                dataType: 'json',
                success: (response) => {

                    if (!downloadImage) {
                        var image = response.data;
                        image.datetime = Utility.convertToMysqlFriendlyString(new Date(image.datetime * 1000));
                        image.imgur_id = image.id;

                        $.ajax({
                            type: 'POST',
                            url: isDev ? 'http://dev.nathanfriend.com/inspiral-web/saveimage.php' : 'saveimage.php',
                            data: image,
                            success: function (response) {
                                if (callback) {
                                    callback(image.link);
                                }
                            },
                            error: function (response) {
                                console.log(response);
                            },
                        });
                    } else {
                        if (callback) {
                            callback(response.data.link);
                        }
                    }
                },
                error: (e) => {
                    console.error('Unable to upload image to the gallery!');
                }
            });
        };
    });

    EventAggregator.subscribe('colorSelected', (r: number, g: number, b: number, a: number, foregroundOrBackground: string) => {
        if (foregroundOrBackground === 'background') {
            backgroundRed = r;
            backgroundGreen = g;
            backgroundBlue = b;
            backgroundAlpha = a;
        }
    });
}
