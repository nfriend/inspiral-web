/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.Shapes {

    var gearDefinitions: { [gearSize: number]: GearOptions; } = {};

    export class GearOptionsFactory {
        private _radiusMultiplier: number;

        constructor(radiusMultiplier: number = 1) {
            this._radiusMultiplier = radiusMultiplier;
        }

        create(toothCount: number): GearOptions {
            if (! (toothCount in gearDefinitions)) {
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
                toothHeight: gearOptions.toothHeight * this._radiusMultiplier,
            }
        }
    }

    gearDefinitions[24] = {
        radius: 48,
        toothCount: 24,
        toothHeight: 10,
        holeCount: 5,
        holeSweepAngle: 520,
        holePositionBuffer: 8,
        holeRadius: 5
    };

    gearDefinitions[32] = {
        radius: 64,
        toothCount: 32,
        toothHeight: 10,
        holeCount: 9,
        holeSweepAngle: 540,
        holePositionBuffer: 8,
        holeRadius: 5
    };

    gearDefinitions[60] = {
        radius: 120,
        toothCount: 60,
        toothHeight: 10,
        holeCount: 23,
        holeSweepAngle: 720,
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
}