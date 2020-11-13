import {Button} from './Button';
import {Icon} from './icons';

/**
 * Closes a module
 */
export class ImageButton extends Button {
  icon: Icon;
  /**
     * @param {Icon} icon - icon on button
     * @param {string} alt - alt of button
     * @param {string} id - id of button
     * @param {string} title - title of utton
     */
  constructor(icon: Icon, alt: string, id: string,
      title: string) {
    super(alt, id, title);
    this.icon = icon;
  }

  /**
   * Setter for icon
   * @param {Icon} newIcon - replace current icon with this icon
   */
  protected set buttonIcon(newIcon: Icon) {
    this.icon = newIcon;
  }

  /**
   * Getter for icon
   * @return {Icon} - returns the button icon
   */
  protected get buttonIcon(): Icon {
    return this.icon;
  }

  /**
   * Adds to the button html
   * without the neccisary base being affected.
   * Examples of what to add could be icons, classes or text.
   * @param {HTMLDivElement} button
   */
  protected additionalHTML(button: HTMLDivElement): void {
    button.appendChild(this.buttonIcon.svg);
  }
}
