/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        var _ringGearDefinitions = {};

        function _getKey(outerToothCount, innerToothCount) {
            return outerToothCount + "|" + innerToothCount;
        }

        var RingGearOptionsFactory = (function () {
            function RingGearOptionsFactory(radiusMultiplier) {
                if (typeof radiusMultiplier === "undefined") { radiusMultiplier = 1; }
                this._radiusMultiplier = radiusMultiplier;
            }
            RingGearOptionsFactory.prototype.create = function (outerToothCount, innerToothCount) {
                if (!(_getKey(outerToothCount, innerToothCount) in _ringGearDefinitions)) {
                    throw "No gear defined for outer tooth count of " + outerToothCount + " and inner tooth count of " + innerToothCount;
                }

                var ringGearOptions = _ringGearDefinitions[_getKey(outerToothCount, innerToothCount)];

                // clone the object with the radius altered based on the multiplier
                return {
                    innerRadius: ringGearOptions.innerRadius * this._radiusMultiplier,
                    innerToothCount: ringGearOptions.innerToothCount,
                    innerToothHeight: ringGearOptions.innerToothHeight * this._radiusMultiplier,
                    outerRadius: ringGearOptions.outerRadius * this._radiusMultiplier,
                    outerToothCount: ringGearOptions.outerToothCount,
                    outerToothHeight: ringGearOptions.outerToothHeight * this._radiusMultiplier
                };
            };
            return RingGearOptionsFactory;
        })();
        Shapes.RingGearOptionsFactory = RingGearOptionsFactory;

        _ringGearDefinitions["144|96"] = {
            innerRadius: 192,
            innerToothCount: 96,
            innerToothHeight: 10,
            outerRadius: 288,
            outerToothCount: 144,
            outerToothHeight: 10
        };

        _ringGearDefinitions["150|105"] = {
            innerRadius: 210,
            innerToothCount: 105,
            innerToothHeight: 10,
            outerRadius: 300,
            outerToothCount: 150,
            outerToothHeight: 10
        };
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=RingGearOptionsFactory.js.map
