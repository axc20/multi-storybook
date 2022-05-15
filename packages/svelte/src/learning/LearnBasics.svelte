<script>
  let string = `this string constains some <strong>HTML!!!</strong>`;
</script>

<!-- html tags
sometimes you need to render HTML directly into a component
svelte doesn't perform any sanitization of the expresssion
so you must manually escape HTML that comes from sources you
don't trust or you risk exposing users to XSS attacks
-->
<p>{@html string}</p>
