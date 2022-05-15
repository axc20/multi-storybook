<script>
  import { marked } from 'marked';

  // as a general rule, data flow in svelte is top down:
  // parent to child component; component sets attributes on elements
  // sometimes, it can be useful to break that rule, as with form elements
  // can use the bind:value directive

  let name = 'world';
  let a = 1;
  let b = 2;
  let yes = false;

  let scoops = 1;
  let flavors = ['mint'];
  let menu = ['cookies and cream', 'mint', 'raspberry'];
  const join = flavors => {
    if (flavors.length === 1) {
      return flavors[0];
    }

    return `${flavors.slice(0, -1).join(', ')} and ${flavors[flavors.length - 1]}`;
  };

  let value = 'Some words are *italic*, some are **bold**';

  let questions = [
    { id: 1, text: 'Where did you go to school?' },
    { id: 2, text: "What is your mother's name" },
    { id: 3, text: 'What is another personal fact that an attack could easily find with Google?' }
  ];
  let selected;
  let answer = '';

  const handleSubmit = () => {
    alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`);
  };

  let html = '<p>Write some <b>text</b>!</p>';
</script>

<div>
  <div>
    <input bind:value={name} />
    <p>Hello {name}!</p>
    <hr />

    <!-- in the DOM, everything is a string, which doesn't help when dealing
    with numeric inputs; bind:value takes care of that for you -->
    <label>
      <input type="number" bind:value={a} min="0" max="10" />
      <input type="range" bind:value={a} min="0" max="10" />
    </label>
    <label>
      <input type="number" bind:value={b} min="0" max="10" />
      <input type="range" bind:value={b} min="0" max="10" />
    </label>
    <p>{a} + {b} = {a + b}</p>
  </div>

  <div>
    <label>
      <input type="checkbox" bind:checked={yes} />
      Yes! Send me regular email spam
    </label>
    {#if yes}
      <p>Thank you. We will bombard your inbox and sell your personal details.</p>
    {:else}
      <p>You must opt in to continue. If you're not paying, you're the product.</p>
    {/if}
    <button disabled={!yes}>Subscribe</button>
  </div>

  <div>
    <!--
    if you have multiple inputs relating to same value attribute, use bind:group
    radio inputs in same group are mutually exclusive
    checkbox inputs in same group from an array of selected values
    -->
    <h4>Size</h4>
    <label>
      <input type="radio" bind:group={scoops} value={1} />
      One scoop
    </label>
    <label>
      <input type="radio" bind:group={scoops} value={2} />
      Two scoops
    </label>
    <label>
      <input type="radio" bind:group={scoops} value={3} />
      Three scoops
    </label>

    <h4>Flavors</h4>
    {#each menu as flavor}
      <label>
        <input type="checkbox" bind:group={flavors} value={flavor} />
        {flavor}
      </label>
    {/each}

    {#if flavors.length === 0}
      <p>Please select at least one flavor</p>
    {:else if flavors.length > scoops}
      <p>Can't order more flavors than scoops!</p>
    {:else}
      <p>
        You ordered {scoops}
        {scoops === 1 ? 'scoop' : 'scoops'}
        of {join(flavors)}
      </p>
    {/if}
  </div>

  <div>
    <textarea bind:value />
    {@html marked(value)}
  </div>

  <div>
    <!--
    can use bind:value with <select> elements
    note that <option> values are objects rather than strings;
    because we haven't set an initial value of selected,
    the binding will set it to the default value (first in list);
    until the binding is initialized, selected remains undefined
    and can't blindly reference selected.id
    -->
    <h4>insecurity questions</h4>
    <form on:submit|preventDefault={handleSubmit}>
      <select bind:value={selected} on:change={() => (answer = '')}>
        {#each questions as question}
          <option value={question}>
            {question.text}
          </option>
        {/each}
      </select>
      <input bind:value={answer} />
      <button disabled={!answer} type="submit"> Submit </button>
    </form>
    <p>selected question {selected ? selected.id : '[waiting...]'}</p>
  </div>

  <div>
    <!-- select multiple -->
    <select multiple bind:value={flavors}>
      {#each menu as flavor}
        <option value={flavor}>
          {flavor}
        </option>
      {/each}
    </select>
  </div>

  <div>
    <!-- elements with contenteditable="true" attr support textContent and innerHTML bindings -->
    <div contenteditable="true" bind:innerHTML={html} />
    <pre>{html}</pre>
  </div>
</div>

<style>
  [contenteditable] {
    padding: 0.5em;
    border: 1px solid red;
    border-radius: 4px;
  }
</style>
