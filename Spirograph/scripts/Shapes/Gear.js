/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        'use strict';

        function Gear(options) {
            if (!options.toothHeight) {
                options.toothHeight = 10;
            }
            if (!options.holeRadius) {
                options.holeRadius = 5;
            }
            if (!options.holeSweepAngle) {
                options.holeSweepAngle = 720;
            }
            if (!options.holePositionBuffer) {
                options.holePositionBuffer = 20;
            }

            var outerRadius = options.radius + options.toothHeight, pathBuilder = new Spirograph.SVG.PathBuilder(), angle = 0, delta = 360 / options.toothCount;

            // draw the circle with teeth
            pathBuilder.addCommand(new Spirograph.SVG.MCommand(options.radius, 0));
            for (var i = 0; i < options.toothCount; i++) {
                pathBuilder.addCommand(new Spirograph.SVG.ACommand(options.radius, options.radius, 0, false, true, options.radius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 1 / 12)), options.radius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 1 / 12))));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand(outerRadius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 5 / 12)), outerRadius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 5 / 12))));
                pathBuilder.addCommand(new Spirograph.SVG.ACommand(outerRadius, outerRadius, 0, false, true, outerRadius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 7 / 12)), outerRadius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 7 / 12))));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand(options.radius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 11 / 12)), options.radius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 11 / 12))));
                pathBuilder.addCommand(new Spirograph.SVG.ACommand(options.radius, options.radius, 0, false, true, options.radius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 12 / 12)), options.radius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 12 / 12))));
                angle += delta;
            }

            pathBuilder.addCommand(new Spirograph.SVG.ZCommand());

            // cut out the holes
            var holes = (new Shapes.GearHoleGenerator()).generate(options);
            holes.forEach(function (hole) {
                pathBuilder.addCommandString(Shapes.GearHole(hole));
            });

            pathBuilder.addCommand(new Spirograph.SVG.ZCommand());

            return pathBuilder.toString();
        }
        Shapes.Gear = Gear;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=Gear.js.map
