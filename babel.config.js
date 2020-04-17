module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: ['> 0.25%, last 2 versions, Firefox ESR'],
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ]

  return {
    presets,
  }
}
