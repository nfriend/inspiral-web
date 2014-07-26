/// <reference path='../definitions/references.d.ts' />

module Spirograph.Shapes {
    'use strict';

    export function RingGear(options: RingGearOptions) {
        if (!options.innerToothHeight) {
            options.innerToothHeight = 10;
        }
        if (!options.outerToothHeight) {
            options.outerToothHeight = 10;
        }

        var pathBuilder = new SVG.PathBuilder(),
            angle = 0,
            delta = 360 / options.outerToothCount;

        // draw the circle and outer teeth
        pathBuilder.addCommand(new SVG.MCommand(options.outerRadius - options.outerToothHeight, 0));
        for (var i = 0; i < options.outerToothCount; i++) {
            pathBuilder.addCommand(new SVG.ACommand(options.outerRadius - options.outerToothHeight, options.outerRadius - options.outerToothHeight, 0, false, true, (options.outerRadius - options.outerToothHeight) * Math.cos(Utility.toRadians(angle + delta * 1 / 6)), (options.outerRadius - options.outerToothHeight) * Math.sin(Utility.toRadians(angle + delta * 1 / 6))));
            pathBuilder.addCommand(new SVG.LCommand(options.outerRadius * Math.cos(Utility.toRadians(angle + delta * 1 / 2)), options.outerRadius * Math.sin(Utility.toRadians(angle + delta * 1 / 2))));
            pathBuilder.addCommand(new SVG.ACommand(options.outerRadius, options.outerRadius, 0, false, true, options.outerRadius * Math.cos(Utility.toRadians(angle + delta * 4 / 6)), options.outerRadius * Math.sin(Utility.toRadians(angle + delta * 4 / 6))));
            pathBuilder.addCommand(new SVG.LCommand((options.outerRadius - options.outerToothHeight) * Math.cos(Utility.toRadians(angle + delta)), (options.outerRadius - options.outerToothHeight) * Math.sin(Utility.toRadians(angle + delta))));
            angle += delta;
        }

        pathBuilder.addCommand(new SVG.ZCommand());

        angle = 0;
        delta = 360 / options.innerToothCount;
        
        // remove the center and draw the inner teeth
        pathBuilder.addCommand(new SVG.MCommand(options.innerRadius, 0));
        for (var i = 0; i < options.innerToothCount; i++) {
            pathBuilder.addCommand(new SVG.ACommand(options.innerRadius, options.innerRadius, 0, false, true, options.innerRadius * Math.cos(Utility.toRadians(angle + delta * 1 / 6)), options.innerRadius * Math.sin(Utility.toRadians(angle + delta * 1 / 6))));
            pathBuilder.addCommand(new SVG.LCommand((options.innerRadius + options.innerToothHeight) * Math.cos(Utility.toRadians(angle + delta * 1 / 2)), (options.innerRadius + options.innerToothHeight) * Math.sin(Utility.toRadians(angle + delta * 1 / 2))));
            pathBuilder.addCommand(new SVG.ACommand(options.innerRadius + options.innerToothHeight, options.innerRadius + options.innerToothHeight, 0, false, true, (options.innerRadius + options.innerToothHeight) * Math.cos(Utility.toRadians(angle + delta * 4 / 6)), (options.innerRadius + options.innerToothHeight) * Math.sin(Utility.toRadians(angle + delta * 4 / 6))));
            pathBuilder.addCommand(new SVG.LCommand(options.innerRadius * Math.cos(Utility.toRadians(angle + delta)), options.innerRadius * Math.sin(Utility.toRadians(angle + delta))));
            angle += delta;
        }

        pathBuilder.addCommand(new SVG.ZCommand());

        return pathBuilder.toString();
    }

    export interface RingGearOptions {
        innerRadius: number;
        innerToothHeight?: number;
        innerToothCount: number;
        outerRadius: number;
        outerToothHeight?: number;
        outerToothCount: number;
    }
}
