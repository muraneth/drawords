chrome.scripting.registerContentScripts([
  {
    id: `main_context_inject_${Math.random()}`,
    world: "ISOLATED",
    matches: ["https://*/*"],
    js: ["inject.js"],
  },
]);

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

type SaveWord = {
  word: string;
  sign: string;
};
async function save(props: SaveWord) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  };
  const responce = await fetch("http://localhost:8080/save", requestOptions);
}

chrome.runtime.onInstalled.addListener(function () {
  // chrome.action.onClicked.addListener(function (tab) {
  //   chrome.action.setPopup({ tabId: tab.id, popup: "popup.html" });
  // });

  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    console.log("message =>", message);

    if (message.word) {
      translateWord(message.word, function (translatedText) {
        chrome.storage.local.set({ translatedWord: translatedText });
      });
    }
  });
});
