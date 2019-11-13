import { ExpressServer, expressRouterArray } from 'ExpressServer';
import { SocketServer } from 'SocketServer';

import { Galaxy } from 'GameModules/Astro';

const expressServer = new ExpressServer({ port: 8080, routes: expressRouterArray });

const socket = new SocketServer(expressServer);

let galaxy = new Galaxy();

socket.io.on('connection', function(client){
    client.on('viewSystem', () => {
        Galaxy.generateNewRandomSystem((system) => {
            socket.io.emit('viewSystem', {system: system.toJSON()});
        });
    });

    client.on('galaxyCoords', function ({x, y, z}) {

        galaxy = new Galaxy();
    })
});
