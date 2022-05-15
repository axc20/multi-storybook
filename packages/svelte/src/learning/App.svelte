<script>
  /**
   * your name?
   */
  export let name = '';
  import LearnReactivity from './LearnReactivity.svelte';
  import LearnBasics from './LearnBasics.svelte';
</script>

<main>
  <h1>Hello {name}</h1>
  <LearnBasics />
  <LearnReactivity />
</main>

<style>
  main {
    margin: 0;
    padding: 0;
    background-color: #ffe7ba;
  }
</style>
