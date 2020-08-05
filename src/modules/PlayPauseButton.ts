import {Button} from "./Button";

export class PlayPauseButton extends Button{
    isPlaying: boolean;
    readonly TABINDX: string;
    constructor(svgElement: SVGSVGElement, alt: string, id: string, title: string){
        super(svgElement, alt, id, title);
        this.isPlaying = false;
        this.TABINDX = "1";
    }

    onClicked(): void{
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

    protected setTabindex(button: HTMLDivElement): void{
        button.setAttribute("tabindex", this.TABINDX);
    }

    getIsPlaying(): boolean{
        return this.isPlaying;
    }

    setIsPlaying(isPlaying: boolean): void{
        this.isPlaying = isPlaying;
    }
}