﻿/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Shapes {
    'use strict';

    export function Beam(options: BeamOptions) {

        if (options.endCapsToothCount % 2 !== 0) {
            throw 'InspiralWeb.Shapes.BeamOptions.endCapToothCount must be an even number';
        }
        if (options.totalToothCount % 2 !== 0) {
            throw 'InspiralWeb.Shapes.BeamOptions.totalToothCount must be an even number';
        }

        var pathBuilder = new SVG.PathBuilder(),
            radius = 2 * options.endCapsToothCount,
            beamToothCount = options.totalToothCount - options.endCapsToothCount,
            toothWidth = 2 * Math.PI * radius / options.endCapsToothCount,
            totalWidth = 2 * radius + toothWidth * (beamToothCount / 2),
            totalHeight = 2 * radius,
            offsetX = -1 * totalWidth / 2 + radius,
            toothAngleDelta = 360 / options.endCapsToothCount;

        // if we're passed a toothWidth, we calculate some things differently
        if (options.toothWidth) {
            toothWidth = options.toothWidth;
            radius = ((options.totalToothCount - options.endCapsToothCount) * toothWidth) / (2 * Math.PI);
            totalWidth = 2 * radius + toothWidth * (beamToothCount / 2),
            totalHeight = 2 * radius,
            offsetX = -1 * totalWidth / 2 + radius,
            toothAngleDelta = 360 / options.endCapsToothCount;
        }

        pathBuilder.addCommand(new SVG.MCommand(offsetX, -1 * radius));

        for (var i = 0; i < beamToothCount / 2; i++) {
            pathBuilder.addCommand(new SVG.LCommand((i + 1 / 12) * toothWidth + offsetX, -1 * radius));
            pathBuilder.addCommand(new SVG.LCommand((i + 5 / 12) * toothWidth + offsetX, (-1 * radius) + options.toothHeight));
            pathBuilder.addCommand(new SVG.LCommand((i + 7 / 12) * toothWidth + offsetX, (-1 * radius) + options.toothHeight));
            pathBuilder.addCommand(new SVG.LCommand((i + 11 / 12) * toothWidth + offsetX, -1 * radius));
            pathBuilder.addCommand(new SVG.LCommand((i + 12 / 12) * toothWidth + offsetX, -1 * radius));
        }

        // draw the right endcap
        var endCapOffsetX = offsetX *= -1;
        for (var i = 0; i < options.endCapsToothCount / 2; i++) {
            pathBuilder.addCommand(new SVG.ACommand(radius, radius, 0, false, true, radius * Math.cos(Utility.toRadians(90 - (i + 1 / 12) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(Utility.toRadians(90 - (i + 1 / 12) * toothAngleDelta))));
            pathBuilder.addCommand(new SVG.LCommand((radius - options.toothHeight) * Math.cos(Utility.toRadians(90 - (i + 5 / 12) * toothAngleDelta)) + endCapOffsetX, -1 * (radius - options.toothHeight) * Math.sin(Utility.toRadians(90 - (i + 5 / 12) * toothAngleDelta))));
            pathBuilder.addCommand(new SVG.ACommand(radius, radius, 0, false, true, (radius - options.toothHeight) * Math.cos(Utility.toRadians(90 - (i + 7 / 12) * toothAngleDelta)) + endCapOffsetX, -1 * (radius - options.toothHeight) * Math.sin(Utility.toRadians(90 - (i + 7 / 12) * toothAngleDelta))));
            pathBuilder.addCommand(new SVG.LCommand(radius * Math.cos(Utility.toRadians(90 - (i + 11 / 12) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(Utility.toRadians(90 - (i + 11 / 12) * toothAngleDelta))));
            pathBuilder.addCommand(new SVG.ACommand(radius, radius, 0, false, true, radius * Math.cos(Utility.toRadians(90 - (i + 12 / 12) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(Utility.toRadians(90 - (i + 12 / 12) * toothAngleDelta))));
        }

        // draw the bottom of the beam
        offsetX *= -1;
        for (var i = (beamToothCount / 2); i > 0; i--) {
            pathBuilder.addCommand(new SVG.LCommand((i - 1 / 12) * toothWidth + offsetX, radius));
            pathBuilder.addCommand(new SVG.LCommand((i - 5 / 12) * toothWidth + offsetX, radius - options.toothHeight));
            pathBuilder.addCommand(new SVG.LCommand((i - 7 / 12) * toothWidth + offsetX, radius - options.toothHeight));
            pathBuilder.addCommand(new SVG.LCommand((i - 11 / 12) * toothWidth + offsetX, radius));
            pathBuilder.addCommand(new SVG.LCommand((i - 12 / 12) * toothWidth + offsetX, radius));
        }

        // draw the left endcap
        var endCapOffsetX = offsetX;
        for (var i = 0; i < options.endCapsToothCount / 2; i++) {
            pathBuilder.addCommand(new SVG.ACommand(radius, radius, 0, false, true, radius * Math.cos(Utility.toRadians(-90 - (i + 1 / 12) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(Utility.toRadians(-90 - (i + 1 / 12) * toothAngleDelta))));
            pathBuilder.addCommand(new SVG.LCommand((radius - options.toothHeight) * Math.cos(Utility.toRadians(-90 - (i + 5 / 12) * toothAngleDelta)) + endCapOffsetX, -1 * (radius - options.toothHeight) * Math.sin(Utility.toRadians(-90 - (i + 5 / 12) * toothAngleDelta))));
            pathBuilder.addCommand(new SVG.ACommand(radius, radius, 0, false, true, (radius - options.toothHeight) * Math.cos(Utility.toRadians(-90 - (i + 7 / 12) * toothAngleDelta)) + endCapOffsetX, -1 * (radius - options.toothHeight) * Math.sin(Utility.toRadians(-90 - (i + 7 / 12) * toothAngleDelta))));
            pathBuilder.addCommand(new SVG.LCommand(radius * Math.cos(Utility.toRadians(-90 - (i + 11 / 12) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(Utility.toRadians(-90 - (i + 11 / 12) * toothAngleDelta))));
            pathBuilder.addCommand(new SVG.ACommand(radius, radius, 0, false, true, radius * Math.cos(Utility.toRadians(-90 - (i + 12 / 12) * toothAngleDelta)) + endCapOffsetX, -1 * radius * Math.sin(Utility.toRadians(-90 - (i + 12 / 12) * toothAngleDelta))));
        }

        pathBuilder.addCommand(new SVG.ZCommand());
        return pathBuilder.toString();
    }
}
