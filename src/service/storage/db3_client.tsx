import { DocumentData } from "db3.js/dist/client/base";

import {
  createClient,
  createFromPrivateKey,
  syncAccountNonce,
  getCollection,
  addDoc,
  deleteDoc,
  queryDoc,
  updateDoc,
} from "db3.js";

let clientIns;
let wordListCollection;

async function initDB() {
  if (!wordListCollection) {
    clientIns = createClient(
      "https://zksync.rollup.testnet.db3.network",
      "https://zksync.index.testnet.db3.network",
      createFromPrivateKey(
        "0xdc6f560254643be3b4e90a6ba85138017aadd78639fbbb43c57669067c3bbe76"
      )
    );

    await syncAccountNonce(clientIns);

    const db_addr = "0x532317af13cd87811b50eb7640feb7f60afbe1e5";
    wordListCollection = await getCollection(db_addr, "WordList", clientIns);
  }
}

export async function addToWordList(
  doc: DocumentData
): Promise<{ id: string }> {
  console.log("addToWordList", doc);

  await initDB();

  const res = await addDoc(wordListCollection, doc);
  return { id: res.id };
}

export async function updateWord(id: string, doc: DocumentData) {
  await initDB();
  updateDoc(wordListCollection, id, doc);
}

export async function deleteWord(ids: string[]) {
  await initDB();
  deleteDoc(wordListCollection, ids);
}

export async function getAllData(): Promise<Array<DocumentData>> {
  await initDB();
  const query = `/*`;
  return queryData(query);
}

export async function getDataByState(
  state: string
): Promise<Array<DocumentData>> {
  await initDB();
  return queryData(`/[state=${state}]`);
}

export async function getDataByWord(word: string): Promise<DocumentData> {
  await initDB();
  const words = await queryData(`/[word=${word}]`);
  if (words && words.length > 0) {
    return words[0];
  }
  return;
}

async function queryData(query): Promise<Array<DocumentData>> {
  try {
    const result = await queryDoc(wordListCollection, query);
    const documents = result.docs.map((element) => {
      let el = element.doc as DocumentData;
      return { ...el, id: element.id };
    });
    return documents;
  } catch (error) {
    console.error("Error querying data:", error);
    return;
  }
}
