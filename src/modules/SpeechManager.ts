/**
 * The SpeechManager class deals with creating and organizing all the TTS API
 * input and output for webrice.
 */
export class SpeechManager {
  /**
   * General function to fetch the audio from a TTS API, of the text to be
   * read. Currently, we submits separate requests for each paragraph or header
   *
   * TODO: We're working to support AWS Polly.
   * @param {string} webText - The webtext given and which needs to be turned
   * @param {string[]} audioContent - The webtext given and which needs
   * to be turned
   * @return {string[]} - returns the audio urls to the calling function
   */
  public async getAudio(webText: string, audioContent:
    string[]): Promise<string[]> {
    const webTextArray = webText.split(/\.+/);
    // Filter out segments which are only white space
    const webTextArrayFiltered = webTextArray
        .filter((seg) => seg.trim().length != 0);
    console.log(webTextArrayFiltered);
    await Promise.all(
        webTextArrayFiltered
            .map((webTextSegment) => {
              return this.getAudioSegment(webTextSegment);
            })
    ).then((urls) => {
      urls.map((url) => {
        audioContent.push(url);
      });
    });
    console.log(audioContent);
    return audioContent;
  }

  /**
   * Helper function to submit the text to be read to a TTS API. Currently, we
   * support Tiro's Cicero tts.
   *
   * @param {string} webText - The webtext given and which needs to be turned
   *   into audio
   * @return {string} - returns the audio url to the calling function
   */
  private async getAudioSegment(webText: string): Promise<string> {
    // TODO: submit query to AWS polly
    // TODO: cache results and default to using the cached audio
    // TODO: the delay for 700+ character long articles is too long
    // submit query to tts.tiro.is
    // const voice = 'talromur/b';
    console.log(webText);
    const voiceName = 'Alfur';
    const audioType = 'mp3';
    const url = 'https://tts.tiro.is/v0/speech';
    console.log('Using Tiro Cicero talromur b/' + voiceName +
      '. Others are Polly: Karl and Dora');
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Engine: 'standard',
        LanguageCode: 'is-IS',
        LexiconNames: [],
        OutputFormat: audioType,
        SampleRate: '16000',
        SpeechMarkTypes: [],
        Text: webText,
        TextType: 'text',
        VoiceId: voiceName,
      }),
    })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status} = ${res.statusText}`);
            // throw new Error('Network did not respond with audio file');
          }
          return res.blob();
        })
        .then((audStream) => {
          // don't forget to URL.revokeObjectURL(url) when finished
          const blobURL = window.URL.createObjectURL(audStream);
          return blobURL;
        })
        .catch((error) => {
          console.error('No audio received from the tts web service: ', error);
          return '';
        });
  }

  /**
   * Public general function to handle fetching the audio from the given text
   * TODO: It also fetches the timestamps for each word and sentence.
   * @param {string} webText - The webtext given and which needs to be turned
   * @param {string[]} audioContent - The webtext given and which needs
   * to be turned
   * @return {string[]} - returns the audio urls to the calling function
   */
  public async fetchAudioAndMarks(webText: string, audioContent:
    string[]): Promise<string[]> {
    return this.getAudio(webText, audioContent);
    // TODO: call and return getSpeechMarks();
  }
}
