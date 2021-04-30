/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Interaction {
    'use strict';

    var snapshots: Array<string> = [],
        currentSnapshot: number = 0,
        shouldSaveCurrentStateBeforeUndoing = true,
        historyMaxSize = 30;

    export function snapshot(canvas: HTMLCanvasElement) {
        // delete everything beyond our current snapshots
        snapshots.splice(currentSnapshot + 1, historyMaxSize);
        snapshots.push(canvas.toDataURL());
        if (snapshots.length > historyMaxSize) {
            snapshots.splice(0, 1);
        }
        currentSnapshot = snapshots.length > 0 ? snapshots.length - 1 : 0;
        shouldSaveCurrentStateBeforeUndoing = true;

    }

    function goToSnapshot(canvas: HTMLCanvasElement, snapshotIndex: number) {
        var image = new Image();
        image.src = snapshots[snapshotIndex];
        image.onload = () => {
            var ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
        }
    };

    export function undo(canvas: HTMLCanvasElement) {
        if (currentSnapshot === snapshots.length - 1 && shouldSaveCurrentStateBeforeUndoing) {
            snapshot(canvas);
            shouldSaveCurrentStateBeforeUndoing = false;
        }

        currentSnapshot = currentSnapshot > 0 ? currentSnapshot - 1 : 0;
        goToSnapshot(canvas, currentSnapshot);
    }

    export function redo(canvas: HTMLCanvasElement) {
        currentSnapshot = currentSnapshot < snapshots.length - 1 ? currentSnapshot + 1 : snapshots.length - 1;
        goToSnapshot(canvas, currentSnapshot);
    }
}
