
import {SettingsButton} from './modules/SettingsButton';
import {PlayPauseButton} from './modules/PlayPauseButton';
import {StopButton} from './modules/StopButton';
import {SpeedButton} from './modules/SpeedButton';
import {text} from './lang/is';
import {PlayIcon, StopIcon, PauseIcon, EarIcon,
  SettingsIcon, SpeedIcon} from './modules/icons';
import {Button} from './modules/Button';
import {stylingInterface, CustomStyles} from './modules/CustomStyleManager';

/**
 * The main class of webrice
 * Is in chage of all aspects of the web reader
 */
class Reader {
  webText = '';
  readonly CONTAINER_ID = 'webrice';
  readonly TEXT_CONTENT_ID = 'WebRICE_text_container';
  styles: CustomStyles | undefined;

  /**
   * initializes webrice
   */
  public init(): void {
    this.createWebrice();
    this.setWebText();
    // more things
  }

  /**
   * adds an event listener to a button
   * @param {string} id - button id
   * @param {Button} button - button class
   */
  private addListeners(id: string, button: Button) {
    const physicalButton = document.getElementById(id);
    if (physicalButton) {
      physicalButton.addEventListener('click', button.handleClick);
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
        // TODO: extracts alt text for images and links
        this.webText = text;
      }
    } catch (e) {
      // Throw a warning because there's nothing to read
      console.warn(this.TEXT_CONTENT_ID + ': Text container id defined.' +
        'Therefore there is nothing to read');
    }
  }

  /**
   * loades the highlighting themes into storage
   */
  private loadThemes(): void {
    console.log('theme work');
  }

  /**
   * creates the html for webrice
   */
  private createWebrice(): void {
    // TODO: check if there is any text before creating webrice
    const parent = document.getElementById(this.CONTAINER_ID)!;
    const container = document.createElement('div');
    container.setAttribute('id', 'webriceContainer');

    // Add the audio player to the container
    const player = document.createElement('audio');
    player.id = 'player';
    player.classList.add('webricePlayer');
    container.appendChild(player);

    const earIconic = new EarIcon('webriceEarIcon', 'mainWebriceIcon');

    const mainPlayIcon = new PlayIcon('webricePlayIcon', 'mainWebriceIcon');
    const mainPauseIcon = new PauseIcon('webricePauseIcon', 'mainPauseIcon');
    const mainPlayPauseButton = new PlayPauseButton(mainPlayIcon,
        earIconic, mainPauseIcon, text.ButtonAlt.play, 'webricePlayButton',
        text.ButtonTitle.play, 'webriceMainButton');
    container.appendChild(mainPlayPauseButton.createHTML());

    const mainStopIcon = new StopIcon('webriceStopIcon', 'mainWebriceIcon');
    const mainStopButton = new StopButton(
        mainStopIcon, text.ButtonAlt.stop, 'webriceStopButton',
        text.ButtonTitle.stop, 'webriceMainButton');
    container.appendChild(mainStopButton.createHTML());

    const mainSpeedIcon = new SpeedIcon('webriceSpeedIcon', 'mainWebriceIcon');
    const mainSpeedButton = new SpeedButton(
        mainSpeedIcon, text.ButtonAlt.speed, 'webriceSpeedButton',
        text.ButtonTitle.speed, 'webriceMainButton');
    container.appendChild(mainSpeedButton.createHTML());

    const mainSettingsIcon = new SettingsIcon('webriceSettingsIcon',
        'mainWebriceIcon');

    const mainSettingsButton = new SettingsButton(mainSettingsIcon,
        text.ButtonAlt.settings, 'webriceSettingsButton',
        text.ButtonTitle.settings, 'webriceMainButton');
    container.appendChild(mainSettingsButton.createHTML());

    parent.appendChild(container);

    // Eventlisteners added to buttons
    this.addListeners(mainPlayPauseButton.id, mainPlayPauseButton);
    this.addListeners(mainStopButton.id, mainStopButton);
    this.addListeners(mainSpeedButton.id, mainSpeedButton);
    this.addListeners(mainSettingsButton.id, mainSettingsButton);
  }

  /**
   * @param {stylingInterface} options
   */
  customStyles(options: stylingInterface) {
    if (!this.styles) this.styles = new CustomStyles();
    else {
      console.warn('Custom styles already been called! '+
      'Changing styles often my slow down website');
    }
    this.styles.changeStyles(options);
  }
}

// change depending on exporting to npm or using the url from web

// for testing purpouses
window.addEventListener('DOMContentLoaded', () => {
  const webreader = new Reader();
  webreader.init();
  /*
  webreader.customStyles(
      {backgroundColor: '#ffefdd', secondaryColor: '#229BBB'});
  */
});
