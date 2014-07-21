/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.Shapes {
    export function GearHole(holeOptions: HoleOptions) {
        var pathBuilder = new SVG.PathBuilder();

        var holePosition = {
            x: holeOptions.positionRadius * Math.cos(Utility.toRadians(holeOptions.angle)),
            y: holeOptions.positionRadius * Math.sin(Utility.toRadians(holeOptions.angle))
        };

        pathBuilder.addCommand(new SVG.MCommand(holePosition.x + holeOptions.radius, holePosition.y));
        pathBuilder.addCommand(new SVG.ACommand(holeOptions.radius, holeOptions.radius, 0, true, false, holePosition.x - holeOptions.radius, holePosition.y));
        pathBuilder.addCommand(new SVG.ACommand(holeOptions.radius, holeOptions.radius, 0, true, false, holePosition.x + holeOptions.radius, holePosition.y));
        pathBuilder.addCommand(new SVG.ZCommand());

        return pathBuilder.toString();
    }
}