/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Shapes;
    (function (Shapes) {
        'use strict';
        var _beamDefinitions = {};
        function _getKey(totalToothCount, endcapToothCount) {
            return totalToothCount + "|" + endcapToothCount;
        }
        var BeamOptionsFactory = /** @class */ (function () {
            function BeamOptionsFactory(radiusMultiplier) {
                if (radiusMultiplier === void 0) { radiusMultiplier = 1; }
                this._radiusMultiplier = radiusMultiplier;
            }
            BeamOptionsFactory.prototype.create = function (totalToothCount, endcapToothCount) {
                if (!(_getKey(totalToothCount, endcapToothCount) in _beamDefinitions)) {
                    throw "No beam defined for total tooth count " + totalToothCount + " and endcap tooth count of " + endcapToothCount;
                }
                var beamOptions = _beamDefinitions[_getKey(totalToothCount, endcapToothCount)];
                // clone the object with the radius altered based on the multiplier
                return {
                    endCapsToothCount: beamOptions.endCapsToothCount,
                    toothHeight: beamOptions.toothHeight,
                    totalToothCount: beamOptions.totalToothCount
                };
            };
            BeamOptionsFactory.prototype.createAllOptions = function () {
                var allGears = Array();
                for (var i in _beamDefinitions) {
                    allGears.push(_beamDefinitions[i]);
                }
                return allGears;
            };
            return BeamOptionsFactory;
        }());
        Shapes.BeamOptionsFactory = BeamOptionsFactory;
        _beamDefinitions['150|20'] = {
            endCapsToothCount: 20,
            toothHeight: 10,
            totalToothCount: 150
        };
        _beamDefinitions['144|20'] = {
            endCapsToothCount: 20,
            toothHeight: 10,
            totalToothCount: 144
        };
    })(Shapes = InspiralWeb.Shapes || (InspiralWeb.Shapes = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=BeamOptionsFactory.js.map