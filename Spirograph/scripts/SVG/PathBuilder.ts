/// <reference path='../definitions/references.d.ts' />

module Spirograph.SVG {
    'use strict';

    export class PathBuilder {

        private paths: any[];

        constructor() {
            this.paths = [];
        }

        addCommand(command: PathCommand) {
            this.paths.push(command);
        }

        addCommandString(command: string) {
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