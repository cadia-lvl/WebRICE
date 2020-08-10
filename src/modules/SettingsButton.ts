import {Button} from "./Button";
import {icon} from "./icons";

export class SettingsButton extends Button{
    constructor(icon: icon, alt: string, id: string, title: string, classes?: string){
        super(icon, alt, id, title, classes);
    }
    public onClicked(): void{
        console.log("clicked!");
    }

    private createSettingsHeader(): HTMLElement{
        const headerCont = document.createElement("div");
        headerCont.setAttribute("id","headerCont");

        const exitButton = document.createElement("button");
        exitButton.setAttribute("id", "closeSettings");

        //Add close button image

        return headerCont;
    }

    public createSettingsModule(parent: HTMLElement): void{
        const settingsCont = document.createElement("div");
        settingsCont.setAttribute("id","settingsCont");
        //settingsCont.appendChild(this.createSettingsHeader());
        
        const settings = document.createElement("div");
        settings.setAttribute("class", "settingsMenu");

        console.log();
    }

    public hideSettingsModule(): void{
        console.log("to be implemented");

    }

    public showSettingsModule(): void{
        console.log("to be implemented");

    }

    public fetchUserSettings(): void{
        console.log("to be implemented");
    }
}