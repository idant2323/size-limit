let { isAbsolute, join, relative } = require('path')

/**
 * Converts a file path to an absolute path.
 * @param {string} file The file path to convert.
 * @param {string} cwd The current working directory.
 * @returns {string} The absolute file path.
 */
function toAbsolute (file, cwd) {
  return isAbsolute(file) ? file : join(cwd, file)
}

/**
 * Converts an array of file paths to a human-readable name.
 * @param {Array<string>} files The array of file paths.
 * @param {string} cwd The current working directory.
 * @returns {string} The human-readable name.
 */
function toName (files, cwd) {
  return files.map(i => (i.startsWith(cwd) ? relative(cwd, i) : i)).join(', ')
}

module.exports = {
  toAbsolute,
  toName
}
