// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    console.log(event.target.classList)
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
    document.getElementById("settingsDropdownContentContainer").classList.remove("hide");
    document.getElementById("settingsDropdownContentContainer").classList.add("show");
    // debug
    // document.getElementById("settingsButton").style.backgroundColor = "pink"
}

function pathsPopFunction(){
    document.getElementById("settingsDropdownContentContainer").classList.remove("hide");
    document.getElementById("settingsDropdownContentContainer").classList.add("show");
}





document.getElementById("paths-container").addEventListener("click", pathsPopFunction)
document.getElementById("settingsButton").addEventListener("click", settingsPopFunction);
