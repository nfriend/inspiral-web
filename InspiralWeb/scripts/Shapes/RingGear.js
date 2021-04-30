/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Shapes;
    (function (Shapes) {
        'use strict';
        function RingGear(options) {
            if (!options.innerToothHeight) {
                options.innerToothHeight = 10;
            }
            if (!options.outerToothHeight) {
                options.outerToothHeight = 10;
            }
            var pathBuilder = new InspiralWeb.SVG.PathBuilder(), angle = 0, delta = 360 / options.outerToothCount;
            // draw the circle and outer teeth
            pathBuilder.addCommand(new InspiralWeb.SVG.MCommand(options.outerRadius - options.outerToothHeight, 0));
            for (var i = 0; i < options.outerToothCount; i++) {
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(options.outerRadius - options.outerToothHeight, options.outerRadius - options.outerToothHeight, 0, false, true, (options.outerRadius - options.outerToothHeight) * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 1 / 12)), (options.outerRadius - options.outerToothHeight) * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 1 / 12))));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand(options.outerRadius * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 5 / 12)), options.outerRadius * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 5 / 12))));
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(options.outerRadius, options.outerRadius, 0, false, true, options.outerRadius * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 7 / 12)), options.outerRadius * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 7 / 12))));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand((options.outerRadius - options.outerToothHeight) * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 11 / 12)), (options.outerRadius - options.outerToothHeight) * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 11 / 12))));
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(options.outerRadius - options.outerToothHeight, options.outerRadius - options.outerToothHeight, 0, false, true, (options.outerRadius - options.outerToothHeight) * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 12 / 12)), (options.outerRadius - options.outerToothHeight) * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 12 / 12))));
                angle += delta;
            }
            pathBuilder.addCommand(new InspiralWeb.SVG.ZCommand());
            angle = 0;
            delta = 360 / options.innerToothCount;
            // remove the center and draw the inner teeth
            pathBuilder.addCommand(new InspiralWeb.SVG.MCommand(options.innerRadius, 0));
            for (var i = 0; i < options.innerToothCount; i++) {
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(options.innerRadius, options.innerRadius, 0, false, true, options.innerRadius * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 1 / 12)), options.innerRadius * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 1 / 12))));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand((options.innerRadius + options.innerToothHeight) * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 5 / 12)), (options.innerRadius + options.innerToothHeight) * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 5 / 12))));
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(options.innerRadius + options.innerToothHeight, options.innerRadius + options.innerToothHeight, 0, false, true, (options.innerRadius + options.innerToothHeight) * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 7 / 12)), (options.innerRadius + options.innerToothHeight) * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 7 / 12))));
                pathBuilder.addCommand(new InspiralWeb.SVG.LCommand(options.innerRadius * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 11 / 12)), options.innerRadius * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 11 / 12))));
                pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(options.innerRadius, options.innerRadius, 0, false, true, options.innerRadius * Math.cos(InspiralWeb.Utility.toRadians(angle + delta * 12 / 12)), options.innerRadius * Math.sin(InspiralWeb.Utility.toRadians(angle + delta * 12 / 12))));
                angle += delta;
            }
            pathBuilder.addCommand(new InspiralWeb.SVG.ZCommand());
            return pathBuilder.toString();
        }
        Shapes.RingGear = RingGear;
    })(Shapes = InspiralWeb.Shapes || (InspiralWeb.Shapes = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=RingGear.js.map