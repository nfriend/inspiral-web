/// <reference path='definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    'use strict';

    var canvas = Spirograph.Initialization.initializeCanvas();
    var svgContainer = Spirograph.Initialization.initializeSvg();
    Spirograph.Initialization.initializeZoom(canvas.node(), svgContainer.node());

    var rotatingGearOptions = (new Spirograph.Shapes.GearOptionsFactory(1)).create(64);
    var fixedGearOptions = (new Spirograph.Shapes.RingGearOptionsFactory(1)).create(144, 96);
    var fixedGear = Spirograph.Initialization.initializeFixedGear(svgContainer, fixedGearOptions);
    var rotatingGear = Spirograph.Initialization.initializeRotatingGear(svgContainer, rotatingGearOptions);
    var holeOptions = Spirograph.Initialization.initializeHoles(rotatingGear, rotatingGearOptions, Spirograph.defaults.holeIndex);
    var rotater = new Spirograph.Shapes.RingGearRotater(fixedGearOptions);

    //var rotater: Shapes.Rotater = new Shapes.BeamRotater(beamOptions);
    //var rotater: Shapes.Rotater = new Shapes.GearRotater(fixedGearOptions);
    Spirograph.Interaction.attachDragHandlers(svgContainer, rotatingGear, canvas.node(), rotater, rotatingGearOptions, holeOptions);

    Spirograph.Interaction.KeyboardShortcutManager.add(39 /* RightArrow */, function () {
        // add shortcut here
    });

    Spirograph.Initialization.initializeGearSelections();
    Spirograph.Initialization.initializeColorSelections();
    Spirograph.Initialization.initializeHoleSelection();
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=app.js.map
