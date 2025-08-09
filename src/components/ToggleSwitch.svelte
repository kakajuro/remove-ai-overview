<script>
  import { onMount } from "svelte";

  import browser from "webextension-polyfill";

  import {
    extensionRunningState,
    switchClicked,
    getStoredExtensionState,
    setStoredExtensionState } from "../lib/extensionState.svelte";

  import Toggle from "./ToggleCore.svelte";

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
    browser.tabs.query({ currentWindow: true, active: true })
    .then(tabs => {
      let tabId = tabs[0].id;

      browser.tabs.sendMessage(tabId, "extensionStateChange")
      .then(() => console.log("Message sent sucessfully"));
    })

  }

</script>

<Toggle
  id="extension-toggle"
  checked={extensionRunningState.value}
  onChange={handleChange}
/>
