function changeMapToAutonomous(){
    document.getElementById("pathgenMap").src = "images/VexU_Autonomous_PushBack_png.png";
}

function changeMapToSkills(){
    document.getElementById("pathgenMap").src = "images/VexU_Skills_PushBack_png.png";
}

document.getElementById("autonMapChangeLink").addEventListener("click", changeMapToAutonomous);
document.getElementById("skillsMapChangeLink").addEventListener("click", changeMapToSkills);