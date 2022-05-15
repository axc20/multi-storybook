<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import App from './App.svelte';
</script>

<Meta title="Learning" component={App} argTypes={{ name: { control: 'text' } }} />

<Template let:args>
  <App {...args} />
</Template>

<Story name="Default" args={{ name: 'World' }} />
