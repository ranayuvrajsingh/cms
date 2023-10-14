const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': ' #2e54ff',
          '@link-color': ' #2e54ff',
        },
      },
    },
  ],
};
