/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Interaction) {
        'use strict';

        var backgroundRed = 0, backgroundGreen = 0, backgroundBlue = 0, backgroundAlpha = 0;

        Spirograph.EventAggregator.subscribe('downloadImage', function (callback, downloadImage) {
            if (typeof downloadImage === "undefined") { downloadImage = false; }
            var canvas = d3.select('#spirograph-canvas').node();
            $.ajax({
                type: 'POST',
                url: 'saveimage.php',
                data: {
                    img: canvas.toDataURL(),
                    red: backgroundRed,
                    green: backgroundGreen,
                    blue: backgroundBlue,
                    alpha: backgroundAlpha,
                    submitToGallery: !downloadImage
                },
                success: function (imagename) {
                    if (callback) {
                        callback();
                    }
                    if (downloadImage) {
                        location.href = "getimage.php?imagename=" + imagename;
                    }
                }
            });
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
