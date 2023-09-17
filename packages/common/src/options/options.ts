import browser from 'webextension-polyfill';
import { OPTION_TYPE, OptionPreference, OptionType } from './types';
import { BACKGROUND_EVENT, refreshOptions } from '../background';

const getOptionElements = () => ({
  [OPTION_TYPE.SHOW_FAVICONS]: document.querySelector<HTMLInputElement>('#favicons'),
  [OPTION_TYPE.SHOW_TABS_LABEL]: document.querySelector<HTMLInputElement>('#show-tabs-label'),
})

function onError(error: Error) {
  console.log(`Error: ${error}`);
}

function saveOptions(e: Event) {
  e.preventDefault();

  const optionElements = getOptionElements()

  browser.storage.sync.set({
    [OPTION_TYPE.SHOW_FAVICONS]: optionElements[OPTION_TYPE.SHOW_FAVICONS]?.checked,
    [OPTION_TYPE.SHOW_TABS_LABEL]: optionElements[OPTION_TYPE.SHOW_TABS_LABEL]?.checked,
  });

  browser.runtime.sendMessage({ type: BACKGROUND_EVENT.REFRESH_OPTIONS });
}

const createSetBooleanOption = (result: OptionPreference) => (optionType: OptionType, defaultValue = false) => {
  const optionElements = getOptionElements()
  const optionElement = optionElements[optionType]

  if (optionElement) {
    optionElement.checked = result[optionType] || defaultValue
  }
}

const defaultInitOptionValues = {
  [OPTION_TYPE.SHOW_FAVICONS]: true,
  [OPTION_TYPE.SHOW_TABS_LABEL]: true,
}

export const setupOptionsAfterInstall = () => {
  const mergeOptions = async (prevOptions: Partial<OptionPreference>) => {
    await browser.storage.sync.set({
      ...defaultInitOptionValues,
      ...prevOptions
    })

    refreshOptions()
  }

  const getting = browser.storage.sync.get() as Promise<OptionPreference>; // Is there a better typing?
  getting.then(mergeOptions, onError);
}

function hydrateOptionsPage() {
  function setCurrentPreferences(result: OptionPreference) {
    const setBooleanOption = createSetBooleanOption(result)

    setBooleanOption(OPTION_TYPE.SHOW_FAVICONS)
    setBooleanOption(OPTION_TYPE.SHOW_TABS_LABEL)
  }

  const getting = browser.storage.sync.get([
    OPTION_TYPE.SHOW_FAVICONS,
    OPTION_TYPE.SHOW_TABS_LABEL
  ]) as Promise<OptionPreference>; // Is there a better typing?
  getting.then(setCurrentPreferences, onError);
}

document.addEventListener('DOMContentLoaded', () => {
  hydrateOptionsPage()
  document.getElementById("options-form")?.addEventListener('submit', saveOptions);
});