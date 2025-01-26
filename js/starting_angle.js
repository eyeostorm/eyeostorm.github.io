function input_handler(e){
    if (e.target === document.getElementById("AngleZeroInput")) {
        let angle = e.target.value
        if (!isNaN(angle) && !isNaN(parseFloat(angle))) {
            global_starting_angle = angle / 180 * Math.PI * global_counterclockwise_posNeg
            updateConsoleFull()
        } else {
            global_starting_angle = 0
            updateConsoleFull()
        }
    }
}

const input = document.querySelector("input");
input.addEventListener("change", input_handler);