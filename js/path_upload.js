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

function routeToWaypoints (angle, routeArray) {
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
        global_waypoints[0][0].style.left = (x_first - 2*global_wayPadding).toString() + "px";
        global_waypoints[0][0].style.top = (y_first - 2*global_wayPadding).toString() + "px";
        global_waypoints[0][1] = x_first;
        global_waypoints[0][2] = y_first;
        global_waypoints[0][3] = angle;

        for (let i = 1; i < routeArray.length; i++) {
            // console.log(routeArray[i][0], routeArray[i][1])
            let x = bounding_box.left + routeArray[i][0] * image_width_ratio - global_wayPadding;
            let y = bounding_box.top + routeArray[i][1] * image_height_ratio - global_wayPadding;
            waypointAt(x, y);
            console.log(x, y)
        }


        // Holds information about the waypoints, in the form [element, x-coordinate, y-coordinate, direction-facing]

        // import function from console_text
        updateConsoleFull();
    }
}