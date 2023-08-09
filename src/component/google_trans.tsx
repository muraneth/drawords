export interface DictionaryEntry {
  pos: string;
  terms: string[];
}

export interface Sentence {
  trans: string;
  orig: string;
  backend: number;
}

export interface GoogleResponse {
  sentences: Sentence[];
  dict?: DictionaryEntry[];
  spell?: {}; // This remains as an empty object since no structure was provided.
  src?: string;
}

export function translateWord(
  word: string,
  callback: (result: GoogleResponse | undefined) => void
) {
  const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&hl=en-US&dt=t&dt=bd&dj=1&source=icon&tk=275688.275688&q=${word}`;

  fetch(apiUrl, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.dict) {
        let result: GoogleResponse = {
          dict: data.dict.map((dictEntry: any) => ({
            pos: dictEntry.pos,
            terms: dictEntry.terms,
          })),
          sentences: data.sentences.map((sentence: any) => ({
            trans: sentence.trans,
            orig: sentence.orig,
            backend: sentence.backend,
          })),
          spell: data.spell || {},
          src: data.src,
        };
        callback(result);
      } else if (data.sentences) {
        let result: GoogleResponse = {
          sentences: data.sentences.map((sentence: any) => ({
            trans: sentence.trans,
            orig: sentence.orig,
            backend: sentence.backend,
          })),
          spell: data.spell || {},
          src: data.src,
        };
        callback(result);
      }
    })
    .catch((error) => {
      console.error("Translation error:", error);
    });
}
