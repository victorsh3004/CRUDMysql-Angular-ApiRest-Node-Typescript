"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const [games] = await pool.query(`SELECT * FROM games where id= ${req.params.id}`);
            const [games] = yield database_1.default.query(`SELECT * FROM games`);
            res.json(games);
            //console.log(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let games = yield database_1.default.query('SELECT * FROM games where id=?', [id]); //games devuelve un objeto dentro de un arreglo
            console.log(games[0]); //muestro por console
            //res.json(games);//le devuelvo al cliente
            const gam2 = games[0];
            //colocando condicional
            if (games.length > 0) {
                return res.json(gam2[0]);
            }
            res.status(404).json({ text: "The games doesn't exists." });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO games set ?', [req.body]);
            //console.log(req.body); //req.body tiene los valores que me esta enviando el cliente, cuando angular nos envia los datos, nos envia a traves de req.body
            res.json({ text: 'Game save' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE games SET  ? WHERE id = ?', [req.body, id]);
            res.json({ mesaage: 'The was udpate' });
            //res.json({text: 'Update a game ' + req.params.id});
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM games WHERE id = ?', [id]);
            res.json({ mesaage: 'Delete games' });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
