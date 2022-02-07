# server-timify

[![npm version](https://img.shields.io/npm/v/server-timify)](https://npmjs.com/package/server-timify)
[![npm size](https://img.shields.io/bundlephobia/minzip/server-timify)](https://bundlephobia.com/package/server-timify)
[![install size](https://packagephobia.com/badge?p=server-timify)](https://packagephobia.com/result?p=server-timify)
[![code coverage](https://codecov.io/gh/getoslash/server-timify/branch/main/graph/badge.svg?token=VBS5M4qYfz)](https://codecov.io/gh/getoslash/server-timify)
[![Release](https://github.com/getoslash/server-timify/actions/workflows/release.yml/badge.svg?event=push)](https://github.com/getoslash/server-timify/actions/workflows/release.yml)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/getoslash/server-timify)

⏱ Parse and stringifying utility methods for the [`Server-Timing`](https://www.smashingmagazine.com/2018/10/performance-server-timing/) header. Very forgiving and does not throw any errors for any invalid input.

## Install

```bash
npm install server-timify
# OR
yarn add server-timify
```

## Usage

```typescript
import { parse, stringify } from 'server-timify'

parse('cache;desc="Cache Read";dur=23.2')
// [{ name: "cache", description: "Cache Read", duration: 23.2 }]

stringify([{ name: "cache", description: "Cache Read", duration: 23.2 }])
// cache;desc="Cache Read";dur=23.2
```

Read ["Measuring Performance With Server Timing"](https://www.smashingmagazine.com/2018/10/performance-server-timing/) to learn how to use the `Server-Timing` header.

## License

The code in this project is released under the [MIT License](LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fgetoslash%2Fserver-timify.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fgetoslash%2Fserver-timify?ref=badge_large)
