import {ENV} from "../env";

export type Environment = 'dev' | 'prd';

export function resolveURL(serviceName: string, environment: Environment): string {
  return isLocal(serviceName)
    ? `http://${resolveLocalEnv(serviceName)}`
    : `https://${resolveHostName(serviceName, environment)}`;
}

function resolveHostName(serviceName: string, environment: Environment): string {
  return `${serviceName}.herokuapp.com`
}

function isLocal(serviceName: string) {
  return !!resolveLocalEnv(serviceName);
}

const resolveLocalEnv = (serviceName: string): string | undefined => {
  if (ENV.LOCAL_GQL === serviceName) {
    return ENV.LOCAL_GQL_URL || 'localhost:5001';
  }

  return undefined;
};
