import { System } from 'Astro';

const eventGeneratedListeners: Function[] = [];
const eventOnStartGeneratingListener: Function[] = [];
let systemArr: System;

export class Galaxy {
    system: System;


    static onSystemGenerated(fn) {
        eventGeneratedListeners.push(fn)
    }

    static onStartSystemGenerating(fn) {
        eventOnStartGeneratingListener.push(fn);
    }

    static generateNewRandomSystem() {
        eventOnStartGeneratingListener.forEach(fn => fn());

        System.makeRandomSystem().then(system => {
            systemArr = system;
            system.onUpdated(() => {
                eventGeneratedListeners.forEach(fn => fn(system))
            });
        });
    }

    static getSystem() {
        return systemArr;
    }
}
