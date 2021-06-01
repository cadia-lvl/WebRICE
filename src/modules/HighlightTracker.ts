/**
 * The main highlight class of webrice
 * It is in charge of all aspects related to highlighting text.
 * TODO: add highlightSentences
 * TODO: Trigger on audio.onTimeUpdate X current Time
 * TODO: make the properties and methods static
 */
export class HighlightTracker {
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
   * Split on spaces. Set timeout to highlight for the duration of that word in
   * the audio recording.
   * Clear intervals and timeouts so highlighting can work each time play is
   * pressed.
   *
   * Use the bjartur timings
   * Found the ctm of each word using gecko
   * Sync it with a bjartur audio
   *
   * TODO: pause it once pause is pressed.
   * TODO: resume if play is pressed for the second time
   * TODO: start all over when stop is pressed.
   * TODO: play from beginning once it's all re-initialized + play
   * TODO: get it to work with other current recordings
   * TODO: get it to work with other recordings from tts.tiro.is
   * @return {Promise<void>} - returns something
   */
  private async highlightWords(): Promise<void> {
    const paragraph2HL = document.getElementById('highlight') as HTMLElement;
    const speechMarks = [
      {'time': 30, 'type': 'word', 'duration': 200, 'value': 'Með'},
      {'time': 230, 'type': 'word', 'duration': 650, 'value': 'textalitun'},
      {'time': 880, 'type': 'word', 'duration': 270, 'value': 'eiga'},
      {'time': 1050, 'type': 'word', 'duration': 570, 'value': 'notendur'},
      {'time': 1630, 'type': 'word', 'duration': 390, 'value': 'auðveldar'},
      {'time': 2020, 'type': 'word', 'duration': 160, 'value': 'með'},
      {'time': 2180, 'type': 'word', 'duration': 130, 'value': 'að'},
      {'time': 2320, 'type': 'word', 'duration': 300, 'value': 'lesa'},
      {'time': 2620, 'type': 'word', 'duration': 210, 'value': 'og'},
      {'time': 2820, 'type': 'word', 'duration': 250, 'value': 'hlusta'},
      {'time': 3070, 'type': 'word', 'duration': 160, 'value': 'á'},
      {'time': 3230, 'type': 'word', 'duration': 400, 'value': 'efnið.'},
    ];
    if (paragraph2HL) {
      let handler = 0;
      let sleepHandler = 0;
      const words = paragraph2HL.innerHTML.split(' ');
      // Highlight the given word. (first word in paragraph)
      paragraph2HL.innerHTML = paragraph2HL.innerHTML
          .replace(words[0],
              '<mark>' + words[0] + '</mark>');
      // TODO: remove console.log
      console.log(words[0], words[1]);

      for (let i = 0; i < words.length - 1; i++) {
        // TODO: remove console.log
        console.log(words[i], words[i+1], i);
        sleepHandler = await this.sleep(speechMarks[i].duration);
        clearInterval(handler);
        handler = 0;
        handler = setInterval(this.unHighlightAndHighlight, 10, words[i],
            words[i+1]);
        clearTimeout(sleepHandler);
      }

      // Remove the highlighting on the last word.
      sleepHandler = await this.sleep(speechMarks[words.length - 1].duration);
      // Remove the highlighting on the given word (last word in paragraph)
      paragraph2HL.innerHTML = paragraph2HL.innerHTML
          .replace('<mark>' + words[words.length - 1] + '</mark>',
              words[words.length -1]);
      clearInterval(handler);
      handler = 0;
      clearTimeout(sleepHandler);
    }
  }

  /**
   * Highlight words and or sentence if those properties are true.
   *
   * @return {Promise<void>} - returns something
   */
  public async startHighlighting(): Promise<void> {
    this.highlightWords();
  }
}
