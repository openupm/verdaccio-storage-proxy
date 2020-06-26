import { Config } from '@verdaccio/types';

export interface StorageProxyConfig extends Config {
  // The backend key for handle security and token accesses.
  meta_backend: string;
  // The backend key for handle packument accesses.
  packument_backend: string;
  // The backend key to handle tarball accesses.
  tarball_backend: string;
  // The object to hold configurations of backend storages.
  backends: any;
  // The object to hold loaded backend storages.
  loaded_backends?: any;
}
