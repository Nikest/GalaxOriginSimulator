import { ExpressServer, expressRouterArray } from 'ExpressServer';
import { SocketServer } from 'SocketServer';
import { GalaxyServer } from 'GameModules/GalaxyServer';


const expressServer = new ExpressServer({ port: 8080, routes: expressRouterArray });
const socketServer = new SocketServer(expressServer);
const galaxyServer = new GalaxyServer();
galaxyServer.integratingSocketServer(socketServer);

/*let galaxy = new Galaxy();

socket.io.on('connection', function(client){
    client.on('viewSystem', () => {
        Galaxy.generateNewRandomSystem((system) => {
            socket.io.emit('viewSystem', {system: system.toJSON()});
        });
    });

    client.on('galaxyCoords', function ({x, y, z}) {
        galaxy = new Galaxy();
    });

    client.on('getRandomTexture', function (data) {

        const noise = new Noise(data);
        const array = [];

        for(let y = 0; y < data.size; y += 1) for (let x = 0; x < data.size; x += 1) {
            const n = noise.spherical2D(data.size, x, y);

            array.push(n);
            array.push(n);
            array.push(n);

            array.push(255);
        }

        socket.io.emit('randomTexture', {data: array});
    })
});*/
