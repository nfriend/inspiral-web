/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        function Beam(options) {
            if (options.endCapsToothCount % 2 !== 0) {
                throw 'Spirograph.Shapes.BeamOptions.endCapToothCount must be an even number';
            }
            if (options.totalToothCount % 2 !== 0) {
                throw 'Spirograph.Shapes.BeamOptions.totalToothCount must be an even number';
            }

            var pathBuilder = new Spirograph.SVG.PathBuilder(), radius = 2 * options.endCapsToothCount, beamToothCount = options.totalToothCount - options.endCapsToothCount, toothWidth = 2 * Math.PI * radius / options.endCapsToothCount, totalWidth = 2 * radius + toothWidth * (beamToothCount / 2), totalHeight = 2 * radius, offsetX = -1 * totalWidth / 2 + radius, toothAngleDelta = 360 / options.endCapsToothCount;

            pathBuilder.addCommand(new Spirograph.SVG.MCommand(offsetX, -1 * radius));

            for (var i = 0; i < beamToothCount / 2; i++) {
                pathBuilder.addCommand(new Spirograph.SVG.LCommand((i + 1 / 6) * toothWidth + offsetX, -1 * radius));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand((i + 1 / 2) * toothWidth + offsetX, (-1 * radius) + options.toothHeight));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand((i + 4 / 6) * toothWidth + offsetX, (-1 * radius) + options.toothHeight));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand((i + 1) * toothWidth + offsetX, -1 * radius));
            }

            // draw the right endcap
            var endCapOffsetX = offsetX *= -1;
            for (var i = 0; i < options.endCapsToothCount / 2; i++) {
                pathBuilder.addCommand(new Spirograph.SVG.ACommand(radius, radius, 0, false, true, radius * Math.cos(Spirograph.Utility.toRadians(90 - (i + 1 / 6) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(Spirograph.Utility.toRadians(90 - (i + 1 / 6) * toothAngleDelta))));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand((radius - options.toothHeight) * Math.cos(Spirograph.Utility.toRadians(90 - (i + 1 / 2) * toothAngleDelta)) + endCapOffsetX, -1 * (radius - options.toothHeight) * Math.sin(Spirograph.Utility.toRadians(90 - (i + 1 / 2) * toothAngleDelta))));
                pathBuilder.addCommand(new Spirograph.SVG.ACommand(radius, radius, 0, false, true, (radius - options.toothHeight) * Math.cos(Spirograph.Utility.toRadians(90 - (i + 4 / 6) * toothAngleDelta)) + endCapOffsetX, -1 * (radius - options.toothHeight) * Math.sin(Spirograph.Utility.toRadians(90 - (i + 4 / 6) * toothAngleDelta))));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand(radius * Math.cos(Spirograph.Utility.toRadians(90 - (i + 1) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(Spirograph.Utility.toRadians(90 - (i + 1) * toothAngleDelta))));
            }

            // draw the bottom of the beam
            offsetX *= -1;
            for (var i = (beamToothCount / 2); i > 0; i--) {
                pathBuilder.addCommand(new Spirograph.SVG.LCommand((i - 1 / 6) * toothWidth + offsetX, radius));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand((i - 1 / 2) * toothWidth + offsetX, radius - options.toothHeight));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand((i - 4 / 6) * toothWidth + offsetX, radius - options.toothHeight));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand((i - 1) * toothWidth + offsetX, radius));
            }

            // draw the left endcap
            var endCapOffsetX = offsetX;
            for (var i = 0; i < options.endCapsToothCount / 2; i++) {
                pathBuilder.addCommand(new Spirograph.SVG.ACommand(radius, radius, 0, false, true, radius * Math.cos(Spirograph.Utility.toRadians(-90 - (i + 1 / 6) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(Spirograph.Utility.toRadians(-90 - (i + 1 / 6) * toothAngleDelta))));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand((radius - options.toothHeight) * Math.cos(Spirograph.Utility.toRadians(-90 - (i + 1 / 2) * toothAngleDelta)) + endCapOffsetX, -1 * (radius - options.toothHeight) * Math.sin(Spirograph.Utility.toRadians(-90 - (i + 1 / 2) * toothAngleDelta))));
                pathBuilder.addCommand(new Spirograph.SVG.ACommand(radius, radius, 0, false, true, (radius - options.toothHeight) * Math.cos(Spirograph.Utility.toRadians(-90 - (i + 4 / 6) * toothAngleDelta)) + endCapOffsetX, -1 * (radius - options.toothHeight) * Math.sin(Spirograph.Utility.toRadians(-90 - (i + 4 / 6) * toothAngleDelta))));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand(radius * Math.cos(Spirograph.Utility.toRadians(-90 - (i + 1) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(Spirograph.Utility.toRadians(-90 - (i + 1) * toothAngleDelta))));
            }

            pathBuilder.addCommand(new Spirograph.SVG.ZCommand());
            console.log(pathBuilder.toString());
            return pathBuilder.toString();
        }
        Shapes.Beam = Beam;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=Beam.js.map
