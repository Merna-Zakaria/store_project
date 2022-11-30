"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var imageController_1 = require("../../controllers/imageController");
var imageRouter = express_1["default"].Router();
imageRouter.get('/img1', imageController_1.img1);
imageRouter.get('/img2', imageController_1.img2);
// app.get('/articles', (_req: Request, res: Response) => {
//     try {
//         res.send('this is the INDEX route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })
// In Javascript the _underscore is a special identifier, and when used before a function argument it signals that we are not going to use that argument.
// app.get('/articles/:id', (_req: Request, res: Response) => {
//     try {
//        res.send('this is the SHOW route')
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// })
// app.post('/articles', (req: Request, res: Response) => {
//     const article: Article = {
//       title: req.body.title,
//       content: req.body.content
//     }
//     try {
//        res.send('this is the CREATE route')
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// })
// app.put('/articles/:id', (req: Request, res: Response) => {
//     const article: Article = {
//       id: req.params.id, 
//       title: req.body.title,
//       content: req.body.content
//     }
//     try {
//        res.send('this is the EDIT route')
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// })
// app.delete('/articles/:id', (_req: Request, res: Response) => {
//     try {
//        res.send('this is the DELETE route')
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// }
exports["default"] = imageRouter;
