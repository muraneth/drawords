import "./App.css";
import React, { useEffect, useState } from "react";

import { LocalStorage, WordRecord } from "./storage/local_storage";
import { useAsyncFn } from "react-use";
import { speak } from "./tts";

function App() {
  const [record, setRecord] = useState("");
  const [records, setRecords] = useState<Array<WordRecord>>();

  const [todoClient, setTodoClient] = useState<LocalStorage>();

  useEffect(() => {
    const cl = new LocalStorage();
    setTodoClient(cl);
  }, []);

  async function getAllRecords() {
    if (todoClient) {
      const res = await todoClient.getLocalWords();
      setRecords(res);
    }
  }

  useEffect(() => {
    console.log(" sssss ", todoClient);
    getAllRecords();
  }, [todoClient]);

  async function save() {
    if (record && record.length > 0 && todoClient) {
      await todoClient.addWord(record);
      getAllRecords();
    }
  }

  const startSpeak = () => {
    speak({ text: record });
  };

  const generatPic = () => {
    const p: string =
      "Imagine a vast crowd of people stretching as far as the eye can see, filling streets, parks, and buildings in a city. A couple of individuals at the foreground are in shock, with their hands on their heads, overwhelmed by the sheer number of people present.";
  };

  return (
    <div>
      <div className="App">Hello drawords</div>
      <></>

      <button onClick={getAllRecords}> get all words </button>
      {records &&
        records.length > 0 &&
        records.map((v: WordRecord) => (
          <div>
            <li>{v._id}</li> <li>{v.saveCount}</li>{" "}
          </div>
        ))}
      <input
        type="text"
        id="name"
        onChange={(e) => setRecord(e.target.value)}
      ></input>

      <button onClick={startSpeak}> speak</button>
      <button onClick={save}>add todo</button>

      <button onClick={generatPic}> generatPic </button>
    </div>
  );
}

export default App;
