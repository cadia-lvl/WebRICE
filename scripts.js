//Contains functionality!

import { text } from "./resources/text/is.mjs";

//Globals
const MAIN_CONTAINER = document.getElementById("webrice");
const SETTINGS_ID = "settingsCont";


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
    isHighlightLabel.appendChild(document.createTextNode(text.settings.colorBackg))
    isHighlightLabel.setAttribute("for", highlightStatus);
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

    headerCont.setAttribute("id", "settingsHeader");
    const exitButton = document.createElement("button")
    exitButton.setAttribute("id", "closeSettings");

    const exitImg = document.createElement("img");
    exitImg.setAttribute("src", "./Images/close-white-18dp.svg");
    exitImg.setAttribute("alt", "loka");

    exitButton.appendChild(exitImg);
    headerCont.appendChild(exitButton);
    return headerCont;
}

function createSettings(){
    const settingsCont = document.createElement("div");
    settingsCont.setAttribute("id", SETTINGS_ID);

    settingsCont.appendChild(createSettingsHeader())

    const settings = document.createElement("div");
    settings.classList.add("settingsMenu");
    
    let mainHeading = document.createElement("h2")
    mainHeading.appendChild(document.createTextNode(text.settings.mainHead));
    settings.appendChild(mainHeading);

    settings.appendChild(createHighlightSection());
    settings.appendChild(createInformationSection());

    
    let submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "vista");
    settings.appendChild(submitButton);

    settingsCont.appendChild(settings);

    MAIN_CONTAINER.appendChild(settingsCont);

    document.getElementById("closeSettings").addEventListener("click", destroySettings);
} 

function destroySettings(){
    MAIN_CONTAINER.removeChild(document.getElementById(SETTINGS_ID));
}

//On click functions
document.querySelector(".SettingButton").addEventListener("click", function() {
    document.getElementById(SETTINGS_ID) ? destroySettings() : createSettings();
});