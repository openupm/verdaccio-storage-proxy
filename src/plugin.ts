import {
  Logger,
  Callback,
  IPluginStorage,
  PluginOptions,
  IPackageStorage,
  TokenFilter,
  Token,
  Config,
  onEndSearchPackage,
  onSearchPackage,
  onValidatePackage,
} from '@verdaccio/types';

import { StorageProxyConfig } from '../types/index';

import loadPlugin from './plugin-loader';
import { getBackend } from './helper';
import PackageStorage from './PackageStorage';

export default class VerdaccioStoragePlugin implements IPluginStorage<StorageProxyConfig> {
  config: StorageProxyConfig & Config;
  version?: string;
  public logger: Logger;
  public constructor(config: StorageProxyConfig, options: PluginOptions<StorageProxyConfig>) {
    this.config = config;
    this.logger = options.logger;
    // load backends.
    this.config.loaded_backends = {};
    Object.keys(this.config.backends).forEach(pluginId => {
      const pluginConfig = this.config.backends[pluginId];
      const plugin_params = {
        config: this.config,
        logger: this.logger,
      };
      const plugin: IPluginStorage<Config> = loadPlugin<IPluginStorage<Config>>(
        this.config,
        this.logger,
        pluginId,
        pluginConfig,
        plugin_params,
        (plugin): IPluginStorage<Config> => {
          return plugin.getPackageStorage;
        }
      );
      this.config.loaded_backends[pluginId] = plugin;
    });
  }

  public async getSecret(): Promise<string> {
    const backend = getBackend(this.config, this.config.meta_backend);
    return backend.getSecret();
  }

  public async setSecret(secret: string): Promise<any> {
    const backend = getBackend(this.config, this.config.meta_backend);
    return backend.setSecret(secret);
  }

  public add(name: string, callback: Callback): void {
    const backend = getBackend(this.config, this.config.packument_backend);
    return backend.remove(name, callback);
  }

  public search(onPackage: onSearchPackage, onEnd: onEndSearchPackage, validateName: onValidatePackage): void {
    const backend = getBackend(this.config, this.config.packument_backend);
    return backend.search(onPackage, onEnd, validateName);
  }

  public remove(name: string, callback: Callback): void {
    const backend = getBackend(this.config, this.config.packument_backend);
    return backend.remove(name, callback);
  }

  public get(callback: Callback): void {
    const backend = getBackend(this.config, this.config.packument_backend);
    return backend.get(callback);
  }

  /**
   * Create an instance of the `PackageStorage`
   * @param packageInfo
   */
  public getPackageStorage(packageInfo: string): IPackageStorage {
    return new PackageStorage(this.config, packageInfo, this.logger);
  }

  public saveToken(token: Token): Promise<any> {
    const backend = getBackend(this.config, this.config.meta_backend);
    return backend.saveToken(token);
  }

  public deleteToken(user: string, tokenKey: string): Promise<any> {
    const backend = getBackend(this.config, this.config.meta_backend);
    return backend.deleteToken(user, tokenKey);
  }

  public readTokens(filter: TokenFilter): Promise<Token[]> {
    const backend = getBackend(this.config, this.config.meta_backend);
    return backend.readTokens(filter);
  }
}
