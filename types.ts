export type Environment = "development" | "production" | "staging" | "test";

export type LoggerConfig = {
  environment: Environment;
  name: string;
  debug?: boolean;
};
export type LoggerFunction = (message: string, ...args: any[]) => void;
