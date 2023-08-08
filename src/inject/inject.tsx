console.log("injected");

document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("selectionchange", handleSelectionChange);

function handleMouseUp(event) {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    removeTrans();
    createIconCard(event.pageX, event.pageY, selectedText);
  } else {
    removeTrans();
  }
}

function handleSelectionChange() {
  if (!window.getSelection().toString().trim()) {
    removeTrans();
    removeTranscard();
  }
}

function removeTrans() {
  const existingDiv = document.getElementById("mux-trans");
  if (existingDiv) existingDiv.remove();
}
function removeTranscard() {
  const existingDiv = document.getElementById("mux-trans-card");
  if (existingDiv) existingDiv.remove();
}

function createIconCard(x, y, word) {
  const div = document.createElement("div");
  div.id = "mux-trans";
  Object.assign(div.style, {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
  });

  const iconDiv = document.createElement("div");
  Object.assign(iconDiv.style, {
    backgroundSize: "24px",
    height: "24px",
    width: "24px",
    zIndex: "9999",
    cursor: "pointer",
    backgroundImage: `url(${chrome.runtime.getURL("icon48.png")})`,
  });

  div.appendChild(iconDiv);
  document.body.appendChild(div);

  iconDiv.addEventListener("click", function () {
    console.log("click");
    translateWord(word, (translation) => {
      removeTrans();
      createTranslationCard(x, y, word, translation);
    });
  });
}

function createTranslationCard(x, y, word, translation) {
  const div = document.createElement("div");
  div.id = "mux-trans-card";
  Object.assign(div.style, {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    border: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "white",
    zIndex: "9999",
  });
  div.innerText = `Original: ${word}\nTranslation: ${translation}`;
  document.body.appendChild(div);
}

function translateWord(word, callback) {
  const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&hl=en-US&dt=t&dt=bd&dj=1&source=icon&tk=275688.275688&q=${word}`;

  fetch(apiUrl, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.text && data.text.length) {
        callback(data.text[0]);
      } else {
        callback("Translation not available");
      }
    })
    .catch((error) => {
      console.error("Translation error:", error);
      callback("Translation error");
    });
}
