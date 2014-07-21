/// <reference path='definitions/references.d.ts' />
'use strict';
var _this = this;
var Spirograph;
(function (Spirograph) {
    var canvas = d3.select("body").append("canvas").attr('id', 'spirograph-canvas').attr("width", window.innerWidth).attr("height", window.innerHeight);

    var ctx = canvas.node().getContext('2d');
    ctx.strokeStyle = "rgba(255,0,0,0.2)";
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    var svgContainer = d3.select("body").append("svg").attr("width", window.innerWidth).attr("height", window.innerHeight);

    var gearOptions = (new Spirograph.Shapes.GearOptionsFactory()).create(84);
    var ringGearOptions = (new Spirograph.Shapes.RingGearOptionsFactory()).create(144, 96);

    var holeOptions = {
        angle: 0,
        positionRadius: 80,
        radius: gearOptions.holeRadius
    };

    var ringGear = svgContainer.append("g").attr("class", "gear ring-gear").attr("transform", "translate(" + Spirograph.Utility.getCenterX() + "," + Spirograph.Utility.getCenterY() + ")").datum(ringGearOptions).append("path").attr("d", Spirograph.Shapes.RingGear);

    var gear = svgContainer.append("g").attr("class", "gear").datum(gearOptions);

    gear.append("path").attr("d", Spirograph.Shapes.Gear);

    Spirograph.Utility.changePenColorStyle('green');
    $('#test-button').click(function () {
        Spirograph.Utility.changePenColorStyle('red');
    });

    (new Spirograph.Shapes.GearHoleGenerator()).generate(gearOptions).forEach(function (hole) {
        hole.radius *= 2;

        var holeObject = gear.append('path').attr('class', 'gear-hole').datum(hole).attr('d', Spirograph.Shapes.GearHole);
    });

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
        gear.classed('dragging', true);

        svgContainer.on("mousemove", svgContainerMouseMove);

        svgContainer.on("mouseup", function () {
            svgContainer.on("mousemove", null);
            gear.classed('dragging', false);
        });
    });

    // initialize positions of gear and pen
    (function () {
        previousTransformInfo = rotater.rotate(gearOptions, 0, holeOptions);
        gear.attr("transform", "translate(" + previousTransformInfo.x + "," + Spirograph.Utility.getCenterY() + ") rotate(" + 0 + ")");
    })();
})(Spirograph || (Spirograph = {}));

// download canvas as image functionality
document.getElementById('download-link').addEventListener('click', function () {
    _this.href = document.getElementById('spirograph-canvas').toDataURL();
    _this.download = 'spirograph.png';
}, false);
//# sourceMappingURL=app.js.map
