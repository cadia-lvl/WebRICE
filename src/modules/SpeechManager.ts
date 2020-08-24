import {Reader} from './../Reader';
/**
 * The SpeechManager class deals with creating and organizing all the TTS API
 * input and output for webrice.
 */
export class SpeechManager {
  /**
   * Submit the text to be read to a TTS API. Currently we're working to support
   * AWS Polly.
   * @param {string} webText - The webtext given and which needs to be turned
   * @return {string[]} - returns the audio urls to the calling function
   *   into audio
   */
  private getAudio(webText: string): string[] {
    // TODO: submit query to AWS polly
    console.log(webText);
    const audioContent = [
      'resources/example_voice_files/content-1.mp3',
      'resources/example_voice_files/content-2.mp3',
      'resources/example_voice_files/content-3.mp3',
      'resources/example_voice_files/content-4.mp3',
      'resources/example_voice_files/content-5.mp3',
      'resources/example_voice_files/content-6.mp3',
      'resources/example_voice_files/content-7.mp3',
      'resources/example_voice_files/content-8.mp3',
      'resources/example_voice_files/content-9.mp3',
      'resources/example_voice_files/content-10.mp3',
      'resources/example_voice_files/content-11.mp3',
      'resources/example_voice_files/content-12.mp3'];
    return audioContent;
  }

  /**
   * Public general function to handle fetching the audio from the given text
   * TODO: It also fetches the timestamps for each word and sentence.
   * @return {string[]} - returns the audio urls to the calling function
   */
  public fetchAudioAndMarks(): string[] {
    const readerText = new Reader();
    return this.getAudio(readerText.getWebText());
    // TODO: call and return getSpeechMarks();
  }
}
