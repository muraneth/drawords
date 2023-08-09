import * as utils from "../utils";
import React from "react";
import {
  UserEventType,
  getClientX,
  getClientY,
  getPageX,
  getPageY,
} from "../utils/user_events";
import { createRoot, Root } from "react-dom/client";
import {
  getContainer,
  popupCardID,
  popupThumbID,
  queryInjectCardElement,
  queryInjectThumbElement,
} from "./utils";
import { WordSelected } from "../utils/types";
import { Translator } from "../component/translator";

const popupCardOffset = 7;
let root: Root | null = null;

async function popupThumbClickHandler(event: UserEventType) {
  event.stopPropagation();
  event.preventDefault();
  const $popupThumb: HTMLDivElement | null = await queryInjectThumbElement();
  if (!$popupThumb) {
    return;
  }
  showPopupCard(
    {
      word: $popupThumb.dataset["word"] || "",
      contextSentence: $popupThumb.dataset["contextSentence"] || "",
    } as WordSelected,
    getPageX(event) + popupCardOffset,
    getPageY(event) + popupCardOffset
  );
}

async function showPopupThumb(
  wordSelected: WordSelected,
  x: number,
  y: number
) {
  if (!wordSelected || !wordSelected.word) {
    return;
  }

  let $popupThumb: HTMLDivElement | null = await queryInjectThumbElement();
  if (!$popupThumb) {
    $popupThumb = document.createElement("div");
    $popupThumb.id = popupThumbID;
    $popupThumb.style.position = "absolute";
    $popupThumb.style.padding = "2px";
    $popupThumb.style.borderRadius = "4px";
    $popupThumb.style.boxShadow = "0 0 4px rgba(0,0,0,.2)";
    $popupThumb.style.cursor = "pointer";
    $popupThumb.style.userSelect = "none";
    $popupThumb.style.width = "20px";
    $popupThumb.style.height = "20px";
    $popupThumb.style.overflow = "hidden";
    $popupThumb.addEventListener("click", popupThumbClickHandler);
    $popupThumb.addEventListener("touchend", popupThumbClickHandler);
    $popupThumb.addEventListener("mousemove", (event) => {
      event.stopPropagation();
    });
    $popupThumb.addEventListener("touchmove", (event) => {
      event.stopPropagation();
    });
    const $img = document.createElement("img");
    $img.src = chrome.runtime.getURL("icon48.png");
    $img.style.display = "block";
    $img.style.width = "100%";
    $img.style.height = "100%";
    $popupThumb.appendChild($img);
    const $container = await getContainer();
    $container.shadowRoot?.querySelector("div")?.appendChild($popupThumb);
  }
  $popupThumb.dataset["word"] = wordSelected.word;
  $popupThumb.dataset["contextSentence"] = wordSelected.contextSentence;
  $popupThumb.style.visibility = "visible";
  $popupThumb.style.opacity = "100";
  $popupThumb.style.left = `${x}px`;
  $popupThumb.style.top = `${y}px`;
}

async function hidePopupCard() {
  const $popupCard: HTMLDivElement | null = await queryInjectCardElement();
  if (!$popupCard) {
    return;
  }
  speechSynthesis.cancel();
  if (root) {
    root.unmount();
    root = null;
  }
  removeContainer();
}
async function removeContainer() {
  const $container = await getContainer();
  $container.remove();
}

async function hidePopupThumb() {
  const $popupThumb: HTMLDivElement | null = await queryInjectThumbElement();
  if (!$popupThumb) {
    return;
  }
  $popupThumb.style.visibility = "hidden";
}
async function createPopupCard() {
  const $popupCard = document.createElement("div");
  $popupCard.id = popupCardID;
  const $container = await getContainer();
  $container.shadowRoot?.querySelector("div")?.appendChild($popupCard);

  return $popupCard;
}
async function showPopupCard(wordSelected: WordSelected, x: number, y: number) {
  const $popupThumb: HTMLDivElement | null = await queryInjectThumbElement();
  if ($popupThumb) {
    $popupThumb.style.visibility = "hidden";
  }
  console.log("showPopupCard", wordSelected);

  const $popupCard =
    (await queryInjectCardElement()) ?? (await createPopupCard());
  $popupCard.style.position = "absolute";
  $popupCard.style.padding = "2px";
  $popupCard.style.visibility = "visible";
  $popupCard.style.opacity = "100";
  $popupCard.style.left = `${x}px`;
  $popupCard.style.top = `${y}px`;

  const settings = await utils.getSettings();

  root = createRoot($popupCard);

  root.render(
    <React.StrictMode>
      <Translator {...wordSelected} />
    </React.StrictMode>
  );
}

function getRelatedSentence(selection: Selection) {
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    // Do something with the range
    const container = range.commonAncestorContainer; // Get the common ancestor container of the selection

    // Determine the node containing the sentence (either a parent element or the text node's parent element)
    const sentenceNode =
      container.nodeType === Node.TEXT_NODE
        ? container.parentElement
        : container;

    return sentenceNode.textContent;
  } else {
    console.log("No selection or range found.");
  }
}
async function main() {
  console.log("===============>injected");
  const browser = chrome;
  let mousedownTarget: EventTarget | null;
  let lastMouseEvent: UserEventType | undefined;

  const mouseUpHandler = async (event: UserEventType) => {
    lastMouseEvent = event;
    const settings = await utils.getSettings();
    if (
      (mousedownTarget instanceof HTMLInputElement ||
        mousedownTarget instanceof HTMLTextAreaElement) &&
      settings.selectInputElementsText === false
    ) {
      return;
    }
    window.setTimeout(async () => {
      const sel = window.getSelection();
      let text = (sel?.toString() ?? "").trim();

      if (text) {
        let contextSentence = getRelatedSentence(sel);

        if (settings.autoTranslate === true) {
          const x = getClientX(event);
          const y = getClientY(event);
          showPopupCard(
            { word: text, contextSentence: contextSentence } as WordSelected,
            getPageX(event) + popupCardOffset,
            getPageY(event) + popupCardOffset
          );
        } else if (settings.alwaysShowIcons === true) {
          showPopupThumb(
            { word: text, contextSentence: contextSentence } as WordSelected,
            getPageX(event) + popupCardOffset,
            getPageY(event) + popupCardOffset
          );
        }
      }
    });
  };

  document.addEventListener("mouseup", mouseUpHandler);
  document.addEventListener("touchend", mouseUpHandler);

  // browser.runtime.onMessage.addListener(function (request) {
  //   if (request.type === "open-translator") {
  //     if (window !== window.top) return;
  //     const text = request.info.selectionText ?? "";
  //     const x = lastMouseEvent ? getClientX(lastMouseEvent) : 0;
  //     const y = lastMouseEvent ? getClientY(lastMouseEvent) : 0;
  //     showPopupCard(text, x + popupCardOffset, y + popupCardOffset);
  //   }
  // });

  const mouseDownHandler = async (event: UserEventType) => {
    mousedownTarget = event.target;
    const settings = await utils.getSettings();
    hidePopupThumb();
    if (!settings.pinned) {
      hidePopupCard();
    }
  };
  document.addEventListener("mousedown", mouseDownHandler);
  document.addEventListener("touchstart", mouseDownHandler);
}

main();
