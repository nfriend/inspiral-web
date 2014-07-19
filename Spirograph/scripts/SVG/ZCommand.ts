/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.SVG {
    export class ZCommand implements PathCommand {
        toString() {
            return "Z";
        }
    }
}