import { Token } from '@verdaccio/types';

import VerdaccioStoragePlugin from '../src/plugin';
import StoragePluginManager from '../src/PackageStorage';

import config from './mocks/config';
import logger from './mocks/logger';
import { pkg1 } from './mocks/pkgs';

describe('verdaccio-storage-proxy', () => {
  let plugin: VerdaccioStoragePlugin = null;
  let packageStorage: StoragePluginManager = null;

  beforeEach(() => {
    jest.mock(
      'verdaccio-dummy-storage',
      () => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return () => {
          return {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            getPackageStorage: () => {
              return {
                readTarball: jest.fn(),
                writeTarball: jest.fn(),
                readPackage: jest.fn(),
                savePackage: jest.fn(),
                createPackage: jest.fn(),
                removePackage: jest.fn(),
                deletePackage: jest.fn(),
                updatePackage: jest.fn(),
              };
            },
            getSecret: jest.fn(),
            setSecret: jest.fn(),
            add: jest.fn(),
            remove: jest.fn(),
            get: jest.fn(),
            search: jest.fn(),
            saveToken: jest.fn(),
            deleteToken: jest.fn(),
            readTokens: jest.fn(),
          };
        };
      },
      { virtual: true }
    );
    const defaultConfig = { logger, config: null };
    plugin = new VerdaccioStoragePlugin(config, defaultConfig);
    packageStorage = plugin.getPackageStorage('pkg1') as StoragePluginManager;
  });

  afterEach(async () => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('database tests', () => {
    test('getSecret', done => {
      plugin
        .getSecret()
        .then(() => {
          expect(plugin.loadedBackends['dummy-storage'].getSecret).toBeCalled();
          done();
        })
        .catch(err => {
          done.fail(`Unexpected error has been emitted: ${err}`);
        });
    });
    test('setSecret', done => {
      plugin
        .setSecret('abc')
        .then(() => {
          expect(plugin.loadedBackends['dummy-storage'].setSecret).toHaveBeenCalledWith('abc');
          done();
        })
        .catch(err => {
          done.fail(`Unexpected error has been emitted: ${err}`);
        });
    });
    test('add', () => {
      const callback = jest.fn();
      plugin.add('pkg1', callback);
      expect(plugin.loadedBackends['dummy-storage'].add).toHaveBeenCalledWith('pkg1', callback);
    });
    test('remove', () => {
      const callback = jest.fn();
      plugin.remove('pkg1', callback);
      expect(plugin.loadedBackends['dummy-storage'].remove).toHaveBeenCalledWith('pkg1', callback);
    });
    test('get', () => {
      const callback = jest.fn();
      plugin.get(callback);
      expect(plugin.loadedBackends['dummy-storage'].get).toHaveBeenCalledWith(callback);
    });
    test('search', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const callback3 = jest.fn();
      plugin.search(callback1, callback2, callback3);
      expect(plugin.loadedBackends['dummy-storage'].search).toHaveBeenCalledWith(callback1, callback2, callback3);
    });
    test('saveToken', () => {
      const token: Token = {
        user: 'user',
        token: 'token',
        key: 'key',
        readonly: false,
        created: '',
      };
      plugin.saveToken(token);
      expect(plugin.loadedBackends['dummy-storage'].saveToken).toHaveBeenCalledWith(token);
    });
    test('deleteToken', () => {
      plugin.deleteToken('user', 'key');
      expect(plugin.loadedBackends['dummy-storage'].deleteToken).toHaveBeenCalledWith('user', 'key');
    });
    test('readTokens', () => {
      const filter = { user: 'user' };
      plugin.readTokens(filter);
      expect(plugin.loadedBackends['dummy-storage'].readTokens).toHaveBeenCalledWith(filter);
    });
  });

  describe('storage tests', () => {
    test('readTarball', () => {
      packageStorage.readTarball('tarball');
      expect(packageStorage.tarballPackageStorage.readTarball).toHaveBeenCalledWith('tarball');
    });
    test('writeTarball', () => {
      packageStorage.writeTarball('tarball');
      expect(packageStorage.tarballPackageStorage.writeTarball).toHaveBeenCalledWith('tarball');
    });
    test('readPackage', () => {
      const cb = jest.fn();
      packageStorage.readPackage('pkg1', cb);
      expect(packageStorage.packumentPackageStorage.readPackage).toHaveBeenCalledWith('pkg1', cb);
    });
    test('savePackage', () => {
      const cb = jest.fn();
      packageStorage.savePackage('pkg1', pkg1, cb);
      expect(packageStorage.packumentPackageStorage.savePackage).toHaveBeenCalledWith('pkg1', pkg1, cb);
    });
    test('createPackage', () => {
      const cb = jest.fn();
      packageStorage.createPackage('pkg1', pkg1, cb);
      expect(packageStorage.packumentPackageStorage.createPackage).toHaveBeenCalledWith('pkg1', pkg1, cb);
    });
    test('removePackage', () => {
      const cb = jest.fn();
      packageStorage.removePackage(cb);
      expect(packageStorage.packumentPackageStorage.removePackage).toHaveBeenCalledWith(cb);
    });
    test('deletePackage', () => {
      const cb = jest.fn();
      packageStorage.deletePackage('pkg1', cb);
      expect(packageStorage.packumentPackageStorage.deletePackage).toHaveBeenCalledWith('pkg1', cb);
    });
    test('updatePackage', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      const cb3 = jest.fn();
      const cb4 = jest.fn();
      packageStorage.updatePackage('pkg1', cb1, cb2, cb3, cb4);
      expect(packageStorage.packumentPackageStorage.updatePackage).toHaveBeenCalledWith('pkg1', cb1, cb2, cb3, cb4);
    });
  });
});
