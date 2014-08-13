/// <reference path='../definitions/references.d.ts' />

module Spirograph.Interaction.KeyboardShortcutManager {
    'use strict';

    export enum Key {
        Enter = 13,
        Shift = 16,
        Ctrl = 17,
        Escape = 27,
        LeftArrow = 37,
        UpArrow = 38,
        RightArrow = 39,
        DownArrow = 40,
        Comma = 188,
        Period = 190
    };

    var keydownCallbacks: { [key: number]: Array<() => any>; } = {},
        keyupCallbacks: { [key: number]: Array<() => any>; } = {};

    export function add(key: Key, keydownCallback?: () => any, keyupCallback?: () => any) {
        if (!(<number>key in keydownCallbacks)) {
            keydownCallbacks[key] = new Array<() => any>();
        }
        if (!(<number>key in keyupCallbacks)) {
            keyupCallbacks[key] = new Array<() => any>();
        }

        if (keydownCallback)    
            keydownCallbacks[key].push(keydownCallback);

        if (keyupCallback)    
            keyupCallbacks[key].push(keyupCallback);
    }

    export function remove(key: Key, callback: () => any) {
        var keepGoing = true;
        while (keepGoing) {
            var indexToRemove = keydownCallbacks[key].indexOf(callback);
            if (indexToRemove !== -1) {
                keydownCallbacks[key].splice(indexToRemove, 1);
            } else {
                keepGoing = false;
            }
        }
    }

    (() => {
        $(window).on('keydown', (e) => {
            if (e.which in keydownCallbacks) {
                keydownCallbacks[e.which].forEach(callback => callback());
            }
        });

        $(window).on('keyup', (e) => {
            if (e.which in keyupCallbacks) {
                keyupCallbacks[e.which].forEach(callback => callback());
            }
        });
    })();

}