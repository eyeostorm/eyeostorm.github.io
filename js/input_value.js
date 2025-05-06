function input_handler_AngleZeroInput (e) {
    let angle = e.target.value;
    if (!isNaN(angle) && !isNaN(parseFloat(angle))) {
        global_starting_angle = angle / 180 * Math.PI * global_counterclockwise_posNeg;
        e.target.value = angle;
    } else {
        global_starting_angle = 0;
        e.target.value = 0;
    }
    updateConsoleFull();
}

function input_handler_PathInput (e) {
    let text_chain = e.target.value;
    e.target.value = "";
    // console.log(text_chain)
    if (text_chain.length > 0) {
        routeToWaypoints_PX(text_chain);
    }
}

function input_handler_InitPosCoord(e){
    console.log("here");
    let xcoord = document.getElementById("InitPosCoord_X")
    let ycoord = document.getElementById("InitPosCoord_Y")

    if (xcoord.value !== "" && ycoord.value !== ""){
        let x = xcoord.value;
        let y = ycoord.value;

        waypointUpdate_Inches(x,y,global_waypoints[0][0],0);
        xcoord.value = "";
        ycoord.value = "";
    }

}

const input_InitPosCoord_X = document.querySelector("#InitPosCoord_X");
input_InitPosCoord_X.addEventListener("change", input_handler_InitPosCoord);

const input_InitPosCoord_Y = document.querySelector("#InitPosCoord_Y");
input_InitPosCoord_Y.addEventListener("change", input_handler_InitPosCoord);

const input_AngleZeroInput = document.querySelector("#AngleZeroInput");
input_AngleZeroInput.addEventListener("change", input_handler_AngleZeroInput);

const input_PathInput = document.querySelector("#PathInput");
input_PathInput.addEventListener("change", input_handler_PathInput);
