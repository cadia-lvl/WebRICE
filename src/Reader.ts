import {Settings} from "./modules/Settings";
import{text} from "./lang/is";

export class Reader{
    webText = "";
    readonly CONTAINER_ID = "webrice";
    readonly TEXT_CONTENT_ID = "WebRICE_text_container";
    constructor(){
        this.init();
    }

    public init(): void{
        this.createInitialHTML();
    }

    private addListeners(id: string, functionName: EventListenerOrEventListenerObject){
        const physicalButton = document.getElementById(id);
        if(physicalButton) physicalButton.addEventListener("click", functionName);

    }

    private createInitialHTML(): void{
        //Missing base container around the buttons
        const container = document.getElementById(this.CONTAINER_ID);
        
        const settingsButton = new Settings(text.settings.conf.imagePath, 
                                            text.settings.conf.alt, 
                                            text.settings.conf.id, 
                                            text.settings.conf.title, 
                                            text.settings.userText);
        if(container){
            //and other buttons
            container.appendChild(settingsButton.createHTML());
        }
        
        this.addListeners(text.settings.conf.id, settingsButton.onClicked);
    }

    public getWebText(): string{
        return this.webText;
    }

    private setWebText(text: string): void{
        this.webText = text;
    }

    public getContainerId(): string{
        return this.CONTAINER_ID;
    }

    public getTextContentId(): string{
        return this.TEXT_CONTENT_ID;
    }

    private loadThemes(): void{
        console.log("theme work");
    }


}
window.addEventListener('DOMContentLoaded', () => {
    new Reader();
});