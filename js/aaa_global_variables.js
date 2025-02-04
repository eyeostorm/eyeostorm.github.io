// Holds information about the waypoints, in the form [element, x-coordinate, y-coordinate, direction-facing]
// This is the most important variable to this website
let global_waypoints = [[null, 0, 0, 0]];

// holds the span elements which are appended to the website console
let global_lines = [];

// contains the pixel padding necessary to place the coordinates of the div relative to the top left of the div in the correct location
let global_wayPadding = 25;

// Is false before the "Begin" button is clicked, true after it is clicked
let global_beginClicked = false;

let global_absolute_angle = true;

let global_starting_angle = 0

let global_path_gen_image = document.getElementById("pathgenMap")

let global_counterclockwise_posNeg = -1

let global_imageHeight = 1

