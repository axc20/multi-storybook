module.exports = {
  stories: ['../src/**/*.stories.@(mdx|js|jsx|ts|tsx)', '../stories/**/*.stories.@(mdx|js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  // features: {
  //   previewMdx2: true
  // },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  }
};
