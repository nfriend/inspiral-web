/// <reference path='../definitions/references.d.ts' />

module Spirograph.Shapes {
    'use strict';

    export interface Rotater {
        rotate(...any): TransformInfo;
    }
} 