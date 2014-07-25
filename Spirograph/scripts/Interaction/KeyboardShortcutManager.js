/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (Interaction) {
        (function (KeyboardShortcutManager) {
            (function (Key) {
                Key[Key["Enter"] = 13] = "Enter";
                Key[Key["Shift"] = 16] = "Shift";
                Key[Key["Ctrl"] = 17] = "Ctrl";
                Key[Key["Escape"] = 27] = "Escape";
                Key[Key["LeftArrow"] = 37] = "LeftArrow";
                Key[Key["UpArrow"] = 38] = "UpArrow";
                Key[Key["RightArrow"] = 39] = "RightArrow";
                Key[Key["DownArrow"] = 40] = "DownArrow";
            })(KeyboardShortcutManager.Key || (KeyboardShortcutManager.Key = {}));
            var Key = KeyboardShortcutManager.Key;
            ;

            var callbacks = {};

            function add(key, callback) {
                if (!(key in callbacks)) {
                    callbacks[key] = new Array();
                }
                callbacks[key].push(callback);
            }
            KeyboardShortcutManager.add = add;

            function remove(key, callback) {
                var keepGoing = true;
                while (keepGoing) {
                    var indexToRemove = callbacks[key].indexOf(callback);
                    if (indexToRemove !== -1) {
                        callbacks[key].splice(indexToRemove, 1);
                    } else {
                        keepGoing = false;
                    }
                }
            }
            KeyboardShortcutManager.remove = remove;

            (function () {
                $(window).on('keydown', function (e) {
                    if (e.which in callbacks) {
                        callbacks[e.which].forEach(function (callback) {
                            return callback();
                        });
                    }
                });
            })();
        })(Interaction.KeyboardShortcutManager || (Interaction.KeyboardShortcutManager = {}));
        var KeyboardShortcutManager = Interaction.KeyboardShortcutManager;
    })(Spirograph.Interaction || (Spirograph.Interaction = {}));
    var Interaction = Spirograph.Interaction;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=KeyboardShortcutManager.js.map
