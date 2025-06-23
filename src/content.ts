import browser from "webextension-polyfill";

import { getStoredExtensionState } from "./lib/extensionState.svelte";

let removed = false;

const getAncestor = (baseNode:HTMLElement|Element, ancestor:number):HTMLElement => {

  let ancestorElement:HTMLElement = baseNode.parentElement!;
  ancestor -= 1;

  // If the ancestor we're looking for is the parent then stop
  // Otherwise traverse up
  if (ancestor != 0) {
    for (let i = 0; i < ancestor; i++) {
      ancestorElement = ancestorElement.parentElement!;
    }
  }

  return ancestorElement;

}

const removeAIOverview = () => {
  let elements = document.querySelectorAll("[data-mcpr]");

  elements.forEach(aiElement => {

    if (!removed) {
      let masterNode = getAncestor(aiElement, 7);
      masterNode.lastChild?.remove();
      removed = true;
      console.log("Removed AI overview section!");
    }

  });

}

const setExtensionRunning = async () => {

  let extensionRunning = await getStoredExtensionState();

  if (extensionRunning) {
    removeAIOverview();
    console.log("Resumed remove-ai-overview");
  } else {
    observer.disconnect();
    console.log("Paused remove-ai-overview");
  }

}

// Message listener
browser.runtime.onMessage.addListener(msg => {
  if (msg == "extensionStateChange") {
    setExtensionRunning();
  }

});

// Mutation Observer
let observerConfig = {
  subtree : true,
  childList: true,
};

let observer = new MutationObserver(mutations => mutations.forEach(() => {
  removeAIOverview()}
));

let container = document.documentElement || document.body
observer.observe(container, observerConfig);

setExtensionRunning();
console.log("remove-ai-overviews loaded.");
