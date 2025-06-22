
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

// Mutation Observer
let observerConfig = {
  subtree : true,
  childList: true,
};

let observer = new MutationObserver(mutations => mutations.forEach(() => removeAIOverview()));

let container = document.documentElement || document.body
observer.observe(container, observerConfig);

console.log("remove-ai-overviews loaded.");
