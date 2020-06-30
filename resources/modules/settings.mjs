import { text } from "../text/is.mjs";

export class Settings {
    constructor(main, settingsId){
        this.MainContainer = main;
        this.SettingsId = settingsId;

    }

    isCheckedCheckbox(box){
        const boxStatus = JSON.parse(localStorage.getItem("highlight"));
        console.log(boxStatus);
        if(boxStatus === null) box.checked = true;
        else box.checked =  boxStatus;
    }
    
    createHighlightSection(){
        let isHighlightSection = document.createElement("section");
        //children of highlight section
        let isHighlightLabel = document.createElement("label");
        let isHighlightInput = document.createElement("input");
        const highlightStatus = "highlightStatus";
        isHighlightInput.id = highlightStatus;
        isHighlightInput.type = "checkbox";
        this.isCheckedCheckbox(isHighlightInput);
    
        isHighlightLabel.appendChild(document.createTextNode(text.settings.colorBackg))
        isHighlightLabel.for = highlightStatus;
        //add children
        isHighlightSection.appendChild(isHighlightLabel);
        isHighlightSection.appendChild(isHighlightInput);
        return isHighlightSection;
    }
    
    createPharagraphs(text){
        let description = document.createElement("p");
        return description.appendChild(document.createTextNode(text));
    }
    
    createInformationSection(){
        let isInfoSection = document.createElement("section");
    
        let h3Element = document.createElement("h3");
        h3Element.appendChild(document.createTextNode(text.settings.whatIsHead));
        isInfoSection.appendChild(h3Element);
    
        let textCont = document.createElement("div");
        textCont.appendChild(this.createPharagraphs(text.settings.whatIsPhara1));
        //TODO: add more text here
    
        isInfoSection.appendChild(textCont);
        return isInfoSection;
    
    }
    
    createSettingsHeader(){
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
    
    createSubmitButton(){
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.id = "submitSettings";
        submitButton.appendChild(document.createTextNode(text.settings.submit));
        return submitButton;
    }
    
    saveSettings(){
        const checkedVal = document.getElementById("highlightStatus").checked;
        localStorage.setItem("highlight", checkedVal);
    }
    
    createSettings(){
        const settingsCont = document.createElement("div");
        settingsCont.id = this.SettingsId;
    
        settingsCont.appendChild(this.createSettingsHeader())
    
        const settings = document.createElement("div");
        settings.classList.add("settingsMenu");
        
        let mainHeading = document.createElement("h2")
        mainHeading.appendChild(document.createTextNode(text.settings.mainHead));
        settings.appendChild(mainHeading);
    
        settings.appendChild(this.createHighlightSection());
        settings.appendChild(this.createInformationSection());
        settings.appendChild(this.createSubmitButton());
    
        settingsCont.appendChild(settings);
    
        this.MainContainer.appendChild(settingsCont);
    
        document.getElementById("submitSettings").addEventListener("click", this.saveSettings);
       // document.getElementById("closeSettings").addEventListener("click", this.destroySettings);
    } 
    
    destroySettings(){
        console.log(this.MainContainer);
        this.MainContainer.removeChild(document.getElementById(this.SettingsId));
    }
}

