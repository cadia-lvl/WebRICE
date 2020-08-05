import {Button} from "./Button";

export class SettingsButton extends Button{
    readonly TABINDX: string;
    constructor(svgElement: SVGSVGElement, alt: string, id: string, title: string){
        super(svgElement, alt, id, title);
        this.TABINDX = "4";
    }
    public onClicked(): void{
        console.log("clicked!");
    }

    protected setTabindex(button: HTMLDivElement): void{
        button.setAttribute("tabindex", this.TABINDX);
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

    public createHTML(): HTMLDivElement{
        return document.createElement("div");
    }
}