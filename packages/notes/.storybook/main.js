module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  // add any storybook addons you want here: https://storybook.js.org/addons/`
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: 'react',
  babel: async options => {
    return {
      ...options,
      presets: [...options.presets, '@babel/preset-react']
    };
  },
  core: {
    builder: 'webpack5'
  }
};
