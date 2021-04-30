/// <reference path='definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    'use strict';
    var canvas = InspiralWeb.Initialization.initializeCanvas();
    var svgContainer = InspiralWeb.Initialization.initializeSvg();
    InspiralWeb.Initialization.initializeZoom(canvas.node(), svgContainer.node());
    var rotatingGearOptions = (new InspiralWeb.Shapes.GearOptionsFactory(1)).create(InspiralWeb.defaults.rotatingGearToothCount);
    var fixedGearOptions = (new InspiralWeb.Shapes.RingGearOptionsFactory(1)).create(InspiralWeb.defaults.fixedGearOuterToothCount, InspiralWeb.defaults.fixedGearInnerToothCount);
    var fixedGear = InspiralWeb.Initialization.initializeFixedGear(svgContainer, fixedGearOptions);
    var rotatingGear = InspiralWeb.Initialization.initializeRotatingGear(svgContainer, rotatingGearOptions);
    var holeOptions = InspiralWeb.Initialization.initializeHoles(rotatingGear, rotatingGearOptions, InspiralWeb.defaults.holeIndex);
    var rotater = new InspiralWeb.Shapes.RingGearRotater(fixedGearOptions);
    var cursorTracker = InspiralWeb.Initialization.initializeCursorTracker(svgContainer);
    InspiralWeb.Interaction.attachDragHandlers(svgContainer, rotatingGear, canvas.node(), rotater, rotatingGearOptions, holeOptions, cursorTracker);
    InspiralWeb.Initialization.initializeGearSelections();
    InspiralWeb.Initialization.initializeColorSelections();
    InspiralWeb.Initialization.initializeHoleSelection();
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=app.js.map