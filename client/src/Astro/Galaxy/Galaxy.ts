import { storeInterface } from 'Services';
import { System } from 'Astro';

export class Galaxy {
    static showSystem(data?) {
        System.makeRandomSystem().then(system => {
            system.onUpdated(() => storeInterface().setData('viewSystem', system));
        });
    }

    constructor(seed?) {

    }
}
