import browser from 'webextension-polyfill';

function saveOptions(e: Event) {
  e.preventDefault();

  browser.storage.sync.set({
    showFavicons: document.querySelector<HTMLInputElement>('#favicons')?.checked,
  });
}

function restoreOptions() {
  // TODO: improve typing
  function setCurrentChoice(result: Record<string, boolean>) {
    const element = document.querySelector<HTMLInputElement>('#favicons')
    
    if(element) {
      element.checked = result.showFavicons || false;
    }
  }

  function onError(error: Error) {
    console.log(`Error: ${error}`);
  }

  const getting = browser.storage.sync.get('showFavicons');
  getting.then(setCurrentChoice, onError);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form')?.addEventListener('submit', saveOptions);
