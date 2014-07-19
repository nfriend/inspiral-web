/// <reference path='../definitions/references.d.ts' />

module Spirograph.SVG {
    export class ACommand implements PathCommand {
        radiusX: number;
        radiusY: number;
        xAxisRotation: number;
        largeArc: boolean;
        sweep: boolean;
        x: number;
        y: number;

        constructor(radiusX: number, radiusY: number, xAxisRotation: number, largeArc: boolean, sweep: boolean, x: number, y: number) {
            this.radiusX = radiusX;
            this.radiusY = radiusY;
            this.xAxisRotation = xAxisRotation;
            this.largeArc = largeArc;
            this.sweep = sweep;
            this.x = x;
            this.y = y;
        }

        toString() {
            var parameters = [];
            parameters.push("A", this.radiusX, ' ', this.radiusY, ' ', this.xAxisRotation ? this.xAxisRotation : 0,
                ' ', this.largeArc ? 1 : 0, ' ', this.sweep ? 1 : 0, ' ', this.x, ' ', this.y);
            return parameters.join('');
        }
    }
}