/// <reference path='definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    'use strict';

    Spirograph.defaults = {
        rotatingGearToothCount: 52,
        holeIndex: 3,
        fixedGearType: 0 /* Ring */,
        fixedGearInnerToothCount: 96,
        fixedGearOuterToothCount: 144,
        foreground: {
            r: 255,
            g: 0,
            b: 0,
            a: .4
        },
        background: {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        }
    };
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=defaults.js.map
