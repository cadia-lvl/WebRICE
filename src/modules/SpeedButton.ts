import {Button} from "./Button";
import {icon} from "./icons";

export class SpeedButton extends Button{
    currentSpeed: number
    constructor(icon: icon, alt: string, id: string, title: string, classes?: string){
        super(icon, alt, id, title, classes);
        this.currentSpeed = 0;
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

    getCurrentSpeed(): number{
        return this.currentSpeed;
    }

    private setCurrentSpeed(speed: number): void{
        this.currentSpeed = speed;
    }
}