<script>
  let { children, sponsor, callback } = $props();

  let baseClasses = "border-2 border-solid rounded-lg px-4 py-1 w-32 flex flex-row items-center";
</script>

<button
  class={sponsor ? baseClasses + " hover:text-custom-red hover:border-custom-red transition-all duration-200" : baseClasses}
  onclick={callback}
>
  {@render children?.()}
</button>
