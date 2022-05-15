<script>
  import Nested from './Nested.svelte';

  const pkg = {
    name: 'svelte',
    speed: 'blazing'
  };
</script>

<div>
  <Nested answer={42} name="react" speed="fast" />
  <!-- spread props -->
  <Nested {...pkg} />
</div>

<style>
  div {
    border: 1px solid #ff00ff;
  }
</style>
