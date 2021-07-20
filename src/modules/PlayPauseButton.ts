import {MainButton} from './MainButton';
import {Icon} from './icons';
import {PlayerAttributes} from './PlayerAttributes';
import {SpeechManager} from './SpeechManager';

/**
 * Button that plays and pauses reading of a web page section
 */
export class PlayPauseButton extends MainButton {
  isPlaying: boolean;
  secondIcon: Icon;
  toggleIcon: Icon;
  /**
   *
   * @param {Icon} icon - The play icon of button
   * @param {Icon} secondIcon - The webrice logo icon of button
   * @param {Icon} toggleIcon - The pause icon of button
   * @param {string} alt - The alt text of button
   * @param {string} id - the id of button
   * @param {string} title - the title of button
   * @param {string} classes - the classes of button
   */
  constructor(icon: Icon, secondIcon:Icon, toggleIcon: Icon,
      alt: string, id: string, title: string) {
    super(icon, alt, id, title);
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
  public toggleIcons(): void {
    const button = document.getElementById(this.id) as HTMLDivElement;
    if (document.getElementById(this.icon.ID) !== null ) {
      // Add the pause icon to button and remove play icon
      button.removeChild(document.getElementById(this.icon.ID)!);
      button.appendChild(this.toggleIcon.svg);
    } else {
      // swap the pause icon for the play icon
      button.removeChild(document.getElementById(this.toggleIcon.ID)!);
      button.appendChild(this.buttonIcon.svg);
    }
  }

  /**
   * @return {Icon} returns the second icon
   */
  get secondButtonIcon(): Icon {
    return this.secondIcon;
  }

  /**
   * @param {Icon} icon - the second button icon
   */
  set secondButtonIcon(icon: Icon) {
    this.secondIcon = icon;
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
   * Adds to the button html
   * without the neccisary base being affected.
   * Examples of what to add could be icons, classes or text.
   * @param {HTMLDivElement} button
   */
  protected additionalHTML(button: HTMLDivElement): void {
    button.classList.add('webriceMainButton');
    button.setAttribute('accesskey', 'L');
    button.appendChild(this.secondButtonIcon.svg);
    button.appendChild(this.buttonIcon.svg);
  }

  /**
   * This function is triggered as a button event listener.
   * It starts reading of a web section or pauses reading
   *   or continues reading after pausing
   * @param {HTMLAudioElement} player - the reference to the webrice audio
   * @param {PlayerAttributes} webPlayerAttributes - the reference to the
   *   webrice audio attributes
   * @param {string} webText - the text withing the webrice text container
   */
  async playPause(player: HTMLAudioElement, webPlayerAttributes:
    PlayerAttributes, webText: string): Promise<void> {
    // TODO: calls autoStroll function if autostroll is set to true
    // TODO: calls the startHighlighting function if highlighting is set to true
    // TODO: consider using player.audioTracks. That might make it easy to work
    // with long texts.
    if (!player.paused) {
      player.pause();
      webPlayerAttributes.setPaused(true);
      return;
    }
    if (webPlayerAttributes.getStarted()) {
      if (!player.ended) {
        player.play();
        webPlayerAttributes.setPaused(false);
      }
      return;
    }

    // fetch the audio from the speech manager
    const audioContent: string[] = [];
    (new SpeechManager()).fetchAudioAndMarks(webText, audioContent)
        .then((res) => {
          let i = 0;
          player.src = res[i];
          player.onended = () => {
            if (++i !== audioContent.length) {
              // add the audio url to the audio player, given the audio player
              // id
              player.src = audioContent[i];
              player.playbackRate = webPlayerAttributes.getPlaybackRate();
              if (!webPlayerAttributes.getPaused()) {
                player.play();
              }
            } else {
              webPlayerAttributes.init(player);
            }
          };
          player.playbackRate = webPlayerAttributes.getPlaybackRate();
          player.play();
          webPlayerAttributes.setPlaying();
        })
        .catch((error) => {
          console.log('Error when fetching audio: ' + error.message);
        });
  }
}
