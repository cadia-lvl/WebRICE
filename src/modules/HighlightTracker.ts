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
 * TODO: Trigger on audio.onTimeUpdate X current Time
 * TODO: make the properties and methods static
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
   * @return {AllSpeechMarks[]} - returns the speechMarks in an easily parsable
   * format
   */
  private async parseSpeechMarks(): Promise<AllSpeechMarks[]> {
    const tiroSpeechMarks =
        await fetch(`resources/speech_marks/cicero_textalitun.json`)
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
   * Slice the web text byte array by the start and end numbers indicated by
   * the speech mark. This is the portion of the text which will be highlighted
   * Set timeout to highlight for the duration of that word in the audio.
   *
   * Change highlight speed when audio playbackRate changes.
   * Clear timeouts so highlighting can work each time play is pressed.
   * When HighlightTracker.reset is true then stop highlighting and remove
   * highlighting on last highlighted word.
   *
   * Use the Alfur timings:
   * Found the ctm of each word using gecko.
   * Synced it with the Alfur audio.
   *
   * TODO: pause it once pause is pressed.
   * TODO: resume if play is pressed for the second time
   * TODO: get it to work with other current recordings
   * TODO: get it to work with other recordings from tts.tiro.is
   * @return {Promise<void>} - returns something
   */
  private async highlightWords(): Promise<void> {
    const paragraph2HL = document.getElementById('highlight') as HTMLElement;
    HighlightTracker.origWebText = paragraph2HL.innerHTML;
    const origWebTextArray = new
    TextEncoder().encode(HighlightTracker.origWebText);
    const startMark = new TextEncoder().encode('<mark>');
    const endMark = new TextEncoder().encode('</mark>');
    const player = document.getElementById('webricePlayer') as HTMLAudioElement;
    console.log('Audio playbackRate: ' + player.playbackRate);
    let highlightSpeedMultiplier = 1/player.playbackRate;
    console.log('Highlighting timings: ' + highlightSpeedMultiplier);
    const speechMarks = await this.parseSpeechMarks();

    if (paragraph2HL) {
      // Wait for player duration to be a number before highlighting
      while (isNaN(player.duration)) {
        clearTimeout(HighlightTracker.sleepHandler);
        highlightSpeedMultiplier = 1/player.playbackRate;
        HighlightTracker.sleepHandler =
          await this.sleep((speechMarks[0].time/2)*highlightSpeedMultiplier);
        console.log('player current time: ' +
          this.convertS2MS(player.currentTime));
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
    const paragraph2HL = document.getElementById('highlight') as HTMLElement;
    if (HighlightTracker.origWebText != '') {
      paragraph2HL.innerHTML = HighlightTracker.origWebText;
    }
  }

  /**
   * Highlight words and or sentence if those properties are true.
   *
   * @return {Promise<void>} - returns something
   */
  public async startHighlighting(): Promise<void> {
    HighlightTracker.reset = false;
    this.highlightWords();
  }
}
