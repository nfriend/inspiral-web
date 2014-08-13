/// <reference path='../definitions/references.d.ts' />

module Spirograph.Shapes {
    'use strict';

    export class GearHoleGenerator {

        generate(options: GearOptions): Array<HoleOptions> {

            var returnHoleOptions = new Array<HoleOptions>(),
                holePositionRadiusDelta = (options.radius - 2 * options.holePositionBuffer) / options.holeCount,
                holeAngle = 0,
                holePositionRadius = options.radius - options.holePositionBuffer;

            // finds the average change in arc length that will be needed to evenly space the hole
            // a purely angle-based change results in the hole being wide apart at the edges of the gear and
            // scrunched near the center.
            // this assumes that the arc length decreases linearly, which is probably not right.  See the fudge factor below.
            var smallestArcLength = Math.PI * (2 * options.holePositionBuffer) * ((options.holeSweepAngle / options.holeCount) / 360);
            var largestArcLength = Math.PI * (2 * (options.radius - options.holePositionBuffer)) * ((options.holeSweepAngle / options.holeCount) / 360);
            // average the smallest and largest arc lengths
            var holeArcLengthDelta = (smallestArcLength + largestArcLength) / 2;

            //// run through the algorithm, see how far we are off, and adjust the holeArcLengthDelta accordingly.
            //// not the best way to correct this, but it works fairly well.
            //for (var i = 0; i < options.holeCount; i++) {
            //    holePositionRadius -= holePositionRadiusDelta;
            //    holeAngle += 360 * (holeArcLengthDelta / (Math.PI * 2 * holePositionRadius));
            //}

            //// adjust our initial guess
            //var fudgeFactor = options.holeSweepAngle / holeAngle;
            //holeArcLengthDelta *= fudgeFactor;
            //console.log("fudge factor: " + options.holeSweepAngle / holeAngle);

            //// reset the variables before we run through the algorithm for real
            //holeAngle = 0;
            //holePositionRadius = options.radius - options.holePositionBuffer;

            // compute the final location of the holes
            for (var i = 0; i < options.holeCount; i++) {
                returnHoleOptions.push({
                    angle: holeAngle,
                    positionRadius: holePositionRadius,
                    radius: options.holeRadius,
                });
                holePositionRadius -= holePositionRadiusDelta;
                holeAngle += 360 * (holeArcLengthDelta / (Math.PI * 2 * holePositionRadius));
            }

            return returnHoleOptions;
        }
    }
} 