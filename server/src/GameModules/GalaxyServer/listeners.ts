import { AstroWorker } from 'GameModules/AstroWorker';
import { TextureWorker } from 'GameModules/TextureWorker';

const astroWorker = new AstroWorker();
const textureWorker = new TextureWorker();


export const listeners = {
    getStar(data?): Promise<any> {
        return astroWorker.getStarRandomProps()
    },
    getPlanet(data): Promise<any> {
        return astroWorker.getPlanetRandomProps(data)
    },
    getMoon(data): Promise<any> {
        return astroWorker.getPlanetRandomProps({...data, moon: true});
    },
    getTexture(data): Promise<any> {
        return new Promise<any>(res => {
            textureWorker[data.class](data).then(dataWorker => {
                return res(dataWorker);
            })
        });
    }
};