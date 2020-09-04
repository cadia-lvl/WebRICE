import {MainButton} from './MainButton';
import {Icon} from './icons';

/**
 * A Button controling the reading speed of webrice
 */
export class SpeedButton extends MainButton {
    currentSpeed: number
    // TODO: use enumerator for speedSettings;
    speedSettings = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    speedSelectId = 'webriceSelect';

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
      this.currentSpeed = 1;
    }

    /**
     * Display or hide the reading speed options depending on the current
     * display option
     */
    toggleReadingSpeedsMenu(): void {
      const readingSpeedsElement = document
          .getElementById(this.speedSelectId) as HTMLUListElement;
      if ( readingSpeedsElement.style.display === 'block') {
        this.hideReadingSpeeds();
      } else {
        (document.getElementById(this.id) as HTMLDivElement)
            .setAttribute('aria-expanded', 'true');
        readingSpeedsElement.style.display = 'block';
      }
    }

    /**
     * Hide the speed options element
     */
    hideReadingSpeeds(): void {
      const readingSpeedsElement = document
          .getElementById(this.speedSelectId) as HTMLUListElement;
      readingSpeedsElement.style.display = 'none';
      (document.getElementById(this.id) as HTMLDivElement)
          .setAttribute('aria-expanded', 'false');
    }

    /**
     * Increases reading speed
     * @param {number} increase how much to increase
     */
    speedUp(increase: number): void {
      console.log('to be implemented' + increase);
    }

    /**
     * Decrease reading speed
     * @param {number} decrease how much to decrease
     */
    slowDown(decrease: number): void {
      console.log('to be implemented' + decrease);
    }

    /**
     * @return {number} current reading speed
     */
    getCurrentSpeed(): number {
      return this.currentSpeed;
    }

    /**
     * Sets current reading speed for the SpeedButton class
     * @param {number} speed - what current speed will be
     */
    private setCurrentSpeed(speed: number): void {
      this.currentSpeed = speed;
    }

    /**
     * Sets the styling and accessibility attributes for the current speed
     * @param {HTMLLIElement} selectedSpeed - what current speed will be
     */
    private setActiveSpeedAttributes(selectedSpeed: HTMLLIElement): void {
      selectedSpeed.setAttribute('aria-checked', 'true');
      selectedSpeed.setAttribute('aria-selected', 'true');
      selectedSpeed.classList.add('active');
    }

    /**
     * Sets the styling and accessibility attributes for the other speeds
     * @param {HTMLLIElement} aSpeed - what current speed will be
     */
    private setNonActiveSpeedAttributes(aSpeed: HTMLLIElement): void {
      aSpeed.setAttribute('aria-checked', 'false');
      aSpeed.setAttribute('aria-selected', 'false');
      aSpeed.classList.remove('active');
    }

    /**
     * Enables user to change reading speed
     * onclick function for each of the speed options
     * Sets current reading speed for the SpeedButton class based on the speed
     * selected and sets it in the audio player's playbackRate
     * Removes the active class from the former speed and adds it to the
     * current speed
     * @param {MouseEvent} event - the click that triggered this function
     * @listens
     */
    public changePlaybackRate(event: MouseEvent): void {
      const selectSpeed = event.target as HTMLLIElement;
      if (selectSpeed && selectSpeed.matches('li')) {
        const newPlaybackRate = Number(selectSpeed.innerText);
        if (newPlaybackRate >= this.speedSettings[0] &&
           newPlaybackRate <= this.speedSettings[this.speedSettings.length-1]) {
          const player = document.getElementById('webricePlayer') as
              HTMLAudioElement;
          this.setCurrentSpeed(Number(selectSpeed.innerText));
          player.playbackRate = this.getCurrentSpeed();
          // remove the active class on the former speed
          this.setNonActiveSpeedAttributes(document.querySelector(
              '#' + this.speedSelectId + ' > li.active') as HTMLLIElement);
          // then put it on the new current speed
          this.setActiveSpeedAttributes(selectSpeed);
        }
      }
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
      const button = document.createElement('div');
      button.id = this.id;
      button.setAttribute('role', 'button');
      button.setAttribute('alt', this.alt);
      button.setAttribute('title', this.title);
      button.setAttribute('tabindex', '0');
      button.setAttribute('aria-expanded', 'false');
      button.classList.add('speedButtonGroup');
      if (this.classes !== '') button.classList.add(this.classes);

      button.appendChild(this.buttonIcon.svg);

      // Create the playbackRate options popup
      const speedOptions = document.createElement('ul');
      speedOptions.classList.add('webriceMainSpeed');
      speedOptions.id = this.speedSelectId;
      this.speedSettings.forEach( (speed) => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(speed.toString()));
        li.title = speed.toString();
        li.setAttribute('role', 'option');
        if (this.getCurrentSpeed() === speed) {
          this.setActiveSpeedAttributes(li);
        } else {
          this.setNonActiveSpeedAttributes(li);
        }
        li.addEventListener('click', (e) => {
          this.changePlaybackRate(e);
        });
        speedOptions.appendChild(li);
      });
      button.appendChild(speedOptions);

      return button;
    }
}
