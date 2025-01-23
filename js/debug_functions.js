function debug_waypointXYFacing(){
    let str = ""
    for (let j=0; j < global_waypoints.length; j++){
        str += global_waypoints[j][1] + " " + global_waypoints[j][2] + " " + global_waypoints[j][3]  + "\n"
    }
    console.log(str)
}
