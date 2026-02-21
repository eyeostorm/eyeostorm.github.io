function relativePosUnitsXY(point, zero_zero_point, angle){
    let positionX = point[0] - zero_zero_point[0];
    let positionY = -1 * (point[1] - zero_zero_point[1]);
    // -1 is present because of PROS library

    // helpful YouTube video which explains what is happening below: https://www.youtube.com/watch?v=-HcDl_gyeMs
    let angledX = positionY * Math.sin(angle) + positionX * Math.cos(angle)
    let angledY = -(positionY * Math.cos(angle) - positionX * Math.sin(angle))

    // CONVERT TO INCHES
    let inchesX = angledX / global_path_gen_image.clientWidth * 144;
    let inchesY = angledY / global_path_gen_image.clientWidth * 144;

    return [inchesX,inchesY];
}

function quantize(x){
    return Math.floor(x * 144 / global_path_gen_image.clientWidth)
}
