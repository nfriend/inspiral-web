/// <reference path='../definitions/references.d.ts' />

module Spirograph.Shapes {
    export function Gear(options: GearOptions) {
        if (!options.toothHeight) {
            options.toothHeight = 10;
        }

        var outerRadius = options.radius + options.toothHeight,
            pathBuilder = new SVG.PathBuilder(),
            angle = 0,
            delta = 360 / options.toothCount;

        pathBuilder.add(new SVG.MCommand(options.radius, 0));
        for (var i = 0; i < options.toothCount; i++) {
            angle += delta;
            pathBuilder.add(new SVG.ACommand(options.radius, options.radius, 0, false, true, options.radius * Math.cos(Utility.toRadians(angle + delta * 1/3)), options.radius * Math.sin(Utility.toRadians(angle + delta * 1/3))));
            pathBuilder.add(new SVG.LCommand(outerRadius * Math.cos(Utility.toRadians(angle + delta * 1/2)), outerRadius * Math.sin(Utility.toRadians(angle + delta * 1/2))));
            pathBuilder.add(new SVG.ACommand(outerRadius, outerRadius, 0, false, true, outerRadius * Math.cos(Utility.toRadians(angle + delta * 5/6)), outerRadius * Math.sin(Utility.toRadians(angle + delta * 5/6))));
            pathBuilder.add(new SVG.LCommand(options.radius * Math.cos(Utility.toRadians(angle + delta)), options.radius * Math.sin(Utility.toRadians(angle + delta))));
        }
        //pathBuilder.add(new SVG.ZCommand());
        console.log(pathBuilder.toString());
        return pathBuilder.toString();
    }

    export interface GearOptions {
        // the radius of gear, NOT including the additional height of the teeth
        radius: number;
        toothHeight?: number;
        toothCount: number;
    }
}