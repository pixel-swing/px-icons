const path = require('path')
const rollup = require('rollup')
const esbuild = require('rollup-plugin-esbuild')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const analyze = require('rollup-plugin-analyzer')
const vue = require('rollup-plugin-vue')

const p = process.argv[2]
const exportName = `${p.split('/').pop().split('.').shift()}.js`
const root = path.resolve(__dirname, '..')

const esm = {
  file: path.resolve(root, 'dist/vue/es', exportName),
  format: 'esm',
  sourcemap: false,
}

const cjs = {
  file: path.resolve(root, 'dist/vue/lib', exportName),
  format: 'cjs',
  exports: 'named',
  sourcemap: false,
}

const rollupConfig = {
  input: path.resolve(root, p),
  plugins: [nodeResolve(), vue(), esbuild(), analyze({ summaryOnly: true, hideDeps: true })],
  external: ['vue'],
}

rollup
  .rollup(rollupConfig)
  .then(async (bundle) => {
    await Promise.all([bundle.write(esm), bundle.write(cjs)])
  })
  .catch((err) => console.log(err))
