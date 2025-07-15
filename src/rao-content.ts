import browser from "webextension-polyfill";

import { getStoredExtensionState } from "./lib/extensionState.svelte";

let removed = false;

const getAncestor = (baseNode:HTMLElement|Element, ancestor:number) => {

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

const removeAIOverview = (forceUpdate?:boolean) => {

  if (forceUpdate) {
    removed = false;
  }

  let searchResultsContainer = document.getElementById("search");
  let inlineAIoverviews = searchResultsContainer?.querySelectorAll("[data-mcpr][data-mcp]");
  let headingAIOverviews = document.querySelectorAll("[data-mcpr][data-mcp]");

  if (inlineAIoverviews) {

    inlineAIoverviews.forEach(aiElement => {

      if (!removed) {
        let masterNode = getAncestor(aiElement, 3);
        masterNode.remove();
        removed = true;
        console.log("Removed inline AI overview section!");
      }

    });

  }

  if (headingAIOverviews) {

    headingAIOverviews.forEach(aiElement => {

      if (!removed) {
        let masterNode = getAncestor(aiElement, 7);
        masterNode.lastChild?.remove();
        removed = true;
        console.log("Removed AI overview section!");
      }

    });

  }

}

const setExtensionRunning = async () => {

  let extensionRunning = await getStoredExtensionState();

  if (extensionRunning === true) {
    observer.observe(container, observerConfig);
    removeAIOverview(true);
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

setExtensionRunning();
console.log("remove-ai-overviews loaded.");
