import { RequestHandler } from 'express';
import { format } from 'date-fns';
import fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { promises as fsPromises } from 'fs';

export const logEvents = async (message: string, logFileName: string) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', '..', 'logs', logFileName),
      logItem,
    );
  } catch (err) {
    console.log(err);
  }
};

export const logger: RequestHandler = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  console.log(`${req.method} ${req.path}`);
  next();
};
