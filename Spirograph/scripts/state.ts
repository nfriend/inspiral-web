/// <reference path='definitions/references.d.ts' />

module Spirograph {
    'use strict';

    export interface State {
        backgroundColor: UI.Color;
        penColor: UI.Color;
        rotatingGearType: Shapes.GearType;
        rotatingGearSizes: number[];
        fixedGearType: Shapes.GearType;
        fixedGearSizes: number[];
        selectedHole: Shapes.HoleOptions;
        gearAngle: number;
        toothOffset: number;
        zoomLevel: number;
    }

    // tracks the global state of the app, used for recording snapshots for playback
    export var state: State = {
        backgroundColor: UI.Color.Black,
        penColor: UI.Color.White,
        rotatingGearType: Shapes.GearType.Gear,
        rotatingGearSizes: [],
        fixedGearType: Shapes.GearType.Gear,
        fixedGearSizes: [],
        selectedHole: { angle: 0, positionRadius: 0, radius: 0},
        gearAngle: 0,
        toothOffset: 0,
        zoomLevel: 0
    };

    EventAggregator.subscribe('colorSelected', (r: number, g: number, b: number, a: number, foregroundOrBackground: string) => {
        var newColor: UI.Color = { r: r, g: g, b: b, a: a };
        if (foregroundOrBackground === 'background') {
            state.backgroundColor = newColor;
        } else {
            state.penColor = newColor;
        }
    });

    EventAggregator.subscribe('gearSelected', (fixedOrRotating: Shapes.GearRole, gearType: Shapes.GearType, ...gearSizes: number[]) => {
        if (fixedOrRotating === Shapes.GearRole.Fixed) {
            state.fixedGearType = gearType;
            state.fixedGearSizes = gearSizes;
        } else {
            state.rotatingGearType = gearType;
            state.rotatingGearSizes = gearSizes;
        }
    });

    EventAggregator.subscribe('holeSelected', (hole: Shapes.HoleOptions) => {
        state.selectedHole = hole;
    });

    EventAggregator.subscribe('zoomed', (scaleFactor: number) => {
        state.zoomLevel = scaleFactor;
    });

    EventAggregator.subscribe('toothOffsetChanged', (toothOffset: number) => {
        state.toothOffset = toothOffset;
    });
}