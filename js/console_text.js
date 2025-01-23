let websiteConsole = document.getElementById("console");
let websiteConsoleOutputs = [] // This variable will contain a list of html span elements which compose the output found in the console

var commands = []

function startConsole() {

    clearConsole()
    let spanElement = document.createElement("span");
    spanElement.style.display = "block";

    spanElement.textContent = "[ 0, 0 ] is the starting location of block 0; \r Clockwise Rotation is positive due to the PROS libraray \r Happy Hunting!! \r\r ------- \r\r";
    
    websiteConsole.appendChild(spanElement);
    websiteConsole.style.scrollbarWidth = "initial";
}

function clearConsole() {
    while (websiteConsole.children.length > 1) {
        websiteConsole.removeChild(websiteConsole.children[1]);
    }
    websiteConsoleOutputs = [];
    websiteConsole.style.scrollbarWidth = "none";
}

function writeToConsole(turnDegrees, printX, printY, isNew, motionIndex) {
    if (isNew) {
        var spanElement;
        var spanElement2;
        spanElement = document.createElement("span");
        spanElement2 = document.createElement("span");
        spanElement.style.display = "block";
        spanElement2.style.display = "block";
        // spanElement.textContent = "path.add_turn(MyTurn(" + Math.round(angleDegrees*100)/100 + "_deg));";
        // spanElement2.textContent = "path.add_straight(Straight({" + Math.round(translatedXInches*100)/100 + "_in, " + Math.round(translatedYInches*100)/100 + "_in, 0_deg" + "}, 0_s, MOTOR_SPEED::MID));";
        if (global_absolute_angle){
            spanElement.textContent = "Rotate to " + Math.round(turnDegrees)
        } else {
            spanElement.textContent = "Rotate by " + Math.round(turnDegrees)
        }
        spanElement2.textContent = "Move to [ " + Math.round(printX) + ", " + Math.round(printY) + " ]"
        websiteConsole.appendChild(spanElement);
        websiteConsole.appendChild(spanElement2);
        websiteConsoleOutputs.push([spanElement,spanElement2])
        websiteConsole.scrollTop = websiteConsole.scrollHeight
    } else {
        if (global_absolute_angle){
            websiteConsoleOutputs[motionIndex][0].textContent = "Rotate to " + Math.round(turnDegrees)
        } else {
            websiteConsoleOutputs[motionIndex][0].textContent = "Rotate by " + Math.round(turnDegrees)
        }

        websiteConsoleOutputs[motionIndex][1].textContent = "Move to [ " + Math.round(printX) + ", " + Math.round(printY) + " ]"
        // websiteConsoleOutputs[line1Index][0].textContent = "path.add_turn(MyTurn(" + Math.round(angleDegrees*100)/100 + "_deg));";
        // websiteConsoleOutputs[line1Index][1].textContent = "path.add_straight(Straight({" + Math.round(translatedXInches*100)/100 + "_in, " + Math.round(translatedYInches*100)/100 + "_in, 0_deg" + "}, 0_s, MOTOR_SPEED::MID));";
    }
}

function updateConsoleFull(){
    for (let i = 1; i < global_waypoints.length; i++){
        let waypoint_at_i = global_waypoints[i]
        let oldLocation = getPosition(global_waypoints[i-1],i-1)
        let oldDirection = getDirection(global_waypoints[i-1], i-1)
        let destination = getPosition(waypoint_at_i,i)

        let printLocation = relativePosUnitsXY(destination, getPosition(global_waypoints[0][0], 0), global_starting_angle)

        let isNew = false
        let rotation = rotate(oldLocation, oldDirection, destination, global_absolute_angle)
        writeToConsole(rotation,printLocation[0],printLocation[1],isNew,i-1)
    }
}