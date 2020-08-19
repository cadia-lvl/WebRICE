import {Button} from './Button';
import {Icon} from './icons';
// Functionality for other languages is needed
import {text} from './../lang/is';
import {CloseIcon} from './icons';
import {CloseButton} from './CloseButton';

/**
 * Settings button
 */
export class SettingsButton extends Button {
  readonly helpText = text.settingsModuleText;
  settingsModuleCreated = false;
  /**
   * @param {Icon} Icon - Icon on button
   * @param {string} alt - alt of button
   * @param {string} id - id of button
   * @param {string} title - title of utton
   * @param {string} classes - string containing classes of button
   */
  constructor(Icon: Icon, alt: string, id: string,
      title: string, classes?: string) {
    super(Icon, alt, id, title, classes);
  }

  private get moduleText() {
    return this.helpText;
  }

  /**
   * Displays settings for user
   */
  public onClicked(): void {
    console.log('clicked!');
  }

  /**
   * Creates settings module as child of parent
   * @param {HTMLElement} parent - parent element of module
   */
  public createSettingsModule(parent: HTMLElement): void {
    const settingsContainer = document.createElement('div');
    settingsContainer.setAttribute('id', 'settingsContainer');

    const settingsHeader = document.createElement('div');
    settingsHeader.setAttribute('id', 'settingsHeader');
    const closeIcon = new CloseIcon('webriceCloseSettingsIcon');
    const closeButton = new CloseButton(closeIcon,
        text.ButtonAlt.closeSettings, 'webriceSettingsCloseButton',
        text.ButtonTitle.closeSettings);

    const settingsMainContainer = document.createElement('div');
  }

  /**
   * hides the settings module
   */
  public hideSettingsModule(): void {
    console.log('to be implemented');
  }

  /**
   * Shows the settings module
   */
  public showSettingsModule(): void {
    console.log('to be implemented');
  }

  /**
   * Fetches the user settings and stores them
   */
  public fetchUserSettings(): void {
    console.log('to be implemented');
  }

  /**
   * 
   */
  public saveUserSettings(): void {

  }

  public download():void{

  }
}
