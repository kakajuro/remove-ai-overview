import browser from "webextension-polyfill";

import { getStoredExtensionState } from "./lib/extensionState.svelte";

// Global flags
let removed = false;
let foundItemBar = false;
let removedAIMode = false;

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

  // Remove references to "AI Mode"
  // Remove AI Mode button from Google homepage
  if (!/(search\?)/.test(window.location.href)) {
    let aiModeButtons = document.querySelectorAll("button[jscallback]");
    aiModeButtons.forEach(button => {
      button.parentNode?.removeChild(button);
    });
  }

  // Remove AI Mode from search menu bar
  let listItems = document.querySelectorAll('div[role="list"]');
  let itemBar = listItems[0];

  if (itemBar != null) {
    foundItemBar = true;
  }

  // Check if not having a search query
  // If not searching they are on the homespage and therefore remove the AI Mode byutton

  if (foundItemBar && !removedAIMode) {

    if ((itemBar.firstChild! as HTMLElement).hasAttribute("jsname")) {
      itemBar.removeChild(itemBar.firstChild!);
      removedAIMode = true;
    }

  }

  // Remove AI Overviews
  let searchResultsContainer = document.getElementById("search");
  let inlineAIoverviews = searchResultsContainer?.querySelectorAll("[data-mcpr][data-mcp]");
  let headingAIOverviews = document.querySelectorAll("[data-mcpr][data-mcp]");

  // Remove inline overviews
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

  // Remove heading overviews
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

  // Remove dropdown overviews
  let dropdownOverviews = document.querySelectorAll('[data-mcp][data-mg-cp]');
  dropdownOverviews.forEach(overview => {
    let masterNode = getAncestor(overview, 9);
    masterNode.remove();
  });

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
