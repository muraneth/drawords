import PouchDB from "pouchdb";

export interface WordRecord {
  _id: string;
  _rev: string;
  word: string;
  saveCount: number;
}

export interface WordHistory {
  _id: string;
  _rev: string;
  sentene: string;
  source: string;
  timestamp: number;
}

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

  const queryWord = async (word: string) => {
    return await wordListDB.get(word);
  };

  const addWord = async (word: string) => {
    try {
      const doc = await wordListDB.get(word);
      console.log("add word", doc);

      await wordListDB.put({
        _id: word,
        _rev: doc._rev,
        saveCount: doc["saveCount"] ? doc["saveCount"] + 1 : 1,
      });
    } catch (error) {
      if (error.name === "not_found") {
        await wordListDB.put({
          _id: word,
          saveCount: 1,
        });
      } else {
        console.error("Error adding word:", error);
      }
    }
  };

  const updateWord = async (word: WordRecord) => {
    try {
      await wordListDB.put(word);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  const deleteWord = async (word: WordRecord) => {
    try {
      await wordListDB.put({ ...word, _deleted: true });
    } catch (error) {
      console.error("Error updating todo:", error);
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
