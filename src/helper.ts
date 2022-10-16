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
  const obj = err as object;
  if ('code' in obj && 'message' in obj)
    return err;
  else if ('message' in obj)
    return getInternalError(obj.message as string);
  else
    return getInternalError(String(err));
}