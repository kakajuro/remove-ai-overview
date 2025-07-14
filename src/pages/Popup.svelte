<script>
  import { onMount } from "svelte";

  import ToggleSwitch from "../components/ToggleSwitch.svelte";
  import IconButton from "../components/IconButton.svelte";

  import { extensionRunningState, switchClicked } from "../lib/extensionState.svelte";

  import { Bug, Heart, Globe } from "@lucide/svelte";
  import { getManifestVersion } from "../lib/getManifestVersion";

  let showReloadMessage = $state(false);
  let manifestVersion = $state("");

  onMount(() => {
    showReloadMessage = false;
    manifestVersion = getManifestVersion();
  });

  $effect(() => {
    if (extensionRunningState.value == false && switchClicked.value == true) {
      showReloadMessage = true;
    }

    if (showReloadMessage && extensionRunningState.value == true) {
      showReloadMessage = false;
    }
  });

</script>

<main class="relative w-[300px] h-[420px] p-6 flex flex-col font-jost text-white bg-custom-bg no-scrollbar overflow-y-auto">
  <div class="w-screen flex flex-row cursor-default select-none">
    <img
      src="/removeaioverviewlogo.png"
      class="max-w-12 max-h-12"
      alt="Remove AI Overview Logo"
    />
    <div class="pl-4">
      <h2 class="text-lg font-bold">Remove AI Overview</h2>
      <p>Version {manifestVersion}</p>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center pt-12">
    {#if extensionRunningState.value}
      <h1 class={showReloadMessage ? `pt-6 text-2xl` : `pt-6 pb-4 text-2xl`}>AI Overviews hidden</h1>
    {:else}
      <h1 class={showReloadMessage ? `pt-6 text-2xl` : `pt-6 pb-4 text-2xl`}>AI Overviews visible</h1>
    {/if}
    {#if showReloadMessage}
      <p class="pb-4">(Reload for changes to take effect)</p>
    {/if}
    <ToggleSwitch />
  </div>
  <div class="pt-12 flex justify-between">
    <IconButton callback={() => window.open("https://removeaioverview.com", "_blank")}>
      <Globe />
      <p class="pl-2">Website</p>
    </IconButton>
    <div class="mx-2"></div>
    <IconButton callback={() => window.open("https://github.com/kakajuro/remove-ai-overview/issues", "_blank")}>
      <Bug />
      <p class="pl-2">Report a bug</p>
    </IconButton>
  </div>
  <div class="pt-4 w-screen flex justify-center">
    <IconButton sponsor={true} callback={() => window.open("https://removeaioverview.com/donate", "_blank")}>
      <div class="py-2 flex flex-row">
        <Heart />
        <p class="pl-2 pt-[2px]">Support</p>
      </div>
    </IconButton>
    <div class="ml-14"></div>
  </div>
</main>

