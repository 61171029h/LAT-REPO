'use strict';
// 從網頁中獲取值
const translateLanguageElement = document.getElementById("translateLanguage");

analyzeButton.addEventListener("click", function() {
  const selectedLanguage = translateLanguageElement.value;
  sendSelectedLanguage(selectedLanguage); // Send the selected language to the server
});

function sendSelectedLanguage(selectedLanguage) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/your-endpoint", true); // Replace "/your-endpoint" with your actual server endpoint
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log("Language selection sent successfully");
      } else {
        console.error("Failed to send language selection");
      }
    }
  };

  const data = JSON.stringify({ language: selectedLanguage });
  xhr.send(data);
}

async function MS_TextSentimentAnalysis(inputText) {
  console.log("[MS_TextSentimentAnalysis] in");
  const analyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));
  let documents = [];
  documents.push(inputText);
  const results = await analyticsClient.analyzeSentiment(documents);
  console.log("[results] ", JSON.stringify(results));

  console.log("Sentiment:", results[0].sentiment);
}



