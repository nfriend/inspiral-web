/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        function Gear(options) {
            if (!options.toothHeight) {
                options.toothHeight = 10;
            }

            var outerRadius = options.radius + options.toothHeight, pathBuilder = new Spirograph.SVG.PathBuilder(), angle = 0, delta = 360 / options.toothCount;

            pathBuilder.add(new Spirograph.SVG.MCommand(options.radius, 0));
            for (var i = 0; i < options.toothCount; i++) {
                angle += delta;
                pathBuilder.add(new Spirograph.SVG.ACommand(options.radius, options.radius, 0, false, true, options.radius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 1 / 3)), options.radius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 1 / 3))));
                pathBuilder.add(new Spirograph.SVG.LCommand(outerRadius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 1 / 2)), outerRadius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 1 / 2))));
                pathBuilder.add(new Spirograph.SVG.ACommand(outerRadius, outerRadius, 0, false, true, outerRadius * Math.cos(Spirograph.Utility.toRadians(angle + delta * 5 / 6)), outerRadius * Math.sin(Spirograph.Utility.toRadians(angle + delta * 5 / 6))));
                pathBuilder.add(new Spirograph.SVG.LCommand(options.radius * Math.cos(Spirograph.Utility.toRadians(angle + delta)), options.radius * Math.sin(Spirograph.Utility.toRadians(angle + delta))));
            }

            //pathBuilder.add(new SVG.ZCommand());
            console.log(pathBuilder.toString());
            return pathBuilder.toString();
        }
        Shapes.Gear = Gear;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=Gear.js.map
