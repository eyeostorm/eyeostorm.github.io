function moveLineEndpoints(waypointIndex, lineStartX, lineStartY) {
    let lineInto, lineFrom
    if (waypointIndex > 0) {
        lineInto = global_lines[waypointIndex-1]
        if (lineInto) {
            lineInto.setAttribute("x2", lineStartX)
            lineInto.setAttribute("y2", lineStartY)
        }
    }

    if (waypointIndex < global_waypoints.length-1){
        lineFrom = global_lines[waypointIndex]
        if (lineFrom) {
            lineFrom.setAttribute("x1", lineStartX)
            lineFrom.setAttribute("y1", lineStartY)
        }
    }
}

function drawLine(waypointBase, index=null){
    if (!index) {
        //import from waypoints.js
        index = getIndex(waypointBase)
    }


    let svgContainer = document.getElementById("svg-paths");
    if (!svgContainer) {
        svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgContainer.setAttribute("id", "svg-paths");
        svgContainer.style.position = "absolute";
        svgContainer.style.top = 0;
        svgContainer.style.left = 0;
        svgContainer.style.width = "100%";
        svgContainer.style.height = "100%";
        svgContainer.style.zIndex = 0;
        document.getElementById("pathgen-container").appendChild(svgContainer);
    }
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", global_waypoints[index-1][0].offsetLeft + 25);
    line.setAttribute("y1", global_waypoints[index-1][0].offsetTop + 25);
    line.setAttribute("x2", global_waypoints[index][0].offsetLeft + 25);
    line.setAttribute("y2", global_waypoints[index][0].offsetTop + 25);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "2");
    svgContainer.appendChild(line);
    global_lines.push(line);
}

function resetLines() {
    global_lines = [];
    global_waypoints = [global_waypoints[0]];
}