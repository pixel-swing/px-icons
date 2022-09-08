const path = require('path')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const esbuild = require('rollup-plugin-esbuild')

const root = path.resolve(__dirname, '..')
const replacePath = (p) => {
  return ['./', p.replace('.vue', '.js').split('/').pop()].join('')
}

module.exports = {
  input: path.resolve(__dirname, '../packages/icons/fa/vue/index.ts'),
  output: [
    {
      file: path.resolve(root, './dist/vue/es/index.js'),
      format: 'esm',
      name: 'icons',
      sourcemap: false,
      paths: replacePath,
    },
    {
      file: path.resolve(root, './dist/vue/lib/index.js'),
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
      paths: replacePath,
    },
  ],
  plugins: [
    nodeResolve(),
    esbuild({
      // target: "browser",
    }),
  ],
  external(id) {
    console.log(id)
    return /\.vue$/.test(id)
  },
}
