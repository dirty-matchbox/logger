import {
  Logger as WinstonLogger,
  createLogger as createWinstonLogger,
} from "winston";
import { LoggerConfig, LoggerFunction } from "./types";

class Logger {
  logger: WinstonLogger | typeof console;
  config: LoggerConfig;
  errorLogger: WinstonLogger;
  debugLogger: WinstonLogger;
  warnLogger: WinstonLogger;
  error: LoggerFunction;
  log: LoggerFunction;
  info: LoggerFunction;
  warn: LoggerFunction;
  constructor({ config }: { config: { logger: LoggerConfig } }) {
    this.config = config.logger;
    this.logger =
      this.config.environment === "development"
        ? this.createDebugLogger()
        : this.createLogger();
    this.error = this.getLogger().error;
    this.log = this.getLogger().log;
    this.info = this.getLogger().info;
    this.warn = this.getLogger().warn;
  }
  private createLogger() {
    return createWinstonLogger();
  }
  private createDebugLogger() {
    return createWinstonLogger({
      level: "debug",
    });
  }
  private getLogger(): typeof console | WinstonLogger {
    if (!this.logger) {
      console.warn("Logger not initialized. Defaulting to standard console");
      return console;
    }
    return this.logger;
  }
}

export default Logger;

export type { LoggerConfig };
