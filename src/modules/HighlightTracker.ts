interface AllSpeechMarks {
  time: number,
  'type': string,
  start: number,
  end: number,
  value: string,
}
/**
 * The main highlight class of webrice
 * It is in charge of all aspects related to highlighting text.
 * TODO: add highlightSentences
 */
export class HighlightTracker {
  static sleepHandler = 0;
  static highlightWords = true;
  static highlightSentences = false;
  static reset = false;
  static origWebText = '';

  /**
   * Set a timeout of the given ms
   * Thank you Dan Dasacalescu for the help
   * https://stackoverflow.com/a/39914235
   * @param {number} ms - number of milliseconds
   * @return {Promise<any>} - returns the setTimeout
   */
  private sleep(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Converts player time from seconds to milliseconds
   * @param {number} s - number of seconds
   * @return {number} - returns the time in milliseconds
   */
  private convertS2MS(s: number): number {
    return s*1000;
  }

  /**
   * Turns speech marks into usable json array
   * @param {string} speechMarksFile - number of seconds
   * @return {AllSpeechMarks[]} - returns the speechMarks in an easily parsable
   * format
   */
  private async parseSpeechMarks(speechMarksFile: string):
  Promise<AllSpeechMarks[]> {
    const tiroSpeechMarks =
        await fetch(speechMarksFile)
            .then((response) =>(
              response.text()
            ));
    // Filter out the last element which is the empty string
    return tiroSpeechMarks
        .split('\n')
        .filter((mark) => {
          return mark != '';
        })
        .map((speechMark) => JSON.parse(speechMark));
  }

  /**
   * Highlight words with speech marks
   *
   * Get the text from the html tag as Uint8Array bytes.
   * Get the speech marks.
   * Only set the origWebText when the audio is at or before the beginning.
   * Slice the web text byte array by the start and end numbers indicated by
   * the current speech mark. This is the portion of the text which will be
   * highlighted. Set timeout to highlight for the duration of that word in
   * the audio.
   *
   * Change highlight speed when audio playbackRate changes.
   * Clear timeouts so highlighting can work each time play is pressed.
   * When HighlightTracker.reset is true then stop highlighting and remove
   * highlighting on last highlighted word.
   *
   * When the audio player is paused then don't highlight the next word.
   * Start/resume highlighting only during the relevant player duration for
   * that speech mark.
   *
   * NOTE! Highlighting only works for webrice's main and highlight pages
   * Use the Alfur timings:
   * The ctm of each word can be manually found using gecko and the Alfur audio.
   *
   * TODO: connect to toggle
   * TODO: work with speech marks request
   * TODO: get it to work with other current recordings
   * TODO: get it to work with other recordings from tts.tiro.is
   * @return {Promise<void>} - returns something
   */
  private async highlightWords(): Promise<void> {
    const paragraph2HL = document.querySelector('.webriceHL') as HTMLElement;
    const player = document.getElementById('webricePlayer') as HTMLAudioElement;
    // Only set origwebText when the text has never been highlighted before
    if (isNaN(player.duration) || player.duration == 0) {
      HighlightTracker.origWebText = paragraph2HL.innerHTML;
    }
    const origWebTextArray = new
    TextEncoder().encode(HighlightTracker.origWebText);
    const startMark = new TextEncoder().encode('<mark>');
    const endMark = new TextEncoder().encode('</mark>');
    let filename = '';
    if (HighlightTracker.origWebText.includes('veflesari')) {
      filename = `resources/speech_marks/cicero_veflesari.json`;
    } else {
      filename = `resources/speech_marks/cicero_textalitun.json`;
    }
    const speechMarks = await this.parseSpeechMarks(filename);
    let highlightSpeedMultiplier = 1/player.playbackRate;

    if (paragraph2HL) {
      // Wait for player duration to be a number before highlighting
      while (isNaN(player.duration)) {
        clearTimeout(HighlightTracker.sleepHandler);
        highlightSpeedMultiplier = 1/player.playbackRate;
        HighlightTracker.sleepHandler =
          await this.sleep((speechMarks[0].time/2)*highlightSpeedMultiplier);
      }
      let timeDiff = speechMarks[0].time -
        this.convertS2MS(player.currentTime);
      console.log('player current time: ' +
          this.convertS2MS(player.currentTime));
      if (timeDiff > 0) {
        clearTimeout(HighlightTracker.sleepHandler);
        highlightSpeedMultiplier = 1/player.playbackRate;
        HighlightTracker.sleepHandler =
          await this.sleep(timeDiff*highlightSpeedMultiplier);
      }

      for (let i = 0; i < speechMarks.length; i++) {
        if (HighlightTracker.reset) {
          // Restore innerHTML to just the words
          paragraph2HL.innerHTML = HighlightTracker.origWebText;
          break;
        } else {
          const timeDiff = speechMarks[i].time -
            this.convertS2MS(player.currentTime);
          if (timeDiff > 0) {
            clearTimeout(HighlightTracker.sleepHandler);
            highlightSpeedMultiplier = 1/player.playbackRate;
            HighlightTracker.sleepHandler =
                await this.sleep(timeDiff*highlightSpeedMultiplier);
            if (player.paused) {
              return;
            }

            // Construct the highlighted innerHTML
            const textWHL = new Uint8Array(
                [...origWebTextArray.slice(0, speechMarks[i].start),
                  ...startMark,
                  ...origWebTextArray.slice(speechMarks[i].start,
                      speechMarks[i].end),
                  ...endMark,
                  ...origWebTextArray.slice(speechMarks[i].end,
                      origWebTextArray.length)]);
            paragraph2HL.innerHTML = new TextDecoder().decode(textWHL);
          }
        }
      }

      // Sleep until the end of the audio file has been reached
      timeDiff = this.convertS2MS(player.duration) -
        this.convertS2MS(player.currentTime);
      if (timeDiff > 0) {
        clearTimeout(HighlightTracker.sleepHandler);
        highlightSpeedMultiplier = 1/player.playbackRate;
        HighlightTracker.sleepHandler =
          await this.sleep(timeDiff*highlightSpeedMultiplier);
      }
      // Remove highlighting on the last word in the paragraph
      paragraph2HL.innerHTML = HighlightTracker.origWebText;
      clearTimeout(HighlightTracker.sleepHandler);
    }
  }

  /**
   * Stop highlighting
   *
   * @return {Promise<void>} - returns something
   */
  static async stopHighlighting(): Promise<void> {
    console.log('Clear highlighting');
    HighlightTracker.reset = true;
    clearTimeout(HighlightTracker.sleepHandler);
    const paragraph2HL = document.querySelector('.webriceHL') as HTMLElement;
    if (HighlightTracker.origWebText != '') {
      paragraph2HL.innerHTML = HighlightTracker.origWebText;
    }
  }

  /**
   * Resume highlighting words or sentences
   * call highlightWords again to resume highlighting
   *
   * @return {Promise<void>} - returns something
   */
  public async resumeHighlighting(): Promise<void> {
    console.log('resume highlighting');
    HighlightTracker.reset = false;
    this.highlightWords();
  }

  /**
   * Highlight words and or sentence if those properties are true.
   * 1. need to reset highlighting when startHighlighting is pressed just to
   * make sure there are no old highlighting artifacts from say a pause
   *
   * @return {Promise<void>} - returns something
   */
  public async startHighlighting(): Promise<void> {
    HighlightTracker.stopHighlighting();
    HighlightTracker.reset = false;
    this.highlightWords();
  }
}
