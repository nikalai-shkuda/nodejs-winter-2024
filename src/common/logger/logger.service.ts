import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const BYTE_IN_KB: number = 1024;
const DEF_LOG_MAX_SIZE_KB: number = 100;
const DEF_LOG_LEVEL: number = 4;

const DEFAULT_LOG_ALL_FILE_NAME: string = 'all.0.log';
const DEFAULT_LOG_ERRORS_FILE_NAME: string = 'errors.0.log';

const LOG_ALL_FILE_PREFIX: string = 'all';
const LOG_ERRORS_FILE_PREFIX: string = 'errors';

let LOG_ALL_FILE_NAME: string = DEFAULT_LOG_ALL_FILE_NAME;
let LOG_ERRORS_FILE_NAME: string = DEFAULT_LOG_ERRORS_FILE_NAME;

enum LOG_LEVELS {
  error = 0,
  warn = 1,
  log = 2,
  debug = 3,
  verbose = 4,
}

enum LOG_TYPES {
  all = 'ALL',
  errors = 'ERRORS',
}

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logDirectory: string;
  private logLevel: number;
  private maxFileSize: number;

  constructor() {
    super();

    this.logDirectory = path.join(__dirname, '../../..', 'logs');
    this.logLevel = Number(process.env.LOG_LEVEL || DEF_LOG_LEVEL);
    this.maxFileSize =
      Number(process.env.LOG_MAX_SIZE_KB || DEF_LOG_MAX_SIZE_KB) * BYTE_IN_KB;

    this.initLogFiles();
  }

  private getLastFile(prefix: string): string {
    const files = fs
      .readdirSync(this.logDirectory)
      .filter((file) => file.startsWith(prefix) && file.endsWith('.log'))
      .sort((a, b) => {
        const aIndex = parseInt(a.split('.')[1]) || 0;
        const bIndex = parseInt(b.split('.')[1]) || 0;
        return aIndex - bIndex;
      });

    return files.at(-1) || null;
  }

  private initLogFiles(): void {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, { recursive: true });
    }

    LOG_ALL_FILE_NAME =
      this.getLastFile(LOG_ALL_FILE_PREFIX) || DEFAULT_LOG_ALL_FILE_NAME;
    LOG_ERRORS_FILE_NAME =
      this.getLastFile(LOG_ERRORS_FILE_PREFIX) || DEFAULT_LOG_ERRORS_FILE_NAME;

    [LOG_ALL_FILE_NAME, LOG_ERRORS_FILE_NAME].forEach((fileName) => {
      const filePath = path.join(this.logDirectory, fileName);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
      }
    });
  }

  log(message: string, context: string = ''): void {
    if (this.shouldLog('log')) {
      super.log(message, context);
      this.writeToFile(LOG_TYPES.all, `LOG ${context}: ${message}`);
    }
  }

  error(message: string, stack?: string, context: string = ''): void {
    if (this.shouldLog('error')) {
      const baseMessage = `ERROR ${context}: ${message}`;
      const finalMessage = stack
        ? `${baseMessage}\nSTACK: ${stack}`
        : baseMessage;

      super.error(message, stack, context);
      this.writeToFile(LOG_TYPES.all, finalMessage);
      this.writeToFile(LOG_TYPES.errors, finalMessage);
    }
  }

  warn(message: string, context: string = ''): void {
    if (this.shouldLog('warn')) {
      super.warn(message, context);
      this.writeToFile(LOG_TYPES.all, `WARN ${context}: ${message}`);
    }
  }

  debug(message: string, context: string = ''): void {
    if (this.shouldLog('debug')) {
      super.debug(message, context);
      this.writeToFile(LOG_TYPES.all, `DEBUG: ${context}: ${message}`);
    }
  }

  verbose(message: string, context: string = ''): void {
    if (this.shouldLog('verbose')) {
      super.verbose(message, context);
      this.writeToFile(LOG_TYPES.all, `VERBOSE: ${context}: ${message}`);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] <= this.logLevel;
  }
  private rotateLogFiles(fileName: string): string {
    const filePath = path.join(this.logDirectory, fileName);

    if (
      fs.existsSync(filePath) &&
      fs.statSync(filePath).size >= this.maxFileSize
    ) {
      const [name, version, extension] = fileName.split('.');
      const newVersion = Number(version) + 1;
      const newFileName = `${name}.${newVersion}.${extension}`;
      const newFilePath = path.join(this.logDirectory, newFileName);

      fs.writeFileSync(newFilePath, '');
      return newFileName;
    }
    return fileName;
  }
  private writeToFile(fileType: LOG_TYPES, content: string): void {
    const logMessage = `${new Date().toISOString()} - ${content}\n`;
    let fileName = LOG_ALL_FILE_NAME;

    if (fileType === LOG_TYPES.all) {
      fileName = this.rotateLogFiles(LOG_ALL_FILE_NAME);
      LOG_ALL_FILE_NAME = fileName;
    } else if (fileType === LOG_TYPES.errors) {
      fileName = this.rotateLogFiles(LOG_ERRORS_FILE_NAME);
      LOG_ERRORS_FILE_NAME = fileName;
    }

    const filePath = path.join(this.logDirectory, fileName);
    fs.appendFileSync(filePath, logMessage);
  }
}
