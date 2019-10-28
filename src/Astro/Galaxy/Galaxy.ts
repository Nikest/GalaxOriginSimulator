import { System } from 'Astro';

const eventGeneratedListeners: Function[] = [];
const eventOnStartGeneratingListener: Function[] = [];

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
            system.onUpdated(() => {
                eventGeneratedListeners.forEach(fn => fn(system))
            });
        });
    }
}
