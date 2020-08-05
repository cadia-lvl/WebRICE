export abstract class Button{
    svg: SVGSVGElement;
    altText: string;
    buttonId: string;
    titleText: string;
    constructor(svgElement: SVGSVGElement, alt: string, id: string, title: string){
        this.svg = svgElement;
        this.altText = alt;
        this.buttonId = id;
        this.titleText = title;
    }

    protected setSvg(newSvg: SVGSVGElement): void{
        this.svg = newSvg;
    }

    protected getSvg(): SVGSVGElement{
        return this.svg;
    }

    protected setAltText(alt: string): void{
        this.altText = alt;
    }

    protected getAltText(): string{
        return this.altText;
    }

    protected setButtonId(id: string): void{
        this.buttonId = id;
    }

    public getButtonId(): string{
        return this.buttonId;
    }

    protected setTitleText(title: string): void{
        this.titleText = title;
    }

    protected getTitleText(): string{
        return this.titleText;
    }

    abstract onClicked(): void;

    protected abstract setTabindex(button: HTMLDivElement): void;
    
    public createHTML(): HTMLDivElement{
        const button = document.createElement("div");
        button.id = this.buttonId;
        button.setAttribute("role", "button");
        button.setAttribute("alt",this.altText);
        button.setAttribute("title",this.titleText);
        this.setTabindex(button);
        button.appendChild(this.svg);
        return button;
    }

}