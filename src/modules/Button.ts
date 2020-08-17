import {Icon} from './icons';

/**
 * An abstract button class that details what all buttons should have
 */
export abstract class Button {
  Icon: Icon;
  altText: string;
  readonly buttonId: string;
  titleText: string;
  classes = '';
  // eslint-disable-next-line no-invalid-this
  handleClick = this.onClicked.bind(this);
  /**
   *
   * @param {Icon} Icon - Icon on button
   * @param {string} alt - alt of button
   * @param {string} id - id of button
   * @param {string} title - title of utton
   * @param {string} classes - string containing classes of button
   */
  constructor(Icon: Icon, alt: string, id: string,
      title: string, classes?: string) {
    this.Icon = Icon;
    this.altText = alt;
    this.buttonId = id;
    this.titleText = title;


    if (classes) this.classes = classes;
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
   * Setter for alt text
   * @param {string} alt - alt text
   */
  protected set alt(alt: string) {
    this.altText = alt;
  }

  /**
   * Getter for alt text
   * @return {string} - alt text
   */
  protected get alt(): string {
    return this.altText;
  }

  /**
   * Getter for id
   * @return {string} - button id
   */
  public get id(): string {
    return this.buttonId;
  }

  /**
   * Setter for button title
   * @param {string} title - button title
   */
  protected set title(title: string) {
    this.titleText = title;
  }

  /**
   * Getter for button title
   * @return {string} - button title
   */
  protected get title(): string {
    return this.titleText;
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
   * Handles onCLick() event of buttons
   */
  abstract onClicked(): void;

  /**
   * Creates the button html
   * @return {HTMLDivElement} - button html
   */
  public createHTML(): HTMLDivElement {
    const button = document.createElement('div');
    button.id = this.id;
    button.setAttribute('role', 'button');
    button.setAttribute('alt', this.alt);
    button.setAttribute('title', this.title);
    button.setAttribute('tabindex', '0');

    if (this.classes !== '') button.classList.add(this.classes);

    button.appendChild(this.buttonIcon.svg);
    return button;
  }
}
