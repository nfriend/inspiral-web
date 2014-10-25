/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    export interface Color {
        r: number;
        g: number;
        b: number;
        a: number;
        bordered?: boolean;
    }

    var black: Color = {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    };

    var white: Color = {
        r: 255,
        g: 255,
        b: 255,
        a: 1
    };

    export var Color = {
        Black: black,
        White: white
    }
}