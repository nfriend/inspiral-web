/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        var BeamRotater = (function () {
            function BeamRotater(beamOptions) {
                this._teethBuffer = 2;
                this._beamOptions = beamOptions;
            }
            BeamRotater.prototype.rotate = function (gearOptions, mouseAngleAsDegrees, holeOptions) {
                var normalizedMouseAngleAsDegrees = (((mouseAngleAsDegrees % 360) + 360) % 360);
                normalizedMouseAngleAsDegrees = normalizedMouseAngleAsDegrees > 180 ? -360 + normalizedMouseAngleAsDegrees : normalizedMouseAngleAsDegrees;

                var radius = 2 * this._beamOptions.endCapsToothCount, beamToothCount = this._beamOptions.totalToothCount - this._beamOptions.endCapsToothCount, toothWidth = 2 * Math.PI * radius / this._beamOptions.endCapsToothCount, totalWidth = 2 * radius + toothWidth * (beamToothCount / 2), beamWidth = (this._beamOptions.totalToothCount - this._beamOptions.endCapsToothCount) / 2 * toothWidth, perimeter = 2 * Math.PI * radius + 2 * beamToothCount * toothWidth;

                $('#output').html(normalizedMouseAngleAsDegrees.toString());

                var gearX, gearY, gearRotation, penX, penY;

                if (normalizedMouseAngleAsDegrees >= -30 && normalizedMouseAngleAsDegrees <= 30) {
                    gearX = (radius + gearOptions.radius) * Math.cos(Spirograph.Utility.toRadians(normalizedMouseAngleAsDegrees * 3)) + (beamWidth / 2) + Spirograph.Utility.getCenterX();
                    gearY = -1 * (radius + gearOptions.radius) * Math.sin(Spirograph.Utility.toRadians(normalizedMouseAngleAsDegrees * 3)) + Spirograph.Utility.getCenterY();
                    gearRotation = 0;
                    penX = gearX;
                    penY = gearY;
                } else if (normalizedMouseAngleAsDegrees > 30 && normalizedMouseAngleAsDegrees < 150) {
                    gearX = -1 * ((normalizedMouseAngleAsDegrees - 90) / 60) * (beamWidth / 2) + Spirograph.Utility.getCenterX();
                    gearY = -1 * (radius + gearOptions.radius) + Spirograph.Utility.getCenterY();
                    gearRotation = 0;
                    penX = gearX;
                    penY = gearY;
                } else if (normalizedMouseAngleAsDegrees >= 150) {
                    gearX = -1 * (radius + gearOptions.radius) * Math.cos(Spirograph.Utility.toRadians((180 - normalizedMouseAngleAsDegrees) * 3)) - (beamWidth / 2) + Spirograph.Utility.getCenterX();
                    gearY = -1 * (radius + gearOptions.radius) * Math.sin(Spirograph.Utility.toRadians((180 - normalizedMouseAngleAsDegrees) * 3)) + Spirograph.Utility.getCenterY();
                    gearRotation = 0;
                    penX = gearX;
                    penY = gearY;
                } else if (normalizedMouseAngleAsDegrees <= -150) {
                    gearX = -1 * (radius + gearOptions.radius) * Math.cos(Spirograph.Utility.toRadians((-180 + normalizedMouseAngleAsDegrees) * 3)) - (beamWidth / 2) + Spirograph.Utility.getCenterX();
                    gearY = (radius + gearOptions.radius) * Math.sin(Spirograph.Utility.toRadians((-180 + normalizedMouseAngleAsDegrees) * 3)) + Spirograph.Utility.getCenterY();
                    gearRotation = 0;
                    penX = gearX;
                    penY = gearY;
                } else if (normalizedMouseAngleAsDegrees < -30 && normalizedMouseAngleAsDegrees > -150) {
                    gearX = ((normalizedMouseAngleAsDegrees + 90) / 60) * (beamWidth / 2) + Spirograph.Utility.getCenterX();
                    gearY = radius + gearOptions.radius + Spirograph.Utility.getCenterY();
                    gearRotation = 0;
                    penX = gearX;
                    penY = gearY;
                }

                //var radius = this._beamOptions.innerRadius - gearOptions.radius - this._teethBuffer;
                //var gearX = radius * Math.cos(Utility.toRadians(mouseAngleAsDegrees)) + Utility.getCenterX();
                //var gearY = -1 * radius * Math.sin(Utility.toRadians(mouseAngleAsDegrees)) + Utility.getCenterY();
                var gearRotation = -360 * (((mouseAngleAsDegrees / 360) * perimeter) / (2 * Math.PI * gearOptions.radius));

                //gearRotation -= mouseAngleAsDegrees;
                var penXModifer = holeOptions.positionRadius * Math.cos(Spirograph.Utility.toRadians(holeOptions.angle) + Spirograph.Utility.toRadians(gearRotation));
                var penYModifier = holeOptions.positionRadius * Math.sin(Spirograph.Utility.toRadians(holeOptions.angle) + Spirograph.Utility.toRadians(gearRotation));

                return {
                    x: gearX,
                    y: gearY,
                    angle: gearRotation,
                    penX: gearX + penXModifer,
                    penY: gearY + penYModifier
                };
            };
            return BeamRotater;
        })();
        Shapes.BeamRotater = BeamRotater;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=BeamRotater.js.map
