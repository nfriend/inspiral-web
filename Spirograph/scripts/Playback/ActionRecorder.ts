/// <reference path='../definitions/references.d.ts' />


module Spirograph.Playback.ActionRecorder {
    'use strict';

    var actions: Array<Action> = [];
    var scheduledActionTimerID: number;
    var scheduleDelay = 1000;
    var isPaused = false;

    export function pushNewAction(actionType: ActionType) {
        if (isPaused) { unpauseRecording(); }

        clearTimeout(scheduledActionTimerID);
        scheduledActionTimerID = setTimeout(() => { pushNewAction(ActionType.Scheduled); }, scheduleDelay);

        var currentState = jQuery.extend(true, {}, Spirograph.state);
        var newAction: Action = currentState;
        newAction.actionType = actionType;
        newAction.timeStamp = new Date();

        actions.push(newAction);

        console.log('New ' + ActionType[actionType] + ' action added: ', newAction);

        // if the last 10 actions have been Scheduled actions, the user is probably inactive.  Pause
        // recording so we don't needlessly fill up memory
        if (actions.length > 9 && Enumerable.from(actions).skip(actions.length - 10).all((x) => { return x.actionType === ActionType.Scheduled; })) {
            pauseRecording();
        }
    }

    export function pauseRecording() {
        clearTimeout(scheduledActionTimerID);
        isPaused = true;
        console.log('Action recording paused');
    }

    export function unpauseRecording() {
        isPaused = false;
        // start the scheduled Actions again
        pushNewAction(ActionType.Scheduled);
        console.log('Action recording unpaused');
    }

    export function clearAllAction() {
        actions = [];
        console.log('Action recording cleared');
    }

    EventAggregator.subscribe('colorSelected', (r: number, g: number, b: number, a: number, foregroundOrBackground: string) => {
        if (foregroundOrBackground === 'background') {
            pushNewAction(ActionType.BackgroundColor);
        } else {
            pushNewAction(ActionType.PenColor);
        }
    });

    EventAggregator.subscribe('gearSelected', (fixedOrRotating: Shapes.GearRole, gearType: Shapes.GearType, ...gearSizes: number[]) => {
        if (fixedOrRotating === Shapes.GearRole.Fixed) {
            pushNewAction(ActionType.FixedGearType);
        } else {
            pushNewAction(ActionType.RotatingGearType);
        }
    });

    EventAggregator.subscribe('holeSelected', (hole: Shapes.HoleOptions) => {
        pushNewAction(ActionType.SelectedHole);
    });

    EventAggregator.subscribe('zoomed', (scaleFactor: number) => {
        pushNewAction(ActionType.ZoomLevel);
    });

    EventAggregator.subscribe('toothOffsetChanged', (toothOffset: number) => {
        pushNewAction(ActionType.ToothOffset);
    });

    EventAggregator.subscribe('rotationSwitched', () => {
        pushNewAction(ActionType.GearAngle);
    });

    // kick off the scheduled Actions
    pushNewAction(ActionType.Scheduled);
} 