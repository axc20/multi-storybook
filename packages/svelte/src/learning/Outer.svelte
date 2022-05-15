<script>
  import Inner from './Inner.svelte';
</script>

<Inner on:message />

<!--
<script>
  import Inner from './Inner.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function forward(event) {
    dispatch('message', event.detail);
  }
</script>

<Inner on:message={forward} />

above is a lot of code to write to forward events, so
the equivalent shorthand is an on:message event directive
without a value
-->
