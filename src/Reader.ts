import {SettingsButton} from "./modules/SettingsButton";
import {PlayPauseButton} from "./modules/PlayPauseButton";
import {StopButton} from "./modules/StopButton";
import {SpeedButton} from "./modules/SpeedButton";
import {text} from "./lang/is";
import {playIcon, stopIcon, pauseIcon, earIcon, settingsIcon, speedIcon, fastforwardIcon,closeIcon, volumeUpIcon} from "./modules/icons";
import { Button } from "./modules/Button";

class Reader{
    webText = "";
    readonly CONTAINER_ID = "webrice";
    readonly TEXT_CONTENT_ID = "webRICE_text_container"

    public init(): void{
        this.createWebrice();
        //more things
    }

    private addListeners(id: string, button: Button){
        const physicalButton = document.getElementById(id);
        if(physicalButton) physicalButton.addEventListener("click", button.handleClick);
    }
    
    private getWebText(): string{
        return this.webText;
    }

    private setWebText(text: string): void{
        this.webText = text;
    }

    private loadThemes(): void{
        console.log("theme work");
    }

    private createWebrice(){
        const container = document.getElementById(this.CONTAINER_ID)!;
        //Player here at some point
        const earIconic = new earIcon("webriceEarIcon", "mainWebriceIcon");

        const mainPlayIcon = new playIcon("webricePlayIcon", "mainWebriceIcon");
        const mainPauseIcon = new pauseIcon("webricePauseIcon", "mainPauseIcon");
        const mainPlayPauseButton = new PlayPauseButton(earIconic, 
                                                    mainPlayIcon,
                                                    mainPauseIcon,
                                                    text.ButtonAlt.play, 
                                                    "webricePlayButton", 
                                                    text.ButtonTitle.play,
                                                    "webriceMainButton");
        container.appendChild(mainPlayPauseButton.createHTML());

        const mainStopIcon = new stopIcon("webriceStopIcon","mainWebriceIcon");
        const mainStopButton = new StopButton(mainStopIcon, 
                                                text.ButtonAlt.stop, 
                                                "webriceStopButton", 
                                                text.ButtonTitle.stop,
                                                "webriceMainButton");
        container.appendChild(mainStopButton.createHTML());

        const mainSpeedIcon = new speedIcon("webriceSpeedIcon", "mainWebriceIcon");
        const mainSpeedButton = new SpeedButton(mainSpeedIcon,
                                                text.ButtonAlt.speed,
                                                "webriceSpeedButton",
                                                text.ButtonTitle.speed,
                                                "webriceMainButton");
        container.appendChild(mainSpeedButton.createHTML());

        const mainSettingsIcon = new settingsIcon("webriceSettingsIcon", "mainWebriceIcon");
        const mainSettingsButton = new SettingsButton(mainSettingsIcon,
                                                        text.ButtonAlt.settings,
                                                        "webriceSettingsButton",
                                                        text.ButtonTitle.settings,
                                                        "webriceMainButton");
        container.appendChild(mainSettingsButton.createHTML());

        //Eventlisteners added to buttons 
        this.addListeners(mainPlayPauseButton.id, mainPlayPauseButton);
        this.addListeners(mainStopButton.id, mainStopButton);
        this.addListeners(mainSpeedButton.id, mainSpeedButton);
        this.addListeners(mainSettingsButton.id, mainSettingsButton);
    }

}

//change depending on exporting to npm or using the url from web

//for testing purpouses
window.addEventListener('DOMContentLoaded', () => {
    const webreader = new Reader();
    webreader.init()
});