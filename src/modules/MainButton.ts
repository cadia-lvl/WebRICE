import {Icon} from './icons';
import {Button} from './Button';

/**
 * An abstract button class that details what all buttons should have
 */
export abstract class MainButton extends Button {
  // eslint-disable-next-line no-invalid-this
  icon: Icon;
  classes = '';
  /**
   *
   * @param {Icon} icon - icon on button
   * @param {string} alt - alt of button
   * @param {string} id - id of button
   * @param {string} title - title of utton
   * @param {string} classes - string containing classes of button
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
   * Getter for classlist
   * @return {string} - button class list
   */
  public get classList(): string {
    return this.classes;
  }

  /**
   * Setter for classlist
   * @param {string} classes - class list
   */
  public set classList(classes: string) {
    this.classes = classes;
  }

  /**
   * Adds to the button html
   * without the neccisary base being affected.
   * Examples of what to add could be icons, classes or text.
   * @param {HTMLDivElement} button
   */
  protected additionalHTML(button: HTMLDivElement): void {
    button.classList.add('webriceMainButton');
    button.appendChild(this.buttonIcon.svg);
  }
}
