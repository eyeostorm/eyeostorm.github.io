// function copy() {
//     let range = document.createRange()
//     range.selectNode(document.getElementById('console'));
//     window.getSelection().removeAllRanges();
//     window.getSelection().addRange(range);
//     // HTML5 has no real alternative to execCommand('copy')?
//     document.execCommand('copy');
//     alert("Copied the text");
//     window.getSelection().removeAllRanges();
// }

function copy() {
    let text = reckless_path()
    navigator.clipboard.writeText(text);
    alert("Copied Revilib code to your clipboard! Paste into a PROS coding space");

}

document.getElementById("copy-code").addEventListener("click", copy);

function reckless_path(){
    let reckless_code = ""

    for (let i = 1; i < global_waypoints.length; i++) {
        let waypoint_at_i = global_waypoints[i]
        let oldLocation = getPosition(global_waypoints[i - 1], i - 1)
        let oldDirection = getDirection(global_waypoints[i - 1], i - 1)
        let destination = getPosition(waypoint_at_i, i)


        let rotation = rotate(oldLocation, oldDirection, destination, global_absolute_angle).toFixed(0)

        let destinationInches = relativePosUnitsXY(destination, getPosition(global_waypoints[0][0], 0), global_starting_angle)
        let x_coord = destinationInches[0].toFixed(2)
        let y_coord = destinationInches[1].toFixed(2)




        console.log(reckless_code)

        reckless_code += `
        turn->turn_to_target_absolute(0.7, ${rotation}_deg);
        
        while (!turn->is_completed()) {
            print_position();
            pros::delay(20);
        }
        
        reckless->go(
            RecklessPath().with_segment(
            PilonsSegment(
                std::make_shared<ConstantMotion>(0.7),
                std::make_shared<PilonsCorrection>(4, 0.3_in),
                std::make_shared<SimpleStop>(0.03_s, 0.15_s, 0.3),
                { ${x_coord}_in, ${y_coord}_in, 0_deg },
                0_in)
            ));
        while(!reckless->is_completed()) {
            print_position;
            pros::delay(20);
        }
        `


        // let isNew = false
        // writeToConsole(rotation,printLocation[0],printLocation[1],isNew,i-1)
    }
    reckless_code += "\n\n"
    return reckless_code
}

function save_paths(){
    let text = -(global_starting_angle * 180 / Math.PI).toFixed(2) + "$"
    let bounding_box = global_path_gen_image.getBoundingClientRect()
    let image_top_left = [bounding_box.left, bounding_box.top]

    for (let i = 0; i < global_waypoints.length; i++){
        let pos = getPosition(global_waypoints[i][0],i)
        let relPos = relativePosUnitsXY(pos, image_top_left, global_starting_angle)
        text += relPos[0].toFixed(3) + "," + relPos[1].toFixed(3) + ";"
    }
    navigator.clipboard.writeText(text);
    alert("Copied Path to your clipboard. Paste into a safe location");
}

document.getElementById("copy-code").addEventListener("click", copy);
document.getElementById("save-path").addEventListener("click", save_paths)