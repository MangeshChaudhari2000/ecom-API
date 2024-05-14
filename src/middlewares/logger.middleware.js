import fs from 'fs';
import winston from 'winston';

const fsPromise1 = fs.promises;
// async function log1(logData1) {
//     try {
//         logData1 =  `\n ${new Date().toString()} + "Log data is here" + ${logData1}`;
//        //.writeFile("filePath","DataTobeInsert")
//         await fsPromise1.appendFile("log.txt", logData1);
//     } catch (error) {
//         console.log(error);
//     }
// }

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta:{service:'request-logging'},
    transports: [
        new winston.transports.File({ filename: 'logs.txt' })
    ]

})

const loggerMiddleware = async (req, res, next) => {
    //1. Log request body
    if (!req.url.includes('signIn')) {
        const logData1 = `${req.url}-${JSON.stringify(req.body)}`
        // await log1(logData1);
        logger.info(logData1);
    }
    next();

}

export default loggerMiddleware;