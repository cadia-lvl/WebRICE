import Color from 'color';

export interface stylingInterface {
  backgroundColor?: string,
  secondaryColor?:string,
  // borderColor?:string,
  // borderWidth?:string,
  // iconSize?: string,
  includeGradient?: boolean,
}

/**
 * Applies custom style choices to webrice web reader.
 */
export class CustomStyles {
  private readonly GRADIENT_CONTRAST = 1.3;
  // Images fall under Graphical Objects and User Interface Components
  private readonly MIN_CONTRAST = 3;
  private container = document.getElementById('webrice')!;
  private readonly CSS_VARS = {
    backgroundColors: {
      darkerColor: '--main-color-one',
      lighterColor: '--main-color-two',
      main: '--main-background',
    },
    secondaryColors: {
      darkerColor: '--secondary-color-one',
      lighterColor: '--secondary-color-two',
      main: '--secondary-background',
    },
    border: {
      color: '--border-color',
      width: '--border-width',
    },
    icons: {
      size: '--icon-size',
    },
  };

  /**
   * Fetches the value of a css variable, given it exists
   * @param {string} variable - css variable
   * @return {string} - value of variable
   */
  private getWebriceVarVal(variable: string): string {
    return window.getComputedStyle(this.container).getPropertyValue(variable)!;
  }

  /**
   * Sets css variable to a value
   * @param {string} webRVar - css variable
   * @param {string} customVal - value
   */
  private setWebriceCustomVal(webRVar: string, customVal: string): void {
    this.container.style.setProperty(webRVar, customVal);
  }

  /**
   * Applies changes to webrice
   * @param {Map<string, any>} choices - map of choices
   * @param {Array<string>} choiceKind - contains all possible choices types
   * @param {boolean} isGradient - wheather buttons should have gradiance or not
   */
  private applyChanges(choices: Map<string, any>, choiceKind: Array<string>,
      isGradient: boolean): void {
    // Set main color

    if (choices.has(choiceKind[0]) && isGradient) {
      this.setWebriceCustomVal(this.CSS_VARS.backgroundColors.darkerColor,
          choices.get(choiceKind[0]).darkerColor);
      this.setWebriceCustomVal(this.CSS_VARS.backgroundColors.lighterColor,
          choices.get(choiceKind[0]).lighterColor);
    } else if (choices.has(choiceKind[0])) {
      this.setWebriceCustomVal(this.CSS_VARS.backgroundColors.main,
          choices.get(choiceKind[0]).darkerColor);
      this.setWebriceCustomVal(this.CSS_VARS.backgroundColors.darkerColor,
          choices.get(choiceKind[0]).darkerColor);
    }

    // Set secondary color
    if (choices.has(choiceKind[1]) && isGradient) {
      this.setWebriceCustomVal(this.CSS_VARS.secondaryColors.lighterColor,
          choices.get(choiceKind[1]).lighterColor);
      this.setWebriceCustomVal(this.CSS_VARS.secondaryColors.darkerColor,
          choices.get(choiceKind[1]).darkerColor);
    } else if (choices.has(choiceKind[1])) {
      this.setWebriceCustomVal(this.CSS_VARS.secondaryColors.main,
          choices.get(choiceKind[1]).darkerColor);
      this.setWebriceCustomVal(this.CSS_VARS.secondaryColors.darkerColor,
          choices.get(choiceKind[1]).darkerColor);
    }

    // Add for border and icon later
  }

  /**
   * Creates a lighter color from color
   * @param {Color} color - base color
   * @return {{darkerColor: string, lighterColor: string}}
   *    - color and generated color
   */
  private lighten(color: Color): {darkerColor: string, lighterColor: string} {
    let lighter = color.lighten(0.01);
    const white = new Color('#fff');
    if (color.hex() === lighter.hex()) lighter = color.mix(white, 0.1);
    let colorContrast = color.contrast(lighter);
    while (colorContrast < this.GRADIENT_CONTRAST) {
      lighter = lighter.lighten(0.05);
      colorContrast = color.contrast(lighter);
    }
    console.log({darkerColor: color.hex(), lighterColor: lighter.hex()});
    return {darkerColor: color.hex(), lighterColor: lighter.hex()};
  }

  /**
   * Creates a darker color from color
   * @param {Color} color - base color
   * @return {{darkerColor: string, lighterColor: string}}
   *    - color and generated color
   */
  private darken(color: Color): {darkerColor: string, lighterColor: string} {
    let darker = color.darken(0.01);
    let colorContrast = darker.contrast(color);
    while (colorContrast < this.GRADIENT_CONTRAST) {
      darker = darker.darken(0.01);
      colorContrast = darker.contrast(color);
    }
    console.log({darkerColor: darker.hex(), lighterColor: color.hex()});
    return {darkerColor: darker.hex(), lighterColor: color.hex()};
  }
  /**
   * Finds out wheather to generate a darker or lighter color.
   * @param {Color} color - base color
   * @return {{darkerColor: string, lighterColor: string}}
   *    - returns darker and lighter color
   */
  private getColors(color: Color) {
    return color.isDark() ? this.lighten(color) :this.darken(color);
  }

  /**
   * Checks wether the darker and lighter colors have enough contrast.
   * If not a warning is printed.
   * @param {Color} darkerCompare - darker color to compear
   * @param {Color} color - base color
   * @param {Color} lighterCompare -lighter color to compear
   */
  private checkBadConstrast(darkerCompare: Color,
      color: Color, lighterCompare?: Color,): void {
    let contrast:number;
    if (lighterCompare) {
      contrast = color.isDark() ?
          color.contrast(darkerCompare) :
          color.contrast(lighterCompare);
    } else contrast = color.contrast(darkerCompare);

    if (contrast < this.MIN_CONTRAST) {
      console.warn(
          `Contrast between main and secondary colors of web reader`+
          ` is ${contrast.toFixed(2)} but should be at least`+
          ` ${this.MIN_CONTRAST} to meet accessibility standards!`);
    }
  }

  /**
   * checks weather the borderwidth is valid or not
   * @param {string} width - border width
   * @return {boolean} - whether border is valid or not
   */
  private checkBorderWidth(width: string): boolean {
    // userChoices.set(keys[2], {width: options.borderWidth})
    return false;
  }

  /**
   * checks wether the icon size is valid or not
   * @param {string} size - size of icon
   * @return {boolean} - icon in acceptable size
   */
  private checkIconSize(size: string): boolean {
    return false;
  }

  /**
   * returns weather a string can be turned to a color or not
   * @param {string} given - the given color
   * @return {boolean} - true if string can be color, else false
   */
  private validColor(given: string): boolean {
    try {
      new Color(given);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  }

  /**
   * Accepts an object of user styles and applies them to webrice
   * @param {object} options - contains choices
   */
  public changeStyles(options: stylingInterface): void {
    console.log(options);
    const userChoices = new Map<string, any>();
    const keys = ['backgroundColors', 'secondaryColors', 'border', 'icon'];

    let includeGradient = true;
    if (options.includeGradient === false) includeGradient = false;

    let validBackgroundColor = false;
    if (options.backgroundColor) {
      validBackgroundColor = this.validColor(
          options.backgroundColor);
    }

    let validSecondaryColor = false;
    if (options.secondaryColor) {
      validSecondaryColor = this.validColor(
          options.secondaryColor);
    }

    if (!validSecondaryColor && !validBackgroundColor && includeGradient) {
      console.warn('Included gradient but no colors given');
    }

    if (validBackgroundColor && includeGradient) {
      userChoices.set(keys[0],
          this.getColors(new Color(options.backgroundColor)));
    } else if (validBackgroundColor) {
      userChoices.set(keys[0],
          {darkerColor: options.backgroundColor});
    }

    if (validSecondaryColor && includeGradient) {
        userChoices.has(keys[0]) ?
          this.checkBadConstrast(
              new Color(userChoices.get(keys[0]).darkerColor),
              new Color(options.secondaryColor),
              new Color(userChoices.get(keys[0]).lighterColor)) :
          this.checkBadConstrast(
              new Color(this.getWebriceVarVal(
                  this.CSS_VARS.backgroundColors.darkerColor).replace(' ', '')),
              new Color(options.secondaryColor),
              new Color(this.getWebriceVarVal(
                  this.CSS_VARS.backgroundColors.lighterColor)
                  .replace(' ', '')));
        userChoices.set(keys[1], this.getColors(
            new Color(options.secondaryColor)));
    } else if (validSecondaryColor) {
        userChoices.has(keys[0]) ?
            this.checkBadConstrast(
                new Color(userChoices.get(keys[0]).darkerColor),
                new Color(options.secondaryColor)) :
            this.checkBadConstrast(
                new Color(this.getWebriceVarVal(
                    this.CSS_VARS.backgroundColors.darkerColor)
                    .replace(' ', '')),
                new Color(options.secondaryColor));

        userChoices.set(keys[1], this.getColors(
            new Color(options.secondaryColor)));
    }
    /*
    Implement later

    // border color

    // border width

    // icon size
    */

    this.applyChanges(userChoices, keys, includeGradient);
  }
}
