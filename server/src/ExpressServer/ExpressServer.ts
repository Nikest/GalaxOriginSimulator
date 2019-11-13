import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as createError from 'http-errors';

import { Request, Response, Next } from 'express';

const logger = require('morgan');
const httpServer = require('http');

interface IExpressServer {
    port: number;
    server: express;
    setRoutes(routes: IRouter[]);
    start();
}

interface IProps {
    port: number;
    routes?: IRouter[];
}

interface IRouter {
    path: string;
    router: any;
}

export class ExpressServer implements IExpressServer {
    port = 8080;
    server = null;

    constructor({ port, routes }: IProps) {
        this.port = port;
        this.server = express();

        this.server.use(logger('dev'));
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(cookieParser());
        this.server.use(express.static('public'));

        if (routes) this.setRoutes(routes);
    }

    setRoutes(routes: IRouter[]) {
        routes.forEach(r => this.server.use(r.path, r.router));
    }

    start() {
        this.server.use((req: Request, res: Response, next: Next) => {
            next(createError(404));
        });

        const serv = httpServer.createServer(this.server);
        serv.listen(this.port);

        return serv;
    }
}