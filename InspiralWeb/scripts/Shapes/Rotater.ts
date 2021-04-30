/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Shapes {
    'use strict';

    export interface Rotater {
        rotate(...any): TransformInfo;
    }
}
