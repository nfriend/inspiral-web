'use strict';

(function (spirograph, $, undefined) {

    spirograph.Gear = function (d) {
        var n = d.teeth,
            r2 = Math.abs(d.radius),
            r0 = r2 - (d.toothHeight ? d.toothHeight : 8),
            r1 = r2 + (d.toothHeight ? d.toothHeight : 8),
            r3 = 20,
            da = Math.PI / n,
            a0 = -Math.PI / 2 + (d.annulus ? Math.PI / n : 0),
            i = -1,
            path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
        while (++i < n) path.push(
            "A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
            //"L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
            "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
            "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
            //"L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0));
            "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0));
        path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
        return path.join("");
    }

}(window.spirograph = window.spirograph || {}, jQuery));