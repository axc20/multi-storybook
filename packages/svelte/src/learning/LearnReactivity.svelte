<script>
  let count = 0;

  // reactive value
  // "re-run this whenever any of the referenced values change"
  // are useful when you need to reference them multiple times,
  // or you have values that depend on other reactive values
  $: doubled = count * 2;

  // reactive statement
  // $: console.log(`the count is ${count}`);

  // reactive grouped statements
  $: {
    console.log('---');
    console.log(`the doubled count is ${doubled}`);
  }

  // $: in front of if block
  $: if (count >= 10) {
    alert(`count is dangerously high!`);
    count = 9;
  }

  const handleClick = () => {
    count += 1;
  };

  // updating arrays and objects
  let numbers = [1, 2, 3, 4];

  const addNumber = () => {
    // reactivity is triggered by assignments,
    // so using array methods won't cause automatic updates
    // numbers.push(numbers.length + 1)
    numbers = [...numbers, numbers.length + 1];
    // assignments to properties of arrays and objs
    // obj.foo += 1, array[i] = x
    // work same way as assignments to values themselves
    // numbers[numbers.length] = numbers.length + 1;
    // a simple rule of thumb:
    // name of updated variable must appear on left hand
    // side of assignment
  };

  $: sum = numbers.reduce((total, n) => total + n, 0);
</script>

<div class="container">
  <div>
    <button on:click={handleClick}>Clicked</button>
    <p>{count}, {doubled}</p>
  </div>
  <div>
    <button on:click={addNumber}>Add a number </button>
    <p>{sum}</p>
  </div>
</div>

<style>
  .container {
    border: 1px solid black;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
</style>
