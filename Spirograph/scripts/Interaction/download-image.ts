/// <reference path='../definitions/references.d.ts' />

module Spirograph.Interaction {
    'use strict';

    var backgroundRed = 0,
        backgroundGreen = 0,
        backgroundBlue = 0,
        backgroundAlpha = 0;

    EventAggregator.subscribe('downloadImage', (callback: () => any, downloadImage: boolean = false) => {

        uploadImage();

        //var canvas = <HTMLCanvasElement> d3.select('#spirograph-canvas').node();

        //$.ajax({
        //    type: 'POST',
        //    url: 'saveimage.php',
        //    data: {
        //        img: canvas.toDataURL(),
        //        red: backgroundRed,
        //        green: backgroundGreen,
        //        blue: backgroundBlue,
        //        alpha: backgroundAlpha,
        //        submitToGallery: !downloadImage
        //    },
        //    success: (imagename) => {
        //        if (callback) { callback(); }
        //        if (downloadImage) {
        //            location.href = "getimage.php?imagename=" + imagename;
        //        }
        //    }
        //});
    });

    function uploadImage() {
        var canvas = <HTMLCanvasElement> d3.select('#spirograph-canvas').node();

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

            $.ajax({
                type: 'POST',
                headers: {
                    Authorization: 'Client-ID ' + Spirograph.imgurClientID
                },
                url: 'https://api.imgur.com/3/image',
                data: {
                    type: 'base64',
                    image: imageData,
                    album: Spirograph.imgurAlbumDeleteHash,
                    title: Utility.convertToHumanReadableDate(new Date()),
                },
                dataType: 'json',
                success: (e) => {
                    console.log('it worked!!', e);
                },
                error: (e) => {
                    console.log('didn\'t work', e);
                }
            });
        };
    }

    EventAggregator.subscribe('colorSelected', (r: number, g: number, b: number, a: number, foregroundOrBackground: string) => {
        if (foregroundOrBackground === 'background') {
            backgroundRed = r;
            backgroundGreen = g;
            backgroundBlue = b;
            backgroundAlpha = a;
        }
    });
}  