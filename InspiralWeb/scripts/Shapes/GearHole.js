/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Shapes;
    (function (Shapes) {
        'use strict';
        function GearHole(holeOptions) {
            var pathBuilder = new InspiralWeb.SVG.PathBuilder();
            var holePosition = {
                x: holeOptions.positionRadius * Math.cos(InspiralWeb.Utility.toRadians(holeOptions.angle)),
                y: holeOptions.positionRadius * Math.sin(InspiralWeb.Utility.toRadians(holeOptions.angle))
            };
            pathBuilder.addCommand(new InspiralWeb.SVG.MCommand(holePosition.x + holeOptions.radius, holePosition.y));
            pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(holeOptions.radius, holeOptions.radius, 0, true, false, holePosition.x - holeOptions.radius, holePosition.y));
            pathBuilder.addCommand(new InspiralWeb.SVG.ACommand(holeOptions.radius, holeOptions.radius, 0, true, false, holePosition.x + holeOptions.radius, holePosition.y));
            pathBuilder.addCommand(new InspiralWeb.SVG.ZCommand());
            return pathBuilder.toString();
        }
        Shapes.GearHole = GearHole;
    })(Shapes = InspiralWeb.Shapes || (InspiralWeb.Shapes = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=GearHole.js.map