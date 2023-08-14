import ReactDOM from "react-dom/client";

import React, { useEffect, useState } from "react";

import { speak } from "../service/tts";
import { WordRecord } from "../service/storage/storage_interface";

function App() {
  const [record, setRecord] = useState("");
  const [records, setRecords] = useState<Array<WordRecord>>();

  return <div>hello extension</div>;
}

const root = document.createElement("div");
root.className = "container";
document.body.appendChild(root);
const rootDiv = ReactDOM.createRoot(root);

rootDiv.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
