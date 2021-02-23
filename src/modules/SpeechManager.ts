/**
 * The SpeechManager class deals with creating and organizing all the TTS API
 * input and output for webrice.
 */
export class SpeechManager {
  /**
   * Submit the text to be read to a TTS API. Currently we're working to support
   * AWS Polly.
   * @param {string} webText - The webtext given and which needs to be turned
   *   into audio
   * @return {string[]} - returns the audio urls to the calling function
   */
  private async getAudio(webText: string): Promise<string[]> {
    // TODO: submit query to AWS polly
    // TODO: submit multiple requests for longer articles/webpages
    // TODO: currently can only read about 75% of the page, need to split it up
    // into smaller requests to get it to read the whole page easily
    // NOTE: the delay for 700+ character is too long, likely will need to split
    // up the requests
    // submit query to tts.tiro.is
    // const voice = 'talromur/b';
    const webSub = webText.substring(0, 1090);
    console.log(webSub);
    const audioContent : string[] = [];
    console.log('Using talromur b/Other. Others are Polly: Karl and Dora');
    const url = 'https://tts.tiro.is/v0/speech';
    return await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Engine: 'standard',
        LanguageCode: 'is-IS',
        LexiconNames: [],
        OutputFormat: 'pcm',
        SampleRate: '22050',
        SpeechMarkTypes: [],
        Text: webSub,
        TextType: 'text',
        VoiceId: 'Other',
      }),
    })
        .then((result) => {
          if (!result.ok) {
            throw new Error('Network did not respond with audio file');
          }
          return result.blob();
        })
        .then((audStream) => {
          const blobURL = window.URL.createObjectURL(audStream);
          audioContent.push(blobURL);
          return audioContent;
        })
        .catch((error) => {
          console.error('No audio received from the tts web service: ', error);
          return audioContent;
        });
  }

  /**
   * Public general function to handle fetching the audio from the given text
   * TODO: It also fetches the timestamps for each word and sentence.
   * @param {string} webText - The webtext given and which needs to be turned
   * @return {string[]} - returns the audio urls to the calling function
   */
  public async fetchAudioAndMarks(webText: string): Promise<string[]> {
    return await this.getAudio(webText);
    // TODO: call and return getSpeechMarks();
  }
}
