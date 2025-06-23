import browser from "webextension-polyfill";

export const getManifestVersion = () => {
  return browser.runtime.getManifest().version;
}
