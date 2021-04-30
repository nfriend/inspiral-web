/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    (function (UI) {
        'use strict';

        // download canvas as image functionality... not fully working yet
        $('#download-link').on('click', function (ev) {
            var link = ev.currentTarget;
            var data = document.getElementById('inspiral-web-canvas').toDataURL();
            ev.currentTarget.download = 'inspiral-web.png';
            window.location.href = data;
        });
    })(InspiralWeb.UI || (InspiralWeb.UI = {}));
    var UI = InspiralWeb.UI;
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=download-image.js.map
