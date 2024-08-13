let txtLookup = document.getElementById("txtLookup");
document.getElementById("lookupBtn").onclick = function() {
  fetchResultsForPopupHtml(txtLookup.value);
}

async function fetchResultsForPopupHtml(selectedWord) {
  const targetLang = 'si'; 
  const dicAPI = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`;
  const translationAPI = `https://api.mymemory.translated.net/get?q=${selectedWord}&langpair=en|${targetLang}`;

  try {
    const [dictionaryResp, translationResp] = await Promise.all([
      fetch(dicAPI).then(response => response.json()),
      fetch(translationAPI).then(response => response.json())
    ]);

    const definition = dictionaryResp[0]?.meanings[0]?.definitions[0]?.definition || 'No definition found';
    const translation = translationResp.responseData?.translatedText || 'No translation found.';

    document.getElementById("lookupWord").textContent = selectedWord;
    document.getElementById("sinhalaWord").textContent = translation;
    document.querySelector(".definition p").textContent = definition;
  } catch (error) {
    console.error("Error fetching results:", error);
  }
}
