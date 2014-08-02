/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        'use strict';

        (function (GearType) {
            GearType[GearType["Gear"] = 0] = "Gear";
            GearType[GearType["RingGear"] = 1] = "RingGear";
            GearType[GearType["Beam"] = 2] = "Beam";
        })(Shapes.GearType || (Shapes.GearType = {}));
        var GearType = Shapes.GearType;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=GearType.js.map
