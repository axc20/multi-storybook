<script>
  /**
   * your name?
   */
  export let name = '';
  import LearnReactivity from './LearnReactivity.svelte';
  import LearnBasics from './LearnBasics.svelte';
  import LearnProps from './LearnProps.svelte';
  import LearnLogic from './LearnLogic.svelte';
  import LearnEvents from './LearnEvents.svelte';
  import LearnBindings from './LearnBindings.svelte';
</script>

<main>
  <h1>Hello {name}</h1>
  <LearnBasics />
  <LearnReactivity />
  <LearnProps />
  <LearnLogic />
  <LearnEvents />
  <LearnBindings />
</main>

<style>
  main {
    margin: 0;
    padding: 0;
    background-color: #ffe7ba;
  }
</style>
