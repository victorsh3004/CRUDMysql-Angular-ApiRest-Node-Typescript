import {Request, Response} from 'express';

class IndexController {

    public index (req: Request, res: Response) {
        res.json({text: 'API Is /api/games'});
        //res.send('Hello indexController')
    }

}

export const indexController = new IndexController();