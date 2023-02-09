import log4js from 'log4js';
import dotenv from 'dotenv';
import { __dirname } from './path.js';
dotenv.config({ path: '../.env' });

const pers = process.env.PERS

log4js.configure({
    appenders: {
        console: {type: 'console'},
        warnFile: { type: 'file', filename: `${__dirname}/../../logs/warn.log`},
        errorFile: { type: 'file', filename: `${__dirname}/../../logs/error.log`},
        //
        loggerConsole: { type: 'stdout', appender: 'console', level: 'info'},
        loggerWarn: { type: 'logLevelFilter', appender: 'warnFile', level: 'warn'},
        loggerError: { type: 'logLevelFilter', appender: 'errorFile', level: 'error'},
    },
    categories: {
        default: {
            appenders: ['loggerConsole', 'loggerWarn', 'loggerError'],
            level: 'all'
        },
        production: {
            appenders: ['loggerWarn', 'loggerError'],
            level: 'all'
        }
    } 
});

let logger = null;

if (pers == 'production') {
    logger = log4js.getLogger('production')
} else {
    logger = log4js.getLogger()
}

export {logger}
