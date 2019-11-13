import { Request, Response, Router } from 'express';

const mainRouter = Router();

mainRouter.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: './public/' });
});

export { mainRouter }
