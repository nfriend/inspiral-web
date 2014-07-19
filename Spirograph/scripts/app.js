/// <reference path='definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    var svgContainer = d3.select("body").append("svg").attr("width", window.innerWidth).attr("height", window.innerHeight);

    var gearOptions = {
        radius: 180,
        toothCount: 84,
        toothHeight: 10,
        holeCount: 35,
        holeSweepAngle: 720
    };

    var gear = svgContainer.append("g").attr("class", "gear").attr("transform", "translate(" + Spirograph.Utility.getCenterX() + "," + Spirograph.Utility.getCenterY() + ")").datum(gearOptions).append("path").attr("d", Spirograph.Shapes.Gear);

    var svgContainerMouseMove = function (d, i) {
        var mouseCoords = Spirograph.Utility.toStandardCoords({ x: d3.event.clientX, y: d3.event.clientY }, { x: window.innerWidth, y: window.innerHeight });
        var radius = 100;
        var mouseAngle = Math.atan2(mouseCoords.y, mouseCoords.x);

        var newX = radius * Math.cos(mouseAngle) + Spirograph.Utility.getCenterX();
        var newY = -1 * radius * Math.sin(mouseAngle) + Spirograph.Utility.getCenterY();

        //gear.attr("transform", "translate(" + newX + "," + newY + ") rotate(" + Utility.toDegrees(mouseAngle) + ")");
        gear.attr("transform", "rotate(" + Spirograph.Utility.toDegrees(-1 * mouseAngle) + ")");
    };

    gear.on("mousedown", function (d, i) {
        svgContainer.on("mousemove", svgContainerMouseMove);
        svgContainer.on("mouseup", function () {
            svgContainer.on("mousemove", null);
        });
    });
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=app.js.map
