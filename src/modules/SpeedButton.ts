import {Button} from "./Button";

export class SpeedButton extends Button{
    currentSpeed: number
    readonly TABINDX: string
    constructor(svgElement: SVGSVGElement, alt: string, id: string, title: string){
        super(svgElement, alt, id, title);
        this.currentSpeed = 0;
        this.TABINDX = "3";
    }

    onClicked(): void{
        console.log("clicked!");
    }

    speedUp(increase: number): void{
        console.log("to be implemented");
    }

    slowDown(decrease: number): void{
        console.log("to be implemented");
    }

    protected setTabindex(button: HTMLDivElement): void{
        button.setAttribute("tabindex", this.TABINDX);
    }

    getCurrentSpeed(): number{
        return this.currentSpeed;
    }

    private setCurrentSpeed(speed: number): void{
        this.currentSpeed = speed;
    }
}