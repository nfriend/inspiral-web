/// <reference path='definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    var canvas = d3.select("body").append("canvas").attr("width", window.innerWidth).attr("height", window.innerHeight);

    var ctx = canvas.node().getContext('2d');
    ctx.strokeStyle = "rgba(255,0,0,0.2)";
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    var svgContainer = d3.select("body").append("svg").attr("width", window.innerWidth).attr("height", window.innerHeight);

    var gearOptions = (new Spirograph.Shapes.GearOptionsFactory()).create(60);
    var ringGearOptions = (new Spirograph.Shapes.RingGearOptionsFactory()).create(144, 96);

    var holeOptions = {
        holeAngle: 0, holeRadius: 38
    };

    var ringGear = svgContainer.append("g").attr("class", "gear ring-gear").attr("transform", "translate(" + Spirograph.Utility.getCenterX() + "," + Spirograph.Utility.getCenterY() + ")").datum(ringGearOptions).append("path").attr("d", Spirograph.Shapes.RingGear);

    var gear = svgContainer.append("g").attr("class", "gear").datum(gearOptions).append("path").attr("d", Spirograph.Shapes.Gear);

    var previousTransformInfo;
    var rotater = new Spirograph.Shapes.RingGearRotater(ringGearOptions);
    var lastMouseAngle = null;
    var rotationOffset = 0;

    var svgContainerMouseMove = function (d, i) {
        var mouseCoords = Spirograph.Utility.toStandardCoords({ x: d3.event.clientX, y: d3.event.clientY }, { x: window.innerWidth, y: window.innerHeight });
        var mouseAngle = Spirograph.Utility.toDegrees(Math.atan2(mouseCoords.y, mouseCoords.x));

        if (lastMouseAngle != null) {
            if (lastMouseAngle < -90 && mouseAngle > 90) {
                rotationOffset--;
            } else if (lastMouseAngle > 90 && mouseAngle < -90) {
                rotationOffset++;
            }
        }

        lastMouseAngle = mouseAngle;
        mouseAngle += (rotationOffset * 360);

        var transformInfo = rotater.rotate(gearOptions, mouseAngle, holeOptions);

        //$('#output').html('<p>Mouse angle: ' + mouseAngle + '</p><p>Gear angle: ' + transformInfo.angle + '</p>');
        gear.attr("transform", "translate(" + transformInfo.x + "," + transformInfo.y + ") rotate(" + transformInfo.angle + ")");

        ctx.beginPath();
        ctx.moveTo(previousTransformInfo.penX, previousTransformInfo.penY);
        ctx.lineTo(transformInfo.penX, transformInfo.penY);
        ctx.stroke();
        ctx.closePath();

        previousTransformInfo = transformInfo;
    };

    gear.on("mousedown", function (d, i) {
        svgContainer.on("mousemove", svgContainerMouseMove);
        svgContainer.on("mouseup", function () {
            svgContainer.on("mousemove", null);
        });
    });

    // initialize positions of gear and pen
    (function () {
        previousTransformInfo = rotater.rotate(gearOptions, 0, holeOptions);
        gear.attr("transform", "translate(" + previousTransformInfo.x + "," + Spirograph.Utility.getCenterY() + ") rotate(" + 0 + ")");
    })();
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=app.js.map
