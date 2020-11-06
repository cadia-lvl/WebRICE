import * as idb from 'idb-keyval';
import { validate } from 'json-schema';

class ClientStoreManager {
    supported: boolean;
    keys = {
        speedVal: 'speedValue',
    }

    constructor(){
        this.supported = this.isSupported();
    }

    get support(){
        return this.supported;
    }

    private isSupported(): boolean{
        if(!window.indexedDB){
            console.warn("Indexed Database not supported, client side storage disabled");
            return false;
        }
        return true;
    }

    /**
     * 
     * @param speed 
     */
    public setSpeedVal(speed: number): void{
        if(this.support) {
            idb.set(this.keys.speedVal, speed).then(()=> console.log('speed value written'));
        }
    }

    /**
     * 
     * @return 
     */
    
    public getSpeedVal(): number {
        if(!this.support) {
            return 1;
        }

        idb.get(this.keys.speedVal)
        .then(val => {
            console.log(typeof(val));
            console.log(val);
            return val;
        }, reason => {
            console.log(reason);
            return 1;
        });
    }

    /**
     * 
     */
    public compareText(){

    }
}

var cli = new ClientStoreManager;

export{cli}; 
