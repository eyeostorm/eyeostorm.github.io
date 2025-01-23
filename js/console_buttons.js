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

        // Import function from console_text.js
        startConsole()

        let initialX = (startrect.left + 2*global_wayPadding)
        let initialY = (startrect.top + 2*global_wayPadding)

        // start the global waypoint to the position of the waypoint and the initial direction
        // DEBUG, CHANGE INITIAL DIRECTION
        global_waypoints = [[startWaypoint, initialX, initialY, 0]]

        global_beginClicked = true;
    }
}


document.getElementById("restart-code").addEventListener("click", restart);
document.getElementById("start-code").addEventListener("click", start);