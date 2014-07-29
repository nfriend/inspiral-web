/// <reference path='definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    'use strict';

    (function (FixedGearType) {
        FixedGearType[FixedGearType["Ring"] = 0] = "Ring";
        FixedGearType[FixedGearType["Beam"] = 1] = "Beam";
        FixedGearType[FixedGearType["Gear"] = 2] = "Gear";
    })(Spirograph.FixedGearType || (Spirograph.FixedGearType = {}));
    var FixedGearType = Spirograph.FixedGearType;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=fixed-gear-types.js.map
