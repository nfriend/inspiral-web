/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Interaction;
    (function (Interaction) {
        var KeyboardShortcutManager;
        (function (KeyboardShortcutManager) {
            'use strict';
            InspiralWeb.EventAggregator.subscribe('dragStart', function () {
                $('.lower-during-drag').css('z-index', -10);
            });
            InspiralWeb.EventAggregator.subscribe('dragEnd', function () {
                $('.lower-during-drag').css('z-index', 10);
            });
        })(KeyboardShortcutManager = Interaction.KeyboardShortcutManager || (Interaction.KeyboardShortcutManager = {}));
    })(Interaction = InspiralWeb.Interaction || (InspiralWeb.Interaction = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=lower-UI-when-dragging.js.map