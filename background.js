import { GOOGLE_SEARCH_KEY, SEARCH_ENGINE_ID } from './config.js';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'lookup',
    title: 'Lookup "%s"',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }
    console.log('tab:', tab);
    let selectedTxt = info.selectionText;
    chrome.tabs.sendMessage(tab.id, { type: 'getMousePosition' }, (response) => {
      if (response) {
        fetchResults(selectedTxt, tab.id, response.mouseX, response.mouseY);
      }
    });
    console.log('selectedTxt before fetch:', selectedTxt);
  });
});

async function fetchResults(selectedWord, tab, mouseX, mouseY){
  const targetLang = 'si';
  const dicAPI = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`;
  const gSearchAPI = `https://www.googleapis.com/customsearch/v1?q=${selectedWord}&key=${GOOGLE_SEARCH_KEY}&cx=${SEARCH_ENGINE_ID}` ;
  const translationAPI = `https://api.mymemory.translated.net/get?q=${selectedWord}&langpair=en|${targetLang}`;

  try {
    const [dictionaryResp, gSearchResp, translationResp] = await Promise.all([
      fetch(dicAPI).then(response => response.json()),
      fetch(gSearchAPI).then(response => response.json()),
      fetch(translationAPI).then(response => response.json())
    ]);

    const definition = dictionaryResp[0]?.meanings[0]?.definitions[0]?.definition||'No definition found';
    const gResults = gSearchResp.items ? gSearchResp.items.slice(0, 5).map(item => ({ link: item.link })) : [];
    const translation = translationResp.responseData?.translatedText || 'No translation found.';

    const results = {
      word: selectedWord,
      definition,
      gResults,
      translation,
      mouseX,
      mouseY
    }
    console.log('fetchedData:', results);
    chrome.tabs.sendMessage(tab, {type: 'searchResults', data: results});
  } catch (error) {
    console.error('Fetching error: ',error);
    chrome.tabs.sendMessage(tab, {type: 'errorFetching', data: {error: 'Error fetching data, please try again.'}});
  }
}




