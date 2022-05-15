<script>
  import Thing from './Thing.svelte';

  let user = { loggedIn: false };
  const toggle = () => {
    user.loggedIn = !user.loggedIn;
  };

  let x = 7;

  let cats = [
    { id: 'J---aiyznGQ', name: 'Keyboard Cat' },
    { id: 'z_AbfPXTKms', name: 'Maru' },
    { id: 'Outn3pvWnpg', name: 'Henri the Existential Cat' }
  ];

  let things = [
    { id: 1, color: 'darkblue' },
    { id: 2, color: 'indigo' },
    { id: 3, color: 'deeppink' },
    { id: 4, color: 'salmon' },
    { id: 5, color: 'gold' }
  ];
  const handleThingClick = () => {
    things = things.slice(1);
  };

  const getRandomName = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    if (res.ok) {
      const json = await res.json();

      return json[Math.floor(Math.random() * 9)].name;
    } else {
      return 'Fail McFail';
    }
  };
  let promise = getRandomName();
  const handleClickGetRandomName = () => {
    promise = getRandomName();
  };
</script>

<div class="container">
  <div>
    <!-- if/else-if/else blocks
    A # char always indicates a block opening tag.
    A / char always indicates a block closing tag.
    A : char always indicates a block continuation tag.
    -->
    {#if user.loggedIn}
      <button on:click={toggle}>Log out</button>
    {:else}
      <button on:click={toggle}>Log in</button>
    {/if}

    {#if x > 10}
      <p>{x} is less than 5</p>
    {:else if x > 5}
      <p>{x} is between 5 and 10</p>
    {/if}
  </div>

  <div>
    <!-- each blocks -->
    <ul>
      {#each cats as cat, i}
        <li>
          <a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
            {i + 1}: {cat.name}
          </a>
        </li>
      {/each}
    </ul>

    <!-- alternatively, using destructuring -->
    <ul>
      {#each cats as { id, name }, i}
        <li>
          <a target="_blank" href="https://www.youtube.com/watch?v={id}">
            {i + 1}: {name}
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <div>
    <button on:click={handleThingClick}>Remove first thing</button>

    <!-- keyed each blocks
    by default, when you modify value of an each block, it will add/remove items at end
    to remove in way you want: specify a unique identifier for the each block
    -->
    {#each things as thing (thing.id)}
      <Thing current={thing.color} />
    {/each}
  </div>

  <div>
    <!-- await blocks
    only the most recent promise is considered - don't worry about race conditions
    if you know your promise can't reject, can omit the catch block
    {#await promise then value}
      <p>the value is {value}</p>
    {/await}
    -->
    <button on:click={handleClickGetRandomName}>click to get new name</button>
    {#await promise}
      <p>waiting</p>
    {:then name}
      <p>{name}</p>
    {:catch error}
      <p style="color: red;">{error.message}</p>
    {/await}
  </div>
</div>

<style>
  .container {
    border: 1px solid green;
  }
</style>
