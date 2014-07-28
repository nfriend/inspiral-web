/// <reference path='definitions/references.d.ts' />

module Spirograph {
    'use strict';

    var canvas = Initialization.initializeCanvas();
    var svgContainer = Initialization.initializeSvg();
    Initialization.initializeZoom(<HTMLCanvasElement>canvas.node(), <SVGElement>svgContainer.node());

    var rotatingGearOptions = (new Shapes.GearOptionsFactory(1)).create(64);
    var fixedGearOptions = (new Shapes.RingGearOptionsFactory(1)).create(144, 96);
    var fixedGear = Initialization.initializeFixedGear(svgContainer, fixedGearOptions);
    var rotatingGear = Initialization.initializeRotatingGear(svgContainer, rotatingGearOptions);
    var holeOptions = Initialization.initializeHoles(rotatingGear, rotatingGearOptions);

    EventAggregator.publish('colorSelected', 255, 0, 0, .4, 'foreground');

    var previousTransformInfo: Shapes.TransformInfo = null;
    var rotater = new Shapes.RingGearRotater(fixedGearOptions);
    //var rotater = new Shapes.BeamRotater(beamOptions);
    //var rotater = new Shapes.GearRotater(fixedGearOptions);

    var lastMouseAngle = null;
    var rotationOffset = 0;

    var svgContainerMouseMove = (d, i) => {

        // chrome handles CSS3 transformed SVG elementes differently - to get
        // accurate mouse coordinates, we need to multiple by the current scale factor
        if (browser.browser === Browser.Chrome) {
            var mouseCoords = Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0] / scaleFactor, y: d3.mouse(svgContainer.node())[1] / scaleFactor }, { x: svgWidth, y: svgHeight });
        } else {
            var mouseCoords = Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0], y: d3.mouse(svgContainer.node())[1] }, { x: svgWidth, y: svgHeight });
        }

        var mouseAngle = Utility.toDegrees(Math.atan2(mouseCoords.y, mouseCoords.x));

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
            var previousCanvasPenCoords = Utility.svgToCanvasCoords({ x: previousTransformInfo.penX, y: previousTransformInfo.penY });
            var currentCanvasPenCoords = Utility.svgToCanvasCoords({ x: transformInfo.penX, y: transformInfo.penY });

            ctx.beginPath();
            ctx.moveTo(previousCanvasPenCoords.x, previousCanvasPenCoords.y);
            ctx.lineTo(currentCanvasPenCoords.x, currentCanvasPenCoords.y);
            ctx.stroke();
            ctx.closePath();
        }

        previousTransformInfo = transformInfo;

        d3.event.preventDefault()
        return false;
    };

    rotatingGear.on("mousedown", function (d, i) {
        rotatingGear.classed('dragging', true);

        svgContainer.on("mousemove", svgContainerMouseMove);

        svgContainer.on("mouseup", () => {
            svgContainer.on("mousemove", null);
            rotatingGear.classed('dragging', false);

            d3.event.preventDefault()
            return false;
        });

        d3.event.preventDefault()
        return false;
    });

    function initializeGearAndPen(resetGear: boolean = true) {
        //previousTransformInfo = rotater.rotate(gearOptions, 0, holeOptions);
        previousTransformInfo = null;

        if (resetGear) {
            previousTransformInfo = rotater.rotate(rotatingGearOptions, 0, holeOptions);
            rotatingGear.attr("transform", "translate(" + previousTransformInfo.x + "," + previousTransformInfo.y + ") rotate(" + previousTransformInfo.angle + ")");
        }
    }

    initializeGearAndPen();

    Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.RightArrow, () => {
        // add shortcut here
    });

    EventAggregator.subscribe('gearSelected', (gearSize: number, fixedOrRotating: string) => {

        //alert(fixedOrRotating + ": " + gearSize.toString());
        //gearOptions = (new Shapes.GearOptionsFactory()).create(gearSize);

        console.log(fixedOrRotating + ' gear selected: ' + gearSize);
    });
}

// download canvas as image functionality... not fully working yet
document.getElementById('download-link').addEventListener('click', () => {
    var link = this;
    var data = (<HTMLCanvasElement> document.getElementById('spirograph-canvas')).toDataURL();
    this.download = 'spirograph.png';
    window.location.href = data;

}, false);

var myCallback = function () {
    alert('escape was pushed!!');
}