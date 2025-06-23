import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener((details) => {
  console.log("remove-ai-overview installed!");
});
