const { Worker } = require('worker_threads');

interface ITextureProps {
    size: number;
    bodyBase: null;
}

interface IArraysRGBA {
    colorMap: number[];
    alphaChannel: number[];
    bumpMap: number[];
}

interface ITextureData {
    seed: {
        layers: object[];
    };
    arraysRGBA: IArraysRGBA;
}

function pathFor(planetType: string) {
    return `./src/GameModules/TextureWorker/worker.${planetType}TextureMaker.js`
}

function maker(worker: any, props: ITextureProps): Promise<ITextureData> {
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

        worker.on('message', function(textureData) {
            res(textureData);
        });

        worker.postMessage(props);
    })
}

export class TextureWorker {
    gas(props: ITextureProps): Promise<ITextureData> {
        const worker = new Worker(pathFor('gas'));

        return maker(worker, props);
    };

    selena(props: ITextureProps): Promise<ITextureData> {
        const worker = new Worker(pathFor('selena'));

        return maker(worker, props);
    };

    terra(props: ITextureProps): Promise<ITextureData> {
        const worker = new Worker(pathFor('terra'));

        return maker(worker, props);
    };

    oceanid(props: ITextureProps): Promise<ITextureData> {
        const worker = new Worker(pathFor('oceanid'));

        return maker(worker, props);
    };

    star(props: ITextureProps): Promise<ITextureData> {
        const worker = new Worker(pathFor('star'));

        return maker(worker, props);
    };
}