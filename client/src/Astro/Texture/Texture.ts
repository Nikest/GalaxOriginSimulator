import { Planet, Star } from '../';
import { requester } from 'Services';

export interface IArraysRGBA {
    colorMap: number[];
    alphaChannel: number[];
    bumpMap: number[];
}

export interface IArraysRGBAInterface {
    colorMap: number[];
    alphaChannel: number[];
    bumpMap: number[];
}

export interface ITextureDataInterface {
    seed: {
        layers: object[];
    };
    arraysRGBA: IArraysRGBA;
}

interface ITexture {
   width: number;
   height: number;
   data: IArraysRGBAInterface;
   bodyBase: Planet | Star;
   seed: object[];
   init(): void;
   generateTexture(): void;
   setData(data: ITextureDataInterface): void;
   toString(): string;
}

interface ITextureProps {
    size: number;
    bodyBase: Planet | Star;
}

export abstract class Texture implements ITexture {
    width = 0;
    height = 0;
    data: IArraysRGBAInterface;
    seed = [];
    bodyBase: Planet | Star;

    constructor({ size, bodyBase }: ITextureProps) {
        this.width = size;
        this.height = size;
        this.bodyBase = bodyBase;
    }

    init(): void {
        this.generateTexture();
    }

    generateTexture(): void {}

    setData({ seed, arraysRGBA }: ITextureDataInterface): void {
        this.seed = seed.layers;
        this.data = arraysRGBA;
        this.bodyBase.updated();
    }

    toString(): string {
        return '';
    }
}

export class StarTexture extends Texture {
    bodyBase: Star;

    generateTexture(): void {
        super.generateTexture();

        const props = {
            size: 300,
            type: this.bodyBase.type,
            class: this.bodyBase.class,
            radius: this.bodyBase.radius,
            starColor: this.bodyBase.color,
        };

        requester.makeRequest('getTexture').then(set => {
            set.sendRequest(props, (data) => {
                this.setData(data)
            });
        })

    }
}

export class PlanetTexture extends Texture {
    bodyBase: Planet;

    generateTexture(): void {
        super.generateTexture();

        const props = {
            size: this.width,
            orbitZone: this.bodyBase.orbitZone,
            water: this.bodyBase.water,
            snowLine: this.bodyBase.snowLine,
        };

        if (this.bodyBase.type === 'selena') {

            return
        }

        if (['subterra', 'terra', 'superterra'].findIndex(t => t === this.bodyBase.type) >= 0) {
            if (this.bodyBase.typeRegular === 'oceanid') {

                return
            }


            return
        }

        if (['neptunian', 'jovian'].findIndex(t => t === this.bodyBase.type) >= 0) {

            return;
        }
    }
}