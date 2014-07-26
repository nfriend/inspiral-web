/// <reference path='../definitions/references.d.ts' />
'use strict'; 

module Spirograph.Utility {
    export function toRadians(degrees: number) {
        return (degrees * Math.PI) / 180;
    }

    export function toDegrees(radians: number) {
        return (radians * 180) / Math.PI;
    }

    export function toStandardCoords(coords: { x: number; y: number }, size: { x: number; y: number }) {
        return {
            x: coords.x - size.x / 2,
            y: -1 * (coords.y - size.y / 2)
        };
    }

    export function getCenterY() {
        return window.innerHeight / 2;
    }
   
    export function getCenterX() {
        return window.innerWidth / 2;
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