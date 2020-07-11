# verdaccio-storage-proxy

![npm](https://img.shields.io/npm/v/verdaccio-storage-proxy) ![NPM](https://img.shields.io/npm/l/verdaccio-storage-proxy) ![npm](https://img.shields.io/npm/dm/verdaccio-storage-proxy)

A verdaccio storage proxy to decouple database, search, packument, and tarball accesses.

E.g. using the aws-s3-storage for tarball accesses, then using database storage for the rest accesses to create robust mixed storage for a cluster environment.

Access types:
- database: accesses related to package CRD, security, and token.
- search: accesses related to search.
- packument: accesses related to packument CRUD.
- tarball: accesses related to tarball read and write.

## Installation

```bash
npm install verdaccio-storage-proxy
```

## Configuration

```yaml
store:
  storage-proxy:
    database_backend: redis-storage
    search_backend: redis-storage
    packument_backend: redis-storage
    tarball_backend: aws-s3-storage
    backends:
      aws-s3-storage:
        bucket: openupm
        region: us-east-1
        endpoint: http://127.0.0.1:9000
        accessKeyId: admin
        secretAccessKey: password
        s3ForcePathStyle: true
        keyPrefix: 'verdaccio/'
        tarballACL: public-read
      redis-storage:
        host: 127.0.0.1
        ...
```

The example configuration dispatches tarball accesses to aws-s3-storage and the rest to [verdaccio-redis-storage](https://github.com/openupm/verdaccio-redis-storage).

## Development

See the [verdaccio contributing guide](https://github.com/verdaccio/verdaccio/blob/master/CONTRIBUTING.md) for instructions setting up your development environment.
Once you have completed that, use the following npm tasks.

  - `npm run build`

    Build a distributable archive

  - `npm run test`

    Run unit test

For more information about any of these commands run `npm run ${task} -- --help`.
