import {Request, Response} from 'express';

import pool from '../database';

class GamesController {

    public async list (req: Request, res: Response) {

        //const [games] = await pool.query(`SELECT * FROM games where id= ${req.params.id}`);
        const[games] = await pool.query(`SELECT * FROM games`);
        
        res.json(games);
        //console.log(games);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        let games = await pool.query('SELECT * FROM games where id=?', [id]);//games devuelve un objeto dentro de un arreglo
        console.log(games[0]);//muestro por console
        //res.json(games);//le devuelvo al cliente
        const gam2:any = games[0];
        //colocando condicional
        if(games.length > 0) {
            return res.json( gam2[0] );
        }
        res.status(404).json({text: "The games doesn't exists."});
    }


    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO games set ?', [req.body]);
        //console.log(req.body); //req.body tiene los valores que me esta enviando el cliente, cuando angular nos envia los datos, nos envia a traves de req.body
        res.json({text: 'Game save'});
    }

    public async update(req: Request, res: Response):Promise<void> {
            const {id} = req.params;
            await pool.query('UPDATE games SET  ? WHERE id = ?', [req.body, id])
            res.json({mesaage: 'The was udpate'});
            
            //res.json({text: 'Update a game ' + req.params.id});
    }

    public async delete(req: Request, res: Response):Promise<void> {
        const {id} = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id])
        res.json({mesaage: 'Delete games'});
    }

    
}
const gamesController = new GamesController();
export default gamesController;