/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (Utility) {
        function changePenColorStyle(color) {
            $('.injected-style').remove();
            var div = $('<style class="injected-style">.spirograph .gear .gear-hole:hover { fill: ' + color + '; }</style>').appendTo("body");
        }
        Utility.changePenColorStyle = changePenColorStyle;
    })(Spirograph.Utility || (Spirograph.Utility = {}));
    var Utility = Spirograph.Utility;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=changePenColorStyle.js.map
