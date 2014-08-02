/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        'use strict';

        (function (GearRole) {
            GearRole[GearRole["Fixed"] = 0] = "Fixed";
            GearRole[GearRole["Rotating"] = 1] = "Rotating";
        })(Shapes.GearRole || (Shapes.GearRole = {}));
        var GearRole = Shapes.GearRole;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=GearRole.js.map
