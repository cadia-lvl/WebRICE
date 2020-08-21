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
   * @param {Icon} icon - The play Icon of button
   * @param {Icon} secondIcon - The WebRICE logo Icon of button
   * @param {Icon} toggleIcon - The pause Icon of button
   * @param {string} alt - The alt text of button
   * @param {string} id - the id of button
   * @param {string} title - the title of button
   * @param {string} classes - the classes of button
   */
  constructor(icon: Icon, secondIcon:Icon, toggleIcon: Icon,
      alt: string, id: string, title: string, classes?: string) {
    super(icon, alt, id, title, classes);
    this.isPlaying = false;
    this.secondIcon = secondIcon;
  }

  /**
   * Sets the visible main icon of the play button to be toggleIcon and
   * stores the other icon.
   * For example: If the play icon is visible it changes to the pause icon
   * and vice versa.
   */
  private toggleIcons(): void {
    const button = document.getElementById(this.id)!;
    if (document.getElementById(this.Icon.ID)) {
      button.removeChild(document.getElementById(this.Icon.ID)!);
      button.appendChild(this.secondIcon.svg);
      console.log('added the pause icon to button');
    } else {
      const removalNode = document.getElementById(this.secondIcon.ID)!;
      button.removeChild(removalNode);
      button.appendChild(this.Icon.svg);
      console.log('swap the pause icon for the play icon');
    }
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
   * Checks whether WebRICE is playing
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
   * Create button html
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

  /**
   * This function is triggered as a button event listener.
   * It starts reading of a web section
   * or continues reading after pausing
   * @param {PlayPauseButton} this - the event
   */
  onClicked(this: PlayPauseButton): void {
    // TODO: consider using player.audioTracks. That might make it easy to work
    // with long texts.
    const player = document.querySelector('audio');
    if (player && player.id === 'WebRICEPlayer') {
      const audioContent = [
        'resources/example_voice_files/content-1.mp3',
        'resources/example_voice_files/content-2.mp3',
        'resources/example_voice_files/content-3.mp3',
        'resources/example_voice_files/content-4.mp3',
        'resources/example_voice_files/content-5.mp3',
        'resources/example_voice_files/content-6.mp3',
        'resources/example_voice_files/content-7.mp3',
        'resources/example_voice_files/content-8.mp3',
        'resources/example_voice_files/content-9.mp3',
        'resources/example_voice_files/content-10.mp3',
        'resources/example_voice_files/content-11.mp3',
        'resources/example_voice_files/content-12.mp3'];

      player.src = audioContent[0];
      player.play();
      this.toggleIcons();
    }
    // TODO: if it's a new start
    // TODO: call fetchAudioAndMarks from the SpeechManager class
    // TODO: add the audio url to the audio player, given the audio player id
    // TODO: calls autoStroll function if autostrol is set to true
    // TODO: calls the startHighlighting function if highlighting is set to true
    // TODO: if continuing from pause
  }
}
