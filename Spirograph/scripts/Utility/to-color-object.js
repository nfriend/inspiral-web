/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Utility) {
        'use strict';

        // from http://snipplr.com/view/60570/get-rgba-values-as-an-object/
        function toColor(color) {
            var values = { r: null, g: null, b: null, a: null };
            if (typeof color == 'string') {
                /* hex */
                if (color.indexOf('#') === 0) {
                    color = color.substr(1);
                    if (color.length == 3)
                        values = {
                            r: parseInt(color[0] + color[0], 16),
                            g: parseInt(color[1] + color[1], 16),
                            b: parseInt(color[2] + color[2], 16),
                            a: 1
                        };
                    else
                        values = {
                            r: parseInt(color.substr(0, 2), 16),
                            g: parseInt(color.substr(2, 2), 16),
                            b: parseInt(color.substr(4, 2), 16),
                            a: 1
                        };
                    /* rgb */
                } else if (color.indexOf('rgb(') === 0) {
                    var pars = color.indexOf(',');
                    values = {
                        r: parseInt(color.substr(4, pars)),
                        g: parseInt(color.substr(pars + 1, color.indexOf(',', pars))),
                        b: parseInt(color.substr(color.indexOf(',', pars + 1) + 1, color.indexOf(')'))),
                        a: 1
                    };
                    /* rgba */
                } else if (color.indexOf('rgba(') === 0) {
                    var pars = color.indexOf(','), repars = color.indexOf(',', pars + 1);
                    values = {
                        r: parseInt(color.substr(5, pars)),
                        g: parseInt(color.substr(pars + 1, repars)),
                        b: parseInt(color.substr(color.indexOf(',', pars + 1) + 1, color.indexOf(',', repars))),
                        a: parseFloat(color.substr(color.indexOf(',', repars + 1) + 1, color.indexOf(')')))
                    };
                    /* verbous */
                } else {
                    var stdCol = {
                        acqua: '#0ff', teal: '#008080', blue: '#00f', navy: '#000080',
                        yellow: '#ff0', olive: '#808000', lime: '#0f0', green: '#008000',
                        fuchsia: '#f0f', purple: '#800080', red: '#f00', maroon: '#800000',
                        white: '#fff', gray: '#808080', silver: '#c0c0c0', black: '#000'
                    };
                    if (stdCol[color] != undefined)
                        values = toColor(stdCol[color]);
                }
            }
            return values;
        }
        Utility.toColor = toColor;
    })(Spirograph.Utility || (Spirograph.Utility = {}));
    var Utility = Spirograph.Utility;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=to-color-object.js.map
