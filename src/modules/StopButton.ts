import {MainButton} from './MainButton';
import {Icon} from './icons';
import {PlayerAttributes} from './PlayerAttributes';

/**
 * A button enabling users to reset webrice web reader
 */
export class StopButton extends MainButton {
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
  }

  /**
   * Stop workflow
   * @param {HTMLAudioElement} player - the reference to the webrice audio
   *   player
   * @param {PlayerAttributes} webPlayerAttributes - the reference to the
   *   webrice audio attributes
   */
  stop(player: HTMLAudioElement, webPlayerAttributes: PlayerAttributes): void {
    player.pause();
    webPlayerAttributes.init(player);
  }
}
