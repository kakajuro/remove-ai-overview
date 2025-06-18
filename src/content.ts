console.log("Hello from content script");

let blankSpaceRemoved = false;

const removeAIOverview = () => {
  let elements = document.querySelectorAll("[data-mcp]") && document.querySelectorAll("[data-mcpr]");

  elements.forEach(aiElement => {
    aiElement.parentElement?.removeChild(aiElement);
    console.log("Removed AI overview section!");

    if (!blankSpaceRemoved) {
      let headersList = document.querySelectorAll("h1");
      let searchResultHeader = headersList[headersList.length-1];
      let searchResultParent = searchResultHeader.parentNode;
      searchResultParent?.lastChild?.remove();
      blankSpaceRemoved = true;
    }

  });

}

// Mutation Observer
let observerConfig = {
  subtree : true,
  childList: true,
};

let observer = new MutationObserver(mutations => mutations.forEach(() => removeAIOverview()));

let container = document.documentElement || document.body
observer.observe(container, observerConfig);
