/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (UI) {
        'use strict';

        // download canvas as image functionality... not fully working yet
        $('#download-link').on('click', function (ev) {
            var link = ev.currentTarget;
            var data = document.getElementById('spirograph-canvas').toDataURL();
            ev.currentTarget.download = 'spirograph.png';
            window.location.href = data;
        });
    })(Spirograph.UI || (Spirograph.UI = {}));
    var UI = Spirograph.UI;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=download-image.js.map
