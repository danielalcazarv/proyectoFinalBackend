/*++++++++++ Modulos ++++++++++ */
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import hbs from 'hbs';
import { config } from './config/config.js'
//import cookieParser from 'cookie-parser';
import { logger } from './utils/logger.js';

/*++++++++++ Sockets ++++++++++ */
import { Server as HttpServer } from 'http';
import { Server as IOSocket } from 'socket.io';

/*++++++++++ Middlewares ++++++++++ */
import passport from './services/passport.js';

/*++++++++++ Routes ++++++++++ */
import routes from './routes/index.routes.js';

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
    app.use(express.static(absolutePath + '/public'));
    app.set('view engine', 'hbs');
    app.set('views', (absolutePath + '/src/views'));
    hbs.registerPartials(absolutePath + '/src/views/partials');
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(session(config.session));
    app.use(morgan('dev'));
    //app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    //app.use(compression());
    /*app.use((req, res, next) => { //permite el uso de socket io en Routes
    req.io = io;
    return next();
    });*/

    //Routes
    app.use(routes);
    
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