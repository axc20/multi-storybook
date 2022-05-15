<button on:click>Click me</button>

<style>
  button {
    margin: 0;
    padding: 0;
    height: 2.5rem;
    width: 6.5rem;
    background-color: #aaa;
    border-color: #f1c40f;
    color: #f1c40f;
    font-size: 1.5rem;
    background-image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);
    background-position: 100%;
    background-size: 400%;
    transition: background 300ms ease-in-out;
  }

  button:hover {
    background-position: 0;
    color: #aaa;
  }
</style>
