import browser from "webextension-polyfill";

console.log("remove-ai-overview running");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});
