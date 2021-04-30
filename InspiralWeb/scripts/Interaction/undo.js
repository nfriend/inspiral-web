/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    (function (Interaction) {
        'use strict';

        var pastSnapshots = [], futureSnapshots = [], historyMaxSize = 10;

        function snapshot(canvas) {
            pastSnapshots.push(canvas.toDataURL());
            if (pastSnapshots.length > historyMaxSize) {
                pastSnapshots.slice();
            }
            futureSnapshots = new Array();
        }
        Interaction.snapshot = snapshot;

        function undo(canvas) {
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (pastSnapshots.length > 0) {
                var image = new Image();
                var snapshotData = pastSnapshots.pop();
                futureSnapshots.push(snapshotData);
                image.src = snapshotData;
                canvas.getContext('2d').drawImage(image, 0, 0);
            }
        }
        Interaction.undo = undo;

        function redo(canvas) {
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (futureSnapshots.length > 0) {
                var image = new Image();
                var snapshotData = futureSnapshots.pop();
                pastSnapshots.push(snapshotData);
                image.src = snapshotData;
                canvas.getContext('2d').drawImage(image, 0, 0);
            }
        }
        Interaction.redo = redo;
    })(InspiralWeb.Interaction || (InspiralWeb.Interaction = {}));
    var Interaction = InspiralWeb.Interaction;
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=undo.js.map
