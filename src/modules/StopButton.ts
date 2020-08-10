import {Button} from "./Button";
import{icon} from "./icons";

export class StopButton extends Button{
    constructor(icon: icon, alt: string, id: string, title: string, classes?: string){
        super(icon, alt, id, title, classes);
    }

    onClicked(): void{
        console.log("clicked!");
    }
}