function resizeHandler() {
    // console.log(global_string_path);
    routeToWaypoints(global_starting_angle, parsePath(global_string_path)[1])
    console.log(global_string_path);
}

window.addEventListener('resize', resizeHandler)
