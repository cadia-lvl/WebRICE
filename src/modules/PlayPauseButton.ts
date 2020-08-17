import {Button} from './Button';
import {Icon} from './icons';

/**
 * Button that plays and pauses reading of a web page section
 */
export class PlayPauseButton extends Button {
  isPlaying: boolean;
  secondIcon: Icon;
  /**
   *
   * @param {Icon} icon - The main Icon of button
   * @param {Icon} secondIcon - The second Icon of button
   * @param {Icon} toggleIcon - The toggleable Icon of button
   * @param {string} alt - The alt text of button
   * @param {string} id - the id of button
   * @param {string} title - the title of button
   * @param {string} classes - the classes of button
   */
  constructor(Icon: Icon, secondIcon:Icon, toggleIcon: Icon,
      alt: string, id: string, title: string, classes?: string) {
    super(Icon, alt, id, title, classes);
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
   * Sets the visible main icon of the play button to be toggleIcon and stores the other icon.
   * For example: If the play icons is visible it changes to the pause icon and vice versa.
   */

  private toggleIcons(): void {
    // Changes play to pause and pause to play
  }

  /**
   * @return {Icon} returns the second Icon
   */
  get secondButtonIcon(): Icon {
    return this.secondIcon;
  }

  /**
   * @param {Icon} Icon - the second button Icon
   */
  set secondButtonIcon(Icon: Icon) {
    this.secondIcon = Icon;
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
