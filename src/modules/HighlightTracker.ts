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

  /**
   * Unhighlight the first word and highlight the second word.
   *
   * @param {string} worda - currently highlighted word
   * @param {string} wordb - word to highlight
   */
  private unHighlightAndHighlight(worda: string, wordb: string): void {
    const paragraph2HL = document.getElementById('highlight') as HTMLElement;
    paragraph2HL.innerHTML = paragraph2HL.innerHTML
        .replace('<mark>' + worda +'</mark> ' + wordb,
            worda + ' <mark>' + wordb + '</mark>');
  }

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
   * HighlightWords using SpeechMarks for words
   */
  private async highlightWordSpeechMarks(): Promise<void> {
    const paragraph2HL = document.getElementById('highlight') as HTMLElement;
    const highlightText = new TextEncoder().encode(paragraph2HL.innerHTML);
    const startMark = new TextEncoder().encode('<mark>');
    const endMark = new TextEncoder().encode('</mark>');
    const speechMarks = await this.parseSpeechMarks();
    /* Get the text from the html tag
     * Get the speech marks
     * Convert the text from the html tag to a byte array
     * slice the byte array by the start and end numbers indicated by the
     * speech marks this is the portion of the text which will be highlighted
     */
    const player = document.getElementById('webricePlayer') as HTMLAudioElement;

    // Construct the highlighted innerHTML
    speechMarks.forEach((SM) => {
      const textWHL = new Uint8Array(
          [...highlightText.slice(0, SM.start),
            ...startMark,
            ...highlightText.slice(SM.start, SM.end),
            ...endMark,
            ...highlightText.slice(SM.end, highlightText.length)]);
      console.log(new TextDecoder().decode(textWHL));
      console.log(paragraph2HL.innerHTML);
      console.log('player current time: ' +
        this.convertS2MS(player.currentTime));
    });
  }

  /**
   * Split on spaces. Set timeout to highlight for the duration of that word in
   * the audio recording.
   *
   * Change highlight speed when audio speed is changed
   *
   * Clear timeouts so highlighting can work each time play is
   * pressed.
   *
   * When HighlightTracker.reset is true then stop highlighting and remove
   * highlighting on last highlighted word.
   *
   * Use the Alfur timings
   * Found the ctm of each word using gecko
   * Sync it with a bjartur audio
   * Works with speech marks
   *
   * TODO: get the text as Uint8Array bytes
   * TODO: pause it once pause is pressed.
   * TODO: resume if play is pressed for the second time
   * TODO: get it to work with other current recordings
   * TODO: get it to work with other recordings from tts.tiro.is
   * @return {Promise<void>} - returns something
   */
  private async highlightWords(): Promise<void> {
    const paragraph2HL = document.getElementById('highlight') as HTMLElement;
    const player = document.getElementById('webricePlayer') as HTMLAudioElement;
    console.log('Audio playbackRate: ' + player.playbackRate);
    let highlightSpeedMultiplier = 1/player.playbackRate;
    console.log('Highlighting timings: ' + highlightSpeedMultiplier);
    this.highlightWordSpeechMarks();
    const speechMarks = await this.parseSpeechMarks();

    if (paragraph2HL) {
      const words = paragraph2HL.innerHTML.split(' ');

      // Wait for player duration to be a valid number before highlighting
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

      // Highlight the given word. (first word in paragraph)
      paragraph2HL.innerHTML = paragraph2HL.innerHTML
          .replace(words[0],
              '<mark>' + words[0] + '</mark>');

      for (let i = 0; i < words.length - 1; i++) {
        if (HighlightTracker.reset) {
          // Remove the highlighting on the last highlighted word
          paragraph2HL.innerHTML = paragraph2HL.innerHTML
              .replace('<mark>' + words[i - 1] + '</mark>', words[i -1]);
          break;
        } else {
          const timeDiff = speechMarks[i].time -
            this.convertS2MS(player.currentTime);
          if (timeDiff > 0) {
            clearTimeout(HighlightTracker.sleepHandler);
            highlightSpeedMultiplier = 1/player.playbackRate;
            HighlightTracker.sleepHandler =
                await this.sleep(timeDiff*highlightSpeedMultiplier);
            this.unHighlightAndHighlight(words[i], words[i+1]);
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
      // Remove the highlighting on the given word (last word in paragraph)
      paragraph2HL.innerHTML = paragraph2HL.innerHTML
          .replace('<mark>' + words[words.length - 1] + '</mark>',
              words[words.length -1]);
      clearTimeout(HighlightTracker.sleepHandler);
    }
  }

  /**
   * Stop highlighting
   *
   * @return {Promise<void>} - returns something
   */
  static async stopHighlighting(): Promise<void> {
    console.log('clear highlighting');
    HighlightTracker.reset = true;
    clearTimeout(HighlightTracker.sleepHandler);
    const paragraph2HL = document.getElementById('highlight') as HTMLElement;
    const words = paragraph2HL.innerHTML.split(' ');
    words.forEach((word) => {
      if (word.includes('<mark>')) {
        const wordOnly = word.replace('<mark>', '').replace('</mark>', '');
        paragraph2HL.innerHTML = paragraph2HL.innerHTML
            .replace(word, wordOnly);
      }
    });
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
