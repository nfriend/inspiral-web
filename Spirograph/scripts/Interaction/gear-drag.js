/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Interaction) {
        'use strict';

        var body = d3.select('body'), lastMouseAngle = null, lastAbsoluteMouseAngle = 0, dragStartMouseAngle = null, rotationOffset = 0, previousTransformInfo = null, startingDragAngle = null, initialToothOffset = 0, center = { x: 0, y: 0 }, initialCenter, mousemoveCounter = 0, isShiftKeyPressed = false, isCtrlKeyPressed = false, isCmdKeyPressed = false, toothOffset = 0, lastKeyPress = new Date(2000, 1, 1), undoKeyPressDelay = 1000;

        function attachDragHandlers(svgContainer, rotatingGear, canvas, rotater, rotatingGearOptions, holeOptions, cursorTracker) {
            var ctx = canvas.getContext('2d');

            function attachHandlersToRotatingGear() {
                rotatingGear.on("mousedown", function (d, i) {
                    Spirograph.EventAggregator.publish('dragStart');
                    rotatingGear.classed('dragging', true);
                    setInitialCenter(lastMouseAngle);
                    mousemoveCounter = 0;
                    computeCenter(mousemoveCounter);

                    if (d3.event.ctrlKey || d3.event.metaKey) {
                        cursorTracker.style('visibility', 'hidden');
                        body.on("mousemove", rotateGearInPlace);
                        previousTransformInfo = null;
                    } else {
                        Interaction.snapshot(canvas);
                        body.on("mousemove", moveGear);

                        if (Spirograph.isCursorTrackerVisible === true) {
                            cursorTracker.style('visibility', 'visible');
                        }
                        updateCursorTrackerLocation();
                    }

                    body.on("mouseup", function () {
                        Spirograph.EventAggregator.publish('dragEnd');
                        initialToothOffset = toothOffset;
                        body.on("mousemove", null);
                        rotatingGear.classed('dragging', false);
                        d3.event.preventDefault();
                        cursorTracker.style('visibility', 'hidden');
                        startingDragAngle = null;
                        return false;
                    });

                    d3.event.preventDefault();
                    return false;
                });
            }

            function updateCursorTrackerLocation() {
                if (Spirograph.browser.browser === 0 /* Chrome */ || Spirograph.browser.browser === 3 /* Safari */ || Spirograph.browser.browser === 4 /* Opera */) {
                    cursorTracker.attr({
                        x1: center.x,
                        y1: center.y,
                        x2: d3.mouse(svgContainer.node())[0] / Spirograph.scaleFactor,
                        y2: d3.mouse(svgContainer.node())[1] / Spirograph.scaleFactor
                    });
                } else if (Spirograph.browser.browser === 2 /* Firefox */) {
                    cursorTracker.attr({
                        x1: center.x,
                        y1: center.y,
                        x2: Spirograph.getSvgCenterX() + (d3.mouse(svgContainer.node())[0] - Spirograph.getSvgCenterX()) / Spirograph.scaleFactor,
                        y2: Spirograph.getSvgCenterY() + (d3.mouse(svgContainer.node())[1] - Spirograph.getSvgCenterY()) / Spirograph.scaleFactor
                    });
                } else {
                    cursorTracker.attr({
                        x1: center.x,
                        y1: center.y,
                        x2: d3.mouse(svgContainer.node())[0],
                        y2: d3.mouse(svgContainer.node())[1]
                    });
                }
            }
            ;

            attachHandlersToRotatingGear();

            function moveGear(angle) {
                if (!angle && dragStartMouseAngle === null)
                    dragStartMouseAngle = mouseAngle;
                mousemoveCounter++;

                computeCenter(mousemoveCounter);

                var mouseAngle = getAngle(angle, center);

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
                    var transformInfo = rotater.rotate(rotatingGearOptions, i, holeOptions, toothOffset);
                    rotatingGear.attr("transform", "translate(" + transformInfo.x + "," + transformInfo.y + ") rotate(" + transformInfo.angle + ")");

                    if (previousTransformInfo !== null) {
                        var previousCanvasPenCoords = Spirograph.Utility.svgToCanvasCoords({ x: previousTransformInfo.penX, y: previousTransformInfo.penY });
                        var currentCanvasPenCoords = Spirograph.Utility.svgToCanvasCoords({ x: transformInfo.penX, y: transformInfo.penY });

                        if ((d3.event && !d3.event.shiftKey) || !isShiftKeyPressed) {
                            ctx.beginPath();
                            ctx.moveTo(previousCanvasPenCoords.x, previousCanvasPenCoords.y);
                            ctx.lineTo(currentCanvasPenCoords.x, currentCanvasPenCoords.y);
                            ctx.stroke();
                            ctx.closePath();

                            if (!Spirograph.isAnythingDrawn) {
                                Spirograph.EventAggregator.publish('canvasDrawn');
                            }
                            Spirograph.isAnythingDrawn = true;
                        }
                    }

                    previousTransformInfo = transformInfo;
                }

                lastAbsoluteMouseAngle = mouseAngle;
                return false;
            }
            ;

            function rotateGearInPlace(angle) {
                if (previousTransformInfo !== null)
                    var mouseAngle = getAngle(angle, { x: previousTransformInfo.x, y: previousTransformInfo.y });
                else {
                    var tempTransformInfo = rotater.rotate(rotatingGearOptions, lastAbsoluteMouseAngle, holeOptions, toothOffset);
                    var mouseAngle = getAngle(angle, { x: tempTransformInfo.x, y: tempTransformInfo.y });
                }

                if (startingDragAngle === null)
                    startingDragAngle = mouseAngle;

                var delta = (((mouseAngle - startingDragAngle) % 360) + 360) % 360;
                toothOffset = (Math.floor(delta / (360 / rotatingGearOptions.toothCount)) + initialToothOffset) % rotatingGearOptions.toothCount;
                console.log(delta, mouseAngle, startingDragAngle);

                var transformInfo = rotater.rotate(rotatingGearOptions, lastAbsoluteMouseAngle, holeOptions, toothOffset);
                rotatingGear.attr("transform", "translate(" + transformInfo.x + "," + transformInfo.y + ") rotate(" + transformInfo.angle + ")");
            }

            // gets the normalized angle for computation, either from the mouse or from the parameter passed programatically
            function getAngle(angle, center) {
                // if an angle is passed in, we use that to position the gear
                // otherwise we use the mouse coordinates from the d3 event
                if (typeof angle !== 'undefined') {
                    var mouseAngle = angle;

                    // get mouseAngle between -180 and 180
                    mouseAngle = (((mouseAngle % 360) + 360) % 360);
                    mouseAngle = mouseAngle > 180 ? -360 + mouseAngle : mouseAngle;
                } else {
                    var mouseCoords = getNormalizedMouseCoords(center);

                    updateCursorTrackerLocation();
                    var mouseAngle = Spirograph.Utility.toDegrees(Math.atan2(mouseCoords.y, mouseCoords.x));

                    d3.event.preventDefault();
                }

                return mouseAngle;
            }

            function getNormalizedMouseCoords(center) {
                // webkit handles CSS3 transformed SVG elementes differently - to get
                // accurate mouse coordinates, we need to multiple by the current scale factor
                if (Spirograph.browser.browser === 0 /* Chrome */ || Spirograph.browser.browser === 3 /* Safari */ || Spirograph.browser.browser === 4 /* Opera */) {
                    var mouseCoords = Spirograph.Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0] / Spirograph.scaleFactor, y: d3.mouse(svgContainer.node())[1] / Spirograph.scaleFactor }, { x: Spirograph.svgWidth, y: Spirograph.svgHeight }, center);
                } else if (Spirograph.browser.browser === 2 /* Firefox */) {
                    var mouseCoords = Spirograph.Utility.toStandardCoords({
                        x: Spirograph.getSvgCenterX() + (d3.mouse(svgContainer.node())[0] - Spirograph.getSvgCenterX()) / Spirograph.scaleFactor,
                        y: Spirograph.getSvgCenterY() + (d3.mouse(svgContainer.node())[1] - Spirograph.getSvgCenterY()) / Spirograph.scaleFactor
                    }, { x: Spirograph.svgWidth, y: Spirograph.svgHeight }, center);
                } else {
                    var mouseCoords = Spirograph.Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0], y: d3.mouse(svgContainer.node())[1] }, { x: Spirograph.svgWidth, y: Spirograph.svgHeight }, center);
                }

                return mouseCoords;
            }

            function setInitialCenter(angle) {
                if (typeof angle === 'undefined' || angle === null) {
                    initialCenter = { x: Spirograph.getSvgCenterX(), y: Spirograph.getSvgCenterY() };
                } else {
                    var mouseCoords = getNormalizedMouseCoords();
                    initialCenter = { x: mouseCoords.x + (-1 * Math.cos(Spirograph.Utility.toRadians(angle)) * 150), y: mouseCoords.y + (-1 * Math.sin(Spirograph.Utility.toRadians(angle)) * 150) };
                }
            }

            function computeCenter(step) {
                var offsetConstant = 150;
                if (initialCenter && typeof step !== 'undefined' && step <= offsetConstant)
                    center = {
                        x: Math.round((initialCenter.x / offsetConstant) * (offsetConstant - step)) + Spirograph.getSvgCenterX(),
                        y: Math.round(-1 * (initialCenter.y / offsetConstant) * (offsetConstant - step)) + Spirograph.getSvgCenterY()
                    };
                else
                    center = { x: Spirograph.getSvgCenterX(), y: Spirograph.getSvgCenterY() };
            }

            //#region Subscribe to relevant EventAggregator events
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

                toothOffset = 0;
                initialToothOffset = 0;

                previousTransformInfo = null;
                moveGear(lastMouseAngle);
            });

            //#endregion
            //#region Setup keyboard shortcuts
            Interaction.KeyboardShortcutManager.add(39 /* RightArrow */, function () {
                checkKeypressDelayForUndo();
                moveGear(lastAbsoluteMouseAngle - 29.253);
            }, resetKeypressDelay);

            Interaction.KeyboardShortcutManager.add(40 /* DownArrow */, function () {
                checkKeypressDelayForUndo();
                moveGear(lastAbsoluteMouseAngle - 29.253);
            }, resetKeypressDelay);

            Interaction.KeyboardShortcutManager.add(37 /* LeftArrow */, function () {
                checkKeypressDelayForUndo();
                moveGear(lastAbsoluteMouseAngle + 29.253);
            }, resetKeypressDelay);

            Interaction.KeyboardShortcutManager.add(38 /* UpArrow */, function () {
                checkKeypressDelayForUndo();
                moveGear(lastAbsoluteMouseAngle + 29.253);
            }, resetKeypressDelay);

            function checkKeypressDelayForUndo() {
                if (+new Date() - +lastKeyPress > undoKeyPressDelay) {
                    Interaction.snapshot(canvas);
                }
                lastKeyPress = new Date();
            }

            function resetKeypressDelay() {
                lastKeyPress = new Date();
            }

            Interaction.KeyboardShortcutManager.add(16 /* Shift */, function () {
                isShiftKeyPressed = true;
            }, function () {
                isShiftKeyPressed = false;
            });

            Interaction.KeyboardShortcutManager.add(17 /* Ctrl */, function () {
                isCtrlKeyPressed = true;
            }, function () {
                isCtrlKeyPressed = false;
            });

            Interaction.KeyboardShortcutManager.add(188 /* Comma */, function () {
                startingDragAngle = 0;
                rotateGearInPlace(360 / rotatingGearOptions.toothCount + .1);
                initialToothOffset = toothOffset;
                previousTransformInfo = null;
                startingDragAngle = null;
            });

            Interaction.KeyboardShortcutManager.add(190 /* Period */, function () {
                startingDragAngle = 0;
                rotateGearInPlace(-360 / rotatingGearOptions.toothCount + .1);
                initialToothOffset = toothOffset;
                previousTransformInfo = null;
                startingDragAngle = null;
            });

            Interaction.KeyboardShortcutManager.add(90 /* Z */, function (e) {
                if (e.ctrlKey || e.metaKey) {
                    if (e.shiftKey) {
                        Interaction.redo(canvas);
                    } else {
                        Interaction.undo(canvas);
                    }
                }
            });

            Interaction.KeyboardShortcutManager.add(89 /* Y */, function (e) {
                if (e.ctrlKey || e.metaKey) {
                    Interaction.redo(canvas);
                }
            });

            //#endregion
            // initialize the posiiton of the gear
            moveGear(0);
        }
        Interaction.attachDragHandlers = attachDragHandlers;
    })(Spirograph.Interaction || (Spirograph.Interaction = {}));
    var Interaction = Spirograph.Interaction;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=gear-drag.js.map
