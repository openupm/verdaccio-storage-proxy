import {
  Logger,
  ILocalPackageManager,
  StorageUpdateCallback,
  PackageTransformer,
  StorageWriteCallback,
  CallbackAction,
  Package,
  ReadPackageCallback,
} from '@verdaccio/types';
import { UploadTarball, ReadTarball } from '@verdaccio/streams';

import { StorageProxyConfig } from '../types/index';

import { getBackend } from './helper';

export default class StoragePluginManage implements ILocalPackageManager {
  public logger: Logger;
  public packageName: string;
  public config: StorageProxyConfig;
  private packumentPackageStorage: ILocalPackageManager;
  private tarballPackageStorage: ILocalPackageManager;

  public constructor(config: StorageProxyConfig, packageName: string, logger: Logger) {
    this.logger = logger;
    this.packageName = packageName;
    this.config = config;
    const packumentBackend = getBackend(this.config, this.config.packument_backend);
    this.packumentPackageStorage = packumentBackend.getPackageStorage(packageName) as ILocalPackageManager;
    const tarballBackend = getBackend(this.config, this.config.tarball_backend);
    this.tarballPackageStorage = tarballBackend.getPackageStorage(packageName) as ILocalPackageManager;
  }

  public updatePackage(
    name: string,
    updateHandler: StorageUpdateCallback,
    onWrite: StorageWriteCallback,
    transformPackage: PackageTransformer,
    onEnd: CallbackAction
  ): void {
    return this.packumentPackageStorage.updatePackage(name, updateHandler, onWrite, transformPackage, onEnd);
  }

  public deletePackage(fileName: string, callback: CallbackAction): void {
    return this.packumentPackageStorage.deletePackage(fileName, callback);
  }

  public removePackage(callback: CallbackAction): void {
    return this.packumentPackageStorage.removePackage(callback);
  }

  public createPackage(name: string, data: Package, callback: CallbackAction): void {
    return this.packumentPackageStorage.createPackage(name, data, callback);
  }

  public savePackage(pkgName: string, pkg: Package, callback: CallbackAction): void {
    return this.packumentPackageStorage.savePackage(pkgName, pkg, callback);
  }

  public readPackage(pkgName: string, callback: ReadPackageCallback): void {
    return this.packumentPackageStorage.readPackage(pkgName, callback);
  }

  public writeTarball(name: string): UploadTarball {
    return this.tarballPackageStorage.writeTarball(name);
  }

  public readTarball(name: string): ReadTarball {
    return this.tarballPackageStorage.readTarball(name);
  }
}
