import mongoose from 'mongoose';
import { config } from '../config/config.js';
import { logger } from '../utils/logger.js';
import CustomError from './CustomError.class.js';
import DBClient from './DBClient.class.js';

class MongoDBClient extends DBClient {
    constructor(){
        super();
        this.connected = false;
        this.client = mongoose;
    }

    async connect(){
        try {
            await this.client.set("strictQuery", false)
            await this.client.connect(config.mongoDb.host, config.mongoDb.options);
            this.connected = true;
            logger.info('Base de datos conectada');
            logger.info(`Persistencia: ${config.server.PERS}`);
        } catch (error) {
            const objErr = new CustomError(500, "Error al conectarse a MongoDB", error);
            logger.error(objErr);
            throw objErr;
        }
    }

    async disconnect(){
        try {
            await this.client.connection.close();
            this.connected = false;
            logger.info('Base de datos desconectada');
        } catch (error) {
            const objErr = new CustomError(500, "Error al desconectarse de MongoDB", error);
            logger.error(objErr);
            throw objErr;
        }
    }
};

export default MongoDBClient;