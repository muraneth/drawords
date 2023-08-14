import {
  addToWordList as addWordToRemote,
  getDataByWord as getWordRemote,
  getAllData as getAllWordsRemote,
  updateWord as updateWordRemote,
  getDataByState as getDataByStateRemote,
} from "./db3_client";
import useLocalStorage from "./storage_local";

const {
  addWord: addWordToLocal,
  getAllWords: getAllLocalWords,
  updateWord: updateLocal,
  queryWord: queryLocalWord,
  deleteWord: deleteLocalWord,
} = useLocalStorage();

export interface WordRecord {
  //remote id
  id?: string;
  // local id
  _id?: string;
  _rev?: string;
  word: string;
  saveCount?: number;
  translation: string;
  histories?: WordHistory[];
  state?: string;
}

export interface WordHistory {
  sentence: string;
  source: string;
  timestamp: number;
}

export async function storeData(data: WordRecord) {
  const re = await addWordToLocal(data);

  if (re) {
    addWortToRemoteHandle({
      ...data,
      _id: re._id,
      _rev: re._rev,
      saveCount: re.saveCount,
      state: "saved",
    });
  }
}

async function addWortToRemoteHandle(data: WordRecord) {
  const remoteRe = await getWordRemote(data.word);

  //save remote and update local data id
  if (remoteRe) {
    const remoteCount = remoteRe.saveCount;

    if (remoteCount >= data.saveCount) {
      let word = {
        ...remoteRe,
        saveCount: remoteCount + 1,
      } as WordRecord;
      await updateLocal(word);
      await updateWordRemote(data.id, { ...word });
    } else {
      await updateWordRemote(data.id, { ...data });
    }
  } else {
    const res = await addWordToRemote({ ...data });
    updateLocal({ ...data, id: res.id });
  }
}

export async function deleteData(data: WordRecord) {
  console.log("delete data", data);
  if (await deleteLocalWord(data)) deleteFromRemoteIfExist(data.word);
}

async function deleteFromRemoteIfExist(word: string) {
  const re = await getWordRemote(word);
  if (re && re.length > 0) {
    re.map((item) => {
      console.log("deleteFromRemoteIfExist", item);

      updateWordRemote(item.id, { ...item, state: "deleted" });
    });
  }
}

export async function retrieveAllData() {
  // query local data and  return
  const words = await getAllLocalWords();
  // this async function execute independently
  dealRemoteAndLocalSync();

  return words;
}

async function dealRemoteAndLocalSync() {
  try {
    getDataByStateRemote("saved").then((re) => {
      console.log("getDataByStateRemote saved", re);

      //update local storage
      re?.map(async (item) => {
        const localWord = await queryLocalWord(item.word);
        if (!localWord) {
          addWordToLocal({ ...item } as WordRecord);
        }
      });
    });
    getDataByStateRemote("deleted").then((re) => {
      console.log("getDataByStateRemote deleted", re);

      re?.map(async (item) => {
        const localWord = await queryLocalWord(item.word);
        if (localWord) {
          deleteLocalWord(localWord);
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
}
