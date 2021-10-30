import {Express, Request, Response} from "express";

function routes(app: Express) {
    app.get('/ping', (req, res) => {
        // res.sendStatus(200);
        res.send('pong')
    })
}

export default routes;