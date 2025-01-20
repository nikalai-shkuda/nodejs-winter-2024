import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

const BYTE_IN_KB: number = 1024;
const DEF_LOG_MAX_SIZE_KB: number = 100;
const DEF_LOG_LEVEL: number = 4;

const DEFAULT_LOG_ALL_FILE_NAME: string = 'all.0.log';
const DEFAULT_LOG_ERRORS_FILE_NAME: string = 'errors.0.log';

const LOG_ALL_FILE_PREFIX: string = 'all';
const LOG_ERRORS_FILE_PREFIX: string = 'errors';

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
  private logAllFileName: string = DEFAULT_LOG_ALL_FILE_NAME;
  private logErrorsFileName: string = DEFAULT_LOG_ERRORS_FILE_NAME;
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

  private async getLastFile(prefix: string): Promise<string | null> {
    try {
      const files = (await fs.readdir(this.logDirectory))
        .filter((file) => file.startsWith(prefix) && file.endsWith('.log'))
        .sort((a, b) => {
          const aIndex = parseInt(a.split('.')[1]) || 0;
          const bIndex = parseInt(b.split('.')[1]) || 0;
          return aIndex - bIndex;
        });

      return files.at(-1) || null;
    } catch {
      return null;
    }
  }

  private async initLogFiles(): Promise<void> {
    try {
      await fs.mkdir(this.logDirectory, { recursive: true });

      const [lastAllFile, lastErrorsFile] = await Promise.all([
        this.getLastFile(LOG_ALL_FILE_PREFIX),
        this.getLastFile(LOG_ERRORS_FILE_PREFIX),
      ]);

      this.logAllFileName = lastAllFile || DEFAULT_LOG_ALL_FILE_NAME;
      this.logErrorsFileName = lastErrorsFile || DEFAULT_LOG_ERRORS_FILE_NAME;
    } catch (error) {
      this.error('Failed to initialize log files', error.stack);
    }
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

  private async getRotateNameLogFile(fileName: string): Promise<string> {
    try {
      const filePath = path.join(this.logDirectory, fileName);
      const stats = await fs.stat(filePath);

      if (stats.size < this.maxFileSize) {
        return fileName;
      }

      const [name, version, extension] = fileName.split('.');
      const newVersion = Number(version) + 1;
      const newFileName = `${name}.${newVersion}.${extension}`;
      return newFileName;
    } catch {
      return fileName;
    }
  }

  private async writeToFile(
    fileType: LOG_TYPES,
    content: string,
  ): Promise<void> {
    let fileName = this.logAllFileName;

    if (fileType === LOG_TYPES.all) {
      fileName = await this.getRotateNameLogFile(this.logAllFileName);
      this.logAllFileName = fileName;
    } else if (fileType === LOG_TYPES.errors) {
      fileName = await this.getRotateNameLogFile(this.logErrorsFileName);
      this.logErrorsFileName = fileName;
    }

    try {
      const filePath = path.join(this.logDirectory, fileName);
      const logMessage = `${new Date().toISOString()} - ${content}\n`;
      fs.appendFile(filePath, logMessage);
    } catch (error) {
      this.error('Failed to write to log file', error.stack);
    }
  }
}
