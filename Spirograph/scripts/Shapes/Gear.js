/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
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
            pathBuilder.add(new Spirograph.SVG.MCommand(options.radius, 0));
            for (var i = 0; i < options.toothCount; i++) {
                pathBuilder.add(new Spirograph.SVG.ACommand(options.radius, options.radius, 0, false, true, options.radius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 1 / 6)), options.radius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 1 / 6))));
                pathBuilder.add(new Spirograph.SVG.LCommand(outerRadius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 1 / 2)), outerRadius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 1 / 2))));
                pathBuilder.add(new Spirograph.SVG.ACommand(outerRadius, outerRadius, 0, false, true, outerRadius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 4 / 6)), outerRadius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 4 / 6))));
                pathBuilder.add(new Spirograph.SVG.LCommand(options.radius * Math.cos(Spirograph.Utility.toRadians(angle + delta)), options.radius * Math.sin(Spirograph.Utility.toRadians(angle + delta))));
                angle += delta;
            }

            pathBuilder.add(new Spirograph.SVG.ZCommand());

            // cut out the holes
            var holes = (new Shapes.GearHoleGenerator()).generate(options);
            holes.forEach(function (hole) {
                var holePosition = { x: hole.holeRadius * Math.cos(Spirograph.Utility.toRadians(hole.holeAngle)), y: hole.holeRadius * Math.sin(Spirograph.Utility.toRadians(hole.holeAngle)) };

                pathBuilder.add(new Spirograph.SVG.MCommand(holePosition.x + options.holeRadius, holePosition.y));
                pathBuilder.add(new Spirograph.SVG.ACommand(options.holeRadius, options.holeRadius, 0, true, false, holePosition.x - options.holeRadius, holePosition.y));
                pathBuilder.add(new Spirograph.SVG.ACommand(options.holeRadius, options.holeRadius, 0, true, false, holePosition.x + options.holeRadius, holePosition.y));
            });

            pathBuilder.add(new Spirograph.SVG.ZCommand());

            return pathBuilder.toString();
        }
        Shapes.Gear = Gear;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=Gear.js.map
