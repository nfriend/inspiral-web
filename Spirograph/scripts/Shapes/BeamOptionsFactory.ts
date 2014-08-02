/// <reference path='../definitions/references.d.ts' />

module Spirograph.Shapes {
    'use strict';

    var _beamDefinitions: { [gearSizes: string]: BeamOptions; } = {};

    function _getKey(totalToothCount, endcapToothCount) {
        return totalToothCount + "|" + endcapToothCount;
    }

    export class BeamOptionsFactory {
        private _radiusMultiplier: number;

        constructor(radiusMultiplier: number = 1) {
            this._radiusMultiplier = radiusMultiplier;
        }

        create(totalToothCount: number, endcapToothCount: number): BeamOptions {
            if (!(_getKey(totalToothCount, endcapToothCount) in _beamDefinitions)) {
                throw "No beam defined for total tooth count " + totalToothCount + " and endcap tooth count of " + endcapToothCount;
            }

            var beamOptions = _beamDefinitions[_getKey(totalToothCount, endcapToothCount)];

            // clone the object with the radius altered based on the multiplier
            return {
                endCapsToothCount: beamOptions.endCapsToothCount,
                toothHeight: beamOptions.toothHeight,
                totalToothCount: beamOptions.totalToothCount
            }
        }

        createAllOptions(): Array<BeamOptions> {
            var allGears = Array<BeamOptions>();
            for (var i in _beamDefinitions) {
                allGears.push(_beamDefinitions[i]);
            }

            return allGears;
        }
    }

    _beamDefinitions['150|20'] = {
        endCapsToothCount: 20,
        toothHeight: 10,
        totalToothCount: 150
    }

    _beamDefinitions['144|20'] = {
        endCapsToothCount: 20,
        toothHeight: 10,
        totalToothCount: 144
    }
}