/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Interaction) {
        'use strict';

        var snapshots = [], currentSnapshot = 0, shouldSaveCurrentStateBeforeUndoing = true, historyMaxSize = 30;

        function snapshot(canvas) {
            // delete everything beyond our current snapshots
            snapshots.splice(currentSnapshot + 1, historyMaxSize);
            snapshots.push(canvas.toDataURL());
            if (snapshots.length > historyMaxSize) {
                snapshots.splice(0, 1);
            }
            currentSnapshot = snapshots.length > 0 ? snapshots.length - 1 : 0;
            shouldSaveCurrentStateBeforeUndoing = true;
        }
        Interaction.snapshot = snapshot;

        function goToSnapshot(canvas, snapshotIndex) {
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var image = new Image();
            var snapshotData = snapshots[snapshotIndex];
            image.src = snapshotData;
            canvas.getContext('2d').drawImage(image, 0, 0);
        }
        ;

        function undo(canvas) {
            if (currentSnapshot === snapshots.length - 1 && shouldSaveCurrentStateBeforeUndoing) {
                snapshot(canvas);
                shouldSaveCurrentStateBeforeUndoing = false;
            }

            currentSnapshot = currentSnapshot > 0 ? currentSnapshot - 1 : 0;
            goToSnapshot(canvas, currentSnapshot);
        }
        Interaction.undo = undo;

        function redo(canvas) {
            currentSnapshot = currentSnapshot < snapshots.length - 1 ? currentSnapshot + 1 : snapshots.length - 1;
            goToSnapshot(canvas, currentSnapshot);
        }
        Interaction.redo = redo;
    })(Spirograph.Interaction || (Spirograph.Interaction = {}));
    var Interaction = Spirograph.Interaction;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=undo-redo.js.map
