import {Button} from './Button';
import {icon} from './icons';

/**
 * A button enabling users to reset webrice web reader
 */
export class StopButton extends Button {
  /**
     *
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
   * Resets webrice
   */
  onClicked(): void {
    console.log('clicked!');
  }
}
