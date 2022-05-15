<script>
  import Inner from './Inner.svelte';
  import Outer from './Outer.svelte';
  import CustomButton from './CustomButton.svelte';

  let m = { x: 0, y: 0 };

  const handleClick = () => alert('no more alerts');

  const handleMousemove = e => {
    m.x = e.clientX;
    m.y = e.clientY;
  };

  const handleMessage = e => alert(e.detail.text);
</script>

<div>
  <div>
    <!-- DOM event handlers can have modifiers that alter their behavior
    full list of modifiers:
    preventDefault: calls event.preventDefault() before running handler,
      useful for client-side form handling
    stopPropagation: calls event.stopPropagation(), preventing the event
      from reaching the next element
    passive:  improves scrolling performance on touch/wheel events; svelte
      will add automatically where it's safe
    nonpassive: explicitly set passive: false
    capture: fires the handler during the capture phase instead of bubbling
      phase (see MDN docs)
    once: remove the handler after the first time it runs
    self: only trigger handler if event.target is the element itself

    can chain modifiers together:
    on:click|once|capture={...}
    -->
    <button on:click|once={handleClick}>Click me</button>
  </div>

  <div>
    <!-- inline: on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}" -->
    <div class="red" on:mousemove={handleMousemove}>
      <p>The mouse position is {m.x}, {m.y}</p>
    </div>
  </div>

  <div>
    <!-- this links dispatch to the component instance -->
    <Inner on:message={handleMessage} />

    <!-- unlike DOM events, component events do not bubble
    if you want to listen to an event on deeply nested component,
    the intermediate components must forward the event -->
    <Outer on:message={handleMessage} />
  </div>

  <div>
    <!-- event forwarding works for DOM events too -->
    <CustomButton on:click={() => alert('clicked')} />
  </div>
</div>

<style>
  .red {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
    width: 300px;
    height: 80px;
  }
</style>
