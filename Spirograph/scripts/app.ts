/// <reference path='definitions/references.d.ts' />
'use strict';

module Spirograph {
    var canvas = d3.select("body")
        .append("canvas")
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight);

    var ctx = (<HTMLCanvasElement> canvas.node()).getContext('2d');
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    var previousCoords = null;

    var canvasMouseMove = (d, i) => {
        var mouseCoords = { x: <number> d3.event.clientX, y: <number> d3.event.clientY };
        ctx.beginPath();
        ctx.moveTo(previousCoords.x, previousCoords.y);
        ctx.lineTo(mouseCoords.x, mouseCoords.y);
        ctx.stroke();
        ctx.closePath();

        previousCoords = mouseCoords;
    };

    canvas.on('mousedown', (d, i) => {
        previousCoords = { x: <number> d3.event.clientX, y: <number> d3.event.clientY };
        canvas.on('mousemove', canvasMouseMove);
    });

    canvas.on('mouseup', () => { canvas.on('mousemove', null); });

    //var svgContainer = d3.select("body").append("svg").attr("width", window.innerWidth).attr("height", window.innerHeight);

    //var gearOptions = (new Shapes.GearOptionsFactory()).Create(60);

    //var ringGearOptions: Shapes.RingGearOptions = {
    //    innerRadius: 192,
    //    innerToothCount: 96,
    //    innerToothHeight: 10,
    //    outerRadius: 288,
    //    outerToothCount: 144,
    //    outerToothHeight: 10
    //};

    //var ringGear = svgContainer.append("g")
    //    .attr("class", "gear ring-gear")
    //    .attr("transform", "translate(" + Utility.getCenterX() + "," + Utility.getCenterY() + ")")
    //    .datum(ringGearOptions)
    //    .append("path")
    //    .attr("d", Shapes.RingGear);


    //var gear = svgContainer.append("g")
    //    .attr("class", "gear")
    //    .datum(gearOptions)
    //    .append("path")
    //    .attr("d", Shapes.Gear);

    //var svgContainerMouseMove = function (d, i) {
    //    var mouseCoords = Utility.toStandardCoords({ x: d3.event.clientX, y: d3.event.clientY }, { x: window.innerWidth, y: window.innerHeight });
    //    var radius = ringGearOptions.innerRadius - gearOptions.radius - 2;
    //    var mouseAngle = Math.atan2(mouseCoords.y, mouseCoords.x);

    //    var newX = radius * Math.cos(mouseAngle) + Utility.getCenterX();
    //    var newY = -1 * radius * Math.sin(mouseAngle) + Utility.getCenterY();

    //    var gearRotation = 360 * (((Utility.toDegrees(mouseAngle) / 360) * 2 * Math.PI * ringGearOptions.innerRadius) / (2 * Math.PI * gearOptions.radius));
    //    gearRotation -= Utility.toDegrees(mouseAngle);

    //    $('#output').html('<p>Mouse angle: ' + Utility.toDegrees(mouseAngle) + '</p><p>Gear angle: ' + gearRotation + '</p>');

    //    gear.attr("transform", "translate(" + newX + "," + newY + ") rotate(" + gearRotation + ")");
    //    //gear.attr("transform", "rotate(" + Utility.toDegrees(-1 * mouseAngle) + ")");
    //}

    //gear.on("mousedown", function (d, i) {
    //    svgContainer.on("mousemove", svgContainerMouseMove);
    //    svgContainer.on("mouseup", function () { svgContainer.on("mousemove", null); });
    //});

    //gear.attr("transform", "translate(" + (ringGearOptions.innerRadius - gearOptions.radius - 2 + Utility.getCenterX()) + "," + Utility.getCenterY() + ") rotate(" + 0 + ")");
}
