import Contenedor from '../../classes/Contenedor.class.js';
import CustomError from '../../classes/CustomError.class.js';
import MongoDBClient from '../../classes/MongoDBClient.class.js';
import { logger } from '../../utils/logger.js';
import { asPOJO, renameField, removeField } from '../../utils/objectUtils.js';

await (new MongoDBClient()).connect();

class ContenedorMongoDB extends Contenedor {

    constructor (modelo) {
        super();
        this.coleccion = modelo;
    };

    async listarAll (){
        try {
            let docs = await this.coleccion.find({}, {__v:0}).lean();
            docs = docs.map(asPOJO)
            docs = docs.map(d => renameField(d, '_id', 'id'))
            return docs;
        } catch (error) {
            const cuserr = new CustomError( 500, 'Error al listarAll()', error);
            logger.error(cuserr);
            throw cuserr;
        }
    };

    async guardar (objeto){
        try {
            let doc = await this.coleccion.create(objeto);
            doc = asPOJO(doc)
            renameField (doc, '_id', 'id')
            removeField (doc, '__v')
            return doc;
        } catch (error) {
            const cuserr = new CustomError( 500, 'Error al guardar', error);
            logger.error(cuserr);
            throw cuserr;
        }
    };

    async listar (id){
        try {
            const doc = await this.coleccion.find({_id:id},{__v:0});
            const result = renameField( asPOJO(doc[0]),'_id', 'id');
            return result;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listarbyId()', error);
            logger.error(cuserr);
            throw cuserr;
        }
    };

    async borrar (id){
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne({_id:id});
            if (n == 0 || nDeleted == 0) {
                throw new CustomError(500, 'Error al borrar: no encontrado', 'empty');
            }
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al borrar', error);
            logger.error(cuserr);
            throw cuserr;
        }
    };

    async borrarAll(){
        try {
            await this.coleccion.deleteMany({});
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al todo', error);
            logger.error(cuserr);
            throw cuserr;
        }
    };

    async actualizar(id,obj){
        try {
            await this.coleccion.updateOne({_id:id}, {$set: obj})
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al actualizar', error);
            logger.error(cuserr);
            throw cuserr;
        }
    };
};

export default ContenedorMongoDB;