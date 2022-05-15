<script>
  import { createEventDispatcher } from 'svelte';

  // createEventDispatcher must be called when component
  // is first instantiated
  // cannot do later inside a setTimeout callback
  const dispatch = createEventDispatcher();

  const sayHello = () => {
    dispatch('message', {
      text: `Hello ${Math.random().toFixed(2)}!`
    });
  };
</script>

<button on:click={sayHello}>Click to say hello</button>
