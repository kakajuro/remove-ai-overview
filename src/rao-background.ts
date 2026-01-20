import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener((details) => {
  if(details.reason == "install"){
    console.log("rao installed!");
  } else if(details.reason == "update"){
    console.log("extension updated");
    browser.tabs.create({ url: "https://removeaioverview.com/updated" });
  }
});

browser.runtime.onUpdateAvailable.addListener(details => {
  console.log("Updating to: " + details.version);
  browser.runtime.reload();
});

