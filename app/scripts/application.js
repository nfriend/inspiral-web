'use strict';

(function (spirograph, $, undefined) {

    var toRadians = function (degrees) {
        return (degrees * Math.PI) / 180;
    }
    var toDegrees = function (radians) {
        return (radians * 180) / Math.PI;
    }

    var toStandardCoodinates = function (coords, size) {
        return {
            x: coords.x - size.x / 2,
            y: -1 * (coords.y - size.y / 2)
        };
    }

    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    var svgContainer = d3.select("body").append("svg").attr("width", window.innerWidth).attr("height", window.innerHeight);

    //var circle = svgContainer.append("circle")
    //    .attr("cx", centerX)
    //    .attr("cy", centerY)
    //    .attr("r", 40);

    var circle = svgContainer.append("g")
        .attr("class", "gear")
        .attr("fill", "red")
        .attr("fill-opacity", "0.5")
        .datum({ teeth: 30, radius: 100 })
        .append("path")
        .attr("d", gear);


    var svgContainerMouseMove = function (d, i) {
        var mouseCoords = toStandardCoodinates({ x: d3.event.clientX, y: d3.event.clientY }, { x: window.innerWidth, y: window.innerHeight });
        var radius = 100;
        var mouseAngle = Math.atan2(mouseCoords.y, mouseCoords.x);

        var newX = radius * Math.cos(mouseAngle) + centerX;
        var newY = -1 * radius * Math.sin(mouseAngle) + centerY;

        circle.attr("transform", "translate(" + newX + "," + newY + ") rotate(" + toDegrees(mouseAngle) + ")");
        //circle.attr("cx", radius * Math.cos(mouseAngle) + centerX).attr("cy", -1 * radius * Math.sin(mouseAngle) + centerY);
    }

    circle.on("mousedown", function (d, i) {
        svgContainer.on("mousemove", svgContainerMouseMove);
        svgContainer.on("mouseup", function () { svgContainer.on("mousemove", null); });
    });

}(window.spirograph = window.spirograph || {}, jQuery));