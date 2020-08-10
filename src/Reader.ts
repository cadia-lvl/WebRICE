import {SettingsButton} from "./modules/SettingsButton";
import {PlayPauseButton} from "./modules/PlayPauseButton";
import {StopButton} from "./modules/StopButton";
import {SpeedButton} from "./modules/SpeedButton";
import{text} from "./lang/is";
import {playIcon, stopIcon, pauseIcon, earIcon, settingsIcon, speedIcon, fastforwardIcon,closeIcon} from "./modules/icons";

class Reader{
    webText = "";
    readonly CONTAINER_ID = "webrice";
    readonly TEXT_CONTENT_ID = "webRICE_text_container"

    public init(): void{
        this.createWebrice();
        //more things
    }

    private addListeners(id: string, functionName: EventListenerOrEventListenerObject){
        const physicalButton = document.getElementById(id);
        if(physicalButton) physicalButton.addEventListener("click", functionName);
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
        const container = document.getElementById(this.CONTAINER_ID);
        if(!container) return;
        //Player here at some point
        const miscContainer = document.createElement("div");
        miscContainer.setAttribute("id", "webriceDuoCont");

        const mainEarIcon = new earIcon("webriceEarIcon");
        miscContainer.appendChild(mainEarIcon.svg);

        const mainSettingsIcon = new settingsIcon("webriceSettingsIcon", "mainWebriceIcon");
        const mainSettingsButton = new SettingsButton(mainSettingsIcon,
                                                        text.ButtonAlt.settings,
                                                        "webriceSettingsButton",
                                                        text.ButtonTitle.settings);
        miscContainer.appendChild(mainSettingsButton.createHTML());

        container.appendChild(miscContainer);

        const mainPlayIcon = new playIcon("webricePlayIcon", "mainWebriceIcon");
        const mainPlayPauseButton = new PlayPauseButton(mainPlayIcon, 
                                                    text.ButtonAlt.play, 
                                                    "webricePlayButton", 
                                                    text.ButtonTitle.play,
                                                    "webriceMainButton");
        container.appendChild(mainPlayPauseButton.createHTML());

        const mainFastforwardIcon = new fastforwardIcon("webriceFastforwardIcon", "mainWebriceIcon");
        const mainFastforwardButton = document.createElement("div");
        mainFastforwardButton.classList.add("webriceMainButton");
        mainFastforwardButton.appendChild(mainFastforwardIcon.svg);
        container.appendChild(mainFastforwardButton);

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

        //Eventlisteners added to buttons 
        this.addListeners(mainPlayPauseButton.getButtonId(), mainPlayPauseButton.onClicked);
        this.addListeners(mainStopButton.getButtonId(), mainStopButton.onClicked);
        this.addListeners(mainSpeedButton.getButtonId(), mainSpeedButton.onClicked);
        this.addListeners(mainSettingsButton.getButtonId(), mainSettingsButton.onClicked);
    }


    /*

    const stopButtonClass = new Stop(varConf.stopB.imagePath, 
                                    text.imageAlt.stop, 
                                    varConf.stopB.id, 
                                    text.imageTitle.stop);
    
    const speedButtonClass = new Speed(varConf.speedB.imagePath, 
                                        text.imageAlt.speed, 
                                        varConf.speedB.id, 
                                        text.imageTitle.speed);

    const settingsButtonClass = new Settings(varConf.settingsB.imagePath, 
                                            text.imageAlt.settings, 
                                            varConf.settingsB.id, 
                                            text.imageTitle.settings, 
                                            text.settings.userText);

    miniWebrice.appendChild(earImage);
    miniWebrice.appendChild(playPauseButtonClass.createHTML());
    expandedWebrice.appendChild(stopButtonClass.createHTML());
    expandedWebrice.appendChild(speedButtonClass.createHTML());
    //expandedWebrice.appendChild(settingsButtonClass.createHTML());
    miniWebrice.appendChild(expandedWebrice);

    if(container){
        container.classList.add("hideExpanded");
        container.appendChild(miniWebrice);
        container.appendChild(expandedWebrice);
    }
    
    //Eventlisteners added to buttons 
    this.addListeners(varConf.playPauseB.id, playPauseButtonClass.onClicked);
    this.addListeners(varConf.stopB.id, stopButtonClass.onClicked);
    this.addListeners(varConf.speedB.id, speedButtonClass.onClicked);
    //this.addListeners(varConf.settingsB.id, settingsButtonClass.onClicked);
    }*/

}

//change depending on exporting to npm or using the url from web

//for testing purpouses
window.addEventListener('DOMContentLoaded', () => {
    const webreader = new Reader();
    webreader.init()
});