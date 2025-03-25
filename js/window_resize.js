function resizeHandler() {
    console.log(global_string_path);
    routeToWaypoints(global_starting_angle, parsePath(global_string_path)[1])
}

window.addEventListener('resize', resizeHandler)
