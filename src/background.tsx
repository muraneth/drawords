type SaveWord = {
  word: string;
  sign: string;
};

chrome.contextMenus.onClicked.addListener(async (info) => {
  var word = info.selectionText;

  if (word && word.length > 0) {
    save({ word: word, sign: "" });
  }
});

// A generic onclick callback function.
// function genericOnClick(info) {}
chrome.runtime.onInstalled.addListener(async function () {
  // Create one test item for each context type.

  chrome.contextMenus.create({
    title: "Save word",
    id: "saveword",
    type: "normal",
    contexts: ["selection"],
  });
});

async function save(props: SaveWord) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  };
  const responce = await fetch("http://localhost:3000/save", requestOptions);
}
