import {Button} from "./Button";

export class StopButton extends Button{
    readonly TABINDX: string;
    constructor(svgElement: SVGSVGElement, alt: string, id: string, title: string){
        super(svgElement, alt, id, title);
        this.TABINDX = "2";
    }

    protected setTabindex(button: HTMLDivElement): void{
        button.setAttribute("tabindex", this.TABINDX);
    }

    onClicked(): void{
        console.log("clicked!");
    }
}