<script>
  import { onMount } from "svelte";
  import { getStoredExtensionState, setStoredExtensionState, extensionRunningState } from "../lib/extensionState.svelte";

  import Toggle from "svelte-switcher";

  onMount(() => {
    getStoredExtensionState().then(value => extensionRunningState.value = value);
  });

  const handleChange = () => {
    extensionRunningState.value = !extensionRunningState.value;
    setStoredExtensionState(extensionRunningState.value)
    .then(() => console.log("State stored to local storage"))
  }

</script>

<div id="toggle-styles">
  <Toggle
    id="extension-toggle"
    name="extension-toggle"
    checked={extensionRunningState.value}
    onChange={handleChange}
  />
</div>

<style>
  #toggle-styles > :global(.svelte-toggle.svelte-toggle--checked .svelte-toggle--track) {
    background-color: #FF0000;
  }

  #toggle-styles > :global(.svelte-toggle.svelte-toggle--checked:hover:not(.svelte-toggle--disabled) .svelte-toggle--track) {
      background-color: #FF0000 !important;
  }

  #toggle-styles > :global(.svelte-toggle:hover:not(.svelte-toggle--disabled) .svelte-toggle--track) {
    background-color: #4d4d4d !important;
  }

  #toggle-styles > :global(.svelte-toggle--checked .svelte-toggle--thumb) {
    border-color: #FF0000 !important;
  }
</style>
