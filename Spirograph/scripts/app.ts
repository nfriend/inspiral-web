/// <reference path='definitions/references.d.ts' />
'use strict';

module Spirograph {
    var canvas = d3.select("body")
        .append("canvas")
        .attr('id', 'spirograph-canvas')
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight);

    var ctx = (<HTMLCanvasElement> canvas.node()).getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    var svgContainer = d3.select("body").append("svg").attr("width", window.innerWidth).attr("height", window.innerHeight);

    var gearOptions = (new Shapes.GearOptionsFactory(1)).create(64);
    var ringGearOptions = (new Shapes.RingGearOptionsFactory(1)).create(144, 96);
    var fixedGearOptions = (new Shapes.GearOptionsFactory(1)).create(24);

    var beamOptions: Shapes.BeamOptions = {
        endCapsToothCount: 20,
        toothHeight: 10,
        totalToothCount: 146
    }

    var fixedGear = svgContainer.append('g')
        .attr('class', 'gear fixed')
        .attr("transform", "translate(" + Utility.getCenterX() + "," + Utility.getCenterY() + ")")
        .datum(fixedGearOptions)
        .append("path")
        .attr("d", Shapes.Gear);

    var beam = svgContainer.append('g')
        .attr('class', 'gear beam fixed')
        .attr("transform", "translate(" + Utility.getCenterX() + "," + Utility.getCenterY() + ")")
        .datum(beamOptions)
        .append("path")
        .attr("d", Shapes.Beam);

    var ringGear = svgContainer.append("g")
        .attr("class", "gear ring-gear fixed")
        .attr("transform", "translate(" + Utility.getCenterX() + "," + Utility.getCenterY() + ")")
        .datum(ringGearOptions)
        .append("path")
        .attr("d", Shapes.RingGear);

    var gear = svgContainer.append("g")
        .attr("class", "gear")
        .datum(gearOptions);

    gear.append("path")
        .attr("d", Shapes.Gear);

    Utility.changePenColor(0, 128, 0, .3);
    $('#change-color-button').click(() => {
        var red = parseInt($('#red-input').val(), 10);
        var green = parseInt($('#green-input').val(), 10);
        var blue = parseInt($('#blue-input').val(), 10);
        var alpha = parseFloat($('#alpha-input').val());
        Utility.changePenColor(red, green, blue, alpha);
    });

    $('#hide-gears-button').mousedown(() => {
        gear.style('visibility', 'hidden');
        ringGear.style('visibility', 'hidden');
    }).mouseup(() => {
            gear.style('visibility', 'visible');
            ringGear.style('visibility', 'visible');
        });

    ringGear.style('visibility', 'hidden');
    beam.style('visibility', 'hidden');

    var allHoleOptions = (new Shapes.GearHoleGenerator()).generate(gearOptions);
    var holeOptions;
    allHoleOptions.forEach((hole, index) => {
        var holeObject = gear.append('path')
            .attr('class', 'gear-hole')
            .datum(hole)
            .attr('d', Shapes.GearHole);

        holeObject.on('click', () => {
            d3.selectAll('.selected').classed('selected', false);
            holeObject.classed('selected', true);

            holeOptions = hole;

            initializeGearAndPen(false);
        });

        if (index === 0) {
            holeObject.on('click')(null, null);
        }
    });

    var previousTransformInfo: Shapes.TransformInfo = null;
    //var rotater = new Shapes.RingGearRotater(ringGearOptions);
    //var rotater = new Shapes.BeamRotater(beamOptions);
    var rotater = new Shapes.GearRotater(fixedGearOptions);
    console.log(JSON.stringify(rotater.rotate(gearOptions, 0, holeOptions)));

    var lastMouseAngle = null;
    var rotationOffset = 0;

    var svgContainerMouseMove = (d, i) => {
        var mouseCoords = Utility.toStandardCoords({ x: d3.event.clientX, y: d3.event.clientY }, { x: window.innerWidth, y: window.innerHeight });
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

        var transformInfo = rotater.rotate(gearOptions, mouseAngle, holeOptions);

        //$('#output').html('<p>Mouse angle: ' + mouseAngle + '</p><p>Gear angle: ' + transformInfo.angle + '</p>');

        gear.attr("transform", "translate(" + transformInfo.x + "," + transformInfo.y + ") rotate(" + transformInfo.angle + ")");

        if (previousTransformInfo !== null) {
            ctx.beginPath();
            ctx.moveTo(previousTransformInfo.penX, previousTransformInfo.penY);
            ctx.lineTo(transformInfo.penX, transformInfo.penY);
            ctx.stroke();
            ctx.closePath();
        }

        previousTransformInfo = transformInfo;
    };

    gear.on("mousedown", function (d, i) {
        gear.classed('dragging', true);

        svgContainer.on("mousemove", svgContainerMouseMove);

        svgContainer.on("mouseup", () => {
            svgContainer.on("mousemove", null);
            gear.classed('dragging', false);
        });
    });

    function initializeGearAndPen(resetGear: boolean = true) {
        //previousTransformInfo = rotater.rotate(gearOptions, 0, holeOptions);
        previousTransformInfo = null;

        if (resetGear) {
            previousTransformInfo = rotater.rotate(gearOptions, 0, holeOptions);
            gear.attr("transform", "translate(" + previousTransformInfo.x + "," + previousTransformInfo.y + ") rotate(" + previousTransformInfo.angle + ")");
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
