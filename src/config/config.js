import yargs from 'yargs/yargs';
import { __filename, __dirname } from '../utils/path.js'
import connectMongo from 'connect-mongo';
import mongodbUrl from './mongoDBUrl.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

//args
const args = yargs(process.argv.slice(2))
    .default({
        modo: 'fork',
        puerto: process.env.PORT || 8080
    })
    .alias({
        m:'modo',
        p:'puerto'
    })
    .argv

/*++++++++++ MONGODB ++++++++++ */
//Persistencia session MongoDb Atlas
const MongoStore = connectMongo.create({
    mongoUrl: process.env.MONGODB_ATLAS_URL,
    ttl: 600
});

const sessionConfig =  {
    store:MongoStore,
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge : 1000 *60 *10
    }
};

/*++++++++++ Config Gral ++++++++++ */
export const config = {
    server: {
        PORT: args.puerto,
        MODO: args.modo,
        NODE_ENV: process.env.NODE_ENV || 'development',
        PERS: process.env.PERS || 'MONGODB'
    },
    mongoDb: {
        host: mongodbUrl,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    session: sessionConfig
};