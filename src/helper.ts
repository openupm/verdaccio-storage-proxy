import { Config, IPluginStorage } from '@verdaccio/types';

export function getBackend(backends: any, pluginId: string): IPluginStorage<Config> {
  const backend = backends[pluginId];
  if (!backend) {
    throw new Error(`Can not find plugin backend: ${pluginId}`);
  }
  return backend;
}
