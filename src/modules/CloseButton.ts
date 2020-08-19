import {Button} from './Button';
import {Icon} from './icons';

/**
 * Closes a module 
 */
export class CloseButton extends Button {
  /**
     *
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
  /**
   * Resets webrice
   */
  onClicked(): void {
    console.log('clicked!');
  }
}
