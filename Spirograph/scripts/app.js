/// <reference path='definitions/references.d.ts' />
var _this = this;
var Spirograph;
(function (Spirograph) {
    'use strict';

    var canvas = Spirograph.Initialization.initializeCanvas();
    var svgContainer = Spirograph.Initialization.initializeSvg();
    Spirograph.Initialization.initializeZoom(canvas.node(), svgContainer.node());

    var rotatingGearOptions = (new Spirograph.Shapes.GearOptionsFactory(1)).create(64);
    var fixedGearOptions = (new Spirograph.Shapes.RingGearOptionsFactory(1)).create(144, 96);
    var fixedGear = Spirograph.Initialization.initializeFixedGear(svgContainer, fixedGearOptions);
    var rotatingGear = Spirograph.Initialization.initializeRotatingGear(svgContainer, rotatingGearOptions);
    var holeOptions = Spirograph.Initialization.initializeHoles(rotatingGear, rotatingGearOptions);

    Spirograph.EventAggregator.publish('colorSelected', 255, 0, 0, .4, 'foreground');

    var previousTransformInfo = null;
    var rotater = new Spirograph.Shapes.RingGearRotater(fixedGearOptions);

    //var rotater = new Shapes.BeamRotater(beamOptions);
    //var rotater = new Shapes.GearRotater(fixedGearOptions);
    var lastMouseAngle = null;
    var rotationOffset = 0;

    var svgContainerMouseMove = function (d, i) {
        // chrome handles CSS3 transformed SVG elementes differently - to get
        // accurate mouse coordinates, we need to multiple by the current scale factor
        if (Spirograph.browser.browser === 0 /* Chrome */) {
            var mouseCoords = Spirograph.Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0] / Spirograph.scaleFactor, y: d3.mouse(svgContainer.node())[1] / Spirograph.scaleFactor }, { x: Spirograph.svgWidth, y: Spirograph.svgHeight });
        } else {
            var mouseCoords = Spirograph.Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0], y: d3.mouse(svgContainer.node())[1] }, { x: Spirograph.svgWidth, y: Spirograph.svgHeight });
        }

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

        var transformInfo = rotater.rotate(rotatingGearOptions, mouseAngle, holeOptions);

        //$('#output').html('<p>Mouse angle: ' + mouseAngle + '</p><p>Gear angle: ' + transformInfo.angle + '</p>');
        rotatingGear.attr("transform", "translate(" + transformInfo.x + "," + transformInfo.y + ") rotate(" + transformInfo.angle + ")");

        if (previousTransformInfo !== null) {
            var previousCanvasPenCoords = Spirograph.Utility.svgToCanvasCoords({ x: previousTransformInfo.penX, y: previousTransformInfo.penY });
            var currentCanvasPenCoords = Spirograph.Utility.svgToCanvasCoords({ x: transformInfo.penX, y: transformInfo.penY });

            ctx.beginPath();
            ctx.moveTo(previousCanvasPenCoords.x, previousCanvasPenCoords.y);
            ctx.lineTo(currentCanvasPenCoords.x, currentCanvasPenCoords.y);
            ctx.stroke();
            ctx.closePath();
        }

        previousTransformInfo = transformInfo;

        d3.event.preventDefault();
        return false;
    };

    rotatingGear.on("mousedown", function (d, i) {
        rotatingGear.classed('dragging', true);

        svgContainer.on("mousemove", svgContainerMouseMove);

        svgContainer.on("mouseup", function () {
            svgContainer.on("mousemove", null);
            rotatingGear.classed('dragging', false);

            d3.event.preventDefault();
            return false;
        });

        d3.event.preventDefault();
        return false;
    });

    function initializeGearAndPen(resetGear) {
        if (typeof resetGear === "undefined") { resetGear = true; }
        //previousTransformInfo = rotater.rotate(gearOptions, 0, holeOptions);
        previousTransformInfo = null;

        if (resetGear) {
            previousTransformInfo = rotater.rotate(rotatingGearOptions, 0, holeOptions);
            rotatingGear.attr("transform", "translate(" + previousTransformInfo.x + "," + previousTransformInfo.y + ") rotate(" + previousTransformInfo.angle + ")");
        }
    }

    initializeGearAndPen();

    Spirograph.Interaction.KeyboardShortcutManager.add(39 /* RightArrow */, function () {
        // add shortcut here
    });

    Spirograph.EventAggregator.subscribe('gearSelected', function (gearSize, fixedOrRotating) {
        //alert(fixedOrRotating + ": " + gearSize.toString());
        //gearOptions = (new Shapes.GearOptionsFactory()).create(gearSize);
        console.log(fixedOrRotating + ' gear selected: ' + gearSize);
    });
})(Spirograph || (Spirograph = {}));

// download canvas as image functionality... not fully working yet
document.getElementById('download-link').addEventListener('click', function () {
    var link = _this;
    var data = document.getElementById('spirograph-canvas').toDataURL();
    _this.download = 'spirograph.png';
    window.location.href = data;
}, false);

var myCallback = function () {
    alert('escape was pushed!!');
};
//# sourceMappingURL=app.js.map
