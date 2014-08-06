/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Interaction) {
        'use strict';

        var lastMouseAngle = null, lastAbsoluteMouseAngle = 0, rotationOffset = 0, previousTransformInfo = null;

        function attachDragHandlers(svgContainer, rotatingGear, canvas, rotater, rotatingGearOptions, holeOptions, cursorTracker) {
            var ctx = canvas.getContext('2d');

            function attachHandlersToRotatingGear() {
                rotatingGear.on("mousedown", function (d, i) {
                    Spirograph.EventAggregator.publish('dragStart');
                    rotatingGear.classed('dragging', true);
                    svgContainer.on("mousemove", moveGear);
                    svgContainer.on("mouseup", function () {
                        Spirograph.EventAggregator.publish('dragEnd');
                        svgContainer.on("mousemove", null);
                        rotatingGear.classed('dragging', false);
                        d3.event.preventDefault();
                        cursorTracker.style('visibility', 'hidden');
                        return false;
                    });
                    cursorTracker.style('visibility', 'visible');
                    updateCursorTrackerLocation();
                    d3.event.preventDefault();
                    return false;
                });
            }

            function updateCursorTrackerLocation() {
                if (Spirograph.browser.browser === 0 /* Chrome */) {
                    cursorTracker.attr({
                        x2: d3.mouse(svgContainer.node())[0] / Spirograph.scaleFactor,
                        y2: d3.mouse(svgContainer.node())[1] / Spirograph.scaleFactor
                    });
                } else {
                    cursorTracker.attr({
                        x2: d3.mouse(svgContainer.node())[0],
                        y2: d3.mouse(svgContainer.node())[1]
                    });
                }
            }
            ;

            attachHandlersToRotatingGear();

            function moveGear(angle) {
                // if an angle is passed in, we use that to position the gear
                // otherwise we use the mouse coordinates from the d3 event
                if (typeof angle !== 'undefined') {
                    var mouseAngle = angle;

                    // get mouseAngle between -180 and 180
                    mouseAngle = (((mouseAngle % 360) + 360) % 360);
                    mouseAngle = mouseAngle > 180 ? -360 + mouseAngle : mouseAngle;
                } else {
                    // chrome handles CSS3 transformed SVG elementes differently - to get
                    // accurate mouse coordinates, we need to multiple by the current scale factor
                    if (Spirograph.browser.browser === 0 /* Chrome */) {
                        var mouseCoords = Spirograph.Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0] / Spirograph.scaleFactor, y: d3.mouse(svgContainer.node())[1] / Spirograph.scaleFactor }, { x: Spirograph.svgWidth, y: Spirograph.svgHeight });
                    } else {
                        var mouseCoords = Spirograph.Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0], y: d3.mouse(svgContainer.node())[1] }, { x: Spirograph.svgWidth, y: Spirograph.svgHeight });
                    }

                    updateCursorTrackerLocation();
                    var mouseAngle = Spirograph.Utility.toDegrees(Math.atan2(mouseCoords.y, mouseCoords.x));

                    d3.event.preventDefault();
                }

                if (lastMouseAngle != null) {
                    if (lastMouseAngle < -90 && mouseAngle > 90) {
                        rotationOffset--;
                    } else if (lastMouseAngle > 90 && mouseAngle < -90) {
                        rotationOffset++;
                    }
                }

                lastMouseAngle = mouseAngle;
                mouseAngle += (rotationOffset * 360);

                var angleDelta = mouseAngle - lastAbsoluteMouseAngle;

                for (var i = lastAbsoluteMouseAngle; (angleDelta >= 0 && i <= mouseAngle) || (angleDelta < 0 && i >= mouseAngle); angleDelta >= 0 ? i++ : i--) {
                    var transformInfo = rotater.rotate(rotatingGearOptions, i, holeOptions);
                    rotatingGear.attr("transform", "translate(" + transformInfo.x + "," + transformInfo.y + ") rotate(" + transformInfo.angle + ")");

                    if (previousTransformInfo !== null) {
                        var previousCanvasPenCoords = Spirograph.Utility.svgToCanvasCoords({ x: previousTransformInfo.penX, y: previousTransformInfo.penY });
                        var currentCanvasPenCoords = Spirograph.Utility.svgToCanvasCoords({ x: transformInfo.penX, y: transformInfo.penY });

                        ctx.beginPath();
                        ctx.moveTo(previousCanvasPenCoords.x, previousCanvasPenCoords.y);
                        ctx.lineTo(currentCanvasPenCoords.x, currentCanvasPenCoords.y);
                        ctx.stroke();
                        ctx.closePath();
                    }

                    previousTransformInfo = transformInfo;
                }

                lastAbsoluteMouseAngle = mouseAngle;
                return false;
            }
            ;

            Spirograph.EventAggregator.subscribe('holeSelected', function (hole) {
                previousTransformInfo = null;
                holeOptions = hole;
            });

            Spirograph.EventAggregator.subscribe('gearSelected', function (fixedOrRotating, gearType) {
                var gearSizes = [];
                for (var _i = 0; _i < (arguments.length - 2); _i++) {
                    gearSizes[_i] = arguments[_i + 2];
                }
                if (fixedOrRotating === 0 /* Fixed */) {
                    if (gearType === 2 /* Beam */) {
                        var newFixedOptions = (new Spirograph.Shapes.BeamOptionsFactory()).create(gearSizes[0], gearSizes[1]);
                        rotater = new Spirograph.Shapes.BeamRotater(newFixedOptions);
                    } else if (gearType === 0 /* Gear */) {
                        var newFixedOptions = (new Spirograph.Shapes.GearOptionsFactory()).create(gearSizes[0]);
                        rotater = new Spirograph.Shapes.GearRotater(newFixedOptions);
                    } else if (gearType === 1 /* RingGear */) {
                        var newFixedOptions = (new Spirograph.Shapes.RingGearOptionsFactory()).create(gearSizes[0], gearSizes[1]);
                        rotater = new Spirograph.Shapes.RingGearRotater(newFixedOptions);
                    }
                    Interaction.changeFixedGear(svgContainer, gearType, newFixedOptions);
                } else if (fixedOrRotating === 1 /* Rotating */) {
                    rotatingGearOptions = (new Spirograph.Shapes.GearOptionsFactory()).create(gearSizes[0]);
                    rotatingGear = Interaction.changeRotatingGear(svgContainer, rotatingGearOptions);
                    attachHandlersToRotatingGear();
                    holeOptions = Spirograph.Initialization.initializeHoles(rotatingGear, rotatingGearOptions, Interaction.getHoleSelection(gearSizes[0]));
                    Spirograph.Initialization.initializeHoleSelection();
                }

                previousTransformInfo = null;
                moveGear(lastMouseAngle);
            });

            Interaction.KeyboardShortcutManager.add(39 /* RightArrow */, function () {
                moveGear(lastAbsoluteMouseAngle - 29.253);
            });

            Interaction.KeyboardShortcutManager.add(40 /* DownArrow */, function () {
                moveGear(lastAbsoluteMouseAngle - 29.253);
            });

            Interaction.KeyboardShortcutManager.add(37 /* LeftArrow */, function () {
                moveGear(lastAbsoluteMouseAngle + 29.253);
            });

            Interaction.KeyboardShortcutManager.add(38 /* UpArrow */, function () {
                moveGear(lastAbsoluteMouseAngle + 29.253);
            });

            // initialize the posiiton of the gear
            moveGear(0);
        }
        Interaction.attachDragHandlers = attachDragHandlers;
    })(Spirograph.Interaction || (Spirograph.Interaction = {}));
    var Interaction = Spirograph.Interaction;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=gear-drag.js.map
