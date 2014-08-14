/// <reference path='../definitions/references.d.ts' />

module Spirograph.Interaction {
    'use strict';

    var lastMouseAngle = null,
        lastAbsoluteMouseAngle = 0,
        rotationOffset = 0,
        previousTransformInfo: Shapes.TransformInfo = null,
        isPenDrawing = true,
        isGearRotatingInPlace = false,
        startingDragAngle: number = null,
        initialToothOffset: number = 0,
        toothOffset: number = 0;

    export function attachDragHandlers(svgContainer: D3.Selection, rotatingGear: D3.Selection, canvas: HTMLCanvasElement, rotater: Shapes.Rotater,
        rotatingGearOptions: Shapes.GearOptions, holeOptions: Shapes.HoleOptions, cursorTracker: D3.Selection) {

        var ctx = canvas.getContext('2d');

        function attachHandlersToRotatingGear() {
            rotatingGear.on("mousedown", function (d, i) {
                EventAggregator.publish('dragStart');
                rotatingGear.classed('dragging', true);

                if (isGearRotatingInPlace) {
                    svgContainer.on("mousemove", rotateGearInPlace);
                } else {
                    svgContainer.on("mousemove", moveGear);
                    cursorTracker.style('visibility', 'visible');
                    updateCursorTrackerLocation();
                }

                svgContainer.on("mouseup", () => {
                    EventAggregator.publish('dragEnd');
                    initialToothOffset = toothOffset;
                    svgContainer.on("mousemove", null);
                    rotatingGear.classed('dragging', false);
                    d3.event.preventDefault();
                    cursorTracker.style('visibility', 'hidden');
                    startingDragAngle = null;
                    return false;
                });

                d3.event.preventDefault()
                return false;
            });
        }

        function updateCursorTrackerLocation() {
            if (browser.browser === Browser.Chrome) {
                cursorTracker.attr({
                    x2: d3.mouse(svgContainer.node())[0] / scaleFactor,
                    y2: d3.mouse(svgContainer.node())[1] / scaleFactor
                });
            }
            else {
                cursorTracker.attr({
                    x2: d3.mouse(svgContainer.node())[0],
                    y2: d3.mouse(svgContainer.node())[1]
                });
            }
        };

        attachHandlersToRotatingGear();

        function moveGear(angle?: number) {
            var mouseAngle = getAngle(angle);

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

                    if (isPenDrawing) {
                        ctx.beginPath();
                        ctx.moveTo(previousCanvasPenCoords.x, previousCanvasPenCoords.y);
                        ctx.lineTo(currentCanvasPenCoords.x, currentCanvasPenCoords.y);
                        ctx.stroke();
                        ctx.closePath();
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
            console.log(delta, mouseAngle, startingDragAngle);

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
                // chrome handles CSS3 transformed SVG elementes differently - to get
                // accurate mouse coordinates, we need to multiple by the current scale factor
                if (browser.browser === Browser.Chrome) {
                    var mouseCoords = Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0] / scaleFactor, y: d3.mouse(svgContainer.node())[1] / scaleFactor }, { x: svgWidth, y: svgHeight }, center);
                } else {
                    var mouseCoords = Utility.toStandardCoords({ x: d3.mouse(svgContainer.node())[0], y: d3.mouse(svgContainer.node())[1] }, { x: svgWidth, y: svgHeight }, center);
                }

                updateCursorTrackerLocation();
                var mouseAngle = Utility.toDegrees(Math.atan2(mouseCoords.y, mouseCoords.x));

                d3.event.preventDefault();
            }

            return mouseAngle;
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
            moveGear(lastAbsoluteMouseAngle - 29.253);
        });

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.DownArrow, () => {
            moveGear(lastAbsoluteMouseAngle - 29.253);
        });

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.LeftArrow, () => {
            moveGear(lastAbsoluteMouseAngle + 29.253);
        });

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.UpArrow, () => {
            moveGear(lastAbsoluteMouseAngle + 29.253);
        });

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Shift, () => {
            isPenDrawing = false;
            previousTransformInfo = null;
        }, () => {
                isPenDrawing = true;
                previousTransformInfo = null;
            });

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Ctrl, () => {
            isGearRotatingInPlace = true;
            previousTransformInfo = null;
        }, () => {
                isGearRotatingInPlace = false;
                previousTransformInfo = null;
            });

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Comma, () => {
            startingDragAngle = null;
            rotateGearInPlace(360 / rotatingGearOptions.toothCount + .1);
            initialToothOffset = toothOffset;
            previousTransformInfo = null;
        });

        Interaction.KeyboardShortcutManager.add(Interaction.KeyboardShortcutManager.Key.Period, () => {
            startingDragAngle = null;
            rotateGearInPlace(-360 / rotatingGearOptions.toothCount + .1);
            initialToothOffset = toothOffset;
            previousTransformInfo = null;
        });
        //#endregion

        // initialize the posiiton of the gear
        moveGear(0);
    }
} 