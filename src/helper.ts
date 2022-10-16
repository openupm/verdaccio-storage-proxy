import { getInternalError, VerdaccioError } from '@verdaccio/commons-api';
import { Config, IPluginStorage } from '@verdaccio/types';

export function getBackend(backends: any, pluginId: string): IPluginStorage<Config> {
  const backend = backends[pluginId];
  if (!backend) {
    throw new Error(`Can not find plugin backend: ${pluginId}`);
  }
  return backend;
}

/**
 * Wrap an generic error to a verdaccio error
 *
 * @param error
 */
 export function wrapError(err: unknown): VerdaccioError {
  if (err instanceof Error) {
    if ('code' in err) return err;
    return getInternalError(err.message);
  } else {
    return getInternalError(String(err));
  }
}