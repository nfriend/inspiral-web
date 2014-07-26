/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        'use strict';

        var gearDefinitions = {};

        var GearOptionsFactory = (function () {
            function GearOptionsFactory(radiusMultiplier) {
                if (typeof radiusMultiplier === "undefined") { radiusMultiplier = 1; }
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
                    holeRadius: gearOptions.holeRadius * this._radiusMultiplier,
                    holeSweepAngle: gearOptions.holeSweepAngle,
                    radius: gearOptions.radius * this._radiusMultiplier,
                    toothCount: gearOptions.toothCount,
                    toothHeight: gearOptions.toothHeight * this._radiusMultiplier
                };
            };

            GearOptionsFactory.prototype.createAllOptions = function () {
                var allGears = Array();
                for (var i in gearDefinitions) {
                    allGears.push(gearDefinitions[i]);
                }

                return allGears;
            };
            return GearOptionsFactory;
        })();
        Shapes.GearOptionsFactory = GearOptionsFactory;

        gearDefinitions[24] = {
            radius: 48,
            toothCount: 24,
            toothHeight: 10,
            holeCount: 5,
            holeSweepAngle: 520,
            holePositionBuffer: 8,
            holeRadius: 5
        };

        gearDefinitions[30] = {
            radius: 60,
            toothCount: 30,
            toothHeight: 10,
            holeCount: 9,
            holeSweepAngle: 520,
            holePositionBuffer: 8,
            holeRadius: 5
        };

        gearDefinitions[32] = {
            radius: 64,
            toothCount: 32,
            toothHeight: 10,
            holeCount: 9,
            holeSweepAngle: 600,
            holePositionBuffer: 8,
            holeRadius: 5
        };

        gearDefinitions[36] = {
            radius: 72,
            toothCount: 36,
            toothHeight: 10,
            holeCount: 11,
            holeSweepAngle: 720,
            holePositionBuffer: 8,
            holeRadius: 5
        };

        gearDefinitions[40] = {
            radius: 80,
            toothCount: 40,
            toothHeight: 10,
            holeCount: 13,
            holeSweepAngle: 720,
            holePositionBuffer: 8,
            holeRadius: 5
        };

        gearDefinitions[45] = {
            radius: 90,
            toothCount: 45,
            toothHeight: 10,
            holeCount: 16,
            holeSweepAngle: 720,
            holePositionBuffer: 10,
            holeRadius: 5
        };

        gearDefinitions[48] = {
            radius: 96,
            toothCount: 48,
            toothHeight: 10,
            holeCount: 17,
            holeSweepAngle: 900,
            holePositionBuffer: 10,
            holeRadius: 5
        };

        gearDefinitions[50] = {
            radius: 100,
            toothCount: 50,
            toothHeight: 10,
            holeCount: 18,
            holeSweepAngle: 900,
            holePositionBuffer: 10,
            holeRadius: 5
        };

        gearDefinitions[52] = {
            radius: 104,
            toothCount: 52,
            toothHeight: 10,
            holeCount: 19,
            holeSweepAngle: 990,
            holePositionBuffer: 13,
            holeRadius: 5
        };

        gearDefinitions[56] = {
            radius: 112,
            toothCount: 56,
            toothHeight: 10,
            holeCount: 21,
            holeSweepAngle: 900,
            holePositionBuffer: 13,
            holeRadius: 5
        };

        gearDefinitions[60] = {
            radius: 120,
            toothCount: 60,
            toothHeight: 10,
            holeCount: 23,
            holeSweepAngle: 900,
            holePositionBuffer: 15,
            holeRadius: 5
        };

        gearDefinitions[63] = {
            radius: 126,
            toothCount: 63,
            toothHeight: 10,
            holeCount: 25,
            holeSweepAngle: 900,
            holePositionBuffer: 15,
            holeRadius: 5
        };

        gearDefinitions[64] = {
            radius: 128,
            toothCount: 64,
            toothHeight: 10,
            holeCount: 25,
            holeSweepAngle: 900,
            holePositionBuffer: 15,
            holeRadius: 5
        };

        gearDefinitions[72] = {
            radius: 144,
            toothCount: 72,
            toothHeight: 10,
            holeCount: 29,
            holeSweepAngle: 900,
            holePositionBuffer: 15,
            holeRadius: 5
        };

        gearDefinitions[75] = {
            radius: 150,
            toothCount: 75,
            toothHeight: 10,
            holeCount: 31,
            holeSweepAngle: 900,
            holePositionBuffer: 15,
            holeRadius: 5
        };

        gearDefinitions[80] = {
            radius: 160,
            toothCount: 80,
            toothHeight: 10,
            holeCount: 33,
            holeSweepAngle: 900,
            holePositionBuffer: 15,
            holeRadius: 5
        };

        gearDefinitions[84] = {
            radius: 168,
            toothCount: 84,
            toothHeight: 10,
            holeCount: 35,
            holeSweepAngle: 900,
            holePositionBuffer: 15,
            holeRadius: 5
        };
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=GearOptionsFactory.js.map
