/// <reference path='../definitions/references.d.ts' />

module Spirograph.Interaction {
    'use strict';

    var _lastSelectedMappings: { [gearSize: number]: number; } = {};

    export function saveHoleSelection(holeIndex: number, gearSize: number) {
        _lastSelectedMappings[gearSize] = holeIndex;
    }

    export function getHoleSelection(gearSize: number) {
        if (gearSize in _lastSelectedMappings) {
            return _lastSelectedMappings[gearSize];
        }
        else {
            return defaults.holeIndex;
        }
    }
} 