/*++++++++++ Modulos ++++++++++ */
import { config } from './src/config/config.js';
import { createServer } from './server.js';
import os from 'os';
import cluster from 'cluster';
import { logger } from './src/utils/logger.js';
import dotenv from 'dotenv';
dotenv.config()

const CPU_CORES = os.cpus().length;
const PORT = config.server.PORT;
const modo = config.server.MODO

/*++++++++++ Cluster ++++++++++ */
if (cluster.isPrimary && modo === 'cluster') {
    logger.info(`Cant de cores: ${CPU_CORES}`);

    for (let i = 0; i < CPU_CORES; i++) {
        cluster.fork();
    }

    cluster.on('online', (worker, code, signal) =>{
        logger.info(` Worker: ${worker.process.pid} start. Date: ${new Date().toLocaleDateString()}`);
    });

    cluster.on('exit', worker => {
        logger.info(`Worker ${process.pid} ${worker.id} ${worker.pid} finalizo ${new Date().toLocaleString()}`);
    
    cluster.fork();
    });
} else {
    const app = createServer();
    app.listen(PORT)
    .then(connectedServer => {
        logger.info(`Tu servidor esta en el puerto http://localhost:${connectedServer.address().port}/ - Date: ${new Date().toLocaleDateString()}`);
    })
    .catch(error => {
        logger.error(`Error en servidor ${error}`);
    });
}