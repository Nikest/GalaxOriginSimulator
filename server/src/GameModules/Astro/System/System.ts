import { Star, Planet, Barycenter, Moon, BodyBase } from 'GameModules/Astro';
import { astroWorker } from 'GameModules/Services';

interface ISystem {
    name: string;
    system: Barycenter;
    rate: number;
    onUpdated(fn: Function);
    updated(data: any);
    setBarycenter(barycenter: Barycenter);
    forEach(fn: Function);
    toJSON(): string;
    fromJSON(JSON: string): void;
}

export class System implements ISystem {
    name = '';
    system: Barycenter;
    rate: 0;

    static makeRandomSystem(): Promise<System> {
        return new Promise(res => {
            const system = new System();

            Star.makeRandomStar().then((star: Star) => {
                const mainCenter = new Barycenter(star, null);
                mainCenter.setSystemLink(system);

                mainCenter.generateOrbits();

                const planetsPromices = Array(mainCenter.orbits.length).fill(0).map((p, i) => {
                    return new Promise(res => {
                        Planet.makeRandomPlanet(star, i, mainCenter.orbits[i].selfOrbit.A).then((planet: Planet) => {

                            const moonPromices = astroWorker.getMoonsTemplateCount(planet.type, () => {
                                return Moon.makeRandomMoon(planet.orbitZone, planet.type, planet.percentInHabitable || 0)
                            });

                            const barycenter = new Barycenter(planet, mainCenter, mainCenter.orbits[i].selfOrbit.A);
                            barycenter.generateOrbits(moonPromices.length);

                            Promise.all(moonPromices).then((moonsArray: Moon[]) => {
                                moonsArray.forEach((moon, i) => {
                                    barycenter.orbits[i].setCentralBody(moon);
                                });

                                res(barycenter);
                            });
                        });
                    });
                });

                Promise.all(planetsPromices).then((planetsArray: Barycenter[]) => {
                    planetsArray.map((barycenter, i) => {
                        mainCenter.orbits[i] = barycenter;
                    });

                    system.setBarycenter(mainCenter);
                    system.init();
                    res(system);
                });
            });
        })
    }

    constructor() {

    }

    private onUpdatedListener: Function[] = [];
    onUpdated(fn) {
        this.onUpdatedListener.push(fn);
    }

    private updateTimer: any;
    updated(body) {
        clearTimeout(this.updateTimer);

        this.updateTimer = setTimeout(() => {
            this.onUpdatedListener.forEach(f => f(this))
        }, 250);
    }

    init() {
        this.forEach(centralBody => {
            centralBody.init();
            centralBody.barycenter.selfOrbit.init();
        });
    }

    setBarycenter(barycenter: Barycenter) {
        this.system = barycenter;
        this.name = barycenter.centralBody.name;

        setTimeout(() => this.init(), 0)
    }

    forEach(fn) {
        fn(this.system.centralBody);
        this.system.orbits.forEach((barycenter: Barycenter) => {
            fn(barycenter.centralBody);

            barycenter.orbits.forEach((barycenter: Barycenter) => {
                fn(barycenter.centralBody);
            })
        })
    }

    toJSON() {
        function bodyBaseToObj(bodyBase: Planet | Star | Moon | BodyBase) {
            const bodyBaseObj: any = {};
            Object.keys(bodyBase).forEach(key => {
                if (typeof bodyBase[key] === 'string' ||
                    typeof bodyBase[key] === 'number' ||
                    bodyBase[key] instanceof Array) {

                    bodyBaseObj[key === '_NAME' ? 'name' : key] = bodyBase[key];
                }

                if (key === 'color') {
                    bodyBaseObj[key] = bodyBase[key];
                }
            });

            return bodyBaseObj;
        }

        function barycenterToObj(barycenter: Barycenter) {
            const barycenterObj: any = {};

            barycenterObj.selfOrbit = {A: barycenter.selfOrbit.A, B: barycenter.selfOrbit.B, v: barycenter.selfOrbit.v};
            barycenterObj.centralBody = bodyBaseToObj(barycenter.centralBody);
            barycenterObj.orbits = barycenter.orbits.length === 0 ? [] : barycenter.orbits.map(b => barycenterToObj(b));

            return barycenterObj;
        }

        const systemJSON = JSON.stringify(barycenterToObj(this.system));
        return systemJSON;
    }

    fromJSON(jsonStr) {
        const systemJSON = JSON.parse(jsonStr);

        function barycenterCreator(barycenter: any, outer = null) {
            let body;

            if (barycenter.centralBody.class === 'star') {
                body = new Star({...barycenter.centralBody})
            }

            if (barycenter.centralBody.class === 'planet') {
                body = new Planet({...barycenter.centralBody})
            }

            if (barycenter.centralBody.class === 'moon') {
                body = new Moon({...barycenter.centralBody})
            }

            const newBarycenter = new Barycenter(body, outer, barycenter.selfOrbit.A);

            const orbits = barycenter.orbits.length === 0 ? [] : barycenter.orbits.map(b => barycenterCreator(b, newBarycenter));

            newBarycenter.setToOrbits(orbits);

            return newBarycenter
        }

        const newSystem = barycenterCreator(systemJSON);
        newSystem.setSystemLink(this);
        this.system = newSystem;
        this.updated(null);
    }
}
