import Color from 'color';

export interface stylingInterface {
    backgroundColor?: string,
    secondaryColor?:string,
    //borderColor?:string,
    //borderRad?:string,
    //borderWidth?:string,
    //iconSize?: string,
    includeGradient?: boolean,
}

export class customStyles{
    private readonly GRADIENT_CONTRAST = 1.3;
    private readonly ITEM_CONTRAST = 4.5;
    private container = document.getElementById("webrice")!;
    //Stores the default values of css variables of webrice
    private readonly defaultStorage = {
        backgroundColors: {
            darkerColor: this.getWebriceVarVal("--main-color-one"),
            lighterColor: this.getWebriceVarVal("--main-color-two")
        },
        secondaryColors: {
            darkerColor: this.getWebriceVarVal("--secondary-color-one"),
            lighterColor: this.getWebriceVarVal("--secondary-color-two")
        },
        border: {
            color: this.getWebriceVarVal("--border-color"),
            width: this.getWebriceVarVal("--border-width"),
        },
        icons: {
            size: this.getWebriceVarVal("--icon-size"),
        }
    };

    /**
     * get's the value of variable, given it's a css variable
     * @param variable 
     */
    private getWebriceVarVal(variable: string): string{
        return window.getComputedStyle(this.container).getPropertyValue(variable)!;
    }

    /**
     * Sets the css varianle webRVar to the custom value of customVal
     * @param webRVar 
     * @param customVal 
     */
    private setWebriceCustomVal(webRVar: string, customVal: string): void{
        this.container.style.setProperty(webRVar, customVal);
    }

    /**
     * Takes in the user choices, their keys for convinience and wether to 
     * include gradience of buttons or not
     * @param choices 
     * @param keys 
     * @param isGradient 
     */
    private applyChanges(choices: Map<string, any>, keys: Array<string>, isGradient: boolean): void{
        //Set main color 
        if(choices.has(keys[0]) && isGradient){
            this.setWebriceCustomVal("--main-color-one", choices.get(keys[0]).darkerColor);
            this.setWebriceCustomVal("--main-color-two", choices.get(keys[0]).lighterColor);
        }
        else if(choices.has(keys[0])){
            this.setWebriceCustomVal("--main-background", choices.get(keys[0]).darkerColor);
            this.setWebriceCustomVal("--main-color-one", choices.get(keys[0]).darkerColor);
        }

        //Set secondary color
        if(choices.has(keys[1]) && isGradient){
            console.log(choices.get(keys[1]));
            this.setWebriceCustomVal("--secondary-color-one", choices.get(keys[1]).lighterColor);
            this.setWebriceCustomVal("--secondary-color-two", choices.get(keys[1]).darkerColor);
        }
        else if(choices.has(keys[1])){
            this.setWebriceCustomVal("--secondary-background", choices.get(keys[1]).darkerColor);
            this.setWebriceCustomVal("--secondary-color-one", choices.get(keys[1]).darkerColor);
        }

    }

    /**
     * Takes in a color an returns it and a lighter color as an object. 
     * The color contrast is at least this.GRADIENT_CONTRAST.
     * @param color 
     */
    private darken(color: Color){
        let lighter = color.lighten(0.01);
        if(color.hex() === lighter.hex()) lighter = color.mix(Color("#fff"), 0.1); 
        let colorContrast = color.contrast(lighter);
        while(colorContrast < this.GRADIENT_CONTRAST){
            lighter = lighter.lighten(0.05);
            colorContrast = color.contrast(lighter);
        }
        return {darkerColor: color.hex(), lighterColor: lighter.hex() };
    }

    /**
     * Takes in a color and returns it and a darker color in an object. The colors contrast  
     * is at least this.GRADIENT_CONTRAST.
     * @param color 
     */
    private lighten(color: Color){
        let darker = color.darken(0.01);
        let colorContrast = darker.contrast(color);
        while(colorContrast < this.GRADIENT_CONTRAST){
            darker = darker.darken(0.01);
            colorContrast = darker.contrast(color);
        }
        return {darkerColor: darker.hex(), lighterColor: color.hex()};
    }
    /**
     * returns an object of a darker and lighter color. One of the colors
     * is the given one while the second is generated to be lighter or darker.
     * The color contrast is at least this.GRADIENT_CONTRAST
     * @param color 
     */
    private getColors(color: Color){
        return color.isDark() ? this.darken(color) : this.lighten(color); 
    }

    /**
     * returns an object of one or two colors which complement the given color/s. 
     * @param darkerColor 
     * @param lighterColor 
     */
    private handleNoGivenSecondaryColor(darkerColor: Color, lighterColor?: Color){
        //if()
    }

    //Generates a complementary border color based on the background color
    private handleNoGivenBorder(baseColor: Color){

    }

    /**
     * Checks wether the darker and lighter colors have enough contrast with the given color.
     * If not a warning is printed.
     * @param darkerCompare 
     * @param color 
     * @param lighterCompare 
     */
    private checkBadConstrast(darkerCompare: Color, color: Color, lighterCompare?: Color,){
        let contrast:number;
        if(lighterCompare){
            contrast = color.isDark() ? color.contrast(darkerCompare) : color.contrast(lighterCompare);
        }
        else contrast =  color.contrast(darkerCompare);
        if(contrast < this.ITEM_CONTRAST){
            console.warn(`Contrast between main and secondary colors of web reader is ${contrast.toFixed(2)} but should be at least 4.5 to meet accessibility standards!`);
        }
    }

    /**
     * checks weather the borderwidth is valid or not
     * @param width 
     */
    private checkBorderWidth(width: string): boolean{
        //userChoices.set(keys[2], {width: options.borderWidth})
        return false;
    }

    /**
     * checks wether the icon size is valid or not
     * @param size 
     */
    private checkIconSize(size: string): boolean{
        return false;
    }

    /**
     * Accepts an object of user styles and applies them to webrice
     * @param options 
     */
    public changeStyles(options: stylingInterface): void{
        let userChoices = new Map<string, any>();
        const keys = ["backgroundColors", "SecondaryColors", "border", "icon"];
        let includeGradient = true;
        if(options.includeGradient === false) includeGradient = false;

        if(options.backgroundColor && includeGradient) userChoices.set(keys[0], this.getColors(Color(options.backgroundColor)));
        else userChoices.set(keys[0], {darkerColor: options.backgroundColor});

        if(options.secondaryColor && includeGradient){
            userChoices.has(keys[0]) ? this.checkBadConstrast(Color(userChoices.get(keys[0]).darkerColor),Color(options.secondaryColor), Color(userChoices.get(keys[0]).lighterColor)) : this.checkBadConstrast(Color(this.defaultStorage.backgroundColors.darkerColor), Color(options.secondaryColor), Color(this.defaultStorage.backgroundColors.lighterColor));
            userChoices.set(keys[1], this.getColors(Color(options.secondaryColor)));
        }
        else if(options.secondaryColor){
            userChoices.has(keys[0]) ? this.checkBadConstrast(Color(userChoices.get(keys[0]).darkerColor),Color(options.secondaryColor)) : this.checkBadConstrast(Color(this.defaultStorage.backgroundColors.darkerColor), Color(options.secondaryColor));
            userChoices.set(keys[1], this.getColors(Color(options.secondaryColor)));
        }
        else {
            const backgroundColors = userChoices.has(keys[0]) ? userChoices.get(keys[0]) : this.defaultStorage.backgroundColors;
            includeGradient ? this.handleNoGivenSecondaryColor(Color(backgroundColors.darkerColor), (backgroundColors.lighterColor)) : this.handleNoGivenSecondaryColor(Color(backgroundColors.darkerColor));
        }

        /*
        Implement later

        if(options.borderColor) userChoices.set(keys[2], {color: options.borderColor});
        else this.handleNoGivenBorder(Color(options.backgroundColor));

        if(options.borderWidth) this.checkBorderWidth(options.borderWidth);
        if(options.iconSize) this.checkIconSize(options.iconSize);*/

        this.applyChanges(userChoices, keys, includeGradient);
    }
}