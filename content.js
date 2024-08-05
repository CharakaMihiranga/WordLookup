(() => {
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousedown', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getMousePosition') {
      sendResponse({ mouseX, mouseY });
    }
  });

  chrome.runtime.onMessage.addListener((req, sender, sendResp) => {
    if (req.type === "searchResults") {
      console.log("Received searchResults from background.js: ", req.data);
      showPopup(req.data);
    } else if (req.type === "errorFetching") {
      console.error("Error fetching data from bg.js: ", req.data.error);
    }
  });

  function showPopup(data) {
    console.log('received data: ', data);

    // Remove existing popup if any
    const existingPopup = document.getElementById("popupContainer");
    if (existingPopup) {
      existingPopup.remove();
    }

    const popupContainer = document.createElement("div");
    popupContainer.id = "popupContainer";
    popupContainer.classList.add("popup-container"); // Add the class for animation

    popupContainer.innerHTML = `
      <div class="translation" id="englishTranslation">
          <div class="language">English</div>
          <div class="wordPronounce">
            <div class="word" id="englishWord">${data.word}</div>
          </div>
      </div>
      <div class="translation" id="sinhalaTranslation">
          <div class="language">Sinhala</div>
          <div class="word" id="sinhalaWord">${data.translation}</div>
      </div>
      <div class="description" id="description">
          ${data.definition}
      </div>
      <div class="results-section" id="resultsSection">
          <div class="results" id="results">
              ${data.gResults
                .map(
                  (result) =>
                    `<div class="result"><a href="${result.link}" target="_blank">${result.link}</a></div>`
                )
                .join("")}
          </div>
      </div>
    `;

    popupContainer.style.position = "absolute";
    popupContainer.style.top = `${data.mouseY}px`;
    popupContainer.style.left = `${data.mouseX + 10}px`;
    popupContainer.style.backgroundColor = "#ffffff";
    popupContainer.style.borderRadius = "8px";
    popupContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    popupContainer.style.maxWidth = "300px";
    popupContainer.style.padding = "20px";
    popupContainer.style.fontFamily = "Poppins, Arial";
    popupContainer.style.color = "#212529"; 
    popupContainer.style.fontSize = "14px";
    popupContainer.style.opacity = "0"; 
    popupContainer.style.transition = "opacity 0.3s ease-in-out"; 

    // Additional styles
    const translations = popupContainer.querySelectorAll('.translation');
    translations.forEach(translation => {
        translation.style.marginBottom = "8px";
    });

    const languageElements = popupContainer.querySelectorAll('.language');
    languageElements.forEach(language => {
        language.style.fontSize = "10px";
        language.style.fontWeight = "500";
        language.style.marginBottom = "5px";
    });

    const wordPronounce = popupContainer.querySelectorAll('.wordPronounce');
    wordPronounce.forEach(word => {
        word.style.display = "flex";
        word.style.alignItems = "center";
    });

    const words = popupContainer.querySelectorAll('.word');
    words.forEach(word => {
        word.style.fontSize = "14px";
        word.style.fontWeight = "600";
    });

    const description = popupContainer.querySelector('#description');
    if (description) {
        description.style.fontSize = "12px";
        description.style.marginBottom = "10px";
        description.style.fontWeight = "600";
    }

    const resultsSection = popupContainer.querySelector('.results-section');
    if (resultsSection) {
        resultsSection.style.marginTop = "10px";
    }

    const results = popupContainer.querySelectorAll('.result');
    results.forEach(result => {
        result.style.backgroundColor = "#e9ecef";
        result.style.borderRadius = "5px";
        result.style.marginBottom = "5px";
        result.style.padding = "10px";
        result.style.fontSize = "12px";
    });

    const resultLinks = popupContainer.querySelectorAll('.result a');
    resultLinks.forEach(link => {
        link.style.color = "#007bff";
        link.style.textDecoration = "none";
    });

    resultLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.textDecoration = "underline";
        });
        link.addEventListener('mouseout', () => {
            link.style.textDecoration = "none";
        });
    });

    document.body.appendChild(popupContainer);

    requestAnimationFrame(() => {
      popupContainer.style.opacity = "1"; 
    });

    
    function handleClickOutside(event) {
      if (!popupContainer.contains(event.target)) {
        popupContainer.style.opacity = "0"; 
        setTimeout(() => {
          popupContainer.remove();
          document.removeEventListener('mousedown', handleClickOutside);
        }, 300); 
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
  }
})();
