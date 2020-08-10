import {Button} from "./Button";
import{icon} from "./icons";

export class PlayPauseButton extends Button{
    isPlaying: boolean;
    constructor(icon: icon, alt: string, id: string, title: string, classes?: string){
        super(icon, alt, id, title, classes);
        this.isPlaying = false;
    }

    onClicked(): void{
        const thisButton = document.getElementById(this.buttonId);
        if(!thisButton) return;

        console.log()
        //const currentSVG = thisButton.removeChild();
        /*
        const expanded = document.getElementById(varConf.base.containerId);
        if(expanded){
            expanded.classList.remove("hideExpanded");
            expanded.classList.add("showExpanded");
        }*/
        /*const expanded = document.getElementById(varConf.base.containerId);
        if(expanded){
            expanded.classList.toggle("hideExpanded");
            expanded.classList.toggle("showExpanded");
        }*/
    }

    private toggleApperance(): void{
        //Changes play to pause and pause to play
    }

    getIsPlaying(): boolean{
        return this.isPlaying;
    }

    setIsPlaying(isPlaying: boolean): void{
        this.isPlaying = isPlaying;
    }
}