import browser from "webextension-polyfill";

export const extensionRunningState = $state({ value: null });

export async function setStoredExtensionState(value:Boolean) {
  await browser.storage.local.set({"extensionRunning": value})
  .then(() => console.log("Sucess storing extension state."))
  .catch(() => console.warn("Error storing extensions state"))
}

export async function getStoredExtensionState():Promise<Boolean> {

  let { extensionRunning } = await browser.storage.local.get("extensionRunning");

  if (extensionRunning === undefined) {
    setStoredExtensionState(true);
    return true;
  } else {
    return extensionRunning;
  }

}


