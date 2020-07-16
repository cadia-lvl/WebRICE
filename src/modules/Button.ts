export abstract class Button{
    image: string;
    altText: string;
    buttonId: string;
    titleText: string;
    constructor(img: string, alt: string, id: string, title: string){
        this.image = img;
        this.altText = alt;
        this.buttonId = id;
        this.titleText = title;
    }

    protected setImage(img: string): void{
        this.image = img;
    }

    protected getImage(): string{
        return this.image;
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

    protected getButtonId(): string{
        return this.buttonId;
    }

    protected setTitleText(title: string): void{
        this.titleText = title;
    }

    protected getTitleText(): string{
        return this.titleText;
    }

    abstract onClicked(): void;
    
    public createHTML(): any{
        const button = document.createElement("button");
        button.id = this.buttonId;
        const img = new Image();
        img.setAttribute("src", this.image);
        img.setAttribute("alt",this.altText);
        img.setAttribute("title",this.titleText);
        button.appendChild(img);
        console.log(typeof(button));
        return button;
    }



}