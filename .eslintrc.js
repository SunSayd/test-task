module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended',
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    Literal: 'readonly',
  },
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    semi: [ 'error', 'always' ],
    'comma-style': [ 'error', 'last' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'no-prototype-builtins': 0,
    'no-var': 'error',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'comma-spacing': [
      'error',
      {
        'before': false,
        'after': true,
      },
    ],
    'object-curly-spacing': [
      'error',
      'always',
      {
        'arraysInObjects': false,
        'objectsInObjects': false,
      },
    ],
    'array-bracket-spacing': [
      'error',
      'always',
      {
        'objectsInArrays': false,
        'arraysInArrays': false,
      },
    ],
    'space-before-function-paren': 'off',
    'require-await': 'off',
    'keyword-spacing': [
      'error',
      {
        before: true,
      },
    ],
    curly: 'error',
    'brace-style': [
      'error',
    ],
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: [
          'const',
          'let',
          'var',
        ],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: [
          'const',
          'let',
          'var',
        ],
        next: [
          'const',
          'let',
          'var',
        ],
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: 'function',
        next: '*',
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    eqeqeq: [
      'error',
      'always',
    ],
    'space-before-blocks': 'error',
    quotes: [
      'error',
      'single',
    ],
    'eol-last': [ 'error', 'always' ],

    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': [ 'error', {
      'singleline': {
        'max': 3,
      },
      'multiline': {
        'max': 1,
      },
    }],
    'vue/attribute-hyphenation': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
      },
    ],
    'vue/html-indent': [
      'error',
      2,
    ],
    'vue/block-lang': [
      'error',
      {
        'script': {
          'lang': [ 'ts', 'tsx' ],
        },
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        'registeredComponentsOnly': true,
      },
    ],
    'vue/next-tick-style': [ 'error', 'promise' ],
    'vue/no-multiple-objects-in-class': [ 'error' ],
    'vue/no-useless-mustaches': [ 'error' ],
    'vue/no-useless-v-bind': [ 'error', {
      'ignoreIncludesComment': false,
      'ignoreStringEscape': false,
    }],
    'vue/comment-directive': 'off',
    'vue/require-default-prop': 'off',
    'no-trailing-spaces': 'error',
  },
};
