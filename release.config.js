module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/github',
      {
        assets: [{ path: 'dist/monogram.js' }, { path: 'dist/monogram.min.js' }]
      }
    ]
  ]
}
