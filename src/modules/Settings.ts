import {Button} from "./Button";

export class Settings extends Button{
    helpText: object;
    constructor(img: string, alt: string, id: string, title: string, helpText: object){
        super(img, alt, id, title);
        this.helpText = helpText;
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

    }

    public showSettingsModule(): void{

    }

    public fetchUserSettings(): void{

    }

    private getHelpText(): object{
        return this.helpText;
    }

    private setHelpText(text: object): void {
        this.helpText = text;
    }
}