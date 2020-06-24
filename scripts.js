//Contains functionality!

//Globals
const MAIN_CONTAINER = document.getElementById("webrice");
const SETTINGS_CLASSNAME = "settingsMenu";

//_________________________
function createHighlightSection(){
    let isHighlightSection = document.createElement("section");
    //children of highlight section
    let isHighlightLabel = document.createElement("label");
    let isHighlightInput = document.createElement("input");
    const highlightStatus = "highlightStatus";
    isHighlightInput.setAttribute("id", highlightStatus);
    isHighlightInput.setAttribute("type", "checkbox");
    isHighlightInput.checked = true;
    isHighlightLabel.appendChild(document.createTextNode("Lita bakgrunn settninga:"))
    isHighlightLabel.setAttribute("for", highlightStatus);
    //add children
    isHighlightSection.appendChild(isHighlightLabel);
    isHighlightSection.appendChild(isHighlightInput);
    return isHighlightSection;
}

//determines weather menu is active or not
function hasMenu(childArr){
    for(item in childArr){
        if(childArr[item].classList.contains(SETTINGS_CLASSNAME)){
            return true
        }
    }
    return false;
}

function createSettings(){
    let settings = document.createElement("div");
    settings.classList.add(SETTINGS_CLASSNAME);
    
    let mainHeading = document.createElement("h2")
    mainHeading.appendChild(document.createTextNode("Stillingar"))
    settings.appendChild(mainHeading);

    settings.appendChild(createHighlightSection());

    
    let submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "vista");
    settings.appendChild(submitButton);

    MAIN_CONTAINER.appendChild(settings);
} 

function destroySettings(){
    Array.from(MAIN_CONTAINER.childNodes).forEach( child => {
        if(child.classList.contains(SETTINGS_CLASSNAME)){
            MAIN_CONTAINER.removeChild(child);
        }
    });
}

document.querySelector(".SettingButton").addEventListener("click", function() {
    hasMenu(Array.from(MAIN_CONTAINER.childNodes)) ? destroySettings() : createSettings();
});