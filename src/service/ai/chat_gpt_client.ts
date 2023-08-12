import { Configuration, OpenAIApi } from "openai";


export type GPTResponse = {
    [field: string]: string;
};




export async function askGPT(word: string): Promise<GPTResponse | undefined> {
    const openAiKey = await getOpenAiKey();


    if (!openAiKey) {
        return Promise.reject();
    }

    // set English lever
    const msg = `
        
You are English teacher, please pick up 6 very important or high level  phrases  and words for college student (avoid simple words) from the sentence "${word}" Anwser CN translate in k-v json {word: translation}`;

    console.log(openAiKey, msg);
    const body = {
        stream: false,
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: msg }],
    };
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${openAiKey}`,
        },
        body: JSON.stringify(body),
    });

    if (response.status !== 200) {
        console.error(response.body);
        chrome.notifications.create(
            "TextGenerationError",
            {
                type: 'basic',
                iconUrl: "./icons/32.png",
                title: 'Error',
                message: JSON.stringify(response.body),
                priority: 2,
            }
        );
        return Promise.reject();
    }

    const responseJSON = await response.json();
    const ct = responseJSON?.choices[0].message?.content;
    const re = JSON.parse(ct!) as GPTResponse;

    return re;
}



async function getOpenAiKey(): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        resolve("sk-");
    })
}


