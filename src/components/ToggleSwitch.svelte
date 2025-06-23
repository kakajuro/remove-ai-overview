<script>
  import { onMount } from "svelte";

  import browser from "webextension-polyfill";

  import {
    extensionRunningState,
    switchClicked,
    getStoredExtensionState,
    setStoredExtensionState } from "../lib/extensionState.svelte";

  import Toggle from "svelte-switcher";

  onMount(() => {
    switchClicked.value = false;
    getStoredExtensionState().then(value => extensionRunningState.value = value);
  });

  const handleChange = () => {
    // Update extension state in local storage
    extensionRunningState.value = !extensionRunningState.value;
    setStoredExtensionState(extensionRunningState.value)
    .then(() => console.log("State stored to local storage"))

    switchClicked.value = true;

    // Alert content script that state has changed
    browser.tabs.query({currentWindow: true, active: true})
    .then(tabs => {
      let tabId = tabs[0].id;

      console.log(tabId);

      browser.tabs.sendMessage(tabId, "extensionStateChange")
      .then(() => console.log("Message sent sucessfully"));
    })

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
