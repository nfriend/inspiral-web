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

    export interface Action extends State {
        actionType: ActionType;
        timeStamp: Date;
    }
} 