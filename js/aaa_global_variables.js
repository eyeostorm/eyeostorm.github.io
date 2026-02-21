// Holds information about the waypoints, in the form [element, x-coordinate, y-coordinate, direction-facing]
// This is the most important variable to this website
// type = [[waypoint(), double, double, double]]
let global_waypoints = [];

// holds the span elements which are appended to the website console
let global_lines = [];

// contains the pixel padding necessary to place the coordinates of the div relative to the top left of the div in the correct location
let global_wayPadding = 25;

// Is false before the "Begin" button is clicked, true after it is clicked
let global_initialize = false;

// If set to true, then turning to 30degrees will output 30. If set to false, then turning 30 degrees will represet a 30degree turn from current angle
let global_absolute_angle = true;

// Sets the starting angle in radians
let degree_angle = 0;
let global_starting_angle = degree_angle * (Math.PI / 180);

let global_path_gen_image = document.getElementById("pathgenMap")

let global_counterclockwise_posNeg = -1;

let global_imageHeight = 1;

let global_string_path = "";

