/// <reference path='definitions/references.d.ts' />

module Spirograph {
    'use strict';

    var canvas = Initialization.initializeCanvas();
    var svgContainer = Initialization.initializeSvg();
    Initialization.initializeZoom(<HTMLCanvasElement>canvas.node(), <SVGElement>svgContainer.node());

    var rotatingGearOptions = (new Shapes.GearOptionsFactory(1)).create(64);
    var fixedGearOptions = (new Shapes.RingGearOptionsFactory(1)).create(144, 96);
    var fixedGear = Initialization.initializeFixedGear(svgContainer, fixedGearOptions);
    var rotatingGear = Initialization.initializeRotatingGear(svgContainer, rotatingGearOptions);
    var holeOptions = Initialization.initializeHoles(rotatingGear, rotatingGearOptions, defaults.holeIndex);
    var rotater: Shapes.Rotater = new Shapes.RingGearRotater(fixedGearOptions);

    Interaction.attachDragHandlers(svgContainer, rotatingGear, (<HTMLCanvasElement>canvas.node()), rotater, rotatingGearOptions, holeOptions);

    Initialization.initializeGearSelections();
    Initialization.initializeColorSelections();
    Initialization.initializeHoleSelection();
}