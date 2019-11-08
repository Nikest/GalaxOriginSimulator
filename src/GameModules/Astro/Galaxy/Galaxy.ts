import { System } from 'GameModules/Astro';
import { command, eventEmitter } from 'Services';

const eventGeneratedListeners: Function[] = [];
const eventOnStartGeneratingListener: Function[] = [];
let systemArr: System;

const earth = {
    mass: 5.972e24,
    radius: 6371
};

const solar = {
    mass: 1.989e30,
    radius: 695510,
    luminosity: 3.828 * 10e26,
    farOrbit: 50
};

export class Galaxy {
    system: System;

    static generateNewRandomSystem() {
        eventOnStartGeneratingListener.forEach(fn => fn());
        eventEmitter.emit('galaxy.startGeneratingSystem');

        System.makeRandomSystem().then(system => {
            systemArr = system;
            eventEmitter.emit('galaxy.endGeneratingSystem', system);

            system.onUpdated(() => {
                eventEmitter.emit('galaxy.systemUpdated', system);
            });
        });
    }

    static getSystem(): System {
        return systemArr;
    }
}

command.on('galaxy.makeSystem', () => Galaxy.generateNewRandomSystem());

command.on('galaxy.getSystemJSON', (transfer) => {
    transfer(Galaxy.getSystem().toJSON())
});

command.on('galaxy.uploadSystemJSON', (json) => Galaxy.getSystem().fromJSON(json));
