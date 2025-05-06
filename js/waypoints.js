function getPosition(waypoint, index=null) {
    // gets the position [x,y] of a waypoint on the page. Parameters = the waypoint html element and optionally its index in global_waypoints

    if (!index && index !== 0){
        index = getIndex(waypoint)
    }
    return [global_waypoints[index][1],global_waypoints[index][2]]
}

function getDirection(waypoint, index=null){
    // gets the direction a waypoint if facing. Parameters = the waypoint html element and optionally its index in global_waypoints

    if (!index && index !== 0){
        index = getIndex(waypoint)
    }
    return global_waypoints[index][3]
}

function getIndex(waypoint){
    // gets the index of a waypoint in global_waypoints. Parameters = the waypoint html element

    let index
    for (let i = 0; i < global_waypoints.length; i++) {
        if (waypoint === global_waypoints[i][0]) {
            index = i
            break
        }
    }
    return index
}

function dragWaypoint(waypoint) {
    // function which allows a waypoint to be moved around the page

    let moveX = 0, moveY = 0
    let mouseX = 0, mouseY = 0

    waypoint.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.onmouseup = closeDragWaypoint;
        document.onmousemove = waypointDrag;
    }

    function closeDragWaypoint() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function waypointDrag(e) {
        e = e || window.event;
        e.preventDefault();

        // move = new_mouse_position - stored_mouse_position. For the y, in html y increase going in the negative direction
        moveX = e.clientX - mouseX
        moveY = e.clientY - mouseY
        // update stored_mouse_positions
        mouseX = e.clientX;
        mouseY = e.clientY;

        //Moves the absolute position of the waypoints (i.e. why they move)
        waypoint.style.top = (waypoint.offsetTop + moveY) + "px";
        waypoint.style.left = (waypoint.offsetLeft + moveX) + "px";

        //Update the information about the waypoints in "waypoints" list
        let i = getIndex(waypoint)
        if (i >= 0){
            global_waypoints[i][1] = global_waypoints[i][1] + moveX;
            global_waypoints[i][2] = global_waypoints[i][2] + moveY;
            global_waypoints[i][3] = calculateDirectionWaypoint(waypoint, i);

            //Update the facing direction of next waypoint in the index
            if (i < global_waypoints.length-1){
                let waypointAfter = global_waypoints[i+1]
                global_waypoints[i+1][3] = calculateDirectionWaypoint(waypointAfter, i+1)
            }

            let lineStartX = waypoint.offsetLeft + global_wayPadding;
            let lineStartY = waypoint.offsetTop + global_wayPadding;
            // import from path_lines.js
            moveLineEndpoints(i, lineStartX, lineStartY)

            // import from console_text.js
            updateConsoleFull();
        }
    }
}

function calculateDirectionWaypoint(waypoint, index=null){
    // calculates the angle at which a waypoint is facing based on the slope formed by the position of the waypoint and the previous waypoint

    let previousPosition, currentPosition

    if (!index) {
        index = getIndex(waypoint)
    }

    if (index > 0){
        previousPosition = getPosition(global_waypoints[index-1][0], index-1)
        currentPosition = getPosition(waypoint, index)

        return calculateDirection(currentPosition, previousPosition)

    } else {
        return global_starting_angle
    }
}


function calculateDirection(finalPoint, initialPoint){
    // calculates the angle of the line formed between two points


    /* -1 is important because html has y-coordinate increase as you move towards the bottom of the page */
    let vector = [finalPoint[0] - initialPoint[0], -1 * (finalPoint[1] - initialPoint[1])]
    let theta = Math.atan(vector[1]/vector[0])

    // Refactor arctan ouput based on quadrant
    if (vector[0] >= 0){
        if (vector[1] <= 0){
            theta = 2*Math.PI + theta
        }
    } else {
        theta = Math.PI + theta
    }

    // format the output of theta to a 360degree value
    if (!theta){
        theta = 0
    } else {
        theta = theta / Math.PI * 180
    }

    return theta
}

function waypointAt(x, y){
    // creates a waypoint at the coordinates

    let waypointBase = document.createElement("div");
    waypointBase.className = "robot-dragger-base point" + global_waypoints.length;
    waypointBase.className = "robot-dragger-base";
    waypointBase.style.top = y-global_wayPadding + "px";
    waypointBase.style.left = x-global_wayPadding + "px";

    document.getElementById("pathgen-container").appendChild(waypointBase);
    let waypointStyler = document.createElement("div");

    // creates the visible part of the waypoint object
    waypointStyler.className = "robot-dragger";
    waypointStyler.textContent = global_waypoints.length;

    waypointBase.appendChild(waypointStyler);

    //add dragging effects to waypoint and draw a line to the waypoint
    dragWaypoint(waypointBase);

    let direction = calculateDirection([x, y], getPosition(global_waypoints[global_waypoints.length-1][0]));
    global_waypoints.push([waypointBase, x, y, direction]);

    // write a new line to the website console
    // import from calculate_rotation.js and console_text.js
    let destination = [x+global_wayPadding, y+global_wayPadding];
    let printLocation = relativePosUnitsXY(destination, getPosition(global_waypoints[0][0], 0), global_starting_angle);
    let oldIndex = global_waypoints.length-2;
    let pos = getPosition(global_waypoints[oldIndex][0], oldIndex)

    let rotation = rotate(pos,getDirection(global_waypoints[oldIndex][0], oldIndex), destination, global_absolute_angle);
    writeToConsole(rotation,printLocation[0],printLocation[1],true,global_waypoints.length-2);

    //import from path_lines.js
    drawLine(waypointBase);
}

function waypointAt_Inches(x_in,y_in){
    let bounding_box = global_path_gen_image.getBoundingClientRect()
    let image_height_ratio = bounding_box.height / 144;
    let image_width_ratio = bounding_box.width / 144;

    let x_px = bounding_box.left + x_in * image_width_ratio;
    let y_px = bounding_box.top + y_in * image_width_ratio;
    waypointAt(x_px,y_px);
}

function waypointUpdate(x_px,y_px, waypoint, index=null){
    if (!index && index !== 0){
        index = getIndex(waypoint)
    }

    global_waypoints[index][1] = x_px;
    global_waypoints[index][2] = y_px;
    console.log(global_wayPadding[index])
    global_wayPadding[index][3] = calculateDirectionWaypoint(waypoint,index);

    waypoint.style.top = (x_px-global_wayPadding) + "px";
    waypoint.style.left = (y_px-global_wayPadding) + "px";

    let lineStartX = waypoint.offsetLeft + global_wayPadding;
    let lineStartY = waypoint.offsetTop + global_wayPadding;
    // import from path_lines.js
    moveLineEndpoints(index, lineStartX, lineStartY)

    // import from console_text.js
    updateConsoleFull();
}


function waypointUpdate_Inches(x_in,y_in, waypoint, index=null){
    let bounding_box = global_path_gen_image.getBoundingClientRect()
    let image_height_ratio = bounding_box.height / 144;
    let image_width_ratio = bounding_box.width / 144;

    let x_px = bounding_box.left + x_in * image_width_ratio;
    let y_px = bounding_box.top + y_in * image_width_ratio;

    waypointUpdate(x_px,y_px, waypoint,index=null)
}


function waypointDelete(){

}

// specifically to prevent a double click selection on our pathgen-container element
document.getElementById("pathgen-container").addEventListener('mousedown', function(e){
    if (e.detail > 1){
        e.preventDefault();
    }
    }, false)

dragWaypoint(document.getElementById("robot-dragger-base"));
document.getElementById("pathgen-container").addEventListener("dblclick", function(e) {
    // import from console_buttons.js
    if (global_beginClicked) {
        let x = e.clientX;
        let y = e.clientY;
        waypointAt(x, y);
    }
});