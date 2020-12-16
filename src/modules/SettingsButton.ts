import {MainButton} from './MainButton';
import {Icon} from './icons';
// TODO: Functionality for other languages is needed
import {text} from './../lang/is';
import {CloseIcon} from './icons';
import {ImageButton} from './ImageButton';

/**
 * Settings button
 */
export class SettingsButton extends MainButton {
  readonly helpText = text.settingsModuleText;
  // eslint-disable-next-line no-invalid-this
  handleClick = this.toggleModule.bind(this);
  moduleCreated = false;
  moduleVisible = false;
  moduleIds = {
    header: 'settingsHeader',
    maincontainer: 'webriceMainSettingsContainer',
    container: 'settingsContainer',
  }
  /**
   * @param {Icon} icon - icon on button
   * @param {string} alt - alt of button
   * @param {string} id - id of button
   * @param {string} title - title of utton
   * @param {string} classes - string containing classes of button
   */
  constructor(icon: Icon, alt: string, id: string,
      title: string) {
    super(icon, alt, id, title);
    document.addEventListener('click', this.closeOnClickAway.bind(this));
    document.addEventListener('keypress', this.closeOnClickAway.bind(this));
  }

  /**
   * Adds to the button html
   * without the neccesary base being affected.
   * Add an access key - 1
   * @param {HTMLDivElement} button
   */
  protected additionalHTML(button: HTMLDivElement): void {
    button.classList.add('webriceMainButton');
    button.setAttribute('accesskey', '1');
    button.appendChild(this.buttonIcon.svg);
  }

  /**
   * @return {object} object of settings module text
   */
  private get moduleText() {
    return this.helpText;
  }

  /**
   * @return {boolean} false if settings module
   * not created, else true.
   */
  private get isModuleCreated() {
    return this.moduleCreated;
  }

  /**
   * @param {created} created contains
   * wheather the module has been created or not
   */
  private set isModuleCreated(created: boolean) {
    this.moduleCreated = created;
  }

  /**
   * @return {boolean} true if settings module
   * visible, else false.
   */
  private get isModuleVisible() {
    return this.moduleVisible;
  }

  /**
   * @param {boolean} visible indicates wheather
   * settings module is visible or not.
   */
  private set isModuleVisible(visible: boolean) {
    this.moduleVisible = visible;
  }

  /**
   * Toggles the display of the settings module
   */
  public toggleModule(): void {
    if (!this.isModuleCreated) {
      const parent = document.getElementById('webrice')!;
      this.createSettingsModule(parent);
    } else if (!this.isModuleVisible) {
      this.showSettingsModule();
    } else {
      this.hideSettingsModule();
    }
  }

  /**
   * Creates the about section.
   * @param {HTMLElement} parent the parent element of the about section
   */
  private addAboutWEBRICE(parent: HTMLElement) {
    const settingsMainHeading = document.createElement('h2');
    settingsMainHeading.appendChild(
        document.createTextNode(this.helpText.userText.mainHead));
    parent.appendChild(settingsMainHeading);

    const sections = this.helpText.userText.sections;
    let sectNum;
    for (sectNum = 0; sectNum < sections.length; sectNum++) {
      const sectionHead = document.createElement('h3');
      const headingText = document.createTextNode(
          sections[sectNum].sectionHead);
      sectionHead.appendChild(headingText);
      parent.appendChild(sectionHead);

      const sectionParagraphs = sections[sectNum].sectionParagraphs;
      let paragraphNum;
      for (paragraphNum = 0; paragraphNum < sectionParagraphs.length;
        paragraphNum++) {
        const sectionParagraph = document.createElement('p');
        const paragraphText = document.createTextNode(
            sectionParagraphs[paragraphNum]);
        sectionParagraph.appendChild(paragraphText);
        parent.appendChild(sectionParagraph);
      }
    }
  }

  /**
   * Creates settings module as child of parent
   * @param {HTMLElement} parent - parent element of module
   */
  public createSettingsModule(parent: HTMLElement): void {
    const settingsContainer = document.createElement('div');
    settingsContainer.setAttribute('id', this.moduleIds.container);

    const settingsHeader = document.createElement('div');
    settingsHeader.setAttribute('id', this.moduleIds.header);
    const closeIcon = new CloseIcon('webriceCloseSettingsIcon');
    const closeButton = new ImageButton(closeIcon,
        text.ButtonAlt.closeSettings, 'webriceSettingsCloseButton',
        text.ButtonTitle.closeSettings);

    settingsHeader.appendChild(closeButton.createHTML());

    const settingsMainContainer = document.createElement('div');
    settingsMainContainer.setAttribute('id', this.moduleIds.maincontainer);

    this.addAboutWEBRICE(settingsContainer);
    settingsMainContainer.appendChild(settingsHeader);
    settingsMainContainer.appendChild(settingsContainer);

    parent.appendChild(settingsMainContainer);

    const physicalCloseButton = document.getElementById(
        'webriceSettingsCloseButton');
    if (physicalCloseButton) {
      physicalCloseButton.addEventListener('click',
          this.hideSettingsModule.bind(this));
      physicalCloseButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.hideSettingsModule();
      });
    }

    this.isModuleCreated = true;
    this.showSettingsModule();
  }

  /**
   * hides the settings module
   */
  public hideSettingsModule(): void {
    const container = document.getElementById('webrice')!;
    container.style.setProperty('--module-visibility', 'none');
    this.isModuleVisible = false;
  }

  /**
   * @param {any} element
   * If element is desendant of main settings module container
   * or the settings button.
   * @return {boolean} true if the element is a desendant and false if not.
   */
  public isDescendant(element: any) {
    const parentId = this.moduleIds.maincontainer;

    if (element.id === parentId || element.id === this.id) {
      return true;
    }

    while (element = element.parentElement) {
      if (element.id == parentId || element.id == this.id) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {MouseEvent|KeyboardEvent} event, click event.
   * Checks if user is clicking away from settings module.
   */
  public closeOnClickAway(event: MouseEvent|KeyboardEvent) {
    if (this.isModuleVisible) {
      if (!this.isDescendant(event.target)) {
        this.hideSettingsModule();
      }
    }
  }

  /**
   * Shows the settings module
   */
  public showSettingsModule(): void {
    const container = document.getElementById('webrice')!;
    container.style.setProperty('--module-visibility', 'flex');
    this.isModuleVisible = true;
  }

  /**
   * Fetches the user settings and stores them
   */
  public fetchUserSettings(): void {
    console.log('to be implemented');
  }

  /**
   * saves user settings to client storage
   */
  public saveUserSettings(): void {
    console.log('to be implemented');
  }

  /**
   * Downloads the voice file
   */
  public download(): void {
    console.log('to be implemented');
  }
}
