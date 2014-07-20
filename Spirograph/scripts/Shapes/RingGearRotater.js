/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        var RingGearRotater = (function () {
            function RingGearRotater(ringGearOptions) {
                this._teethBuffer = 2;
                this._ringGearOptions = ringGearOptions;
            }
            RingGearRotater.prototype.rotate = function (gearOptions, mouseAngleAsDegrees, holeOptions) {
                var radius = this._ringGearOptions.innerRadius - gearOptions.radius - this._teethBuffer;
                var gearX = radius * Math.cos(Spirograph.Utility.toRadians(mouseAngleAsDegrees)) + Spirograph.Utility.getCenterX();
                var gearY = -1 * radius * Math.sin(Spirograph.Utility.toRadians(mouseAngleAsDegrees)) + Spirograph.Utility.getCenterY();
                var gearRotation = 360 * (((mouseAngleAsDegrees / 360) * 2 * Math.PI * this._ringGearOptions.innerRadius) / (2 * Math.PI * gearOptions.radius));
                gearRotation -= mouseAngleAsDegrees;

                var penXModifer = holeOptions.holeRadius * Math.cos(Spirograph.Utility.toRadians(holeOptions.holeAngle) + Spirograph.Utility.toRadians(gearRotation));
                var penYModifier = holeOptions.holeRadius * Math.sin(Spirograph.Utility.toRadians(holeOptions.holeAngle) + Spirograph.Utility.toRadians(gearRotation));

                return {
                    x: gearX,
                    y: gearY,
                    angle: gearRotation,
                    penX: gearX + penXModifer,
                    penY: gearY + penYModifier
                };
            };
            return RingGearRotater;
        })();
        Shapes.RingGearRotater = RingGearRotater;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=RingGearRotater.js.map
