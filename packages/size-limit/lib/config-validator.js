let SizeLimitError = require('../size-limit-error')

const OPTIONS = {
  name: true,
  path: true,
  limit: true,
  module: true,
  entry: 'webpack',
  config: 'webpack',
  webpack: 'webpack',
  ignore: 'webpack',
  import: 'webpack',
  gzip: ['webpack', 'file'],
  running: 'time',
  disableModuleConcatenation: 'webpack',
  brotli: 'webpack'
}

/**
 * Checks if a value is an array of strings.
 * @param {*} value The value to check.
 * @returns {boolean} True if the value is an array of strings.
 */
function isStrings (value) {
  if (!Array.isArray(value)) return false
  return value.every(i => typeof i === 'string')
}

/**
 * Checks if a value is a string, an array of strings, or undefined.
 * @param {*} value The value to check.
 * @returns {boolean} True if the value is a string, an array of strings, or undefined.
 */
function isStringsOrUndefined (value) {
  let type = typeof value
  return type === 'undefined' || type === 'string' || isStrings(value)
}

/**
 * Validates the configuration checks.
 * @param {object} plugins The plugins map.
 * @param {Array<object>} checks The array of checks to validate.
 * @throws {SizeLimitError} If the configuration is invalid.
 */
function checkChecks (plugins, checks) {
  if (!Array.isArray(checks)) {
    throw new SizeLimitError('noArrayConfig')
  }
  if (checks.length === 0) {
    throw new SizeLimitError('emptyConfig')
  }
  for (let check of checks) {
    if (typeof check !== 'object') {
      throw new SizeLimitError('noObjectCheck')
    }
    if (!isStringsOrUndefined(check.path)) {
      throw new SizeLimitError('pathNotString')
    }
    if (!isStringsOrUndefined(check.entry)) {
      throw new SizeLimitError('entryNotString')
    }
    for (let opt in check) {
      let available = OPTIONS[opt]
      if (typeof available === 'string') {
        if (!plugins.has(available)) {
          throw new SizeLimitError('pluginlessConfig', opt, available)
        }
      } else if (Array.isArray(available)) {
        if (available.every(i => !plugins.has(i))) {
          throw new SizeLimitError('multiPluginlessConfig', opt, ...available)
        }
      } else if (available !== true) {
        throw new SizeLimitError('unknownOption', opt)
      }
    }
  }
}

module.exports = {
  OPTIONS,
  isStrings,
  isStringsOrUndefined,
  checkChecks
}
