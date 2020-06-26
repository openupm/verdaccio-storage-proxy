import fs from 'fs';
import path from 'path';
import { Writable } from 'stream';

import { IPackageStorageManager } from '@verdaccio/types';
import { Logger, ILocalData, Callback, Package, IPackageStorage } from '@verdaccio/types';
import { HTTP_STATUS, API_ERROR, VerdaccioError } from '@verdaccio/commons-api';

import { StorageProxyConfig } from '../src/types';

const logger: Logger = {
  error: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  child: jest.fn(),
  warn: jest.fn(),
  http: jest.fn(),
  trace: jest.fn(),
};

describe('verdaccio-storage-proxy', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  // storage test

  describe('verdaccio-storage-proxy', () => {

    describe('dummy:group', () => {

      test('should work', (done: jest.DoneCallback) => {
        expect("test").toBe("test");
        done();
      });

    });

  });
});
