import PouchDB from "pouchdb";
import { WordRecord } from "./storage_interface";

const wordListDB = new PouchDB("wordslist");
const historyDB = new PouchDB("wordshistory");

// this.remote = "http://127.0.0.1:5984/drawords";
// let options = {
//   live: true,
//   retry: true,
//   continuous: true,
// };
// this.db.sync(this.remote, options);
const useLocalStorage = () => {
  const getAllWords = async (): Promise<Array<WordRecord> | undefined> => {
    const result = await wordListDB.allDocs({ include_docs: true });
    if (result && result.total_rows > 0) {
      return result.rows.map((item) => {
        return {
          _id: item.doc._id,
          _rev: item.doc._rev,
          word: item.doc._id,
          saveCount: item.doc["saveCount"],
        } as WordRecord;
      });
    }

    return;
  };

  const queryWord = async (word: string): Promise<WordRecord | undefined> => {
    try {
      const result = await wordListDB.get(word);
      if (result) {
        return { ...result } as WordRecord;
      }
    } catch (e) {
      console.log("local not found", e);
      return;
    }
  };

  const addWord = async (
    wordRecord: WordRecord
  ): Promise<{ _id: string; _rev: string; saveCount: number }> => {
    if (!wordRecord._id) wordRecord._id = wordRecord.word;

    try {
      const doc = await wordListDB.get(wordRecord._id);
      console.log("add word", doc);
      const d = {
        _id: wordRecord._id,
        _rev: doc._rev,
        saveCount: doc["saveCount"] ? doc["saveCount"] + 1 : 1,
      };

      const re = await wordListDB.put(d);
      return { _id: re.id, _rev: re.rev, saveCount: d.saveCount };
    } catch (error) {
      if (error.name === "not_found") {
        const re = await wordListDB.put({
          _id: wordRecord._id,
          saveCount: 1,
        });
        return { _id: re.id, _rev: re.rev, saveCount: 1 };
      } else {
        console.error("Error adding word:", error);
        return;
      }
    }
  };

  const updateWord = async (word: WordRecord): Promise<boolean> => {
    console.log("updateWord local", word);

    try {
      if (!word._id) word._id = word.word;
      await wordListDB.put(word);
      return true;
    } catch (error) {
      console.error("Error updating :", error);
      return false;
    }
  };
  const deleteWord = async (word: WordRecord): Promise<boolean> => {
    if (!word._id) word._id = word.word;

    try {
      await wordListDB.put(word);
      return true;
    } catch (error) {
      console.error("Error updating todo:", error);
      return false;
    }
  };

  return {
    getAllWords,
    queryWord,
    addWord,
    updateWord,
    deleteWord,
  };
};

export default useLocalStorage;
