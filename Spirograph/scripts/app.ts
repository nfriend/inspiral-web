/// <reference path='definitions/references.d.ts' />
'use strict';

module Spirograph {

    var svgContainer = d3.select("body").append("svg").attr("width", window.innerWidth).attr("height", window.innerHeight);

    var gearOptions: Shapes.GearOptions = {
        radius: 120,
        toothCount: 60,
        toothHeight: 10,
        holeCount: 35,
        holeSweepAngle: 720
    };

    var ringGearOptions: Shapes.RingGearOptions = {
        innerRadius: 192,
        innerToothCount: 96,
        innerToothHeight: 10,
        outerRadius: 288,
        outerToothCount: 144
    };

    var ringGear = svgContainer.append("g")
        .attr("class", "gear ring-gear")
        .attr("transform", "translate(" + Utility.getCenterX() + "," + Utility.getCenterY() + ")")
        .datum(ringGearOptions)
        .append("path")
        .attr("d", Shapes.RingGear);


    var gear = svgContainer.append("g")
        .attr("class", "gear")
        //.attr("transform", "translate(" + Utility.getCenterX() + "," + Utility.getCenterY() + ")")
        .datum(gearOptions)
        .append("path")
        .attr("d", Shapes.Gear);

    var svgContainerMouseMove = function (d, i) {
        var mouseCoords = Utility.toStandardCoords({ x: d3.event.clientX, y: d3.event.clientY }, { x: window.innerWidth, y: window.innerHeight });
        var radius = ringGearOptions.innerRadius - gearOptions.radius - 2;
        var mouseAngle = Math.atan2(mouseCoords.y, mouseCoords.x);

        var newX = radius * Math.cos(mouseAngle) + Utility.getCenterX();
        var newY = -1 * radius * Math.sin(mouseAngle) + Utility.getCenterY();

        $('#output').html('<p>' + Utility.toDegrees(mouseAngle) + '</p><p>' + Utility.toDegrees(mouseAngle * (gearOptions.radius / ringGearOptions.innerRadius)) + '</p>');

        gear.attr("transform", "translate(" + newX + "," + newY + ") rotate(" + Utility.toDegrees(mouseAngle * (gearOptions.radius / ringGearOptions.innerRadius)) + ")");
        //gear.attr("transform", "rotate(" + Utility.toDegrees(-1 * mouseAngle) + ")");
    }

    gear.on("mousedown", function (d, i) {
        svgContainer.on("mousemove", svgContainerMouseMove);
        svgContainer.on("mouseup", function () { svgContainer.on("mousemove", null); });
    });
}
