import * as idb from 'idb-keyval';

/**
 * An async class that communicates with the indexed
 * database to retrive and store values
 */
class ClientStoreManager {
    supported: boolean;
    readonly keys = {
      speedVal: 'speedValue',
    }
    store: idb.Store;
    /**
     * No parameters but initialize this.supported.
     */
    constructor() {
      this.supported = this.isSupported();
      this.store = new idb.Store('ClientStorage', 'UserSettings');
    }

    /**
     * returns the value of this.supported
     * @return {boolean} supported
     */
    get support(): boolean {
      return this.supported;
    }

    /**
     * @return {idb.Store} Client store
     */
    get clientStore(): idb.Store {
      return this.store;
    }

    /**
     * @return {boolean} is Indexed DB supported?
     */
    private isSupported(): boolean {
      if (!window.indexedDB) {
        console.warn('IndexedDB not supported.'+
        ' Client side storage disabled.');
        return false;
      }
      return true;
    }

    /**
     * Stores the playback rate in an IndexedDB
     * @param {number} speed playback rate value
     */
    public setPlayback(speed: number): void {
      if (this.support) {
        idb.set(this.keys.speedVal, speed, this.clientStore).then(
            () => console.log('speed value stored'));
      }
    }

    /**
     * Returns the stored playback rate from the IndexedDB
     * @return {Promise<number>} playbackrate
     */
    public async getPlayback(): Promise<number> {
      if (!this.support) {
        return 1;
      }
      try {
        let speed: number|undefined =await idb.get(
            this.keys.speedVal, this.clientStore);
        if (!speed) {
          speed = 1;
        }
        return speed;
      } catch (e) {
        console.warn('No speed value saved in indexedDB');
        return 1;
      }
    }


    /**
     * <NOT FINISHED YET>
     * @param {string} text
     * Compears the sums of the texts to see whether we need to fetch a new
     * recording or not.
     */
    public compareText(text: string): void {
      console.log('This hasn\'t been implemented yet');
    }
}

const cli = new ClientStoreManager;

export {cli};
