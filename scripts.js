//Contains functionality!

import { text } from "./resources/text/is.mjs";

//Globals
const MAIN_CONTAINER = document.getElementById("webrice");
const SETTINGS_ID = "settingsCont";


function isCheckedCheckbox(box){
    const boxStatus = JSON.parse(localStorage.getItem("highlight"));
    console.log(boxStatus);
    if(boxStatus === null) box.checked = true;
    else box.checked =  boxStatus;
}


//_________________________
function createHighlightSection(){
    let isHighlightSection = document.createElement("section");
    //children of highlight section
    let isHighlightLabel = document.createElement("label");
    let isHighlightInput = document.createElement("input");
    const highlightStatus = "highlightStatus";
    isHighlightInput.id = highlightStatus;
    isHighlightInput.type = "checkbox";
    isCheckedCheckbox(isHighlightInput);

    isHighlightLabel.appendChild(document.createTextNode(text.settings.colorBackg))
    isHighlightLabel.for = highlightStatus;
    //add children
    isHighlightSection.appendChild(isHighlightLabel);
    isHighlightSection.appendChild(isHighlightInput);
    return isHighlightSection;
}

function createPharagraphs(text){
    let description = document.createElement("p");
    return description.appendChild(document.createTextNode(text));
}

function createInformationSection(){
    let isInfoSection = document.createElement("section");

    let h3Element = document.createElement("h3");
    h3Element.appendChild(document.createTextNode(text.settings.whatIsHead));
    isInfoSection.appendChild(h3Element);

    let textCont = document.createElement("div");
    textCont.appendChild(createPharagraphs(text.settings.whatIsPhara1));
    //TODO: add more text here

    isInfoSection.appendChild(textCont);
    return isInfoSection;

}

function createSettingsHeader(){
    const headerCont = document.createElement("div");

    headerCont.id = "settingsHeader";
    const exitButton = document.createElement("button")
    exitButton.id = "closeSettings";

    const exitImg = document.createElement("img");
    exitImg.src = "./Images/close-white-18dp.svg";
    exitImg.alt = "loka";

    exitButton.appendChild(exitImg);
    headerCont.appendChild(exitButton);
    return headerCont;
}

function createSubmitButton(){
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.id = "submitSettings";
    submitButton.appendChild(document.createTextNode(text.settings.submit));
    return submitButton;
}

function saveSettings(){
    const checkedVal = document.getElementById("highlightStatus").checked;
    localStorage.setItem("highlight", checkedVal);
}

function createSettings(){
    const settingsCont = document.createElement("div");
    settingsCont.id = SETTINGS_ID;

    settingsCont.appendChild(createSettingsHeader())

    const settings = document.createElement("div");
    settings.classList.add("settingsMenu");
    
    let mainHeading = document.createElement("h2")
    mainHeading.appendChild(document.createTextNode(text.settings.mainHead));
    settings.appendChild(mainHeading);

    settings.appendChild(createHighlightSection());
    settings.appendChild(createInformationSection());
    settings.appendChild(createSubmitButton());

    settingsCont.appendChild(settings);

    MAIN_CONTAINER.appendChild(settingsCont);

    document.getElementById("closeSettings").addEventListener("click", destroySettings);
    document.getElementById("submitSettings").addEventListener("click", saveSettings);
} 

function destroySettings(){
    MAIN_CONTAINER.removeChild(document.getElementById(SETTINGS_ID));
}

//On click functions
document.querySelector(".SettingButton").addEventListener("click", function() {
    document.getElementById(SETTINGS_ID) ? destroySettings() : createSettings();
});