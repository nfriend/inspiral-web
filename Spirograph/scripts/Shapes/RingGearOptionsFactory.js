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
                if (typeof radiusMultiplier === "undefined") { radiusMultiplier = 2; }
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
                    innerToothHeight: ringGearOptions.innerToothHeight,
                    outerRadius: ringGearOptions.outerRadius * this._radiusMultiplier,
                    outerToothCount: ringGearOptions.outerToothCount,
                    outerToothHeight: ringGearOptions.outerToothHeight
                };
            };
            return RingGearOptionsFactory;
        })();
        Shapes.RingGearOptionsFactory = RingGearOptionsFactory;

        _ringGearDefinitions["144|96"] = {
            innerRadius: 96,
            innerToothCount: 96,
            innerToothHeight: 10,
            outerRadius: 144,
            outerToothCount: 144,
            outerToothHeight: 10
        };

        _ringGearDefinitions["150|105"] = {
            innerRadius: 96,
            innerToothCount: 96,
            innerToothHeight: 10,
            outerRadius: 144,
            outerToothCount: 144,
            outerToothHeight: 10
        };
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=RingGearOptionsFactory.js.map
