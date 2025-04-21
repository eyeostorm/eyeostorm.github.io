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
        let parsedChain = parsePath(text_chain);
        let angle = parsedChain[0];
        let route = parsedChain[1]
        routeToWaypoints(angle,route);
    }
}

const input_AngleZeroInput = document.querySelector("#AngleZeroInput");
input_AngleZeroInput.addEventListener("change", input_handler_AngleZeroInput);

const input_PathInput = document.querySelector("#PathInput");
input_PathInput.addEventListener("change", input_handler_PathInput);
