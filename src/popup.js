chrome.storage.local.get(["translatedWord"], function (result) {
  if (result.translatedWord) {
    document.getElementById("translation").textContent = result.translatedWord;
  }
});
