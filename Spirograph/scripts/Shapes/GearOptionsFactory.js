/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        var gearDefinitions = {};

        var GearOptionsFactory = (function () {
            function GearOptionsFactory(radiusMultiplier) {
                if (typeof radiusMultiplier === "undefined") { radiusMultiplier = 2; }
                this._radiusMultiplier = radiusMultiplier;
            }
            GearOptionsFactory.prototype.create = function (toothCount) {
                if (!(toothCount in gearDefinitions)) {
                    throw "No gear defined for tooth count of " + toothCount;
                }

                var gearOptions = gearDefinitions[toothCount];

                // clone the object with the radius altered based on the multiplier
                return {
                    holeCount: gearOptions.holeCount,
                    holePositionBuffer: gearOptions.holePositionBuffer,
                    holeRadius: gearOptions.holeRadius,
                    holeSweepAngle: gearOptions.holeSweepAngle,
                    radius: gearOptions.radius * this._radiusMultiplier,
                    toothCount: gearOptions.toothCount,
                    toothHeight: gearOptions.toothHeight
                };
            };
            return GearOptionsFactory;
        })();
        Shapes.GearOptionsFactory = GearOptionsFactory;

        gearDefinitions[24] = {
            radius: 24,
            toothCount: 24,
            toothHeight: 10,
            holeCount: 5,
            holeSweepAngle: 520,
            holePositionBuffer: 8
        };

        gearDefinitions[32] = {
            radius: 32,
            toothCount: 32,
            toothHeight: 10,
            holeCount: 9,
            holeSweepAngle: 540,
            holePositionBuffer: 8
        };

        gearDefinitions[60] = {
            radius: 60,
            toothCount: 60,
            toothHeight: 10,
            holeCount: 23,
            holeSweepAngle: 720,
            holePositionBuffer: 15
        };

        gearDefinitions[84] = {
            radius: 84,
            toothCount: 84,
            toothHeight: 10,
            holeCount: 35,
            holeSweepAngle: 900,
            holePositionBuffer: 15
        };
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=GearOptionsFactory.js.map
