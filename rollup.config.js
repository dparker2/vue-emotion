// rollup.config.js (building more than one bundle)

export default [{
  input: 'lib/loader/loader.js',
  output: {
    file: 'loader/index.js',
    format: 'cjs'
  }
}, {
  input: 'lib/plugin/plugin.js',
  output: {
    file: 'plugin/index.js',
    format: 'cjs'
  }
}, {
  input: 'lib/index.js',
  output: {
    file: 'index.js',
    format: 'cjs'
  }
}];
