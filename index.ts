import {
  Logger as WinstonLogger,
  createLogger as createWinstonLogger,
  format,
  transports,
} from "winston";
import { LoggerConfig, LoggerFunction } from "./types";

class Logger {
  logger: WinstonLogger | typeof console;
  config: LoggerConfig;
  errorLogger: WinstonLogger;
  debugLogger: WinstonLogger;
  warnLogger: WinstonLogger;
  error: LoggerFunction;
  debug: LoggerFunction;
  info: LoggerFunction;
  warn: LoggerFunction;
  log: LoggerFunction;

  constructor({ config }: { config: { logger: LoggerConfig } }) {
    this.config = config.logger;
    this.logger =
      this.config.debug === true
        ? this.createDebugLogger()
        : this.createLogger();
    this.error = this.logger.error.bind(this.logger);
    this.debug = this.logger.debug.bind(this.logger);
    this.info = this.logger.info.bind(this.logger);
    this.warn = this.logger.warn.bind(this.logger);
    this.log = this.logger.log.bind(this.logger);
  }
  private createLogger() {
    return createWinstonLogger({
      defaultMeta: {
        name: this.config.name,
      },
      format: format.json(),
      level: "info",
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.timestamp(),
            format.printf(
              ({ timestamp, level, message }) =>
                `${timestamp} ${level}: ${message}`,
            ),
          ),
        }),
      ],
    });
  }
  private createDebugLogger() {
    return createWinstonLogger({
      level: "debug",
      defaultMeta: {
        name: this.config.name,
      },
      format: format.json(),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.timestamp(),
            format.printf(
              ({ timestamp, level, message }) =>
                `${timestamp} ${level}: ${message}`,
            ),
          ),
        }),
      ],
    });
  }
}

export default Logger;

export type { LoggerConfig };
