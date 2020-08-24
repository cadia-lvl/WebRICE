/**
 * PlayerAttributes stores the audio player attributes which allow it to switch
 * between multiple files. This class may become obsolete if we start using
 * audioTracks.
 */
export class PlayerAttributes {
  started = false;
  paused = true;
  playbackRate = 1.0;

  /**
   * Initialize player values
   */
  init(): void {
    this.started = false;
    this.paused = true;
  }

  /**
   * Set class variables to indicate the player is playing
   */
  setPlaying(): void {
    this.started = true;
    this.paused = false;
  }

  /**
   * Getter for started
   * @return {boolean} started - the class variable
   */
  getStarted(): boolean {
    return this.started;
  }

  /**
   * Setter for started
   * @param {boolean} started - the started value to change to
   */
  setStarted(started: boolean): void {
    this.started = started;
  }

  /**
   * Getter for paused
   * @return {boolean} paused - the class variable
   */
  getPaused(): boolean {
    return this.paused;
  }

  /**
   * Setter for paused
   * @param {boolean} paused - the started value to change to
   */
  setPaused(paused: boolean): void {
    this.paused = paused;
  }

  /**
   * Getter for playbackRate
   * @return {number} playbackRate - the class variable
   */
  getPlaybackRate(): number {
    return this.playbackRate;
  }

  /**
   * Setter for playbackRate
   * @param {number} playbackRate - the new playbackRate value
   */
  setPlaybackRate(playbackRate: number): void {
    this.playbackRate = playbackRate;
  }
}
