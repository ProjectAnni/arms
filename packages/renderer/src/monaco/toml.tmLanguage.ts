export default {
  'version': 'v0.6.0',
  'scopeName': 'source.toml',
  'uuid': '9b00c027-8f13-4f5a-a57e-d90478a1f817',
  'information_for_contributors': [
    'aster: galaster@foxmail.com',
  ],
  'patterns': [
    {
      'include': '#comment',
    },
    {
      'include': '#table',
    },
    {
      'include': '#key_value',
    },
  ],
  'repository': {
    'comment': {
      'captures': {
        '1': {
          'name': 'comment.line.number-sign.toml',
        },
        '2': {
          'name': 'punctuation.definition.comment.toml',
        },
      },
      'comment': 'Comments',
      'match': '\\s*((#).*)$',
    },
    'table': {
      'patterns': [
        {
          'captures': {
            '1': {
              'name': 'punctuation.definition.table.toml',
            },
            '2': {
              'patterns': [
                {
                  'match': '[^\\s.]+',
                  'name': 'entity.other.attribute-name.table.toml',
                },
              ],
            },
            '3': {
              'name': 'punctuation.definition.table.toml',
            },
          },
          'match': '^\\s*(\\[)([^\\[\\]]*)(\\])',
          'name': 'meta.tag.table.toml',
        },
        {
          'name': 'meta.tag.table.array.toml',
          'match': '^\\s*(\\[\\[)([^\\[\\]]*)(\\]\\])',
          'captures': {
            '1': {
              'name': 'punctuation.definition.table.array.toml',
            },
            '2': {
              'patterns': [
                {
                  'match': '[^\\s.]+',
                  'name': 'entity.other.attribute-name.table.array.toml',
                },
              ],
            },
            '3': {
              'name': 'punctuation.definition.table.array.toml',
            },
          },
        },
        {
          'begin': '(?<!\\w)(\\{)\\s*',
          'beginCaptures': {
            '1': {
              'name': 'punctuation.definition.table.inline.toml',
            },
          },
          'end': '\\s*(\\})(?!\\w)',
          'endCaptures': {
            '1': {
              'name': 'punctuation.definition.table.inline.toml',
            },
          },
          'patterns': [
            {
              'include': '#key_value',
            },
            {
              'include': '#data',
            },
          ],
        },
      ],
    },
    'key_value': {
      'patterns': [
        {
          'name': 'invalid.illegal.noKey.toml',
          'match': '(\\s*=.*)$',
        },
        {
          'name': 'invalid.deprecated.noValue.toml',
          'match': '(\\s*[A-Za-z_\\-][A-Za-z0-9_\\-]*\\s*=)(?=\\s*$)',
        },
        {
          'begin': '\\s*([A-Za-z_-][A-Za-z0-9_-]*|".+"|\'.+\'|[0-9]+)\\s*(=)\\s*',
          'beginCaptures': {
            '1': {
              'name': 'entity.name.tag.toml',
            },
            '2': {
              'name': 'punctuation.definition.keyValue.toml',
            },
          },
          'end': '($|(?==)|\\,|\\s*(?=\\}))',
          'patterns': [
            {
              'include': '#comment',
            },
            {
              'include': '#data',
            },
            {
              'include': '#illegal',
            },
          ],
        },
      ],
    },
    'data': {
      'patterns': [
        {
          'begin': '(?<!\\w)(\\{)\\s*',
          'beginCaptures': {
            '1': {
              'name': 'punctuation.definition.table.inline.toml',
            },
          },
          'end': '\\s*(\\})(?!\\w)',
          'endCaptures': {
            '1': {
              'name': 'punctuation.definition.table.inline.toml',
            },
          },
          'patterns': [
            {
              'include': '#key_value',
            },
            {
              'include': '#data',
            },
          ],
        },
        {
          'begin': '(?<!\\w)(\\[)\\s*',
          'beginCaptures': {
            '1': {
              'name': 'punctuation.definition.array.toml',
            },
          },
          'end': '\\s*(\\])(?!\\w)',
          'endCaptures': {
            '1': {
              'name': 'punctuation.definition.array.toml',
            },
          },
          'patterns': [
            {
              'include': '#comment',
            },
            {
              'include': '#data',
            },
          ],
        },
        {
          'name': 'string.quoted.triple.basic.block.toml',
          'begin': '"""',
          'end': '"""',
          'patterns': [
            {
              'match': '\\\\([btnfr"\\\\\\n/ ]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})',
              'name': 'constant.character.escape.toml',
            },
            {
              'match': '\\\\[^btnfr/"\\\\\\n]',
              'name': 'invalid.illegal.escape.toml',
            },
          ],
        },
        {
          'name': 'string.quoted.single.basic.line.toml',
          'match': '"[^"\\\\]*(?:\\\\.[^"\\\\]*)*"',
          'patterns': [
            {
              'match': '\\\\([btnfr"\\\\\\n/ ]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})',
              'name': 'constant.character.escape.toml',
            },
            {
              'match': '\\\\[^btnfr/"\\\\\\n]',
              'name': 'invalid.illegal.escape.toml',
            },
          ],
        },
        {
          'name': 'string.quoted.triple.literal.block.toml',
          'begin': '\'\'\'',
          'end': '\'\'\'',
        },
        {
          'name': 'string.quoted.single.literal.line.toml',
          'match': '\'.*?\'',
        },
        {
          'captures': {
            '1': {
              'name': 'constant.other.datetime.offset.toml',
            },
          },
          'match': '(?<!\\w)(\\d{4}\\-\\d{2}\\-\\d{2}[T| ]\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[\\+\\-]\\d{2}:\\d{2}))(?!\\w)',
        },
        {
          'captures': {
            '1': {
              'name': 'constant.other.datetime.local.toml',
            },
          },
          'match': '(\\d{4}\\-\\d{2}\\-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?)',
        },
        {
          'name': 'constant.other.date.toml',
          'match': '\\d{4}\\-\\d{2}\\-\\d{2}',
        },
        {
          'name': 'constant.other.time.toml',
          'match': '\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?',
        },
        {
          'match': '(?<!\\w)(true|false)(?!\\w)',
          'captures': {
            '1': {
              'name': 'constant.other.boolean.toml',
            },
          },
        },
        {
          'match': '(?<!\\w)([\\+\\-]?(0|([1-9](([0-9]|_[0-9])+)?))(?:(?:\\.(0|([1-9](([0-9]|_[0-9])+)?)))?[eE][\\+\\-]?[1-9]_?[0-9]*|(?:\\.[0-9_]*)))(?!\\w)',
          'captures': {
            '1': {
              'name': 'constant.numeric.float.toml',
            },
          },
        },
        {
          'match': '(?<!\\w)((?:[\\+\\-]?(0|([1-9](([0-9]|_[0-9])+)?))))(?!\\w)',
          'captures': {
            '1': {
              'name': 'constant.numeric.integer.toml',
            },
          },
        },
        {
          'match': '(?<!\\w)([\\+\\-]?inf)(?!\\w)',
          'captures': {
            '1': {
              'name': 'constant.numeric.inf.toml',
            },
          },
        },
        {
          'match': '(?<!\\w)([\\+\\-]?nan)(?!\\w)',
          'captures': {
            '1': {
              'name': 'constant.numeric.nan.toml',
            },
          },
        },
        {
          'match': '(?<!\\w)((?:0x(([0-9a-fA-F](([0-9a-fA-F]|_[0-9a-fA-F])+)?))))(?!\\w)',
          'captures': {
            '1': {
              'name': 'constant.numeric.hex.toml',
            },
          },
        },
        {
          'match': '(?<!\\w)(0o[0-7](_?[0-7])*)(?!\\w)',
          'captures': {
            '1': {
              'name': 'constant.numeric.oct.toml',
            },
          },
        },
        {
          'match': '(?<!\\w)(0b[01](_?[01])*)(?!\\w)',
          'captures': {
            '1': {
              'name': 'constant.numeric.bin.toml',
            },
          },
        },
      ],
    },
    'illegal': {
      'captures': {
        '1': {
          'name': 'invalid.illegal.toml',
        },
      },
      'match': '(.*)',
    },
  },
};
