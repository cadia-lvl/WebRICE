import {MainButton} from './MainButton';
import {Icon} from './icons';

/**
 * A Button controling the reading speed of webrice
 */
export class SpeedButton extends MainButton {
    currentSpeed: number
    // TODO: use enumerator for speedSettings;
    speedSettings = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    /**
     *
     * @param {Icon} icon - icon on button
     * @param {string} alt - alt of button
     * @param {string} id - id of button
     * @param {string} title - title of utton
     * @param {string} classes - string containing classes of button
     */
    constructor(icon: Icon, alt: string, id: string,
        title: string) {
      super(icon, alt, id, title);
      this.currentSpeed = 0;
    }
    /**
     * Increases reading speed
     * @param {number} increase how much to increase
     */
    speedUp(increase: number): void {
      console.log('to be implemented');
    }
    /**
     * Decrease reading speed
     * @param {number} decrease how much to decrease
     */
    slowDown(decrease: number): void {
      console.log('to be implemented');
    }
    /**
     * @return {number} current reading speed
     */
    getCurrentSpeed(): number {
      return this.currentSpeed;
    }
    /**
     * Sets current reading speed
     * @param {number} speed what current speed will be
     */
    private setCurrentSpeed(speed: number): void {
      this.currentSpeed = speed;
    }
    /**
     * Create the html for the speed button group
     * The button group consists of two parts.
     * The first part is the button and the icon.
     * The second part is the list of speed options.
     * Creates the button html
     * @return {HTMLDivElement} - button html
     */
    public createHTML(): HTMLDivElement {
      const speedButtonGroup = document.createElement('div');
      speedButtonGroup.classList.add('speedButtonGroup');
      const button = document.createElement('div');
      button.id = this.id;
      button.setAttribute('role', 'button');
      button.setAttribute('alt', this.alt);
      button.setAttribute('title', this.title);
      button.setAttribute('tabindex', '0');
      button.setAttribute('aria-expanded', 'true');

      if (this.classes !== '') button.classList.add(this.classes);

      button.appendChild(this.buttonIcon.svg);
      speedButtonGroup.appendChild(button);
      const speedOptions = document.createElement('ul');
      speedOptions.classList.add('webriceMainSpeed');
      this.speedSettings.forEach( (speed) => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(speed.toString()));
        speedOptions.appendChild(li);
      });
      speedButtonGroup.appendChild(speedOptions);
      return speedButtonGroup;
    }
}
