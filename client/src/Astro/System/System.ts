import { Star, Planet, Barycenter, Moon, BodyBase } from 'Astro';

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

            Star.makeRandomStar().then(star => {
                return new Barycenter(star, null);

            }).then(mainCenter => {
                mainCenter.generateOrbits();
                system.setBarycenter(mainCenter);

                return mainCenter;

            }).then(async mainCenter => {
                const planetsPromiseArray: Promise<Planet>[] = mainCenter.orbits.map((b, i) => {
                    return Planet.makeRandomPlanet(mainCenter.centralBody, i, b.selfOrbit.A);
                });

                const planets = await Promise.all(planetsPromiseArray);
                mainCenter.orbits.forEach((b, i) => b.setCentralBody(planets[i]));

                return planets;

            }).then(planets => {
                planets.forEach(p => p.barycenter.generateOrbits(p.moons));

                return planets;

            }).then(async planets => {
                const setMoonPromiceArray = planets.map(planet => {
                    return new Promise(res => {
                        if (planet.barycenter.orbits.length === 0) {
                            res(true);
                            return;
                        }

                        const moonPromiseArray: Promise<Moon>[] = planet.barycenter.orbits.map((b, i) => {
                            return Moon.makeRandomMoon(planet.orbitZone, planet.type, planet.percentInHabitable || 0)
                        });

                        Promise.all(moonPromiseArray).then(moons => {
                            planet.barycenter.orbits.forEach((b, i) => b.setCentralBody(moons[i]));
                        }).then(() => res(true));
                    });
                });

                await Promise.all(setMoonPromiceArray);

                return system;

            }).then(() => {
                res(system);
            }).then(() => system.init());
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
            this.onUpdatedListener.forEach(f => f(this));
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
        barycenter.outer = this;
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
