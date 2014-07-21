/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        function GearHole(holeOptions) {
            var pathBuilder = new Spirograph.SVG.PathBuilder();

            var holePosition = {
                x: holeOptions.positionRadius * Math.cos(Spirograph.Utility.toRadians(holeOptions.angle)),
                y: holeOptions.positionRadius * Math.sin(Spirograph.Utility.toRadians(holeOptions.angle))
            };

            pathBuilder.addCommand(new Spirograph.SVG.MCommand(holePosition.x + holeOptions.radius, holePosition.y));
            pathBuilder.addCommand(new Spirograph.SVG.ACommand(holeOptions.radius, holeOptions.radius, 0, true, false, holePosition.x - holeOptions.radius, holePosition.y));
            pathBuilder.addCommand(new Spirograph.SVG.ACommand(holeOptions.radius, holeOptions.radius, 0, true, false, holePosition.x + holeOptions.radius, holePosition.y));
            pathBuilder.addCommand(new Spirograph.SVG.ZCommand());

            return pathBuilder.toString();
        }
        Shapes.GearHole = GearHole;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=GearHole.js.map
