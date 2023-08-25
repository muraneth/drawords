import styled from "styled-components";
import {
  RxSpeakerLoud,
  RxHeart,
  RxHeartFilled,
  RxActivityLog,
} from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { speak } from "../../service/tts";
import { GoogleResponse } from "./google_trans";
import { GPTResponse } from "../../service/ai/chat_gpt_client";

const TranslatorCard = styled.div`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  z-index: 1201 !important;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: rgb(187, 187, 187) rgb(187, 187, 187) rgb(168, 168, 168);
  padding: 16px;
`;
const BubbleContent = styled.div`
  color: #252525;
  font-family: "Roboto", arial, sans-serif;
  display: inline;
  font-size: 18px;
  margin: 5px auto;
  padding: 5px 0;
`;

const SaveBotton = styled.button`
  backgrount: #333;
  border-radius: 2px;
  :hover {
    backgrount: #666;
  }
`;
export type MsgType = "save-word" | "ai-analyze";
export interface WordMessage {
  msgType: MsgType;
  word: string;
  contextSentence: string;
  translation?: string;
}

function TranslatorCardBasic({ word, google_trans, context }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [aiResponse, setAiResponse] = useState<GPTResponse>();

  const [savedFields, setSavedFields] = useState([]);

  const topSpeakRef = useRef<() => void>(() => null);

  useEffect(() => {
    return () => {
      topSpeakRef.current();
    };
  }, []);

  const handleSpeakAction = async () => {
    if (isSpeaking) {
      // this will call stopSpeak to stop speaking
      topSpeakRef.current();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const { stopSpeak } = await speak({
        text: word,
        lang: "en-US",
        onFinish: () => setIsSpeaking(false),
      });
      topSpeakRef.current = stopSpeak;
    }
  };

  function handleSave(item: string): void {
    setSavedFields((prevFields) => [...prevFields, item]);

    chrome.runtime.sendMessage(
      {
        word: item,
        contextSentence: context,
        msgType: "save-word",
        translation: google_trans,
      } as WordMessage,
      (r) => {
        console.log("message response", r);
      }
    );
  }
  function aiAnalyze() {
    if (analyzed) {
      console.log("anylyzed ");

      return;
    }

    setAnalyzed(true);
    chrome.runtime.sendMessage(
      {
        word: word,
        contextSentence: context,
        msgType: "ai-analyze",
      } as WordMessage,
      (r: GPTResponse) => {
        console.log("message response", r);
        setAiResponse(r);
      }
    );
  }

  return (
    <TranslatorCard>
      <BubbleContent>
        <strong>Original:</strong> {word}
        <div onClick={handleSpeakAction}>
          <RxSpeakerLoud size={20} />
        </div>
        {savedFields.includes(word) ? (
          <RxHeartFilled />
        ) : (
          <RxHeart onClick={() => handleSave(word)} />
        )}
        <strong>Translation:</strong> {google_trans}
      </BubbleContent>
      <RxActivityLog onClick={aiAnalyze} />
      {aiResponse &&
        Object.keys(aiResponse).map((field, index) => (
          <li key={index}>
            <strong>{field}:</strong> {aiResponse[field]}
            {savedFields.includes(field) ? (
              <RxHeartFilled />
            ) : (
              <RxHeart onClick={() => handleSave(field)} />
            )}
          </li>
        ))}
    </TranslatorCard>
  );
}

export default TranslatorCardBasic;
