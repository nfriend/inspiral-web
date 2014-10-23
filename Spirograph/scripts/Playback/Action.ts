/// <reference path='../definitions/references.d.ts' />

module Spirograph.Playback {
    'use strict';

    export enum ActionType {
        Scheduled,
        BackgroundColor,
        PenColor,
        RotatingGearType,
        FixedGearType,
        SelectedHole,
        GearAngle,
        ToothOffset,
        ZoomLevel
    }

    export interface Action {
        actionType: ActionType;
        timeStamp: Date;
        backgroundColor: UI.Color;
        penColor: UI.Color;
        rotatingGearType: Shapes.GearType;
        fixedGearType: Shapes.GearType;
        selectedHole: number;
        gearAngle: number;
        toothOffset: number;
        zoomLevel: number;
    }
} 