import Logger from "../index";
import { Environment } from "../types";

const debugConfig = {
  logger: {
    environment: (process.env.ENVIRONMENT as Environment) ?? "development",
    name: process.env.NAME ?? "debug-example-logger",
  },
};

const defaultConfig = {
  logger: {
    environment: (process.env.ENVIRONMENT as Environment) ?? "staging",
    name: process.env.NAME ?? "staging-example-logger",
  },
};

const debugLogger = new Logger({ config: debugConfig });

const defaultLogger = new Logger({ config: defaultConfig });

//  Debug
debugLogger.warn("This is warning");
debugLogger.error("This is error");
debugLogger.info("This is info");
debugLogger.debug("This is log");

//  Default
defaultLogger.warn("This is warning");
defaultLogger.error("This is error");
defaultLogger.info("This is info");
