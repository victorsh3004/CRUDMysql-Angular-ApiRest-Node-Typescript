"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.json({ text: 'API Is /api/games' });
        //res.send('Hello indexController')
    }
}
exports.indexController = new IndexController();
