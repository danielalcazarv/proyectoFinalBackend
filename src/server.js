/*++++++++++ Modulos ++++++++++ */
import express, { application } from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import hbs from 'hbs';
import { config } from './config/config.js'
import { logger } from './utils/logger.js';

/*++++++++++ Sockets ++++++++++ */
import { Server as HttpServer } from 'http';
import { Server as IOSocket } from 'socket.io';

/*++++++++++ Middlewares ++++++++++ */

/*++++++++++ Routes ++++++++++ */

/*++++++++++ Path ++++++++++ */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const absolutePath = join(__dirname, '..');

/*++++++++++ Export Server ++++++++++ */
export const createServer = () => {

    const app = express();
    const httpServer = new HttpServer (app);
    const io = new IOSocket (httpServer);

    //Web Socket
    
    //Server Config

    //Routes
    app.get('/',(req,res)=>{
        res.send('HOla Mundo');
    });
    

    return {
        listen: port => new Promise ((resolve, reject) => {
            const connectedServer = httpServer.listen(port, ()=> {
                resolve (connectedServer);
            })
            connectedServer.on('error', error =>{
                reject(error)
            })
        })
    };
};