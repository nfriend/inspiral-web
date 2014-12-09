/// <reference path='../definitions/references.d.ts' />

module Spirograph.Interaction {
    'use strict';

    var body = d3.select('body'),
        lastMouseAngle = null,
        lastAbsoluteMouseAngle = 0,
        dragStartMouseAngle: number = null,
        rotationOffset = 0,
        previousTransformInfo: Shapes.TransformInfo = null,
        startingDragAngle: number = null,
        initialToothOffset: number = 0,
        center: { x: number; y: number; } = { x: 0, y: 0 },
        initialCenter: { x: number; y: number },
        mousemoveCounter: number = 0,
        isShiftKeyPressed = false,
        isCtrlKeyPressed = false,
        isCmdKeyPressed = false,
        toothOffset: number = 0,
        lastKeyPress = new Date(2000, 1, 1),
        undoKeyPressDelay = 1000;

    export function attachDragHandlers(svgContainer: D3.Selection, rotatingGear: D3.Selection, canvas: HTMLCanvasElement, rotater: Shapes.Rotater,
        rotatingGearOptions: Shapes.GearOptions, holeOptions: Shapes.HoleOptions, cursorTracker: D3.Selection) {

        var ctx = canvas.getContext('2d');

        function attachHandlersToRotatingGear() {
            var rotatingGearOnStart = (d, i) => {
                EventAggregator.publish('dragStart');
                rotatingGear.classed('dragging', true);
                setInitialCenter(lastMouseAngle);
                mousemoveCounter = 0;
                computeCenter(mousemoveCounter);

                if ((<any>d3.event).ctrlKey || (<any>d3.event).metaKey) {
                    cursorTracker.style('visibility', 'hidden');
                    body.on("mousemove", rotateGearInPlace);
                    body.on("touchmove", rotateGearInPlace);
                    previousTransformInfo = null;
                } else {
                    Interaction.snapshot(canvas);
                    body.on("mousemove", moveGear);
                    body.on("touchmove", moveGear);

                    if (isCursorTrackerVisible === true) {
                        cursorTracker.style('visibility', 'visible');
                    }
                    updateCursorTrackerLocation();
                }

                var bodyOnEnd = () => {
                    EventAggregator.publish('dragEnd');
                    initialToothOffset = toothOffset;
                    body.on("mousemove", null);
                    body.on("touchmove", null);
                    rotatingGear.classed('dragging', false);
                    d3.event.preventDefault();
                    cursorTracker.style('visibility', 'hidden');
                    startingDragAngle = null;
                    return false;
                }

                body.on("mouseup", bodyOnEnd);
                body.on("touchend", bodyOnEnd);

                d3.event.preventDefault()
                return false;
            }

            rotatingGear.on("mousedown", rotatingGearOnStart);
            rotatingGear.on("touchstart", rotatingGearOnStart);
        }

        function updateCursorTrackerLocation() {


            if (browser.browser === Browser.Chrome || browser.browser === Browser.Safari || browser.browser === Browser.Opera) {
                cursorTracker.attr({
                    x1: center.x,
                    y1: center.y,
                    x2: d3.mouse(svgContainer.node())[0] / scaleFactor,
                    y2: d3.mouse(svgContainer.node())[1] / scaleFactor
                });
            } else if (browser.browser === Browser.Firefox) {
                cursorTracker.attr({
                    x1: center.x,
                    y1: center.y,
                    x2: getSvgCenterX() + (d3.mouse(svgContainer.node())[0] - getSvgCenterX()) / scaleFactor,
                    y2: getSvgCenterY() + (d3.mouse(svgContainer.node())[1] - getSvgCenterY()) / scaleFactor
                });
            } else {
                cursorTracker.attr({
                    x1: center.x,
                    y1: center.y,
                    x2: d3.mouse(svgContainer.node())[0],
                    y2: d3.mouse(svgContainer.node())[1]
                });
            }
        };

        attachHandlersToRotatingGear();

        function moveGear(angle?: number) {

            if (!angle && dragStartMouseAngle === null)
                dragStartMouseAngle = mouseAngle; mousemoveCounter++;

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
                    var previousCanvasPenCoords = Utility.svgToCanvasCoords({ x: previousTransformInfo.penX, y: previousTransformInfo.penY });
                    var currentCanvasPenCoords = Utility.svgToCanvasCoords({ x: transformInfo.penX, y: transformInfo.penY });

                    if ((d3.event && !(<any>d3.event).shiftKey) || !isShiftKeyPressed) {
                        ctx.beginPath();
                        ctx.moveTo(previousCanvasPenCoords.x, previousCanvasPenCoords.y);
                        ctx.lineTo(currentCanvasPenCoords.x, currentCanvasPenCoords.y);
                        ctx.stroke();
                        ctx.closePath();

                        if (!Spirograph.isAnythingDrawn) {
                            EventAggregator.publish('canvasDrawn');
                        }
                        Spirograph.isAnythingDrawn = true;
                    }
                }

                previousTransformInfo = transformInfo;
            }

            lastAbsoluteMouseAngle = mouseAngle;
            return false;
        };

        function rotateGearInPlace(angle?: number) {
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
        function getAngle(angle?: number, center?: { x: number; y: number }) {
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
                var mouseAngle = Utility.toDegrees(Math.atan2(mouseCoords.y, mouseCoords.x));

                d3.event.preventDefault();
            }

            return mouseAngle;
        }

        function getNormalizedMouseCoords(center?: { x: number; y: number }) {
            // webkit handles CSS3 transformed SVG elementes differently - to get
            // accurate mouse coordinates, we need to multiple by the current scale factor
            if (browser.browser === Browser.Chrome || browser.browser === Browser.Safari || browser.browser === Browser.Opera) {
                var mouseCoords = Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0] / scaleFactor, y: d3.mouse(svgContainer.node())[1] / scaleFactor }, { x: svgWidth, y: svgHeight }, center);
            } else if (browser.browser === Browser.Firefox) {
                var mouseCoords = Utility.toStandardCoords(
                    {
                        x: getSvgCenterX() + (d3.mouse(svgContainer.node())[0] - getSvgCenterX()) / scaleFactor,
                        y: getSvgCenterY() + (d3.mouse(svgContainer.node())[1] - getSvgCenterY()) / scaleFactor
                    }, { x: svgWidth, y: svgHeight }, center);
            } else {
                var mouseCoords = Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0], y: d3.mouse(svgContainer.node())[1] }, { x: svgWidth, y: svgHeight }, center);
            }

            return mouseCoords;
        }

        function setInitialCenter(angle: number) {
            if (typeof angle === 'undefined' || angle === null) {
                initialCenter = { x: getSvgCenterX(), y: getSvgCenterY() };
            } else {
                var mouseCoords = getNormalizedMouseCoords();
                initialCenter = { x: mouseCoords.x + (-1 * Math.cos(Utility.toRadians(angle)) * 150), y: mouseCoords.y + (-1 * Math.sin(Utility.toRadians(angle)) * 150) };
            }
        }

        function computeCenter(step: number) {
            var offsetConstant = 150;
            if (initialCenter && typeof step !== 'undefined' && step <= offsetConstant)
                center = {
                    x: Math.round((initialCenter.x / offsetConstant) * (offsetConstant - step)) + getSvgCenterX(),
                    y: Math.round(-1 * (initialCenter.y / offsetConstant) * (offsetConstant - step)) + getSvgCenterY()
                };
            else
                center = { x: getSvgCenterX(), y: getSvgCenterY() };
        }

        //#region Subscribe to relevant EventAggregator events
        EventAggregator.subscribe('holeSelected', (hole: Shapes.HoleOptions) => {
            previousTransformInfo = null;
            holeOptions = hole;
        });

        EventAggregator.subscribe('gearSelected', (fixedOrRotating: Shapes.GearRole, gearType: Shapes.GearType, ...gearSizes: number[]) => {

            if (fixedOrRotating === Shapes.GearRole.Fixed) {
                if (gearType === Shapes.GearType.Beam) {
                    var newFixedOptions: any = (new Shapes.BeamOptionsFactory()).create(gearSizes[0], gearSizes[1]);
                    rotater = new Shapes.BeamRotater(newFixedOptions);
                } else if (gearType === Shapes.GearType.Gear) {
                    var newFixedOptions: any = (new Shapes.GearOptionsFactory()).create(gearSizes[0]);
                    rotater = new Shapes.GearRotater(newFixedOptions);
                } else if (gearType === Shapes.GearType.RingGear) {
                    var newFixedOptions: any = (new Shapes.RingGearOptionsFactory()).create(gearSizes[0], gearSizes[1]);
                    rotater = new Shapes.RingGearRotater(newFixedOptions);
                }
                Interaction.changeFixedGear(svgContainer, gearType, newFixedOptions);
            } else if (fixedOrRotating === Shapes.GearRole.Rotating) {
                rotatingGearOptions = (new Shapes.GearOptionsFactory()).create(gearSizes[0]);
                rotatingGear = Interaction.changeRotatingGear(svgContainer, rotatingGearOptions);
                attachHandlersToRotatingGear();
                holeOptions = Initialization.initializeHoles(rotatingGear, rotatingGearOptions, Interaction.getHoleSelection(gearSizes[0]));
                Initialization.initializeHoleSelection();
            }

            toothOffset = 0;
            initialToothOffset = 0;

            previousTransformInfo = null;
            moveGear(lastMouseAngle);
        });
        //#endregion

        //#region Setup keyboard shortcuts
        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.RightArrow, () => {
            checkKeypressDelayForUndo();
            moveGear(lastAbsoluteMouseAngle - 29.253);
        }, resetKeypressDelay);

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.DownArrow, () => {
            checkKeypressDelayForUndo();
            moveGear(lastAbsoluteMouseAngle - 29.253);
        }, resetKeypressDelay);

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.LeftArrow, () => {
            checkKeypressDelayForUndo();
            moveGear(lastAbsoluteMouseAngle + 29.253);
        }, resetKeypressDelay);

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.UpArrow, () => {
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

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Shift, () => {
            isShiftKeyPressed = true;
        }, () => {
                isShiftKeyPressed = false;
            });

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Ctrl, () => {
            isCtrlKeyPressed = true;
        }, () => {
                isCtrlKeyPressed = false;
            });

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Comma, () => {
            startingDragAngle = 0;
            rotateGearInPlace(360 / rotatingGearOptions.toothCount + .1);
            initialToothOffset = toothOffset;
            previousTransformInfo = null;
            startingDragAngle = null;
        });

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Period, () => {
            startingDragAngle = 0;
            rotateGearInPlace(-360 / rotatingGearOptions.toothCount + .1);
            initialToothOffset = toothOffset;
            previousTransformInfo = null;
            startingDragAngle = null;
        });

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Z, (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.shiftKey) {
                    Interaction.redo(canvas);
                } else {
                    Interaction.undo(canvas);
                }
            }
        });

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Y, (e) => {
            if (e.ctrlKey || e.metaKey) {
                Interaction.redo(canvas);
            }
        });
        //#endregion

        // initialize the posiiton of the gear
        moveGear(0);
    }
} 