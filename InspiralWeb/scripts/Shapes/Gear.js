/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Shapes;
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
            var outerRadius = options.radius + options.toothHeight, pathBuilder = new InspiralWeb.SVG.PathBuilder(), angle = 0, delta = 360 / options.toothCount;
            // draw the circle with teeth
            pathBuilder.addCommand(new InspiralWeb.SVG.MCommand(options.radius, 0));
            for (var i = 0; i < options.toothCount; i++) {
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(options.radius, options.radius, 0, false, true, options.radius * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 1 / 12)), options.radius * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 1 / 12))));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand(outerRadius * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 5 / 12)), outerRadius * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 5 / 12))));
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(outerRadius, outerRadius, 0, false, true, outerRadius * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 7 / 12)), outerRadius * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 7 / 12))));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand(options.radius * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 11 / 12)), options.radius * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 11 / 12))));
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(options.radius, options.radius, 0, false, true, options.radius * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 12 / 12)), options.radius * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 12 / 12))));
                angle += delta;
            }
            pathBuilder.addCommand(new InspiralWeb.SVG.ZCommand());
            // cut out the holes
            var holes = (new Shapes.GearHoleGenerator()).generate(options);
            holes.forEach(function (hole) {
                pathBuilder.addCommandString(Shapes.GearHole(hole));
            });
            pathBuilder.addCommand(new InspiralWeb.SVG.ZCommand());
            return pathBuilder.toString();
        }
        Shapes.Gear = Gear;
    })(Shapes = InspiralWeb.Shapes || (InspiralWeb.Shapes = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=Gear.js.map