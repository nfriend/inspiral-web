/// <reference path='../definitions/references.d.ts' />
'use strict';
var InspiralWeb;
(function (InspiralWeb) {
    (function (Utility) {
        function changePenColorStyle(color) {
            $('.injected-style').remove();
            var div = $('<style class="injected-style">.inspiral-web .gear .gear-hole:hover { fill: ' + color + '; }</style>').appendTo("body");
        }
        Utility.changePenColorStyle = changePenColorStyle;
    })(InspiralWeb.Utility || (InspiralWeb.Utility = {}));
    var Utility = InspiralWeb.Utility;
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=injectStyle.js.map
