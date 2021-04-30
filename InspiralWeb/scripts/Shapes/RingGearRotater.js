/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Shapes;
    (function (Shapes) {
        'use strict';
        var RingGearRotater = /** @class */ (function () {
            function RingGearRotater(ringGearOptions) {
                this._teethBuffer = 2;
                this._ringGearOptions = ringGearOptions;
            }
            RingGearRotater.prototype.rotate = function (gearOptions, mouseAngleAsDegrees, holeOptions, toothOffset) {
                var radius = this._ringGearOptions.innerRadius - gearOptions.radius - this._teethBuffer;
                var gearX = radius * Math.cos(InspiralWeb.Utility.toRadians(mouseAngleAsDegrees)) + InspiralWeb.getSvgCenterX();
                var gearY = -1 * radius * Math.sin(InspiralWeb.Utility.toRadians(mouseAngleAsDegrees)) + InspiralWeb.getSvgCenterY();
                var gearRotation = 360 * (((mouseAngleAsDegrees / 360) * 2 * Math.PI * this._ringGearOptions.innerRadius) / (2 * Math.PI * gearOptions.radius));
                gearRotation -= mouseAngleAsDegrees;
                gearRotation += toothOffset * (-360 / gearOptions.toothCount);
                var penXModifer = holeOptions.positionRadius * Math.cos(InspiralWeb.Utility.toRadians(holeOptions.angle) + InspiralWeb.Utility.toRadians(gearRotation));
                var penYModifier = holeOptions.positionRadius * Math.sin(InspiralWeb.Utility.toRadians(holeOptions.angle) + InspiralWeb.Utility.toRadians(gearRotation));
                return {
                    x: gearX,
                    y: gearY,
                    angle: gearRotation,
                    penX: gearX + penXModifer,
                    penY: gearY + penYModifier
                };
            };
            return RingGearRotater;
        }());
        Shapes.RingGearRotater = RingGearRotater;
    })(Shapes = InspiralWeb.Shapes || (InspiralWeb.Shapes = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=RingGearRotater.js.map