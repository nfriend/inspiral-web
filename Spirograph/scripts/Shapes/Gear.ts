/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.Shapes {

    export function Gear(options: GearOptions) {
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

        var outerRadius = options.radius + options.toothHeight,
            pathBuilder = new SVG.PathBuilder(),
            angle = 0,
            delta = 360 / options.toothCount;

        // draw the circle with teeth
        pathBuilder.add(new SVG.MCommand(options.radius, 0));
        for (var i = 0; i < options.toothCount; i++) {
            pathBuilder.add(new SVG.ACommand(options.radius, options.radius, 0, false, true, options.radius * Math.cos(Utility.toRadians(angle + delta * 1 / 6)), options.radius * Math.sin(Utility.toRadians(angle + delta * 1 / 6))));
            pathBuilder.add(new SVG.LCommand(outerRadius * Math.cos(Utility.toRadians(angle + delta * 1 / 2)), outerRadius * Math.sin(Utility.toRadians(angle + delta * 1 / 2))));
            pathBuilder.add(new SVG.ACommand(outerRadius, outerRadius, 0, false, true, outerRadius * Math.cos(Utility.toRadians(angle + delta * 4 / 6)), outerRadius * Math.sin(Utility.toRadians(angle + delta * 4 / 6))));
            pathBuilder.add(new SVG.LCommand(options.radius * Math.cos(Utility.toRadians(angle + delta)), options.radius * Math.sin(Utility.toRadians(angle + delta))));
            angle += delta;
        }

        pathBuilder.add(new SVG.ZCommand());

        // cut out the holes
        var holes = (new GearHoleGenerator()).generate(options);
        holes.forEach((hole) => {
            var holePosition = { x: hole.holeRadius * Math.cos(Utility.toRadians(hole.holeAngle)), y: hole.holeRadius * Math.sin(Utility.toRadians(hole.holeAngle)) };

            pathBuilder.add(new SVG.MCommand(holePosition.x + options.holeRadius, holePosition.y));
            pathBuilder.add(new SVG.ACommand(options.holeRadius, options.holeRadius, 0, true, false, holePosition.x - options.holeRadius, holePosition.y));
            pathBuilder.add(new SVG.ACommand(options.holeRadius, options.holeRadius, 0, true, false, holePosition.x + options.holeRadius, holePosition.y));
        });

        pathBuilder.add(new SVG.ZCommand());

        return pathBuilder.toString();
    }
}