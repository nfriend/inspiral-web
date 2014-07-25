/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.Interaction.KeyboardShortcutManager {

    export enum Key {
        Enter = 13,
        Shift = 16,
        Ctrl = 17,
        Escape = 27,
        LeftArrow = 37,
        UpArrow = 38,
        RightArrow = 39,
        DownArrow = 40
    };

    var callbacks: { [key: number]: Array<() => any>; } = {};

    export function add(key: Key, callback: () => any) {
        if (!(<number>key in callbacks)) {
            callbacks[key] = new Array<() => any>();
        }
        callbacks[key].push(callback);
    }

    export function remove(key: Key, callback: () => any) {
        var keepGoing = true;
        while (keepGoing) {
            var indexToRemove = callbacks[key].indexOf(callback);
            if (indexToRemove !== -1) {
                callbacks[key].splice(indexToRemove, 1);
            } else {
                keepGoing = false;
            }
        }
    }

    (() => {
        $(window).on('keydown', (e) => {
            if (e.which in callbacks) {
                callbacks[e.which].forEach(callback => callback());
            }
        });
    })();

}