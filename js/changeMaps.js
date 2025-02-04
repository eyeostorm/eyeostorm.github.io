function changeMapToAutonomous(){
    document.getElementById("pathgenMap").src = "images/autonomous_map.png";
}

function changeMapToSkills(){
    document.getElementById("pathgenMap").src = "images/skills_map.png";
}

document.getElementById("autonMapChangeLink").addEventListener("click", changeMapToAutonomous);
document.getElementById("skillsMapChangeLink").addEventListener("click", changeMapToSkills);