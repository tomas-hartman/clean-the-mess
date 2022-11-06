function saveOptions(e) {
  e.preventDefault();

  browser.storage.sync.set({
    showFavicons: document.querySelector('#favicons').checked,
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector('#favicons').checked = result.showFavicons || false;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  const getting = browser.storage.sync.get('showFavicons');
  getting.then(setCurrentChoice, onError);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
