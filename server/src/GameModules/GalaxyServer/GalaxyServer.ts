import { SocketServer } from 'SocketServer';
import { listeners } from './listeners';

interface IGalaxyServer {
    integratingSocketServer(socketServer: SocketServer): void
}

export class GalaxyServer implements IGalaxyServer {
    private connection: any;
    private onConnect = (connection) => {
        this.connection = connection;
        this.initListeners();
    };

    private initListeners = () => {
        this.connection.on('onListener', (props) => {
            this.connection.on(props.hash, (data) => {
                listeners[props.event](data).then(responce => {
                    this.socketServer.io.emit(props.hash, responce);
                })
            });

            this.socketServer.io.emit(`created_${props.hash}`);
        })
    };

    private socketServer: SocketServer;

    integratingSocketServer(socketServer): void {
        this.socketServer = socketServer;
        this.socketServer.io.on('connection', (data) => this.onConnect(data))
    }
}