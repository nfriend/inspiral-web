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
            pathBuilder.add(new SVG.ACommand(options.radius, options.radius, 0, false, true, options.radius * Math.cos(Utility.toRadians(angle + delta * 2/5)), options.radius * Math.sin(Utility.toRadians(angle + delta * 2/5))));
            pathBuilder.add(new SVG.LCommand(outerRadius * Math.cos(Utility.toRadians(angle + delta * 3/5)), outerRadius * Math.sin(Utility.toRadians(angle + delta * 3/5))));
            pathBuilder.add(new SVG.ACommand(outerRadius, outerRadius, 0, false, true, outerRadius * Math.cos(Utility.toRadians(angle + delta * 4/5)), outerRadius * Math.sin(Utility.toRadians(angle + delta * 4/5))));
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

//var n = options.toothCount,
//    r2 = Math.abs(options.radius),
//    r0 = r2 - 8,
//    r1 = r2 + 8,
//    r3 = 20,
//    da = Math.PI / n,
//    a0 = -Math.PI / 2,
//    i = -1,
//    path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
//while (++i < n) path.push(
//    "A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
//    "L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
//    "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
//    "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
//    "L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0),
//    "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0));
//path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
//return path.join("");