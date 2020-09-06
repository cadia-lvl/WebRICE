import {PlayerAttributes} from './modules/PlayerAttributes';
import {SettingsButton} from './modules/SettingsButton';
import {PlayPauseButton} from './modules/PlayPauseButton';
import {StopButton} from './modules/StopButton';
import {SpeedButton} from './modules/SpeedButton';
import {text} from './lang/is';
import {PlayIcon, StopIcon, PauseIcon, EarIcon,
  SettingsIcon, SpeedIcon} from './modules/icons';
import {MainButton} from './modules/MainButton';
import {stylingInterface, CustomStyles} from './modules/CustomStyleManager';

/**
 * The main class of webrice
 * It is in charge of all aspects of the web reader
 */
export class Reader {
  webText = '';
  readonly CONTAINER_ID = 'webrice';
  playPauseButton: PlayPauseButton | undefined;
  stopButton: StopButton | undefined;
  speedButton: SpeedButton | undefined;
  settingsButton: SettingsButton | undefined;
  readonly TEXT_CONTENT_ID = 'webriceTextContainer';
  styles: CustomStyles | undefined;
  player = new Audio();
  webPlayerAttributes: PlayerAttributes;

  /**
   * Constructor for the Reader class
   */
  constructor() {
    this.setWebText();
    this.webPlayerAttributes = new PlayerAttributes();
  }

  /**
   * initializes webrice
   */
  public init(): void {
    if (this.getWebText() !== '') {
      this.createWebrice();
    // more things
    } else {
      console.warn(this.TEXT_CONTENT_ID + ': Text container id undefined or ' +
        'there is nothing to read');
    }
  }

  /**
   * Getter for the complete web text
   * This text should be ready to be submitted to a TTS api like Google,
   * ReadSpeaker, or AWS Polly
   * @return {string} - text of web section
   */
  public getWebText(): string {
    return this.webText;
  }

  /**
   * Get web text from TEXT_CONTENT_ID and stores it as a Reader variable to be
   * accessed later.
   */
  private setWebText(): void {
    const webriceTextNode = document.getElementById(this.TEXT_CONTENT_ID);
    try {
      if (webriceTextNode) {
        let text = '';
        // Go through content and extracts text content from html children nodes
        for (let i = 0; i < webriceTextNode.children.length; i++) {
          text += webriceTextNode.children[i].textContent + '. ';
          // TODO: figure out how to indicate the text is from different
          // nodes/tags to the TTS API so it doesn't read a header and a
          // paragraph together. Currently using a period to indicate
          // completion.
        }
        text += webriceTextNode.textContent + '. ';
        // TODO: extracts alt text for images and links
        this.webText = text;
      }
    } catch (e) {
      // Throw a warning because there's nothing to read
      console.warn(this.TEXT_CONTENT_ID + ': Text container id undefined.' +
        'Therefore there is nothing to read');
    }
  }

  /**
   * loads the highlighting themes into storage
   */
  private loadThemes(): void {
    console.log('theme work');
  }

  /**
   * creates the html for webrice
   */
  private createWebrice(): void {
    // TODO: check if there is any text before creating webrice
    const parent = document.getElementById(this.CONTAINER_ID) as HTMLElement;
    const container = document.createElement('div');
    container.setAttribute('id', 'webriceContainer');

    const earIconic = new EarIcon('webriceEarIcon', 'mainWebriceIcon');

    const mainPlayIcon = new PlayIcon('webricePlayIcon', 'mainWebriceIcon');
    const mainPauseIcon = new PauseIcon('webricePauseIcon', 'mainWebriceIcon');
    const mainPlayPauseButton = new PlayPauseButton(mainPlayIcon,
        earIconic, mainPauseIcon, text.ButtonAlt.play, 'webricePlayButton',
        text.ButtonTitle.play);
    container.appendChild(mainPlayPauseButton.createHTML());

    const mainStopIcon = new StopIcon('webriceStopIcon', 'mainWebriceIcon');
    const mainStopButton = new StopButton(
        mainStopIcon, text.ButtonAlt.stop, 'webriceStopButton',
        text.ButtonTitle.stop);
    container.appendChild(mainStopButton.createHTML());

    const mainSpeedIcon = new SpeedIcon('webriceSpeedIcon', 'mainWebriceIcon');
    const mainSpeedButton = new SpeedButton(
        mainSpeedIcon, text.ButtonAlt.speed, 'webriceSpeedButton',
        text.ButtonTitle.speed);
    container.appendChild(mainSpeedButton.createHTML());

    const mainSettingsIcon = new SettingsIcon('webriceSettingsIcon',
        'mainWebriceIcon');

    const mainSettingsButton = new SettingsButton(mainSettingsIcon,
        text.ButtonAlt.settings, 'webriceSettingsButton',
        text.ButtonTitle.settings);
    container.appendChild(mainSettingsButton.createHTML());

    // Add the audio player to the container
    const player = new Audio();
    player.id = 'webricePlayer';
    container.appendChild(player);

    parent.appendChild(container);
    this.player = document.getElementById(player.id) as HTMLAudioElement;

    const playPauseDiv = document.getElementById(mainPlayPauseButton.id) as
      HTMLDivElement;
    const stopDiv = document.getElementById(mainStopButton.id) as
      HTMLDivElement;
    const speedDiv = document.getElementById(mainSpeedButton.id) as
      HTMLDivElement;

    this.player.addEventListener('play', () => {
      mainPlayPauseButton.toggleIcons();
    }, false);
    this.player.addEventListener('pause', () => {
      mainPlayPauseButton.toggleIcons();
    }, false);
    this.player.addEventListener('ratechange', () => {
      this.webPlayerAttributes
          .setPlaybackRate(this.player.playbackRate);
    }, false);

    const physicalSettingsButton =
        document.getElementById(mainSettingsButton.id) as HTMLDivElement;

    // Eventlisteners added to buttons
    if (physicalSettingsButton) {
      physicalSettingsButton.addEventListener(
          'click', mainSettingsButton.handleClick);
    }
    playPauseDiv.addEventListener('click', () => {
      mainPlayPauseButton.playPause(this.player, this.webPlayerAttributes,
          this.getWebText());
    }, false);
    stopDiv.addEventListener('click', () => {
      mainStopButton.stop(this.player, this.webPlayerAttributes);
    }, false);
    speedDiv.addEventListener('click', () => {
      mainSpeedButton.toggleReadingSpeedsMenu();
    }, false);
  }

  /**
   * @param {stylingInterface} options
   */
  customStyles(options: stylingInterface): void {
    if (!this.styles) this.styles = new CustomStyles();
    else {
      console.warn('Custom styles has already been called! '+
      'Changing styles often may slow down website');
    }
    this.styles.changeStyles(options);
  }
}

// change depending on exporting to npm or using the url from web

// for testing purposes
window.addEventListener('DOMContentLoaded', () => {
  const webreader = new Reader();
  webreader.init();

  /*
   * Examples of using custom colors for the webrice toolbar
   * NOTE: The speed button theme is best viewed through the light or
   * orange-blue theme. The dark theme doesn't show all the features well.
  // orange blue theme
  webreader.customStyles(
      {backgroundColor: '#ffefdd', secondaryColor: '#229BBB'});
  // light theme
  webreader.customStyles(
      {backgroundColor: '#f3f2f2', secondaryColor: '#242121'});
   */
});
