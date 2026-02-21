// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    // console.log(event.target.classList)
    if (!event.target.classList.contains('dropdown-button') && !event.target.classList.contains('dropdown-content')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                openDropdown.classList.add('hide');
            }
        }
    }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function settingsPopFunction() {
    let id = "settingsDropdownContentContainer"
    document.getElementById(id).classList.remove("hide");
    document.getElementById(id).classList.add("show");
    // debug
    // document.getElementById("settingsButton").style.backgroundColor = "pink"
}

function pathsPopFunction(){
    let id_menu = "pathsDropdownContentContainer"
    let id_button = "paths-container"
    document.getElementById(id_menu).classList.remove("hide");
    document.getElementById(id_menu).classList.add("show");
    // document.getElementById(id_button).classList.remove("sidebar-dropdown-closed");
    // document.getElementById(id_button).classList.add("sidebar-dropdown-open");
}



document.getElementById("paths-container").addEventListener("click", pathsPopFunction)
document.getElementById("settingsButton").addEventListener("click", settingsPopFunction);
