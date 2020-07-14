export class Reader{
    webText = "";
    readonly CONTAINER_ID = "container_id";
    readonly TEXT_CONTENT_ID = "webrice";
    constructor(){
        this.init();
    }
    public init(): void{
        console.log("initialize the reader");
    }

    private createInitialHTML(): void{
        console.log("creates the initial html");
    }

    public getWebText(): string{
        return this.webText;
    }

    private setWebText(text: string): void{
        this.webText = text;
    }

    public getContainerId(): string{
        return this.CONTAINER_ID;
    }

    public getTextContentId(): string{
        return this.TEXT_CONTENT_ID;
    }

    private loadThemes(): void{
        console.log("theme work");
    }


}
window.addEventListener('DOMContentLoaded', () => {
    new Reader();
});