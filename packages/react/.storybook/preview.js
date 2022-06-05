export const parameters = {
  controls: {
    expanded: false,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  actions: { argTypesRegex: '^on[A-Z].*' }
};
