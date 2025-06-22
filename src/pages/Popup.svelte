<script>
  import ToggleSwitch from "../components/ToggleSwitch.svelte";
  import { extensionRunningState } from "../lib/extensionState.svelte";
</script>

<main class="w-[300px] h-[450px] p-6 flex flex-col font-jost text-white bg-custom-bg">
  <div class="w-screen flex flex-row cursor-default select-none">
    <img
      src="/removeaioverviewlogo.png"
      class="max-w-12 max-h-12"
      alt="Remove AI Overview Logo"
    />
    <div class="pl-4">
      <h2 class="text-lg font-bold">Remove AI Overview</h2>
      <p class="italic">by kakajuro (vX)</p>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center pt-12">
    {#if extensionRunningState.value}
      <h1 class="pt-6 pb-4 text-2xl">AI Overviews hidden</h1>
    {:else}
      <h1 class="pt-6 pb-4 text-2xl">AI Overviews visible</h1>
    {/if}
    <ToggleSwitch />
  </div>

</main>

