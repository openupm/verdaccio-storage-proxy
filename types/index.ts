import { Config } from '@verdaccio/types';

export interface StorageProxyConfig extends Config {
  // The backend key for handle security and token accesses.
  database_backend: string;
  // The backend key for handle search access.
  search_backend: string;
  // The backend key for handle packument accesses.
  packument_backend: string;
  // The backend key to handle tarball accesses.
  tarball_backend: string;
  // The object to hold configurations of backend storages.
  backends: any;
}
