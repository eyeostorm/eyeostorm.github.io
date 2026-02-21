function resizeHandler() {
    console.log(global_string_path);
    routeToWaypoints_PX(global_string_path)
    // console.log(global_string_path);

    let sidebar = document.getElementById("sidebar")
    if (sidebar.getBoundingClientRect().width < 220){
        document.getElementById("labelAngleZeroInputSPAN").textContent = "";
    } else {
        document.getElementById("labelAngleZeroInputSPAN").textContent = "Angle ";

    }
}

window.addEventListener('resize', resizeHandler)
