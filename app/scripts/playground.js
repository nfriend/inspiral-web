var toRadians = function (degrees) {
    return (degrees * Math.PI) / 180;
}
var toDegrees = function (radians) {
    return (radians * 180) / Math.PI;
}

var toStandardCoodinates = function (coords, size) {
    return {
        x: coords.x - size.x / 2,
        y: -1 * (coords.y - size.y / 2)
    };
}

var gear = function(d) {
  var n = d.teeth,
      r2 = Math.abs(d.radius),
      r0 = r2 - 8,
      r1 = r2 + 8,
      r3 = d.annulus ? (r3 = r0, r0 = r1, r1 = r3, r2 + 20) : 20,
      da = Math.PI / n,
      a0 = -Math.PI / 2 + (d.annulus ? Math.PI / n : 0),
      i = -1,
      path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
  while (++i < n) path.push(
      "A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
      "L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
      "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
      "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
      "L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0),
      "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0));
  path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
  return path.join("");
}

var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;

var svgContainer = d3.select("body").append("svg").attr("width", window.innerWidth).attr("height", window.innerHeight);

//var circle = svgContainer.append("circle")
//    .attr("cx", centerX)
//    .attr("cy", centerY)
//    .attr("r", 40);

var circle = svgContainer.append("g")
    .attr("class", "gear")
    .datum({teeth: 32, radius: 100})
    .append("path")
    .attr("d", gear);


var svgContainerMouseMove = function (d, i) {
    var mouseCoords = toStandardCoodinates({ x: d3.event.clientX, y: d3.event.clientY }, { x: window.innerWidth, y: window.innerHeight });
    var radius = 100;
    var mouseAngle = Math.atan2(mouseCoords.y, mouseCoords.x);

    var newX = radius * Math.cos(mouseAngle) + centerX;
    var newY = -1 * radius * Math.sin(mouseAngle) + centerY;

    circle.attr("transform", "translate(" + newX + "," + newY + ")");
    //circle.attr("cx", radius * Math.cos(mouseAngle) + centerX).attr("cy", -1 * radius * Math.sin(mouseAngle) + centerY);
}

circle.on("mousedown", function (d, i) {
    svgContainer.on("mousemove", svgContainerMouseMove);
    svgContainer.on("mouseup", function () { svgContainer.on("mousemove", null); });
});


