import { ExpressServer } from 'ExpressServer';

interface ISocketServer {
    server: any;
    io: any;
}

export class SocketServer implements ISocketServer {
    server = null;
    io = null;

    constructor(express: ExpressServer) {
        this.server = express.start();
        this.io = require('socket.io')(this.server, {
            serveClient: false,
        });
    }
}