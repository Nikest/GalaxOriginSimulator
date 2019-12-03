import { Planet, Star, Astro, TextureDataInterface, ArraysRGBAInterface } from '../';

interface ITexture {
   width: number;
   height: number;
   data: ArraysRGBAInterface;
   bodyBase: Planet | Star;
   seed: object[];
   init(): void;
   generateTexture(): void;
   setData(data: TextureDataInterface): void;
   toString(): string;
}

interface ITextureProps {
    size: number;
    type: string;
    bodyBase: Planet;
}

abstract class Texture implements ITexture {
    width = 0;
    height = 0;
    data: ArraysRGBAInterface;
    seed = [];
    bodyBase: Planet | Star;

    constructor({ size, bodyBase }: ITextureProps) {
        this.width = size;
        this.height = size;
        this.bodyBase = bodyBase;

        this.init();
    }

    init(): void {
        this.generateTexture();
    }

    generateTexture(): void {}

    setData({ seed, arraysRGBA }: TextureDataInterface): void {
        this.seed = seed.layers;
        this.data = arraysRGBA;
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
            size: this.width,
            type: this.bodyBase.type,
            radius: this.bodyBase.radius,
        };

        Astro.textureWorker().star(props).then(this.setData);
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
            Astro.textureWorker().selena(props).then(this.setData);
            return
        }

        if (['subterra', 'terra', 'superterra'].findIndex(t => t === this.bodyBase.type) >= 0) {
            if (this.bodyBase.typeRegular === 'oceanid') {
                Astro.textureWorker().oceanid(props).then(this.setData);
                return
            }

            Astro.textureWorker().terra(props).then(this.setData);
            return
        }

        if (['neptunian', 'jovian'].findIndex(t => t === this.bodyBase.type) >= 0) {
            Astro.textureWorker().gas(props).then(this.setData);
            return;
        }
    }
}