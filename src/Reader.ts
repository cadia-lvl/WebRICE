
import {SettingsButton} from './modules/SettingsButton';
import {PlayPauseButton} from './modules/PlayPauseButton';
import {StopButton} from './modules/StopButton';
import {SpeedButton} from './modules/SpeedButton';
import {text} from './lang/is';
import {PlayIcon, StopIcon, PauseIcon, EarIcon,
  SettingsIcon, SpeedIcon} from './modules/icons';
import {Button} from './modules/Button';
import {stylingInterface, customStyles} from "./modules/CustomStyleManager";

/**
 * The main class of webrice
 * Is in chage of all aspects of the web reader
 */
class Reader {
  webText = '';
  readonly CONTAINER_ID = 'webrice';
  readonly TEXT_CONTENT_ID = 'webRICE_text_container';
  styles: customStyles | undefined;

  /**
   * initializes webrice
   */
  public init(): void {
    this.createWebrice();
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
   * Getter for web text
   * @return {string} - text of web section
   */
  private getWebText(): string {
    return this.webText;
  }

  /**
   * Setter for web text
   * @param {string} text - web text
   */
  private setWebText(text: string): void {
    this.webText = text;
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
    const container = document.getElementById(this.CONTAINER_ID)!;
    // Player here at some point
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

    // Eventlisteners added to buttons
    this.addListeners(mainPlayPauseButton.id, mainPlayPauseButton);
    this.addListeners(mainStopButton.id, mainStopButton);
    this.addListeners(mainSpeedButton.id, mainSpeedButton);
    this.addListeners(mainSettingsButton.id, mainSettingsButton);
  }

  customStyles(options: stylingInterface){
    if(!this.styles) this.styles = new customStyles();
    else console.warn("Custom styles already been called! Changing styles often my slow down your website");
    this.styles.changeStyles(options);
}
}

// change depending on exporting to npm or using the url from web

// for testing purpouses
window.addEventListener('DOMContentLoaded', () => {
  const webreader = new Reader();
  webreader.init();
});
