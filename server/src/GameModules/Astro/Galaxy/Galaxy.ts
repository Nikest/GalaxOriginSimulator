import { System } from 'GameModules/Astro';
import { Noise } from 'GameModules/Services';

const eventGeneratedListeners: Function[] = [];
const eventOnStartGeneratingListener: Function[] = [];
let systemArr: System;


export class Galaxy {
    system: System;
    noise;
    seed;

    static generateNewRandomSystem(fn) {
        eventOnStartGeneratingListener.forEach(fn => fn());

        System.makeRandomSystem().then(system => {
            systemArr = system;

            system.onUpdated((system) => {
                fn(system)
            });
        });
    }

    static getSystem(): System {
        return systemArr;
    }

    constructor(seed?) {
        /*this.noise = new Noise({
            min: 1,
            max: 10000,
        });

        this.seed = seed ? seed : null;

        if (!this.seed) {
            this.seed = {
                min: 1,
                max: 10000,
                amplitude: this.noise.amplitude,
                frequency: this.noise.frequency,
                octaves: this.noise.octaves,
                perm: this.noise.perm,
                permMod12: this.noise.permMod12,
                persistence: this.noise.persistence
            }
        } else {
            this.noise.amplitude = this.seed.amplitude;
            this.noise.frequency = this.seed.frequency;
            this.noise.octaves = this.seed.octaves;
            this.noise.perm = this.seed.perm;
            this.noise.permMod12 = this.seed.permMod12;
            this.noise.persistence = this.seed.persistence;
        }*/
    }
}
