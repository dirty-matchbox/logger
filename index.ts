import {Logger as WinstonLogger, createLogger as createWinstonLogger} from "winston";
import { LoggerConfig, LoggerFunction } from "./types";

class Logger {
  logger: WinstonLogger | undefined;
  config: LoggerConfig | undefined;
  errorLogger: WinstonLogger | undefined;
  debugLogger: WinstonLogger | undefined;
  warnLogger: WinstonLogger | undefined;
  constructor({ config }: { config: {logger: LoggerConfig} }) {
    this.config = config.logger;
    this.logger =
      this.config.environment === "development"
        ? this.createDebugLogger()
        : this.createLogger();
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
  error: LoggerFunction = this.getLogger().error;
  log: LoggerFunction = this.getLogger().log;
  info: LoggerFunction = this.getLogger().info;
  warn: LoggerFunction = this.getLogger().warn;
}

export default Logger;

export type { LoggerConfig };
