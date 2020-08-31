import {MainButton} from './MainButton';
import {Icon} from './icons';

/**
 * Button that plays and pauses reading of a web page section
 */
export class PlayPauseButton extends MainButton {
  isPlaying: boolean;
  secondIcon: Icon;
  /**
   *
   * @param {Icon} Icon - The main Icon of button
   * @param {Icon} secondIcon - The second Icon of button
   * @param {Icon} toggleIcon - The toggleable Icon of button
   * @param {string} alt - The alt text of button
   * @param {string} id - the id of button
   * @param {string} title - the title of button
   * @param {string} classes - the classes of button
   */
  constructor(Icon: Icon, secondIcon:Icon, toggleIcon: Icon,
      alt: string, id: string, title: string) {
    super(Icon, alt, id, title);
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
   * Sets the visible main icon of the play button to be toggleIcon and
   * stores the other icon.
   * For example: If the play icons is visible it changes to the pause icon
   * and vice versa.
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
   * Adds to the button html
   * without the neccisary base being affected.
   * Examples of what to add could be Icons, classes or text.
   * @param {HTMLDivElement} button
   */
  protected additionalHTML(button: HTMLDivElement): void{
    button.classList.add('webriceMainButton');
    button.appendChild(this.secondButtonIcon.svg);
    button.appendChild(this.buttonIcon.svg);
  }
}
