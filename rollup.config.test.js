var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var typescript = require('rollup-plugin-typescript2')
var babel = require('rollup-plugin-babel')

module.exports = {
  output: {
    format: 'umd',
    name: 'monogram',
  },
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    typescript(),
    babel({ exclude: 'node_modules/**', extensions: ['.js', '.ts'] }),
  ],
}
