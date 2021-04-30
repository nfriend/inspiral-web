﻿/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    (function (Shapes) {
        'use strict';

        function DisplayBeam(options) {
            if (options.endCapsToothCount % 2 !== 0) {
                throw 'InspiralWeb.Shapes.BeamOptions.endCapToothCount must be an even number';
            }
            if (options.totalToothCount % 2 !== 0) {
                throw 'InspiralWeb.Shapes.BeamOptions.totalToothCount must be an even number';
            }

            var pathBuilder = new InspiralWeb.SVG.PathBuilder(), radius = 2 * options.endCapsToothCount, beamToothCount = options.totalToothCount - options.endCapsToothCount, toothWidth = 2 * Math.PI * radius / options.endCapsToothCount, totalWidth = 2 * radius + toothWidth * (beamToothCount / 2), totalHeight = 2 * radius, offsetX = -1 * totalWidth / 2 + radius, toothAngleDelta = 360 / options.endCapsToothCount;

            pathBuilder.addCommand(new InspiralWeb.SVG.MCommand(offsetX, -1 * radius));

            for (var i = 0; i < beamToothCount / 2; i++) {
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand((i + 2 / 6) * toothWidth + offsetX, (-1 * radius) + options.toothHeight));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand((i + 3 / 6) * toothWidth + offsetX, (-1 * radius) + options.toothHeight));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand((i + 5 / 6) * toothWidth + offsetX, -1 * radius));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand((i + 6 / 6) * toothWidth + offsetX, -1 * radius));
            }

            // draw the right endcap
            var endCapOffsetX = offsetX *= -1;
            for (var i = 0; i < options.endCapsToothCount / 2; i++) {
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand((radius - options.toothHeight) * Math.cos(InspiralWeb.Utility.toRadians(90 - (i + 2 / 6) * toothAngleDelta)) + endCapOffsetX, -1 * (radius - options.toothHeight) * Math.sin(InspiralWeb.Utility.toRadians(90 - (i + 2 / 6) * toothAngleDelta))));
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(radius, radius, 0, false, true, (radius - options.toothHeight) * Math.cos(InspiralWeb.Utility.toRadians(90 - (i + 3 / 6) * toothAngleDelta)) + endCapOffsetX, -1 * (radius - options.toothHeight) * Math.sin(InspiralWeb.Utility.toRadians(90 - (i + 3 / 6) * toothAngleDelta))));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand(radius * Math.cos(InspiralWeb.Utility.toRadians(90 - (i + 5 / 6) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(InspiralWeb.Utility.toRadians(90 - (i + 5 / 6) * toothAngleDelta))));
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(radius, radius, 0, false, true, radius * Math.cos(InspiralWeb.Utility.toRadians(90 - (i + 6 / 6) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(InspiralWeb.Utility.toRadians(90 - (i + 6 / 6) * toothAngleDelta))));
            }

            // draw the bottom of the beam
            offsetX *= -1;
            for (var i = (beamToothCount / 2); i > 0; i--) {
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand((i - 2 / 6) * toothWidth + offsetX, radius - options.toothHeight));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand((i - 3 / 6) * toothWidth + offsetX, radius - options.toothHeight));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand((i - 5 / 6) * toothWidth + offsetX, radius));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand((i - 6 / 6) * toothWidth + offsetX, radius));
            }

            // draw the left endcap
            var endCapOffsetX = offsetX;
            for (var i = 0; i < options.endCapsToothCount / 2; i++) {
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand((radius - options.toothHeight) * Math.cos(InspiralWeb.Utility.toRadians(-90 - (i + 2 / 6) * toothAngleDelta)) + endCapOffsetX, -1 * (radius - options.toothHeight) * Math.sin(InspiralWeb.Utility.toRadians(-90 - (i + 2 / 6) * toothAngleDelta))));
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(radius, radius, 0, false, true, (radius - options.toothHeight) * Math.cos(InspiralWeb.Utility.toRadians(-90 - (i + 3 / 6) * toothAngleDelta)) + endCapOffsetX, -1 * (radius - options.toothHeight) * Math.sin(InspiralWeb.Utility.toRadians(-90 - (i + 3 / 6) * toothAngleDelta))));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand(radius * Math.cos(InspiralWeb.Utility.toRadians(-90 - (i + 5 / 6) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(InspiralWeb.Utility.toRadians(-90 - (i + 5 / 6) * toothAngleDelta))));
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(radius, radius, 0, false, true, radius * Math.cos(InspiralWeb.Utility.toRadians(-90 - (i + 6 / 6) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(InspiralWeb.Utility.toRadians(-90 - (i + 6 / 6) * toothAngleDelta))));
            }

            pathBuilder.addCommand(new InspiralWeb.SVG.ZCommand());
            return pathBuilder.toString();
        }
        Shapes.DisplayBeam = DisplayBeam;
    })(InspiralWeb.Shapes || (InspiralWeb.Shapes = {}));
    var Shapes = InspiralWeb.Shapes;
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=DisplayBeam.js.map
