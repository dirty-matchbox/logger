import {
  Logger as WinstonLogger,
  createLogger as createWinstonLogger,
  format,
  transports,
} from "winston";
import { LoggerConfig } from "./types";

class Logger {
  config: LoggerConfig;
  logger: WinstonLogger | typeof console;
  debugLogger: WinstonLogger;

  constructor({ config }: { config: { logger: LoggerConfig } }) {
    this.config = config.logger;
    this.logger =
      this.config.debug === true
        ? this.createDebugLogger()
        : this.createLogger();
  }
  private stringify(...args: any[]): string {
    return args.map((a) => a).join(" ");
  }
  public warn( ...args: any[]) {
    this.logger.warn(this.stringify(...args));
  }
  public error( ...args: any[]) {
    this.logger.error(this.stringify(...args));
  }
  public info( ...args: any[]) {
    this.logger.info(this.stringify(...args));
  }
  public debug( ...args: any[]) {
    this.logger.debug(this.stringify(...args));
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
            format.errors({ stack: true }),
            format.splat(),

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
      defaultMeta: {
        name: this.config.name,
      },
      transports: [
        new transports.Console({
          format: format.combine(
            format.errors({ stack: true }),
            format.splat(),

            format.colorize(),
            format.timestamp(),
            format.printf(({ timestamp, level, message }) => {
              return `${timestamp} ${level}: ${message}`;
            }),
          ),
        }),
      ],
    });
  }
}

export default Logger;

export type { LoggerConfig };
