<script>
  let { children } = $props();
</script>

<button class="border-2 border-solid rounded-lg px-4 py-1 w-32 flex flex-row items-center">
  {@render children?.()}
</button>
