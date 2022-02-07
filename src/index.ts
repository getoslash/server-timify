interface ServerTiming {
  /** The name attribute is required, and gives a short name to the server-specified metric. */
  name: string
  /** (Optional) The duration attribute is a double (like `0.0`) that contains the server-specified metric duration. Usually milliseconds. */
  duration?: number
  /** (Optional) The description describes the server-specified metric. */
  description?: string
}

export type ServerTimings = Array<ServerTiming>

/**
 * Parse a given [`Server-Timing`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing) header string value into corresponding timing components.
 *
 * @example
 * ```
 * parse('missedCache')
 * // [{ name: "missedCache" }]
 * parse('cpu;dur=2.4')
 * // [{ name: "cpu", duration: 2.4 }]
 * parse('cache;desc="Cache Read";dur=23.2')
 * // [{ name: "cache", description: "Cache Read", duration: 23.2 }]
 * parse('db;dur=53, app;dur=47.2')
 * // [{ name: "db", duration: 53 }, { name: "app", duration: 47.2 }]
 * ```
 * @param timingHeader Header value (as string) to parse.
 * @returns {ServerTimings} Timing components as an object.
 */
export const parse = (timingHeader: string): ServerTimings => {
  if (!timingHeader) return []
  if (typeof timingHeader !== 'string') return []
  const timings: ServerTimings = []

  // If only a single metric is sent, and that too with only the name, quickly parse + return it.
  if (!timingHeader.includes(',') && !timingHeader.includes(';'))
    return [
      {
        name: timingHeader.slice(),
      },
    ]

  const metrics = timingHeader
    .slice()
    .split(',')
    .map((_) => _.trim())
  metrics.forEach((metric) => {
    const timing: ServerTiming = {
      name: '',
    }
    metric
      .split(';')
      .map((_) => _.trim())
      .forEach((parts) => {
        if (!parts.includes('=')) {
          timing.name = parts
        }
        if (parts.startsWith('desc='))
          // Clean up leading and trailing single/double quotes.
          timing.description = parts
            .split('=')[1]
            .trim()
            .replace(/^"(.+(?="$))"$/, '$1')
        else if (parts.startsWith('dur='))
          timing.duration = Number(parts.split('=')[1].trim())
      })
    timings.push(timing)
  })
  return timings
}

/**
 * Stringify a given {@link ServerTimings} object into a [`Server-Timing`](https://www.w3.org/TR/server-timing/#the-server-timing-header-field) header string value.
 *
 * @example
 * ```
 * stringify([{ name: "missedCache" }])
 * // missedCache
 * stringify([{ name: "cpu", duration: 2.4 }])
 * // cpu;dur=2.4
 * stringify([{ name: "cache", description: "Cache Read", duration: 23.2 }])
 * // cache;desc="Cache Read";dur=23.2
 * stringify([{ name: "db", duration: 53 }, { name: "app", duration: 47.2 }])
 * // db;dur=53, app;dur=47.2
 * ```
 * @param {ServerTimings} timings Timings object to stringify.
 * @returns Server-Timings header value as string.
 */
export const stringify = (timings: ServerTimings): string => {
  if (!Array.isArray(timings)) return ''

  return timings
    .map((timing) => {
      let metric = `${timing.name}`
      if (timing.duration) metric = `${metric};dur=${timing.duration}`
      if (timing.description) metric = `${metric};desc="${timing.description}"`
      return metric
    })
    .join(', ')
}
