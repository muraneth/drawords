import fs from "node:fs";
import dotenv from "dotenv";
dotenv.config();

const engineId = "stable-diffusion-v1-5";
const apiHost = "https://api.stability.ai";

const apiKey = process.env.STABILITY_KEY;


// Your function that receives the Base64 data
function receiveBase64Data({ word, base64Data }) {
  // Call the function to write to local storage
  chrome.storage.local.set({ word: base64Data }, () => {
    console.log('Data saved to chrome.storage.local');
  });

}

export const generatePic = async ({ word, prompt }) => {
  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/text-to-image`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
          },
        ],
        cfg_scale: 7,
        height: 512,
        width: 512,
        steps: 30,
        samples: 1,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  const responseJSON = await response.json();

  receiveBase64Data({ word: word, base64Data: responseJSON.artifacts[0].base64 });

};
