module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        targets: {
          esmodules: true,
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
