/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.SVG {
    'use strict';

    export class LCommand implements PathCommand {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        toString() {
            var parameters = [];
            parameters.push('L', ' ', this.x, ' ', this.y);
            return parameters.join('');
        }
    }
}
