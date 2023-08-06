import PouchDB from "pouchdb";

export type WordRecord = {
  _id: string;
  saveCount: number;
  type?: string;
  tags?: [];
  gpt?: Array<GPTResponse>;
  _rev?: string;
};

export type GPTExplaination = {
  sentence: string;
  pic_prompt: string;
  explanation: string;
  similar_words: Array<string>;
};

export type GPTResponse = {
  sentence: string;
  pic_prompt: string;
  explanation: string;
  similar_words: Array<string>;
  pic_url?: string;
  pic_64?: any;
};

export class LocalStorage {
  data: Array<WordRecord>;
  db: PouchDB.Database<{}>;
  remote: any;

  constructor() {
    console.log("construct ");
    this.db = new PouchDB("drawordslist");

    // this.remote = "http://127.0.0.1:5984/drawords";
    // let options = {
    //   live: true,
    //   retry: true,
    //   continuous: true,
    // };
    // this.db.sync(this.remote, options);
  }

  getLocalWords(): Promise<Array<WordRecord>> {
    // if (this.data && this.data.length > 0) {
    //   return Promise.resolve(this.data);
    // }

    return new Promise((resolve) => {
      this.db
        .allDocs({
          include_docs: true,
        })
        .then((result: any) => {
          this.data = [];
          console.log("result", result);

          result.rows.map((row: any) => {
            this.data.push(row.doc);
          });

          return resolve(this.data);
        });
    });
  }

  async addWord(word: string) {
    this.db
      .get(word)
      .then((doc) => {
        this.db.put({
          _id: word,
          _rev: doc._rev,
          saveCount: doc["saveCount"] ? doc["saveCount"] + 1 : 1,
        } as WordRecord);
      })
      .catch(() => {
        this.db.put({
          _id: word,
          saveCount: 1,
        } as WordRecord);
      });
  }

  updateTodo(todo: any) {
    this.db.put(todo).catch((err: any) => {
      console.log(err);
    });
  }

  deleteTodo(todo: any) {
    this.db.remove(todo).catch((err: any) => {
      console.log(err);
    });
  }

  handleChange(change: any) {
    let changedDoc: any = null;
    let changedIndex: any = null;

    this.data.forEach((doc: any, index: any) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });

    //A document was deleted
    if (change.deleted) {
      this.data.splice(changedIndex, 1);
    } else {
      //A document was updated
      if (changedDoc) {
        this.data[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.data.push(change.doc);
      }
    }
  }
}
