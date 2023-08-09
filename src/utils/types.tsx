export type Provider = "OpenAI" | "ChatGPT" | "Azure";

export type TranslateMode =
  | "translate"
  | "polishing"
  | "summarize"
  | "analyze"
  | "explain-code"
  | "big-bang";
export type BaseThemeType = "light" | "dark";
export type ThemeType = BaseThemeType | "followTheSystem";
export type TTSProvider = "WebSpeech" | "EdgeTTS";

export interface WordSelected {
  word: string;
  contextSentence: string;
}

export interface ISettings {
  apiKeys: string;
  apiURL: string;
  apiURLPath: string;
  apiModel: string;
  provider: Provider | "OpenAI";
  autoTranslate: boolean;
  defaultTranslateMode: Exclude<TranslateMode, "big-bang"> | "nop";
  defaultTargetLanguage: string;
  alwaysShowIcons: boolean;
  hotkey?: string;
  ocrHotkey?: string;
  themeType?: ThemeType;
  i18n?: string;
  tts?: {
    voices?: {
      lang: string;
      voice: string;
    }[];
    provider?: TTSProvider;
    volume?: number;
    rate?: number;
  };
  restorePreviousPosition?: boolean;
  selectInputElementsText?: boolean;
  runAtStartup?: boolean;
  disableCollectingStatistics?: boolean;
  allowUsingClipboardWhenSelectedTextNotAvailable?: boolean;
  pinned?: boolean;
  autoCollect?: boolean;
}
