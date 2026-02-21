function start() {
    if (!global_initialize) {
        // Import from waypoint.js
        waypointAt_Inches(72,72);

        // Import function from console_text.js
        startConsole();
        updateCookieFull();
        updateConsoleFull();

        global_initialize = true;
    }

    console.log(global_string_path)
}

document.addEventListener('DOMContentLoaded', start);

