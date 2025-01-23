function magnitude(vector) {
    let sum_sq_coord = 0
    for (let coord = 0; coord < vector.length; coord++) {
        sum_sq_coord += vector[coord] * vector[coord]
    }
    return Math.sqrt(sum_sq_coord)
}

function dot(v1, v2) {
    return v1.map((x, i) => v1[i] * v2[i]).reduce((m, n) => m + n);
}

function determinant (v1, v2) {
    let matrix = [v1, v2]
    let det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    return det

    // return v1.map((x, i) => v1[i] * v2[v2.length - 1 - i]).reduce((m, n) => m + n);
}

function angle_between(vector_1, vector_2){
    
    let dot_prod = dot(vector_2, vector_1)
    let mag_1 = magnitude(vector_1)
    let mag_2 = magnitude(vector_2)

    let mag = Math.acos( dot_prod / ( mag_1 * mag_2))

    return mag
}


function rotate (location, angle_facing, destination, absoluteAngle) {
    if (absoluteAngle){
        angle_facing = global_starting_angle
    } else {
        angle_facing = angle_facing * Math.PI/180 * global_counterclockwise_posNeg
    }

    let location_x = location[0]
    let location_y = location[1]
    let final_x = destination[0] - location_x
    let final_y = destination[1] - location_y

    //because in html, as y increases it goes towards the bottom of the page
    final_y = -final_y

    let initial_vector = [Math.cos(angle_facing), Math.sin(angle_facing)]
    let final_vector = [final_x, final_y]

    let angle = angle_between(initial_vector, final_vector)
    angle = angle * 180 / Math.PI

    //counterclockwise = negative rotation because of PROS library
    let det = determinant(initial_vector, final_vector)

    function absPosNeg(x){
        if (x >= 0){return 1}
        else{return -1}
    }

    if (final_y === 0){
        if (final_x >= 0){
            return absPosNeg(global_starting_angle) * global_counterclockwise_posNeg *  -((Math.abs(global_starting_angle) * 180 / Math.PI) + 360*2) % 360
        } else {
            return absPosNeg(global_starting_angle) * global_counterclockwise_posNeg * ((-Math.abs(global_starting_angle) * 180 / Math.PI) + 180 + 360*2) % 360
        }
    } else {
        return angle * det/Math.abs(det) * global_counterclockwise_posNeg
    }
}

