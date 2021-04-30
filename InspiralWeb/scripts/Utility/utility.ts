/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Utility {
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

    export function getAverage(values: Array<number>) : number {
        var total = 0;
        values.forEach(v => {
            total += v;
        });
        return total / values.length;
    }

    export function getRgbaString(r: number, g: number, b: number, a: number) : string {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    export function convertToHumanReadableDate(dateToConvert: Date) : string {
        var output = [];
        output.push(monthNames[dateToConvert.getMonth()]);
        output.push(dateToConvert.getDate() + ',');
        output.push(dateToConvert.getFullYear() + ',');
        var hours = dateToConvert.getHours() % 12;
        hours = hours === 0 ? 12 : hours;
        var minutes: any = (dateToConvert.getMinutes());
        minutes = minutes < 10 ? '0' + minutes : minutes;
        output.push(hours + ':' + minutes);
        output.push(dateToConvert.getHours() < 12 ? "AM" : "PM");
        return output.join(' ');
    }

    // from http://stackoverflow.com/a/11150727/1063392
    export function convertToMysqlFriendlyString(date: Date) : string {
        return date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
    }
}
