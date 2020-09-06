/**
 * An abstract button class that details what all buttons should have
 */
export abstract class Button {
  altText: string;
  readonly buttonId: string;
  titleText: string;

  /**
   * @param {string} alt - alt of button
   * @param {string} id - id of button
   * @param {string} title - title of utton
   * @param {string} classes - string containing classes of button
   */
  constructor(alt: string, id: string, title: string) {
    this.altText = alt;
    this.buttonId = id;
    this.titleText = title;
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
   * Adds to the button html
   * without the neccisary base being affected.
   * Examples of what to add could be icons, classes or text.
   * @param {HTMLDivElement} button
   */
  protected abstract additionalHTML(button: HTMLDivElement): void;

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
    this.additionalHTML(button);
    return button;
  }
}
