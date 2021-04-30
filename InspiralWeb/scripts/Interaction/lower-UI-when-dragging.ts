/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Interaction.KeyboardShortcutManager {
    'use strict';

    EventAggregator.subscribe('dragStart', () => {
        $('.lower-during-drag').css('z-index', -10);
    });

    EventAggregator.subscribe('dragEnd', () => {
        $('.lower-during-drag').css('z-index', 10);
    });
}
