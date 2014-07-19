/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        function Gear(options) {
            var n = options.toothCount, r2 = Math.abs(options.radius), r0 = r2 - 8, r1 = r2 + 8, r3 = 20, da = Math.PI / n, a0 = -Math.PI / 2, i = -1, path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
            while (++i < n)
                path.push("A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0), "L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0), "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0), "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0), "L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0), "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0));
            path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
            return path.join("");
        }
        Shapes.Gear = Gear;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//spirograph.Gear = function (d) {
//    var toothCount = d.teeth,
//        // the radius of the gear, without the teeth
//        radius = Math.abs(d.radius),
//        // the radius of the tip of the teeth
//        toothradius = radius + (d.toothHeight ? d.toothHeight : 8);
//    //da = Math.PI / n;
//    var path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
//    for (var i = 0; i < toothCount; i++) {
//        path.push(
//            "A", radius, ",", radius, " 0 0 1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
//        //"L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
//            "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
//            "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
//        //"L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0));
//            "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)
//            );
//    }
//    path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
//    return path.join("");
//}
//# sourceMappingURL=Gear.js.map
