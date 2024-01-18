const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    rules: {
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'curly': ['error', 'all'],
      'vue/valid-v-slot': ['error', {
        allowModifiers: true,
      }],

      'vue/attribute-hyphenation': ['error', 'always', {
        ignore: ['maxLength'],
      }],

      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],

    },
  },
)
