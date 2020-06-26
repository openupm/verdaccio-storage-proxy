# verdaccio-storage-proxy

A verdaccio storage proxy to decouple meta, packument, and tarball accesses.

E.g. using the aws-s3-storage for tarball accesses, then using database storage for meta and packument accesses to create robust mixed storage for a cluster environment.

Access types:
- meta: accesses related to security and token.
- packument: accesses related to add, create, delete, update, and read a packument.
- tarball: accesses related to read and write a tarball.

## Installation

```bash
npm install verdaccio-storage-proxy
```

## Configuration

```yaml
store:
  storage-proxy:
    meta_backend: dummy-storage
    packument_backend: dummy-storage
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
      dummy-storage:
        ...
```

## Development

See the [verdaccio contributing guide](https://github.com/verdaccio/verdaccio/blob/master/CONTRIBUTING.md) for instructions setting up your development environment.
Once you have completed that, use the following npm tasks.

  - `npm run build`

    Build a distributable archive

  - `npm run test`

    Run unit test

For more information about any of these commands run `npm run ${task} -- --help`.
