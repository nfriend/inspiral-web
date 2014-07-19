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

            var outerRadius = options.radius + options.toothHeight, pathBuilder = new Spirograph.SVG.PathBuilder(), angle = 0, delta = 360 / options.toothCount;

            // draw the circle with teeth
            pathBuilder.add(new Spirograph.SVG.MCommand(options.radius, 0));
            for (var i = 0; i < options.toothCount; i++) {
                pathBuilder.add(new Spirograph.SVG.ACommand(options.radius, options.radius, 0, false, true, options.radius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 1 / 3)), options.radius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 1 / 3))));
                pathBuilder.add(new Spirograph.SVG.LCommand(outerRadius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 1 / 2)), outerRadius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 1 / 2))));
                pathBuilder.add(new Spirograph.SVG.ACommand(outerRadius, outerRadius, 0, false, true, outerRadius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 5 / 6)), outerRadius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 5 / 6))));
                pathBuilder.add(new Spirograph.SVG.LCommand(options.radius * Math.cos(Spirograph.Utility.toRadians(angle + delta)), options.radius * Math.sin(Spirograph.Utility.toRadians(angle + delta))));
                angle += delta;
            }

            pathBuilder.add(new Spirograph.SVG.ZCommand());

            var holePositionRadiusBuffer = 20, holePositionRadiusDelta = (options.radius - 2 * holePositionRadiusBuffer) / options.holeCount, holeAngle = 0, holePositionRadius = options.radius - holePositionRadiusBuffer;

            // finds the average change in arc length that will be needed to evenly space the hole
            // a purely angle-based change results in the hole being wide apart at the edges of the gear and
            // scrunched near the center.
            // this assumes that the arc length decreases linearly, which is probably not right.  See the fudge factor below.
            var smallestArcLength = Math.PI * (2 * holePositionRadiusBuffer) * ((options.holeSweepAngle / options.holeCount) / 360);
            var largestArcLength = Math.PI * (2 * (options.radius - holePositionRadiusBuffer)) * ((options.holeSweepAngle / options.holeCount) / 360);

            // average the smallest and largest arc lengths
            var holeArcLengthDelta = (smallestArcLength + largestArcLength) / 2;

            for (var i = 0; i < options.holeCount; i++) {
                holePositionRadius -= holePositionRadiusDelta;
                holeAngle += 360 * (holeArcLengthDelta / (Math.PI * 2 * holePositionRadius));
            }

            var fudgeFactor = options.holeSweepAngle / holeAngle;
            holeArcLengthDelta *= fudgeFactor;
            console.log("fudge factor: " + options.holeSweepAngle / holeAngle);

            // reset the variables before we run through the algorithm for real
            holeAngle = 0;
            holePositionRadius = options.radius - holePositionRadiusBuffer;

            for (var i = 0; i < options.holeCount; i++) {
                var holePosition = { x: holePositionRadius * Math.cos(Spirograph.Utility.toRadians(holeAngle)), y: holePositionRadius * Math.sin(Spirograph.Utility.toRadians(holeAngle)) };

                pathBuilder.add(new Spirograph.SVG.MCommand(holePosition.x + options.holeRadius, holePosition.y));
                pathBuilder.add(new Spirograph.SVG.ACommand(options.holeRadius, options.holeRadius, 0, true, false, holePosition.x - options.holeRadius, holePosition.y));
                pathBuilder.add(new Spirograph.SVG.ACommand(options.holeRadius, options.holeRadius, 0, true, false, holePosition.x + options.holeRadius, holePosition.y));

                holePositionRadius -= holePositionRadiusDelta;
                holeAngle += 360 * (holeArcLengthDelta / (Math.PI * 2 * holePositionRadius));
            }

            pathBuilder.add(new Spirograph.SVG.ZCommand());

            return pathBuilder.toString();
        }
        Shapes.Gear = Gear;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=Gear.js.map
