import {Button} from './Button';
import {icon} from './icons';

/**
 * Button that plays and pauses reading of a web page section
 */
export class PlayPauseButton extends Button {
  isPlaying: boolean;
  secondIcon: icon;
  /**
   *
   * @param {icon} icon - The main icon of button
   * @param {icon} secondIcon - The second icon of button
   * @param {icon} toggleIcon - The toggleable icon of button
   * @param {string} alt - The alt text of button
   * @param {string} id - the id of button
   * @param {string} title - the title of button
   * @param {string} classes - the classes of button
   */
  constructor(icon: icon, secondIcon:icon, toggleIcon: icon,
      alt: string, id: string, title: string, classes?: string) {
    super(icon, alt, id, title, classes);
    this.isPlaying = false;
    this.secondIcon = secondIcon;
  }

  /**
   * Starts the reading of a web section
   */
  onClicked(): void {
    console.log('clicked!');
  }

  /**
   * toggles the main
   */
  private toggleApperance(): void {
    // Changes play to pause and pause to play
  }

  /**
   * @return {icon} returns the second icon
   */
  get secondButtonIcon(): icon {
    return this.secondIcon;
  }

  /**
   * @param {icon} icon - the second button icon
   */
  set secondButtonIcon(icon: icon) {
    this.secondIcon = icon;
  }

  /**
   * @return {boolean} whether webrice is playing or not
   */
  get IsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * @param {boolean} isPlaying - sets the webrice is playing value
   */
  set IsPlaying(isPlaying: boolean) {
    this.isPlaying = isPlaying;
  }

  /**
   * @return {HTMLDivElement} returns the html for the button
   */
  createHTML(): HTMLDivElement {
    const button = document.createElement('div');
    button.id = this.id;
    button.setAttribute('role', 'button');
    button.setAttribute('alt', this.alt);
    button.setAttribute('title', this.title);
    button.setAttribute('tabindex', '0');

    if (this.classes !== '') button.classList.add(this.classes);

    button.appendChild(this.secondButtonIcon.svg);
    button.appendChild(this.buttonIcon.svg);
    return button;
  }
}
