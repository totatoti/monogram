import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import license from 'rollup-plugin-license'

const banner = `
<%= pkg.name %>
@license <%= pkg.license %>

Dependencies:<% _.forEach(dependencies, function (dependency) { %>
  <%= dependency.name %> <%= dependency.version %> | <%= dependency.license %> <% }) %>
`

const licenseConfig = license({
  banner: {
    commentStyle: 'ignored',
    content: banner,
  },
})

export default [
  {
    input: 'src/monogram.ts',
    output: {
      file: 'dist/monogram.js',
      format: 'umd',
      name: 'monogram',
    },
    plugins: [
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
      typescript(),
      babel({ exclude: 'node_modules/**', extensions: ['.js', '.ts'] }),
      licenseConfig,
    ],
  },
  {
    input: 'src/monogram.ts',
    output: [
      {
        file: 'dist/monogram.min.js',
        format: 'umd',
        name: 'monogram',
      },
      {
        file: 'docs/monogram.min.js',
        format: 'umd',
        name: 'monogram',
      },
    ],
    plugins: [
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
      typescript(),
      babel({ exclude: 'node_modules/**', extensions: ['.js', '.ts'] }),
      licenseConfig,
      terser(),
    ],
  },
]
