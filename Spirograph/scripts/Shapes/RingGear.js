/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        'use strict';

        function RingGear(options) {
            if (!options.innerToothHeight) {
                options.innerToothHeight = 10;
            }
            if (!options.outerToothHeight) {
                options.outerToothHeight = 10;
            }

            var pathBuilder = new Spirograph.SVG.PathBuilder(), angle = 0, delta = 360 / options.outerToothCount;

            // draw the circle and outer teeth
            pathBuilder.addCommand(new Spirograph.SVG.MCommand(options.outerRadius - options.outerToothHeight, 0));
            for (var i = 0; i < options.outerToothCount; i++) {
                pathBuilder.addCommand(new Spirograph.SVG.ACommand(options.outerRadius - options.outerToothHeight, options.outerRadius - options.outerToothHeight, 0, false, true, (options.outerRadius - options.outerToothHeight) * Math.cos(Spirograph.Utility.toRadians(angle + delta * 1 / 6)), (options.outerRadius - options.outerToothHeight) * Math.sin(Spirograph.Utility.toRadians(angle + delta * 1 / 6))));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand(options.outerRadius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 1 / 2)), options.outerRadius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 1 / 2))));
                pathBuilder.addCommand(new Spirograph.SVG.ACommand(options.outerRadius, options.outerRadius, 0, false, true, options.outerRadius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 4 / 6)), options.outerRadius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 4 / 6))));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand((options.outerRadius - options.outerToothHeight) * Math.cos(Spirograph.Utility.toRadians(angle + delta)), (options.outerRadius - options.outerToothHeight) * Math.sin(Spirograph.Utility.toRadians(angle + delta))));
                angle += delta;
            }

            pathBuilder.addCommand(new Spirograph.SVG.ZCommand());

            angle = 0;
            delta = 360 / options.innerToothCount;

            // remove the center and draw the inner teeth
            pathBuilder.addCommand(new Spirograph.SVG.MCommand(options.innerRadius, 0));
            for (var i = 0; i < options.innerToothCount; i++) {
                pathBuilder.addCommand(new Spirograph.SVG.ACommand(options.innerRadius, options.innerRadius, 0, false, true, options.innerRadius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 1 / 6)), options.innerRadius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 1 / 6))));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand((options.innerRadius + options.innerToothHeight) * Math.cos(Spirograph.Utility.toRadians(angle + delta * 1 / 2)), (options.innerRadius + options.innerToothHeight) * Math.sin(Spirograph.Utility.toRadians(angle + delta * 1 / 2))));
                pathBuilder.addCommand(new Spirograph.SVG.ACommand(options.innerRadius + options.innerToothHeight, options.innerRadius + options.innerToothHeight, 0, false, true, (options.innerRadius + options.innerToothHeight) * Math.cos(Spirograph.Utility.toRadians(angle + delta * 4 / 6)), (options.innerRadius + options.innerToothHeight) * Math.sin(Spirograph.Utility.toRadians(angle + delta * 4 / 6))));
                pathBuilder.addCommand(new Spirograph.SVG.LCommand(options.innerRadius * Math.cos(Spirograph.Utility.toRadians(angle + delta)), options.innerRadius * Math.sin(Spirograph.Utility.toRadians(angle + delta))));
                angle += delta;
            }

            pathBuilder.addCommand(new Spirograph.SVG.ZCommand());

            return pathBuilder.toString();
        }
        Shapes.RingGear = RingGear;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=RingGear.js.map
