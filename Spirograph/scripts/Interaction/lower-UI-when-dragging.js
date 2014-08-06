/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Interaction) {
        (function (KeyboardShortcutManager) {
            'use strict';

            Spirograph.EventAggregator.subscribe('dragStart', function () {
                $('.lower-during-drag').css('z-index', -10);
            });

            Spirograph.EventAggregator.subscribe('dragEnd', function () {
                $('.lower-during-drag').css('z-index', 10);
            });
        })(Interaction.KeyboardShortcutManager || (Interaction.KeyboardShortcutManager = {}));
        var KeyboardShortcutManager = Interaction.KeyboardShortcutManager;
    })(Spirograph.Interaction || (Spirograph.Interaction = {}));
    var Interaction = Spirograph.Interaction;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=lower-UI-when-dragging.js.map
