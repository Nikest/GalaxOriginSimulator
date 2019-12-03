const { Worker } = require('worker_threads');

interface ITextureProps {
    size: number;
    orbitZone: number;
    water: number;
    snowLine: number;
    seed?: object;
}

interface ITextureStarProps {
    size: number;
    type: string;
    radius: number;
    seed?: object;
}

export interface IArraysRGBA {
    colorMap: number[];
    alphaChannel: number[];
    bumpMap: number[];
}

export interface ITextureData {
    seed: {
        layers: object[];
    };
    arraysRGBA: IArraysRGBA;
}

function pathFor(planetType: string) {
    return `./src/GameModules/TextureWorkers/worker.${planetType}TextureMaker.js`
}

function maker(worker: Worker, props: ITextureProps | ITextureStarProps): Promise<ITextureData> {
    return new Promise<ITextureData>(res => {
        const textureData: ITextureData = {
            arraysRGBA: {
                colorMap: [],
                alphaChannel: [],
                bumpMap: [],
            },
            seed: {
                layers: []
            }
        };

        res(textureData)
    })
}

export const textureMaker = {
    gas(props: ITextureProps): Promise<ITextureData> {
        const worker = new Worker(pathFor('gas'));

        return maker(worker, props);
    },
    selena(props: ITextureProps): Promise<ITextureData> {
        const worker = new Worker(pathFor('selena'));

        return maker(worker, props);
    },
    terra(props: ITextureProps): Promise<ITextureData> {
        const worker = new Worker(pathFor('terra'));

        return maker(worker, props);
    },
    oceanid(props: ITextureProps): Promise<ITextureData> {
        const worker = new Worker(pathFor('oceanid'));

        return maker(worker, props);
    },
    star(props: ITextureStarProps): Promise<ITextureData> {
        const worker = new Worker(pathFor('star'));

        return maker(worker, props);
    },
};