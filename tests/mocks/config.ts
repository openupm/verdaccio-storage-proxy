import { StorageProxyConfig } from '../../types';

const config: StorageProxyConfig = {
  user_agent: 'string',
  server_id: 1234,
  secret: '1234',
  self_path: './nowhere',
  security: {
    web: {
      sign: {},
      verify: {},
    },
    api: {
      legacy: true,
    },
  },
  uplinks: {},
  packages: {
    test: {
      storage: '',
      publish: [''],
      proxy: [''],
      access: [''],
    },
  },
  web: {
    enable: true,
    title: 'string',
    logo: 'string',
  },
  logs: [],
  auth: {},
  notifications: {
    method: '',
    packagePattern: /a/,
    packagePatternFlags: '',
    headers: {},
    endpoint: '',
    content: '',
  },
  checkSecretKey: () => '1234',
  getMatchedPackagesSpec: jest.fn(),
  hasProxyTo: () => false,
  // The backend key for handle security and token accesses.
  database_backend: 'dummy-storage',
  // The backend key for handle search access.
  search_backend: 'dummy-storage',
  // The backend key for handle packument accesses.
  packument_backend: 'dummy-storage',
  // The backend key to handle tarball accesses.
  tarball_backend: 'dummy-storage',
  // The object to hold configurations of backend storages.
  backends: {
    'dummy-storage': {},
  },
};

export default config;
