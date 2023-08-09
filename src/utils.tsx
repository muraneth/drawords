import { ISettings } from "./utils/types";
export const defaultAPIURL = "https://api.openai.com";
export const defaultAPIURLPath = "/v1/chat/completions";
export const defaultProvider = "OpenAI";
export const defaultAPIModel = "gpt-3.5-turbo";

export const defaultChatGPTAPIAuthSession =
  "https://chat.openai.com/api/auth/session";
export const defaultChatGPTWebAPI = "https://chat.openai.com/backend-api";

export const defaultAutoTranslate = false;
export const defaultTargetLanguage = "zh-Hans";
export const defaultSelectInputElementsText = true;
export const defaulti18n = "en";

export async function getApiKey(): Promise<string> {
  const settings = await getSettings();
  const apiKeys = (settings.apiKeys ?? "").split(",").map((s) => s.trim());
  return apiKeys[Math.floor(Math.random() * apiKeys.length)] ?? "";
}
const settingKeys: Record<keyof ISettings, number> = {
  apiKeys: 1,
  apiURL: 1,
  apiURLPath: 1,
  apiModel: 1,
  provider: 1,
  autoTranslate: 1,
  defaultTranslateMode: 1,
  defaultTargetLanguage: 1,
  alwaysShowIcons: 1,
  hotkey: 1,
  ocrHotkey: 1,
  themeType: 1,
  i18n: 1,
  tts: 1,
  restorePreviousPosition: 1,
  runAtStartup: 1,
  selectInputElementsText: 1,
  disableCollectingStatistics: 1,
  allowUsingClipboardWhenSelectedTextNotAvailable: 1,
  pinned: 1,
  autoCollect: 1,
};
export async function getSettings(): Promise<ISettings> {
  const browser = chrome;
  const items = await browser.storage.sync.get(Object.keys(settingKeys));

  const settings = items as ISettings;
  if (!settings.apiKeys) {
    settings.apiKeys = "";
  }
  if (!settings.apiURL) {
    settings.apiURL = defaultAPIURL;
  }
  if (!settings.apiURLPath) {
    settings.apiURLPath = defaultAPIURLPath;
  }
  if (!settings.apiModel) {
    settings.apiModel = defaultAPIModel;
  }
  if (!settings.provider) {
    settings.provider = defaultProvider;
  }
  if (settings.autoTranslate === undefined || settings.autoTranslate === null) {
    settings.autoTranslate = defaultAutoTranslate;
  }
  if (!settings.defaultTranslateMode) {
    settings.defaultTranslateMode = "translate";
  }
  if (!settings.defaultTargetLanguage) {
    settings.defaultTargetLanguage = defaultTargetLanguage;
  }
  if (
    settings.alwaysShowIcons === undefined ||
    settings.alwaysShowIcons === null
  ) {
    settings.alwaysShowIcons = true;
  }

  if (!settings.disableCollectingStatistics) {
    settings.disableCollectingStatistics = false;
  }
  if (
    settings.selectInputElementsText === undefined ||
    settings.selectInputElementsText === null
  ) {
    settings.selectInputElementsText = defaultSelectInputElementsText;
  }
  if (!settings.themeType) {
    settings.themeType = "followTheSystem";
  }
  return settings;
}
