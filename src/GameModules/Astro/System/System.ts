import { Star, Planet, Barycenter, Moon, BodyBase } from 'GameModules/Astro';
import { astroWorker } from 'GameModules/Astro/Services';
import { storeInterface } from 'Services';

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

                const planetsPromices = astroWorker.getPlanetsTemplateCount((p, i) => {
                    return Planet.makeRandomPlanet(star.name, i)
                });

                Promise.all(planetsPromices).then((planetsArray: Planet[]) => {
                    const planets = planetsArray.map((planet) => {
                        return new Barycenter(planet, mainCenter)
                    });

                    const moonsPromices = planets.map((b: Barycenter) => {
                        return Promise.all(astroWorker.getMoonsTemplateCount(b.centralBody.type, (m, i) => {
                            return Moon.makeRandomMoon(b.centralBody.name, b.centralBody.type, i)
                        }))
                    });

                    Promise.all(moonsPromices).then(moons => {
                        moons.forEach((moonArray: Moon[], i: number) => {
                            if (moonArray.length > 0) {
                                moonArray.forEach((moon: Moon) => {
                                    planets[i].centralBody.setSatellite(moon)
                                });

                                astroWorker.generateOrbitsRadius(planets[i])
                            }
                        });


                        mainCenter.setToOrbits(planets);
                        astroWorker.generateOrbitsRadius(mainCenter);

                        system.setBarycenter(mainCenter);
                        storeInterface().setData('currentSystem', system);
                        res(system);
                    });
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
            this.onUpdatedListener.forEach(f => f(body))
        }, 250);
    }

    init() {
        this.system.centralBody.init();
        this.system.orbits.forEach(b => {
            b.centralBody.init();
            b.orbits.forEach(b => {
                b.centralBody.init();
            })
        })
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
        function bodyBaceToObj(bodyBase: Planet | Star | Moon | BodyBase) {
            const bodyBaseObj: any = {};
            Object.keys(bodyBase).forEach(key => {
                if (typeof bodyBase[key] === 'string' ||
                    typeof bodyBase[key] === 'number' ||
                    bodyBase[key] instanceof Array) {

                    bodyBaseObj[key === '_NAME' ? 'name' : key] = bodyBase[key];
                }
            });

            return bodyBaseObj;
        }

        function barycenterToObj(barycenter: Barycenter) {
            const barycenterObj: any = {};

            barycenterObj.selfOrbit = [barycenter.selfOrbit.A, barycenter.selfOrbit.B];
            barycenterObj.centralBody = bodyBaceToObj(barycenter.centralBody);
            barycenterObj.orbits = barycenter.orbits.length === 0 ? [] : barycenter.orbits.map(b => barycenterToObj(b));

            return barycenterObj;
        }

        const systemJSON = JSON.stringify(barycenterToObj(this.system));
        storeInterface().setData('systemJSON', systemJSON);
        return systemJSON;
    }

    fromJSON(jsonStr) { console.log(typeof jsonStr);
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

            const newBarycenter = new Barycenter(body, outer, barycenter.selfOrbit[0]);

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
