function restart() {
    // Import function from console_text.js
    clearConsole();
    
    if (global_lines.length > 0){
        document.getElementById("svg-paths").remove();
    }
    for (i=1; i<global_waypoints.length; i++) {
        document.getElementById("pathgen-container").removeChild(global_waypoints[i][0]);
    }
    
    // Import function from waypoints.js
    resetLines()
}

function start() {
    if (!global_beginClicked) {
        var startWaypoint = document.getElementById("robot-dragger-base");
        var startrect = startWaypoint.getBoundingClientRect();

        let initialX = (startrect.left + global_wayPadding * 2)
        let initialY = (startrect.top + global_wayPadding * 2)

        // start the global waypoint to the position of the waypoint and the initial direction
        global_waypoints = [[startWaypoint, initialX, initialY, 0]]

        // Import function from console_text.js
        startConsole()

        global_beginClicked = true;
    }

    waypointAt_Inches(144,144)
}


document.getElementById("restart-code").addEventListener("click", restart);
// document.getElementById("start-code").addEventListener("click", start);

document.addEventListener('DOMContentLoaded', start)