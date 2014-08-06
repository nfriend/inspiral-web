/// <reference path='definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    'use strict';

    var canvas = Spirograph.Initialization.initializeCanvas();
    var svgContainer = Spirograph.Initialization.initializeSvg();
    Spirograph.Initialization.initializeZoom(canvas.node(), svgContainer.node());

    var rotatingGearOptions = (new Spirograph.Shapes.GearOptionsFactory(1)).create(Spirograph.defaults.rotatingGearToothCount);
    var fixedGearOptions = (new Spirograph.Shapes.RingGearOptionsFactory(1)).create(Spirograph.defaults.fixedGearOuterToothCount, Spirograph.defaults.fixedGearInnerToothCount);
    var fixedGear = Spirograph.Initialization.initializeFixedGear(svgContainer, fixedGearOptions);
    var rotatingGear = Spirograph.Initialization.initializeRotatingGear(svgContainer, rotatingGearOptions);
    var holeOptions = Spirograph.Initialization.initializeHoles(rotatingGear, rotatingGearOptions, Spirograph.defaults.holeIndex);
    var rotater = new Spirograph.Shapes.RingGearRotater(fixedGearOptions);
    var cursorTracker = Spirograph.Initialization.initializeCursorTracker(svgContainer);

    Spirograph.Interaction.attachDragHandlers(svgContainer, rotatingGear, canvas.node(), rotater, rotatingGearOptions, holeOptions, cursorTracker);

    Spirograph.Initialization.initializeGearSelections();
    Spirograph.Initialization.initializeColorSelections();
    Spirograph.Initialization.initializeHoleSelection();
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=app.js.map
