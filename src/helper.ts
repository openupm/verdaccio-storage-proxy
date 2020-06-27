import { Config, IPluginStorage } from '@verdaccio/types';

import { StorageProxyConfig } from '../types/index';

export function getBackend(config: StorageProxyConfig, pluginId: string): IPluginStorage<Config> {
  const backend = config.loaded_backends[pluginId];
  if (!backend) {
    throw new Error(`Can not find plugin backend: ${pluginId}`);
  }
  return backend;
}
