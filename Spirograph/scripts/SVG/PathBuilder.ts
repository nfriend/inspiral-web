/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.SVG {
    export class PathBuilder {

        private paths: Array<PathCommand>;

        constructor() {
            this.paths = [];
        }

        add(command: PathCommand) {
            this.paths.push(command);
        }

        toString() {
            var path = [];
            this.paths.forEach(p => {
                path.push(p.toString(), ' ');
            });
            return path.join('');
        }
    }
}