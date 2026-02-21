function parsePath(pathStr){
    try {
        let angle_stringCoords = pathStr.split("$");
        let angle = parseFloat(angle_stringCoords[0]);
        let stringCoords = angle_stringCoords[1].split(";")

        let coordinates = []
        for (let i = 0; i < stringCoords.length-1; i++) {
            let pointStr = stringCoords[i]
            let x = (pointStr.split(",")[0]).toString()
            let y = (pointStr.split(",")[1]).toString()
            let point = [x, y];
            coordinates.push(point);
            // console.log(x + "," + y);
        }
        return [angle, coordinates];
    } catch (error){
        alert("Invalid path")
        return [null, null];
    }
}

function routeToWaypoints_PX (pathStr) {
    let parsed = parsePath(pathStr);
    let angle = parsed[0];
    let routeArray = parsed[1];

    if (null != angle && null != routeArray) {
        global_starting_angle = angle;
        document.getElementById("AngleZeroInput").value = angle;

        // console.log(angle);

        let bounding_box = global_path_gen_image.getBoundingClientRect()
        let image_height_ratio = bounding_box.height / 144;
        let image_width_ratio = bounding_box.width / 144;

        // import function from buttons_console_start
        restart();

        let x_first = bounding_box.left + routeArray[0][0] * image_width_ratio;
        let y_first = bounding_box.top + routeArray[0][1] * image_width_ratio;
        global_waypoints[0][0].style.left = (x_first - 1*global_wayPadding).toString() + "px";
        global_waypoints[0][0].style.top = (y_first - 1*global_wayPadding).toString() + "px";
        global_waypoints[0][1] = x_first;
        global_waypoints[0][2] = y_first;
        global_waypoints[0][3] = angle;

        for (let i = 1; i < routeArray.length; i++) {
            // console.log(routeArray[i][0], routeArray[i][1])
            let x = bounding_box.left + routeArray[i][0] * image_width_ratio - global_wayPadding * 0;
            let y = bounding_box.top + routeArray[i][1] * image_height_ratio - global_wayPadding * 0;
            waypointAt(x, y);
            // console.log(x, y)
        }

        // Holds information about the waypoints, in the form [element, x-coordinate, y-coordinate, direction-facing]

        // import function from console_text
        updateConsoleFull();
    }

    // after all the waypoint-ats, reset the global-path-string
    global_string_path = pathStr;
}

function updateCookieFull(){
    global_string_path = -(global_starting_angle * 180 / Math.PI).toFixed(2) + "$";
    let bounding_box = global_path_gen_image.getBoundingClientRect();
    let image_top_left = [bounding_box.left, bounding_box.top];

    for (let i = 0; i < global_waypoints.length; i++){
        let pos = getPosition(global_waypoints[i][0],i)

        let relPos = relativePosUnitsXY(pos, image_top_left, 0)
        global_string_path += relPos[0].toFixed(3) + "," + relPos[1].toFixed(3) + ";"
    }
}
