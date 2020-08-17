import {Button} from './Button';
import {icon} from './icons';

/**
 * Settings button
 */
export class SettingsButton extends Button {
  /**
   * @param {icon} icon - icon on button
   * @param {string} alt - alt of button
   * @param {string} id - id of button
   * @param {string} title - title of utton
   * @param {string} classes - string containing classes of button
   */
  constructor(icon: icon, alt: string, id: string,
      title: string, classes?: string) {
    super(icon, alt, id, title, classes);
  }

  /**
   * Displays settings for user
   */
  public onClicked(): void {
    console.log('clicked!');
  }

  /**
   * Creates the settings header of the settings module
   * @return {HTMLElement} - html of settings header
   */
  private createSettingsHeader(): HTMLElement {
    const headerCont = document.createElement('div');
    headerCont.setAttribute('id', 'headerCont');

    const exitButton = document.createElement('button');
    exitButton.setAttribute('id', 'closeSettings');

    // Add close button image

    return headerCont;
  }

  /**
   * Creates settings module as child of parent
   * @param {HTMLElement} parent - parent element of module
   */
  public createSettingsModule(parent: HTMLElement): void {
    const settingsCont = document.createElement('div');
    settingsCont.setAttribute('id', 'settingsCont');
    // settingsCont.appendChild(this.createSettingsHeader());

    const settings = document.createElement('div');
    settings.setAttribute('class', 'settingsMenu');
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
}
