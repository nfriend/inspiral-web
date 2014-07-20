/// <reference path='definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    var canvas = d3.select("body").append("canvas").attr("width", window.innerWidth).attr("height", window.innerHeight);

    var ctx = canvas.node().getContext('2d');
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    var previousCoords = null;

    var canvasMouseMove = function (d, i) {
        var mouseCoords = { x: d3.event.clientX, y: d3.event.clientY };
        ctx.beginPath();
        ctx.moveTo(previousCoords.x, previousCoords.y);
        ctx.lineTo(mouseCoords.x, mouseCoords.y);
        ctx.stroke();
        ctx.closePath();

        previousCoords = mouseCoords;
    };

    canvas.on('mousedown', function (d, i) {
        previousCoords = { x: d3.event.clientX, y: d3.event.clientY };
        canvas.on('mousemove', canvasMouseMove);
    });

    canvas.on('mouseup', function () {
        canvas.on('mousemove', null);
    });
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=app.js.map
