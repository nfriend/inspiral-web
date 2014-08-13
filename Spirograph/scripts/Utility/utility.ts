/// <reference path='../definitions/references.d.ts' />

module Spirograph.Utility {
    'use strict';

    export function toRadians(degrees: number) {
        return (degrees * Math.PI) / 180;
    }

    export function toDegrees(radians: number) {
        return (radians * 180) / Math.PI;
    }

    export function toStandardCoords(coords: { x: number; y: number }, size: { x: number; y: number }, center?: { x: number; y: number }) {
        if (!center) {
            var center = {
                x: size.x / 2,
                y: size.y / 2
            };
        }
        return {
            x: coords.x - center.x,
            y: -1 * (coords.y - center.y)
        };
    }

    export function svgToCanvasCoords(coords: { x: number; y: number }) {
        return {
            x: coords.x - (svgWidth - canvasWidth) / 2,
            y: coords.y - (svgHeight - canvasHeight) / 2
        }
    }

    export function getAverage(values: Array<number>) {
        var total = 0;
        values.forEach(v => {
            total += v;
        });
        return total / values.length;
    }

    export function getRgbaString(r: number, g: number, b: number, a: number) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }
} 