import tap from 'tap'
import { parse, stringify } from '../src'
import type { ServerTimings } from '../src'

void tap.test('parse should correctly parse the Server-Timing header', (t) => {
  t.same(parse(null as unknown as string), [], 'should gracefully parse null')
  t.same(
    parse(undefined as unknown as string),
    [],
    'should gracefully parse undefined'
  )
  t.same(parse({} as unknown as string), [], 'should gracefully parse objects')
  t.same(parse([] as unknown as string), [], 'should gracefully parse arrays')
  t.same(parse(123 as unknown as string), [], 'should gracefully parse numbers')
  t.same(
    parse('hi'),
    [
      {
        name: 'hi',
      },
    ],
    'should correctly parse single name-only metric'
  )
  t.same(
    parse('handshake;dur=0.001'),
    [
      {
        name: 'handshake',
        duration: 0.001,
      },
    ],
    'should correctly parse single metric with duration'
  )
  t.same(
    parse('handshake;dur=0.001;desc="SSL Handshake"'),
    [
      {
        name: 'handshake',
        duration: 0.001,
        description: 'SSL Handshake',
      },
    ],
    'should correctly parse single metric'
  )
  t.same(
    parse('hi,hello'),
    [
      {
        name: 'hi',
      },
      {
        name: 'hello',
      },
    ],
    'should correctly parse multiple name-only metrics'
  )
  t.same(
    parse('handshake;dur=0.001, auth;dur=0.2'),
    [
      {
        name: 'handshake',
        duration: 0.001,
      },
      {
        name: 'auth',
        duration: 0.2,
      },
    ],
    'should correctly parse multiple metrics with duration'
  )
  t.same(
    parse(
      'handshake;dur=0.001;desc="SSL Handshake",auth;dur=0.2;desc="Authentication"'
    ),
    [
      {
        name: 'handshake',
        duration: 0.001,
        description: 'SSL Handshake',
      },
      {
        name: 'auth',
        duration: 0.2,
        description: 'Authentication',
      },
    ],
    'should correctly multiple metrics'
  )
  t.end()
})

void tap.test(
  'stringify should correctly stringify ServerTimings object',
  (t) => {
    t.same(
      stringify(null as unknown as ServerTimings),
      '',
      'should gracefully stringify null'
    )
    t.same(
      stringify(undefined as unknown as ServerTimings),
      '',
      'should gracefully stringify undefined'
    )
    t.same(
      stringify({} as unknown as ServerTimings),
      '',
      'should gracefully stringify objects'
    )
    t.same(
      stringify(456 as unknown as ServerTimings),
      '',
      'should gracefully stringify numbers'
    )
    t.same(
      stringify([
        {
          name: 'hi',
        },
      ]),
      'hi',
      'should correctly stringify a single name-only metric'
    )
    t.same(
      stringify([
        {
          name: 'fetch',
          duration: 0.589,
        },
      ]),
      'fetch;dur=0.589',
      'should correctly stringify a single metric with duration'
    )
    t.same(
      stringify([
        {
          name: 'fetch',
          duration: 0.589,
          description: 'Fetch All Resources',
        },
      ]),
      'fetch;dur=0.589;desc="Fetch All Resources"',
      'should correctly stringify a single'
    )
    t.same(
      stringify([
        {
          name: 'hi',
        },
        {
          name: 'hello',
        },
      ]),
      'hi, hello',
      'should correctly stringify multiple metrics'
    )
    t.end()
  }
)
