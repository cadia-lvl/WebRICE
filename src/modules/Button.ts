import {icon} from "./icons";

export abstract class Button{
    icon: icon;
    altText: string;
    readonly buttonId: string;
    titleText: string;
    classes = "";
    handleClick = this.onClicked.bind(this);
    constructor(icon: icon, alt: string, id: string, title: string, classes?: string){
        this.icon = icon;
        this.altText = alt;
        this.buttonId = id;
        this.titleText = title;
        if(classes) this.classes = classes;
    }

    protected set buttonIcon(newIcon: icon){
        this.icon = newIcon;
    }

    protected get buttonIcon(): icon{
        return this.icon;
    }

    protected set alt(alt: string){
        this.altText = alt;
    }

    protected get alt(): string{
        return this.altText;
    }

    public get id(): string{
        return this.buttonId;
    }

    protected set title(title: string){
        this.titleText = title;
    }

    protected get title(): string{
        return this.titleText;
    }

    public get classList(): string{
        return this.classes;
    }

    public set classList(classes: string){
        this.classes = classes;
    }

    abstract onClicked(this: any): void;
    
    public createHTML(): HTMLDivElement{
        const button = document.createElement("div");
        button.id = this.id;
        button.setAttribute("role", "button");
        button.setAttribute("alt",this.alt);
        button.setAttribute("title",this.title);
        button.setAttribute("tabindex", "0");
        if(this.classes !== "") button.classList.add(this.classes);
        button.appendChild(this.buttonIcon.svgHtml);
        return button;
    }

}