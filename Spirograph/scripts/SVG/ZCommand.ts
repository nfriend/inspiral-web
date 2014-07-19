/// <reference path='../definitions/references.d.ts' />

module Spirograph.SVG {
    export class ZCommand implements PathCommand {
        toString() {
            return "Z";
        }
    }
}