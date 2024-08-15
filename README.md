# WordLookup 🔍

Ever been stuck on a word while browsing and wished for a quick way to look it up? **WordLookup** is here to save the day! 🚀 This nifty browser extension transforms your browsing into a seamless learning experience, offering instant word definitions, translations, and search results—right at your fingertips.

## ✨ Features That Make You Go "Wow" ✨

- **⚡ Lightning-Fast Definitions**: Just select a word, and *bam*—the meaning pops up instantly.
- **🌍 Instant Translations**: Curious about how a word translates to Sinhala (or other languages)? WordLookup has got you covered.
- **🔍 Google Search Integration**: Get the top search results for your word without leaving your page.
- **🧑‍💻 Sleek & Simple Interface**: A clean, intuitive design that blends seamlessly with your browsing experience.

## 🎯 Why You'll Love WordLookup

Whether you're a curious reader, a researcher diving deep, or someone who just loves learning new words, WordLookup turns every webpage into an interactive learning tool. No more copying and pasting into another tab—get what you need without missing a beat!

## 🚀 Getting Started

### 1. Download & Install
- Clone or download this repository to your local machine.
- Open your browser and head over to `chrome://extensions/`.
- Flip the "Developer mode" switch in the top right corner.
- Hit "Load unpacked" and select the folder where you saved WordLookup.

### 2. Use It Like a Pro
- **Right-click on any word** on a webpage and select "Lookup" from the context menu.
- **Check out the popup** by clicking the WordLookup icon in your browser's toolbar. Enter a word, hit "Lookup," and see the magic unfold!

## ⚙️ Fine-Tuning Your Experience

### Set Up Your API Keys
To make WordLookup run like a well-oiled machine, you’ll need to configure your API keys in `config.js`. Here’s what you’ll need:

- **Google Custom Search API**: Pop your `GOOGLE_SEARCH_KEY` and `SEARCH_ENGINE_ID` in there.

### File Breakdown
- **`popup.html`**: The stylish front-end for your extension’s popup.
- **`popup.js`**: The brains behind the operation—fetching and displaying all the cool stuff.
- **`content.js`**: Captures selected text and mouse position to serve up results with precision.
- **`config.js`**: Your hub for API keys and essential configurations.
- **`styles/style.css`**: Adds a touch of flair to the extension’s interface.

## 🌈 Contribute & Collaborate

Have ideas to make WordLookup even better? Dive in! Fork this repository, submit issues, and create pull requests. Your creativity and input are always welcome!

## 📜 License

Released under the MIT License—so feel free to build, tweak, and share!

## 🎉 Shout-Outs

- **[Dictionary API](https://dictionaryapi.dev/)** for being the go-to source for definitions.
- **[MyMemory Translation API](https://mymemory.translated.net/)** for making translations a breeze.
- **[Google Custom Search API](https://developers.google.com/custom-search)** for powering up the search results.

![Screenshot 2024-08-15 090359](https://github.com/user-attachments/assets/26a4550f-5bf1-40ab-bbee-08b7bc626504)
