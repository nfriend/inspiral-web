/// <reference path='../definitions/references.d.ts' />

module Spirograph.Playback {
    'use strict';

    var actions: Array<Action> = [];
    var scheduledActionTimerID: number;
    var scheduleDelay = 1000;
    var isPaused = false;

    export function pushNewAction(actionType: ActionType) {
        if (isPaused) {
            throw "Playback.pushNewAction() should not be called while recording is paused.";
        }

        clearTimeout(scheduledActionTimerID);
        scheduledActionTimerID = setTimeout(() => { pushNewAction(ActionType.Scheduled); }, scheduleDelay);

        var newAction: Action = {
            actionType: actionType,
            backgroundColor: { r: 255, g: 0, b: 0, a: 1 },
            fixedGearType: Shapes.GearType.Gear,
            rotatingGearType: Shapes.GearType.RingGear,
            gearAngle: 0,
            penColor: { r: 0, g: 255, b: 0, a: 1 },
            selectedHole: 3,
            timeStamp: new Date(),
            toothOffset: 4,
            zoomLevel: 3
        };
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

    // kick off the scheduled Actions
    pushNewAction(ActionType.Scheduled);
} 