import {Button} from "./Button";
import {icon} from "./icons";

export class PlayPauseButton extends Button{
    isPlaying: boolean;
    secondIcon: icon;
    constructor(icon: icon, secondIcon:icon, toggleIcon: icon, alt: string, id: string, title: string, classes?: string){
        super(icon, alt, id, title, classes);
        this.isPlaying = false;
        this.secondIcon = secondIcon;
    }

    onClicked(): void{
        console.log("clicked!");
    }

    private toggleApperance(): void{
        //Changes play to pause and pause to play
    }

    get secondButtonIcon(): icon{
        return this.secondIcon;
    }

    set secondButtonIcon(icon: icon){
        this.secondIcon = icon;
    }

    get IsPlaying(): boolean{
        return this.isPlaying;
    }

    set IsPlaying(isPlaying: boolean){
        this.isPlaying = isPlaying;
    }

    createHTML(): HTMLDivElement{
        const button = document.createElement("div");
        button.id = this.id;
        button.setAttribute("role", "button");
        button.setAttribute("alt",this.alt);
        button.setAttribute("title",this.title);
        button.setAttribute("tabindex", "0");
        if(this.classes !== "") button.classList.add(this.classes);
        button.appendChild(this.buttonIcon.svg);
        button.appendChild(this.secondButtonIcon.svg);
        return button;
    }

}