import Logger from "../index";
import { Environment } from "../types";

const debugConfig = {
  logger: {
    environment: (process.env.ENVIRONMENT as Environment) ?? "development",
    name: process.env.NAME ?? "debug-example-logger",
    debug: true,
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
debugLogger.warn("Debug logger:", "This is warning", { some: "data" });
debugLogger.error("Debug logger:", "This is error", new Error("Test error"));
debugLogger.info(
  "Debug logger:",
  "This is info",
  JSON.stringify({ foo: "bar", bar: { baz: 42 } }),
);
debugLogger.debug("Debug logger:", "This is debug", ["foo", 42]);

//  Default
defaultLogger.warn("Default logger:", "This is warning", { some: "data" });
defaultLogger.error(
  "Default logger:",
  "This is error",
  new Error("Test error"),
);
defaultLogger.info(
  "Default logger:",
  "This is info",
  JSON.stringify({ foo: "bar", bar: { baz: 42 } }),
);
defaultLogger.debug("Default logger:", "This is debug", ["foo", 42]);
