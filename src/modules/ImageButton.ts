import {Button} from './Button';
import {Icon} from './icons';

/**
 * Closes a module
 */
export class ImageButton extends Button {
  Icon: Icon;
  /**
     * @param {Icon} Icon - Icon on button
     * @param {string} alt - alt of button
     * @param {string} id - id of button
     * @param {string} title - title of utton
     */
  constructor(Icon: Icon, alt: string, id: string,
      title: string) {
    super(alt, id, title);
    this.Icon = Icon;
  }

  /**
   * Setter for Icon
   * @param {Icon} newIcon - replace current Icon with this Icon
   */
  protected set buttonIcon(newIcon: Icon) {
    this.Icon = newIcon;
  }

  /**
   * Getter for Icon
   * @return {Icon} - returns the button Icon
   */
  protected get buttonIcon(): Icon {
    return this.Icon;
  }

  /**
   * Adds to the button html
   * without the neccisary base being affected.
   * Examples of what to add could be Icons, classes or text.
   * @param {HTMLDivElement} button
   */
  protected additionalHTML(button: HTMLDivElement): void{
    button.appendChild(this.buttonIcon.svg);
  }
}
