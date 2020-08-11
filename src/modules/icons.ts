import Color from 'color';

export abstract class icon{
    readonly ID: string;
    svg: SVGSVGElement;
    classlist = "";
    constructor(id: string, classlist?: string){
        this.ID = id;
        if(classlist)this.classlist = classlist;
        this.svg = this.createSvg();
    }
    protected createBasics(pathValue: string): SVGSVGElement{
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null,"class", this.classlist);
        svg.setAttributeNS(null, "id", this.ID);
        svg.setAttributeNS(null, "class", this.classlist);
        svg.setAttributeNS(null, "viewBox", "0 0 24 24");
        svg.setAttributeNS(null,"role","img");
        svg.setAttributeNS(null, "aria-hidden", "true");

        const firstPath = document.createElementNS("http://www.w3.org/2000/svg","path");
        firstPath.setAttributeNS(null,"d","M0 0h24v24H0z");
        firstPath.setAttributeNS(null,"fill", "none");
        svg.appendChild(firstPath);
        
        const secondPath = document.createElementNS("http://www.w3.org/2000/svg","path");
        secondPath.setAttributeNS(null,"d",pathValue);
        svg.appendChild(secondPath);
        return svg;
    }

    abstract createSvg(): SVGSVGElement;
}

//PlayIcon class
export class playIcon extends icon{
    constructor(id: string, classlist?: string){
        super(id, classlist);
    }

    createSvg(): SVGSVGElement{
        return this.createBasics("M8 5v14l11-7z");
    }
}

//StopIcon class
export class stopIcon extends icon{
    constructor(id: string, classlist?: string){
        super(id, classlist);
    }
    createSvg(): SVGSVGElement{
        return this.createBasics("M6 6h12v12H6z");
    }
}

//PauseIcon class
export class pauseIcon extends icon{
    constructor(id: string, classlist?: string){
        super(id, classlist);
    }
    createSvg(): SVGSVGElement{
        return this.createBasics("M6 19h4V5H6v14zm8-14v14h4V5h-4z");
    }
}

//earIcon class
export class earIcon extends icon{
    constructor(id: string, classlist?: string){
        super(id, classlist);
    }
    createSvg(): SVGSVGElement{
        return this.createBasics("M17 20c-.29 0-.56-.06-.76-.15-.71-.37-1.21-.88-1.71-2.38-.51-1.56-1.47-2.29-2.39-3-.79-.61-1.61-1.24-2.32-2.53C9.29 10.98 9 9.93 9 9c0-2.8 2.2-5 5-5s5 2.2 5 5h2c0-3.93-3.07-7-7-7S7 5.07 7 9c0 1.26.38 2.65 1.07 3.9.91 1.65 1.98 2.48 2.85 3.15.81.62 1.39 1.07 1.71 2.05.6 1.82 1.37 2.84 2.73 3.55.51.23 1.07.35 1.64.35 2.21 0 4-1.79 4-4h-2c0 1.1-.9 2-2 2zM7.64 2.64L6.22 1.22C4.23 3.21 3 5.96 3 9s1.23 5.79 3.22 7.78l1.41-1.41C6.01 13.74 5 11.49 5 9s1.01-4.74 2.64-6.36zM11.5 9c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z");
    }
}

//settingsIcon class
export class settingsIcon extends icon{
    constructor(id: string, classlist?: string){
        super(id, classlist);
    }

    createSvg(): SVGSVGElement{
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null, "id", this.ID);
        svg.setAttributeNS(null, "enable-background", "new 0 0 24 24");
        svg.setAttributeNS(null, "viewBox", "0 0 24 24");
        svg.setAttributeNS(null, "class", this.classlist);

        const firstG = document.createElementNS("http://www.w3.org/2000/svg","g");
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttributeNS(null,"fill","none");
        rect.setAttributeNS(null, "height", "24");
        rect.setAttributeNS(null, "width", "24");

        firstG.appendChild(rect);
        svg.appendChild(firstG);

        const secondG = document.createElementNS("http://www.w3.org/2000/svg","g");
        const thirdG = document.createElementNS("http://www.w3.org/2000/svg","g");
        const firstPath = document.createElementNS("http://www.w3.org/2000/svg","path");
        firstPath.setAttributeNS(null, "d","M14.17,13.71l1.4-2.42c0.09-0.15,0.05-0.34-0.08-0.45l-1.48-1.16c0.03-0.22,0.05-0.45,0.05-0.68s-0.02-0.46-0.05-0.69 l1.48-1.16c0.13-0.11,0.17-0.3,0.08-0.45l-1.4-2.42c-0.09-0.15-0.27-0.21-0.43-0.15L12,4.83c-0.36-0.28-0.75-0.51-1.18-0.69 l-0.26-1.85C10.53,2.13,10.38,2,10.21,2h-2.8C7.24,2,7.09,2.13,7.06,2.3L6.8,4.15C6.38,4.33,5.98,4.56,5.62,4.84l-1.74-0.7 c-0.16-0.06-0.34,0-0.43,0.15l-1.4,2.42C1.96,6.86,2,7.05,2.13,7.16l1.48,1.16C3.58,8.54,3.56,8.77,3.56,9s0.02,0.46,0.05,0.69 l-1.48,1.16C2,10.96,1.96,11.15,2.05,11.3l1.4,2.42c0.09,0.15,0.27,0.21,0.43,0.15l1.74-0.7c0.36,0.28,0.75,0.51,1.18,0.69 l0.26,1.85C7.09,15.87,7.24,16,7.41,16h2.8c0.17,0,0.32-0.13,0.35-0.3l0.26-1.85c0.42-0.18,0.82-0.41,1.18-0.69l1.74,0.7 C13.9,13.92,14.08,13.86,14.17,13.71z M8.81,11c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C10.81,10.1,9.91,11,8.81,11z");

        const secondPath = document.createElementNS("http://www.w3.org/2000/svg","path");
        secondPath.setAttributeNS(null, "d","M21.92,18.67l-0.96-0.74c0.02-0.14,0.04-0.29,0.04-0.44c0-0.15-0.01-0.3-0.04-0.44l0.95-0.74 c0.08-0.07,0.11-0.19,0.05-0.29l-0.9-1.55c-0.05-0.1-0.17-0.13-0.28-0.1l-1.11,0.45c-0.23-0.18-0.48-0.33-0.76-0.44l-0.17-1.18 C18.73,13.08,18.63,13,18.53,13h-1.79c-0.11,0-0.21,0.08-0.22,0.19l-0.17,1.18c-0.27,0.12-0.53,0.26-0.76,0.44l-1.11-0.45 c-0.1-0.04-0.22,0-0.28,0.1l-0.9,1.55c-0.05,0.1-0.04,0.22,0.05,0.29l0.95,0.74c-0.02,0.14-0.03,0.29-0.03,0.44 c0,0.15,0.01,0.3,0.03,0.44l-0.95,0.74c-0.08,0.07-0.11,0.19-0.05,0.29l0.9,1.55c0.05,0.1,0.17,0.13,0.28,0.1l1.11-0.45 c0.23,0.18,0.48,0.33,0.76,0.44l0.17,1.18c0.02,0.11,0.11,0.19,0.22,0.19h1.79c0.11,0,0.21-0.08,0.22-0.19l0.17-1.18 c0.27-0.12,0.53-0.26,0.75-0.44l1.12,0.45c0.1,0.04,0.22,0,0.28-0.1l0.9-1.55C22.03,18.86,22,18.74,21.92,18.67z M17.63,18.83 c-0.74,0-1.35-0.6-1.35-1.35s0.6-1.35,1.35-1.35s1.35,0.6,1.35,1.35S18.37,18.83,17.63,18.83z");
        
        thirdG.appendChild(firstPath);
        thirdG.appendChild(secondPath);
        secondG.appendChild(thirdG);
        svg.appendChild(secondG);
        return svg;
    }
}

export class speedIcon extends icon{
    constructor(id: string, classlist?: string){
        super(id, classlist);
    }
    createSvg(): SVGSVGElement{
            return this.createBasics("M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z");
    }
}

export class fastforwardIcon extends icon{
    constructor(id: string, classlist?: string){
        super(id, classlist);
    }
    createSvg(): SVGSVGElement{
        return this.createBasics("M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z");
    }
}

export class closeIcon extends icon{
    constructor(id: string, classlist?: string){
        super(id, classlist);
    }
    createSvg(): SVGSVGElement{
        return this.createBasics("M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
    }
}