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
    var holeOptions = Initialization.initializeHoles(rotatingGear, rotatingGearOptions);
    var rotater: Shapes.Rotater = new Shapes.RingGearRotater(fixedGearOptions);

    //var rotater: Shapes.Rotater = new Shapes.BeamRotater(beamOptions);
    //var rotater: Shapes.Rotater = new Shapes.GearRotater(fixedGearOptions);

    Interaction.attachDragHandlers(svgContainer, rotatingGear, (<HTMLCanvasElement>canvas.node()), rotater, rotatingGearOptions, holeOptions);

    Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.RightArrow, () => {
        // add shortcut here
    });

    Initialization.initializeGearSelections();
    Initialization.initializeColorSelections();
    Initialization.initializeHoleSelection();
}