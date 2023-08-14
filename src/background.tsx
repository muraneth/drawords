chrome.scripting.registerContentScripts([
  {
    id: `main_context_inject_${Math.random()}`,
    world: "ISOLATED",
    matches: ["<all_urls>"],
    js: ["inject.js"],
    runAt: "document_end",
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

import { WordMessage } from "./assets/component/base_card";
import { askGPT } from "./service/ai/chat_gpt_client";

import {
  storeData,
  retrieveAllData,
} from "./service/storage/storage_interface";

chrome.runtime.onInstalled.addListener(function () {});

chrome.runtime.onMessage.addListener(function (
  message: WordMessage,
  sender,
  sendResponse
) {
  console.log("message =>", message, sender);

  if (message.msgType == "save-word") {
    setTimeout(() => {
      storeData({
        word: message.word,
        translation: message.translation,
        histories: [
          {
            sentence: message.contextSentence,
            source: sender.url,
            timestamp: new Date().getTime(),
          },
        ],
      });
      sendResponse({ farewell: "saved" });
    }, 10);
    return true;
  }
  if (message.msgType == "ai-analyze") {
    setTimeout(async () => {
      const response = await askGPT(message.word);
      sendResponse({ ...response });
    });
    return true;
  }
});
