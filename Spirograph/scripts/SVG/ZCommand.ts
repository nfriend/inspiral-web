/// <reference path='../definitions/references.d.ts' />

module Spirograph.SVG {
    'use strict';

    export class ZCommand implements PathCommand {
        toString() {
            return "Z";
        }
    }
}