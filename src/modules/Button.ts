import{icon} from "./icons";

export abstract class Button{
    icon: icon;
    altText: string;
    buttonId: string;
    titleText: string;
    classes: string = "";
    constructor(icon: icon, alt: string, id: string, title: string, classes?: string){
        this.icon = icon;
        this.altText = alt;
        this.buttonId = id;
        this.titleText = title;
        if(classes) this.classes = classes;
    }

    protected setIcon(newIcon: icon): void{
        this.icon = newIcon;
    }

    protected getIcon(): icon{
        return this.icon;
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
    
    public createHTML(): HTMLDivElement{
        const button = document.createElement("div");
        button.id = this.buttonId;
        button.setAttribute("role", "button");
        button.setAttribute("alt",this.altText);
        button.setAttribute("title",this.titleText);
        button.setAttribute("tabindex", "0");
        if(this.classes !== "") button.classList.add(this.classes);
        button.appendChild(this.icon.svg);
        return button;
    }

}