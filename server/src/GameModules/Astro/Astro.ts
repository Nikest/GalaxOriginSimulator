import { astroWorker, generateHash, textureMaker, ITextureData, IArraysRGBA } from './Services';
import { Galaxy } from './Galaxy';

export class Astro {
    static worker() { return astroWorker };
    static textureWorker() { return textureMaker };
    static generateHash(prefix?: string) { return generateHash(prefix) };
    static Galaxy() {
        return Galaxy
    }
    static newGalaxy() {
        return new Galaxy();
    }
}

export interface TextureDataInterface extends ITextureData {}
export interface ArraysRGBAInterface extends IArraysRGBA {}