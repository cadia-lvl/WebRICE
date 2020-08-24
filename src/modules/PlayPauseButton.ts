import {Button} from './Button';
import {Icon} from './icons';
import {PlayerAttributes} from './PlayerAttributes';
import {SpeechManager} from './SpeechManager';

/**
 * Button that plays and pauses reading of a web page section
 */
export class PlayPauseButton extends Button {
  isPlaying: boolean;
  secondIcon: Icon;
  toggleIcon: Icon;
  webPlayerAttributes = new PlayerAttributes;
  /**
   *
   * @param {Icon} icon - The play Icon of button
   * @param {Icon} secondIcon - The webrice logo Icon of button
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
    this.toggleIcon = toggleIcon;
  }

  /**
   * Sets the visible main icon of the play button to be toggleIcon and
   * stores the other icon.
   * For example: If the play icon is visible it changes to the pause icon
   * and vice versa.
   */
  private toggleIcons(): void {
    const button = document.getElementById(this.id)!;
    if (document.getElementById(this.Icon.ID) !== null ) {
      // Add the pause icon to button and remove play icon
      button.removeChild(document.getElementById(this.Icon.ID)!);
      button.appendChild(this.toggleIcon.svg);
    } else {
      // swap the pause icon for the play icon
      button.removeChild(document.getElementById(this.toggleIcon.ID)!);
      button.appendChild(this.buttonIcon.svg);
    }
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
   * Checks whether webrice is playing
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
   * It starts reading of a web section or pauses reading
   *   or continues reading after pausing
   * @param {PlayPauseButton} this - the event
   */
  onClicked(this: PlayPauseButton): void {
    // call fetchAudioAndMarks from the SpeechManager class
    // TODO: calls autoStroll function if autostroll is set to true
    // TODO: calls the startHighlighting function if highlighting is set to true
    // TODO: consider using player.audioTracks. That might make it easy to work
    // with long texts.
    const player = document.querySelector('audio');
    if (player && player.id === 'webricePlayer') {
      // fetch the audio from the speech manager
      const audioContent = (new SpeechManager()).fetchAudioAndMarks();

      // if not paused then pause
      if (!player.paused) {
        player.pause();
        this.toggleIcons();
        this.webPlayerAttributes.setPaused(true);
        return;
      }
      if (this.webPlayerAttributes.getStarted()) {
        if (!player.ended) {
          player.play();
          this.webPlayerAttributes.setPaused(false);
        }
        return;
      }

      let i = 0;
      player.src = audioContent[i];
      player.onended = () => {
        if (++i !== audioContent.length) {
          // add the audio url to the audio player, given the audio player id
          player.src = audioContent[i];
          player.playbackRate = this.webPlayerAttributes.getPlaybackRate();
          // if continuing from pause
          if (!this.webPlayerAttributes.getPaused()) {
            player.play();
          }
        } else {
          this.webPlayerAttributes.init();
          player.onended = null;
          this.toggleIcons();
        }
      };
      player.playbackRate = this.webPlayerAttributes.getPlaybackRate();
      player.play();
      this.webPlayerAttributes.setPlaying();
      this.toggleIcons();
    }
  }
}
