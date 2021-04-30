/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Interaction;
    (function (Interaction) {
        'use strict';
        var body = d3.select('body'), lastMouseAngle = null, lastAbsoluteMouseAngle = 0, dragStartMouseAngle = null, rotationOffset = 0, previousTransformInfo = null, startingDragAngle = null, initialToothOffset = 0, center = { x: 0, y: 0 }, initialCenter, mousemoveCounter = 0, isShiftKeyPressed = false, isCtrlKeyPressed = false, isCmdKeyPressed = false, toothOffset = 0, lastKeyPress = new Date(2000, 1, 1), undoKeyPressDelay = 1000;
        function attachDragHandlers(svgContainer, rotatingGear, canvas, rotater, rotatingGearOptions, holeOptions, cursorTracker) {
            var ctx = canvas.getContext('2d');
            function attachHandlersToRotatingGear() {
                rotatingGear.on("mousedown", function (d, i) {
                    InspiralWeb.EventAggregator.publish('dragStart');
                    rotatingGear.classed('dragging', true);
                    setInitialCenter(lastMouseAngle);
                    mousemoveCounter = 0;
                    computeCenter(mousemoveCounter);
                    if (d3.event.ctrlKey || d3.event.metaKey) {
                        cursorTracker.style('visibility', 'hidden');
                        body.on("mousemove", rotateGearInPlace);
                        previousTransformInfo = null;
                    }
                    else {
                        Interaction.snapshot(canvas);
                        body.on("mousemove", moveGear);
                        if (InspiralWeb.isCursorTrackerVisible === true) {
                            cursorTracker.style('visibility', 'visible');
                        }
                        updateCursorTrackerLocation();
                    }
                    body.on("mouseup", function () {
                        InspiralWeb.EventAggregator.publish('dragEnd');
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
                if (InspiralWeb.browser.browser === InspiralWeb.Browser.Chrome || InspiralWeb.browser.browser === InspiralWeb.Browser.Safari || InspiralWeb.browser.browser === InspiralWeb.Browser.Opera) {
                    cursorTracker.attr({
                        x1: center.x,
                        y1: center.y,
                        x2: d3.mouse(svgContainer.node())[0] / InspiralWeb.scaleFactor,
                        y2: d3.mouse(svgContainer.node())[1] / InspiralWeb.scaleFactor
                    });
                }
                else if (InspiralWeb.browser.browser === InspiralWeb.Browser.Firefox) {
                    cursorTracker.attr({
                        x1: center.x,
                        y1: center.y,
                        x2: InspiralWeb.getSvgCenterX() + (d3.mouse(svgContainer.node())[0] - InspiralWeb.getSvgCenterX()) / InspiralWeb.scaleFactor,
                        y2: InspiralWeb.getSvgCenterY() + (d3.mouse(svgContainer.node())[1] - InspiralWeb.getSvgCenterY()) / InspiralWeb.scaleFactor
                    });
                }
                else {
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
                    }
                    else if (lastMouseAngle > 90 && mouseAngle < -90) {
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
                        var previousCanvasPenCoords = InspiralWeb.Utility.svgToCanvasCoords({ x: previousTransformInfo.penX, y: previousTransformInfo.penY });
                        var currentCanvasPenCoords = InspiralWeb.Utility.svgToCanvasCoords({ x: transformInfo.penX, y: transformInfo.penY });
                        if ((d3.event && !d3.event.shiftKey) || !isShiftKeyPressed) {
                            ctx.beginPath();
                            ctx.moveTo(previousCanvasPenCoords.x, previousCanvasPenCoords.y);
                            ctx.lineTo(currentCanvasPenCoords.x, currentCanvasPenCoords.y);
                            ctx.stroke();
                            ctx.closePath();
                            if (!InspiralWeb.isAnythingDrawn) {
                                InspiralWeb.EventAggregator.publish('canvasDrawn');
                            }
                            InspiralWeb.isAnythingDrawn = true;
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
                }
                else {
                    var mouseCoords = getNormalizedMouseCoords(center);
                    updateCursorTrackerLocation();
                    var mouseAngle = InspiralWeb.Utility.toDegrees(Math.atan2(mouseCoords.y, mouseCoords.x));
                    d3.event.preventDefault();
                }
                return mouseAngle;
            }
            function getNormalizedMouseCoords(center) {
                // webkit handles CSS3 transformed SVG elementes differently - to get
                // accurate mouse coordinates, we need to multiple by the current scale factor
                if (InspiralWeb.browser.browser === InspiralWeb.Browser.Chrome || InspiralWeb.browser.browser === InspiralWeb.Browser.Safari || InspiralWeb.browser.browser === InspiralWeb.Browser.Opera) {
                    var mouseCoords = InspiralWeb.Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0] / InspiralWeb.scaleFactor, y: d3.mouse(svgContainer.node())[1] / InspiralWeb.scaleFactor }, { x: InspiralWeb.svgWidth, y: InspiralWeb.svgHeight }, center);
                }
                else if (InspiralWeb.browser.browser === InspiralWeb.Browser.Firefox) {
                    var mouseCoords = InspiralWeb.Utility.toStandardCoords({
                        x: InspiralWeb.getSvgCenterX() + (d3.mouse(svgContainer.node())[0] - InspiralWeb.getSvgCenterX()) / InspiralWeb.scaleFactor,
                        y: InspiralWeb.getSvgCenterY() + (d3.mouse(svgContainer.node())[1] - InspiralWeb.getSvgCenterY()) / InspiralWeb.scaleFactor
                    }, { x: InspiralWeb.svgWidth, y: InspiralWeb.svgHeight }, center);
                }
                else {
                    var mouseCoords = InspiralWeb.Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0], y: d3.mouse(svgContainer.node())[1] }, { x: InspiralWeb.svgWidth, y: InspiralWeb.svgHeight }, center);
                }
                return mouseCoords;
            }
            function setInitialCenter(angle) {
                if (typeof angle === 'undefined' || angle === null) {
                    initialCenter = { x: InspiralWeb.getSvgCenterX(), y: InspiralWeb.getSvgCenterY() };
                }
                else {
                    var mouseCoords = getNormalizedMouseCoords();
                    initialCenter = { x: mouseCoords.x + (-1 * Math.cos(InspiralWeb.Utility.toRadians(angle)) * 150), y: mouseCoords.y + (-1 * Math.sin(InspiralWeb.Utility.toRadians(angle)) * 150) };
                }
            }
            function computeCenter(step) {
                var offsetConstant = 150;
                if (initialCenter && typeof step !== 'undefined' && step <= offsetConstant)
                    center = {
                        x: Math.round((initialCenter.x / offsetConstant) * (offsetConstant - step)) + InspiralWeb.getSvgCenterX(),
                        y: Math.round(-1 * (initialCenter.y / offsetConstant) * (offsetConstant - step)) + InspiralWeb.getSvgCenterY()
                    };
                else
                    center = { x: InspiralWeb.getSvgCenterX(), y: InspiralWeb.getSvgCenterY() };
            }
            //#region Subscribe to relevant EventAggregator events
            InspiralWeb.EventAggregator.subscribe('holeSelected', function (hole) {
                previousTransformInfo = null;
                holeOptions = hole;
            });
            InspiralWeb.EventAggregator.subscribe('gearSelected', function (fixedOrRotating, gearType) {
                var gearSizes = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    gearSizes[_i - 2] = arguments[_i];
                }
                if (fixedOrRotating === InspiralWeb.Shapes.GearRole.Fixed) {
                    if (gearType === InspiralWeb.Shapes.GearType.Beam) {
                        var newFixedOptions = (new InspiralWeb.Shapes.BeamOptionsFactory()).create(gearSizes[0], gearSizes[1]);
                        rotater = new InspiralWeb.Shapes.BeamRotater(newFixedOptions);
                    }
                    else if (gearType === InspiralWeb.Shapes.GearType.Gear) {
                        var newFixedOptions = (new InspiralWeb.Shapes.GearOptionsFactory()).create(gearSizes[0]);
                        rotater = new InspiralWeb.Shapes.GearRotater(newFixedOptions);
                    }
                    else if (gearType === InspiralWeb.Shapes.GearType.RingGear) {
                        var newFixedOptions = (new InspiralWeb.Shapes.RingGearOptionsFactory()).create(gearSizes[0], gearSizes[1]);
                        rotater = new InspiralWeb.Shapes.RingGearRotater(newFixedOptions);
                    }
                    Interaction.changeFixedGear(svgContainer, gearType, newFixedOptions);
                }
                else if (fixedOrRotating === InspiralWeb.Shapes.GearRole.Rotating) {
                    rotatingGearOptions = (new InspiralWeb.Shapes.GearOptionsFactory()).create(gearSizes[0]);
                    rotatingGear = Interaction.changeRotatingGear(svgContainer, rotatingGearOptions);
                    attachHandlersToRotatingGear();
                    holeOptions = InspiralWeb.Initialization.initializeHoles(rotatingGear, rotatingGearOptions, Interaction.getHoleSelection(gearSizes[0]));
                    InspiralWeb.Initialization.initializeHoleSelection();
                }
                toothOffset = 0;
                initialToothOffset = 0;
                previousTransformInfo = null;
                moveGear(lastMouseAngle);
            });
            //#endregion
            //#region Setup keyboard shortcuts
            Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.RightArrow, function () {
                checkKeypressDelayForUndo();
                moveGear(lastAbsoluteMouseAngle - 29.253);
            }, resetKeypressDelay);
            Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.DownArrow, function () {
                checkKeypressDelayForUndo();
                moveGear(lastAbsoluteMouseAngle - 29.253);
            }, resetKeypressDelay);
            Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.LeftArrow, function () {
                checkKeypressDelayForUndo();
                moveGear(lastAbsoluteMouseAngle + 29.253);
            }, resetKeypressDelay);
            Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.UpArrow, function () {
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
            Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Shift, function () {
                isShiftKeyPressed = true;
            }, function () {
                isShiftKeyPressed = false;
            });
            Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Ctrl, function () {
                isCtrlKeyPressed = true;
            }, function () {
                isCtrlKeyPressed = false;
            });
            Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Comma, function () {
                startingDragAngle = 0;
                rotateGearInPlace(360 / rotatingGearOptions.toothCount + .1);
                initialToothOffset = toothOffset;
                previousTransformInfo = null;
                startingDragAngle = null;
            });
            Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Period, function () {
                startingDragAngle = 0;
                rotateGearInPlace(-360 / rotatingGearOptions.toothCount + .1);
                initialToothOffset = toothOffset;
                previousTransformInfo = null;
                startingDragAngle = null;
            });
            Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Z, function (e) {
                if (e.ctrlKey || e.metaKey) {
                    if (e.shiftKey) {
                        Interaction.redo(canvas);
                    }
                    else {
                        Interaction.undo(canvas);
                    }
                }
            });
            Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Y, function (e) {
                if (e.ctrlKey || e.metaKey) {
                    Interaction.redo(canvas);
                }
            });
            //#endregion
            // initialize the posiiton of the gear
            moveGear(0);
        }
        Interaction.attachDragHandlers = attachDragHandlers;
    })(Interaction = InspiralWeb.Interaction || (InspiralWeb.Interaction = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=gear-drag.js.map