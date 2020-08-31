import {Icon} from './icons';
import {Button} from './Button';

/**
 * An abstract button class that details what all buttons should have
 */
export abstract class MainButton extends Button {
  // eslint-disable-next-line no-invalid-this
  Icon: Icon;
  classes = '';
  /**
   *
   * @param {Icon} Icon - Icon on button
   * @param {string} alt - alt of button
   * @param {string} id - id of button
   * @param {string} title - title of utton
   * @param {string} classes - string containing classes of button
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
   * Examples of what to add could be Icons, classes or text.
   * @param {HTMLDivElement} button
   */
  protected additionalHTML(button: HTMLDivElement): void{
    button.classList.add('webriceMainButton');
    button.appendChild(this.buttonIcon.svg);
  }
}
