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
  playPauseButton: HTMLElement | undefined;
  stopButton: HTMLElement | undefined;
  speedButton: HTMLElement | undefined;
  settingsButton: HTMLElement | undefined;
  readonly TEXT_CONTENT_ID = 'webriceTextContainer';
  styles: CustomStyles | undefined;
  player = new Audio();
  webPlayerAttributes: PlayerAttributes;
  rawInnerText = '';

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
    // Check if there is any text before creating webrice
    if (this.getWebText() !== '') {
      this.createWebrice();
    // more things
    } else {
      console.warn(this.TEXT_CONTENT_ID + ': Text container id undefined or ' +
        'there is nothing to read');
    }
  }

  /**
   * Checks if the text of the webrice text element has changed.
   * @return {boolean} true if the text of the webrice text element has changed
   */
  private textChanged(): boolean {
    const webriceTextElement = document.getElementById(this.TEXT_CONTENT_ID);
    return this.rawInnerText !== webriceTextElement?.innerText;
  }

  /**
   * Getter for the complete web text
   * This text should be ready to be submitted to a TTS api like Google,
   * ReadSpeaker, or AWS Polly
   * @return {string} - text of web section
   */
  public getWebText(): string {
    if (this.textChanged()) {
      this.setWebText();
    }
    return this.webText;
  }

  /**
   * Get web text from TEXT_CONTENT_ID and stores it as a Reader variable to be
   * accessed later.
   */
  private setWebText(): void {
    try {
      const webriceTextNode = document.getElementById(this.TEXT_CONTENT_ID);
      let text = '';
      // Go through content and extract text content from children
      const children = webriceTextNode!.childNodes;
      for (let i = 0; i < children.length; i++) {
        if (children[i].nodeType === Node.ELEMENT_NODE &&
          children[i].textContent!.trim()) {
          text += children[i].textContent + '. ';
        } else if (children[i].nodeType === Node.TEXT_NODE &&
          children[i].nodeValue!.trim() ) {
          text += children[i].nodeValue + '. ';
        }
        // TODO: figure out how to indicate the text is from different
        // nodes/tags to the TTS API so it doesn't read a header and a
        // paragraph together. Currently using a period to indicate
        // completion.
      }
      // TODO: extracts alt text for images and links
      this.webText = text;
      // Raw text for change comparison
      this.rawInnerText = webriceTextNode!.innerText;
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
    const parent = document.getElementById(this.CONTAINER_ID) as HTMLElement;
    const container = document.createElement('div');
    container.setAttribute('id', 'webriceContainer');

    const earIconic = new EarIcon('webriceEarIcon', 'mainWebriceIcon');

    const mainPlayIcon = new PlayIcon('webricePlayIcon', 'mainWebriceIcon');
    const mainPauseIcon = new PauseIcon('webricePauseIcon', 'mainWebriceIcon');
    const mainPlayPauseButton = new PlayPauseButton(mainPlayIcon,
        earIconic, mainPauseIcon, text.ButtonAlt.play, 'webricePlayButton',
        text.ButtonTitle.play);
    this.playPauseButton =
        container.appendChild(mainPlayPauseButton.createHTML());

    const mainStopIcon = new StopIcon('webriceStopIcon', 'mainWebriceIcon');
    const mainStopButton = new StopButton(
        mainStopIcon, text.ButtonAlt.stop, 'webriceStopButton',
        text.ButtonTitle.stop);
    this.stopButton =
        container.appendChild(mainStopButton.createHTML());

    const mainSpeedIcon = new SpeedIcon('webriceSpeedIcon', 'mainWebriceIcon');
    const mainSpeedButton = new SpeedButton(
        mainSpeedIcon, text.ButtonAlt.speed, 'webriceSpeedButton',
        text.ButtonTitle.speed);
    this.speedButton =
        container.appendChild(mainSpeedButton.createHTML());

    const mainSettingsIcon = new SettingsIcon('webriceSettingsIcon',
        'mainWebriceIcon');

    const mainSettingsButton = new SettingsButton(mainSettingsIcon,
        text.ButtonAlt.settings, 'webriceSettingsButton',
        text.ButtonTitle.settings);
    this.settingsButton =
        container.appendChild(mainSettingsButton.createHTML());

    // Add the audio player to the container
    const player = new Audio();
    player.id = 'webricePlayer';
    container.appendChild(player);

    parent.prepend(container);
    this.player = document.getElementById(player.id) as HTMLAudioElement;

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

    // click listeners
    this.settingsButton.addEventListener(
        'click', mainSettingsButton.handleClick);

    this.playPauseButton.addEventListener('click', () => {
      mainPlayPauseButton.playPause(this.player, this.webPlayerAttributes,
          this.getWebText());
      // TODO: move to the correct module for calls to highlight
      // Start highlighting only once play is pressed
      // TODO: get it to highlight the second+ time play is pressed
      this.nowzer();
    }, false);
    this.stopButton.addEventListener('click', () => {
      mainStopButton.stop(this.player, this.webPlayerAttributes);
    }, false);
    this.speedButton.addEventListener('click', () => {
      mainSpeedButton.toggleReadingSpeedsMenu();
    }, false);

    // keyboard listeners
    this.settingsButton.addEventListener('keydown', (e) =>{
      if (e.key === 'Enter') {
        mainSettingsButton.handleClick();
      }
    });
    this.playPauseButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        mainPlayPauseButton.playPause(this.player, this.webPlayerAttributes,
            this.getWebText());
        // TODO: move to the correct module for calls to highlight
        // Start highlighting only once play is pressed
        // TODO: get it to highlight the second+ time play is pressed
        this.nowzer();
      }
    }, false);
    this.stopButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        mainStopButton.stop(this.player, this.webPlayerAttributes);
      }
    }, false);
    this.speedButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        mainSpeedButton.toggleReadingSpeedsMenu();
      }
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

  // TODO: move the text highlight stuff to the correct module according to the
  // design docs
  /**
   * Unhighlight the first word and highlight the second word.
   * TODO: change function name
   * @param {string} worda - currently highlighted word
   * @param {string} wordb - word to highlight
   */
  hearsay(worda: string, wordb: string): void {
    const paragraph2HL = document.getElementById('highlight') as HTMLElement;
    paragraph2HL.innerHTML = paragraph2HL.innerHTML
        .replace('<mark>' + worda +'</mark> ' + wordb,
            worda + ' <mark>' + wordb + '</mark>');
  }

  /**
   * Set a timeout of the given ms
   * Thank you Dan Dasacalescu for the help
   * https://stackoverflow.com/a/39914235
   * @param {number} ms - number of milliseconds
   * @return {Promise<any>} - returns the setTimeout
   */
  sleep(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   *
   * Split on spaces. Set timeout to highlight for the duration of that word in
   * the audio recording.
   * Use the bjartur timings
   * Find the ctm of each word using gecko
   * Sync it with a bjartur audio
   * TODO: pause it once pause is pressed.
   * TODO: resume if play is pressed for the second time
   * TODO: start all over when stop is pressed.
   * TODO: play from beginning once it's all re-initialized + play
   * TODO: get it to work with other current recordings
   * TODO: get it to work with other recordings from tts.tiro.is
   * TODO: change function name
   * @return {Promise<any>} - returns something
   */
  async nowzer(): Promise<any> {
    const paragraph2HL = document.getElementById('highlight') as HTMLElement;
    const speechMarks = [
      {'time': 30, 'type': 'word', 'duration': 200, 'value': 'Með'},
      {'time': 230, 'type': 'word', 'duration': 650, 'value': 'textalitun'},
      {'time': 880, 'type': 'word', 'duration': 270, 'value': 'eiga'},
      {'time': 1050, 'type': 'word', 'duration': 570, 'value': 'notendur'},
      {'time': 1630, 'type': 'word', 'duration': 390, 'value': 'auðveldar'},
      {'time': 2020, 'type': 'word', 'duration': 160, 'value': 'með'},
      {'time': 2180, 'type': 'word', 'duration': 130, 'value': 'að'},
      {'time': 2320, 'type': 'word', 'duration': 300, 'value': 'lesa'},
      {'time': 2620, 'type': 'word', 'duration': 210, 'value': 'og'},
      {'time': 2820, 'type': 'word', 'duration': 250, 'value': 'hlusta'},
      {'time': 3070, 'type': 'word', 'duration': 160, 'value': 'á'},
      {'time': 3230, 'type': 'word', 'duration': 400, 'value': 'efnið.'},
    ];
    if (paragraph2HL) {
      const words = paragraph2HL.innerHTML.split(' ');
      // Highlight the given word. (first word in paragraph)
      paragraph2HL.innerHTML = paragraph2HL.innerHTML
          .replace(words[0],
              '<mark>' + words[0] + '</mark>');
      // TODO: remove console.log
      console.log(words[0], words[1]);
      for (let i = 0; i < words.length - 1; i++) {
        // TODO: remove console.log
        console.log(words[i], words[i+1], i);
        await this.sleep(speechMarks[i].duration);
        setInterval(this.hearsay, 10, words[i],
            words[i+1]);
      }
      // Remove the highlighting on the last word.
      await this.sleep(speechMarks[words.length - 1].duration);
      // Remove the highlighting on the given word (last word in paragraph)
      paragraph2HL.innerHTML = paragraph2HL.innerHTML
          .replace('<mark>' + words[words.length - 1] + '</mark>',
              words[words.length -1]);
    }
  }
}

// TODO: change export of WebRICE js depending on exporting to npm or using the
// url from web
export const webreader = new Reader();

// for testing purposes
window.addEventListener('DOMContentLoaded', () => {
  webreader.init();
});

