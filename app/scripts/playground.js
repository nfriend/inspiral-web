var toRadians = function (degrees) {
    return (degrees * Math.PI) / 180;
}

var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;
var lineData = [];
var lineData2 = [];

var radius = 110;
var largeRadius = 100; var smallAngle = 0;
var resolution = 10; // lower the better.
var timeMultiplier = 2;
var smallToLargeRatio = -1 / 2;

for (var i = 0; i <= 360 * timeMultiplier; i = i + resolution) {
    var x = radius * Math.cos(toRadians(i)) + centerX;
    var y = radius * Math.sin(toRadians(i)) + centerY;
    var largeXAdjustment = largeRadius * Math.cos(toRadians(i * smallToLargeRatio));
    var largeYAdjustment = largeRadius * Math.sin(toRadians(i * smallToLargeRatio));

    lineData.push({ 'x': x + largeXAdjustment, 'y': y + largeYAdjustment });
}

var radius = 100;
var largeRadius = 50; var smallAngle = 0;
var resolution = 10; // lower the better.
var timeMultiplier = 2;
var smallToLargeRatio = -1 / 2;

for (var i = 0; i <= 360 * timeMultiplier; i = i + resolution) {
    var x = radius * Math.cos(toRadians(i)) + centerX;
    var y = radius * Math.sin(toRadians(i)) + centerY;
    var largeXAdjustment = largeRadius * Math.cos(toRadians((i - 180) * smallToLargeRatio));
    var largeYAdjustment = largeRadius * Math.sin(toRadians((i - 180) * smallToLargeRatio));

    lineData2.push({ 'x': x + largeXAdjustment, 'y': y + largeYAdjustment });
}

//This is the accessor function we talked about above
var lineFunction = d3.svg.line()
                         .x(function (d) { return d.x; })
                         .y(function (d) { return d.y; })
                         .interpolate("cardinal");

//The SVG Container
var svgContainer = d3.select("body").append("svg")
                                    .attr("width", window.innerWidth)
                                    .attr("height", window.innerHeight);

//The line SVG Path we draw
var path = svgContainer.append("path")
                            .attr("d", lineFunction(lineData))
                            .attr("stroke", "blue")
                            .attr("stroke-width", 18)
                            .attr("fill", "none");

var path = svgContainer.append("path")
                            .attr("d", lineFunction(lineData2))
                            .attr("stroke", "red")
                            .attr("stroke-width", 18)
                            .attr("fill", "none");

//var totalLength = path.node().getTotalLength();

//var animationLength = 3000;

//path.attr("stroke-dasharray", totalLength + " " + totalLength)
//      .attr("stroke-dashoffset", totalLength)
//      .transition().duration(animationLength)
//        .ease("linear")
//        .attr("stroke-dashoffset", 0);

svgContainer.on("click", function () {
    path.transition()
      .duration(animationLength)
      .ease("linear")
      .attr("stroke-dashoffset", totalLength);
})