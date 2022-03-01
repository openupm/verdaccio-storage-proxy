# verdaccio-storage-proxy
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://littlebigfun.com"><img src="https://avatars.githubusercontent.com/u/125390?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Favo Yang</b></sub></a><br /><a href="https://github.com/openupm/verdaccio-storage-proxy/commits?author=favoyang" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!