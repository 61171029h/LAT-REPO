'use strict';
const line = require('@line/bot-sdk'),
<<<<<<< HEAD
  express = require('express'),
  configGet = require('config');
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

//Line config
const configLine = {
  channelAccessToken: configGet.get("CHANNEL_ACCESS_TOKEN"),
  channelSecret: configGet.get("CHANNEL_SECRET")
=======
      express = require('express'),
      configGet = require('config');
const {TextAnalyticsClient, AzureKeyCredential} = require("@azure/ai-text-analytics");

//Line config
const configLine = {
  channelAccessToken:configGet.get("CHANNEL_ACCESS_TOKEN"),
  channelSecret:configGet.get("CHANNEL_SECRET")
>>>>>>> 0ecbb17fd45e0def31172ecaae0b8a2b6c7a8a2e
};

//Azure Text Sentiment
const endpoint = configGet.get("ENDPOINT");
const apiKey = configGet.get("TEXT_ANALYTICS_API_KEY");

const client = new line.Client(configLine);
const app = express();

const port = process.env.PORT || process.env.port || 3001;

<<<<<<< HEAD
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

async function MS_TextSentimentAnalysis(thisEvent) {
  console.log("[MS_TextSentimentAnalysis] in");
  const analyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));
  let documents = [];
  documents.push(thisEvent.message.text);
  const results = await analyticsClient.analyzeSentiment(documents, "zh-Hant", { includeOpinionMining: true });
  console.log("[results] ", JSON.stringify(results));


  let maxSentiment = null;
  let maxConfidence = 0;


  for (const result of results) {
    const sentiment = result.sentiment;
    const confidence = result.confidenceScores[sentiment];

    if (confidence > maxConfidence) {
      maxSentiment = sentiment;
      maxConfidence = confidence;
    }
  }

  let myResult = '';
  if (maxSentiment === 'positive') {
    myResult = `positive:D，%${maxConfidence}`;
  } else if (maxSentiment === 'negative') {
    myResult = `negative:(，%${maxConfidence}`;
  } else if (maxSentiment === 'neutral') {
    myResult = `neutral:|，%${maxConfidence}`;
  }


  if (results[0].sentences[0].opinions && results[0].sentences[0].opinions.length > 0) {
    const opinion = results[0].sentences[0].opinions[0];
    if (opinion.target) {
      const targetText = opinion.target.text;
      myResult = `${myResult}，${targetText}`;
    }
  }
  
  console.log(myResult);

  const echo = {

    type: 'text',
    text: myResult  
  };
  
  return client.replyMessage(thisEvent.replyToken, echo);
}

app.post('/callback', line.middleware(configLine), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
=======
app.listen(port, ()=>{
  console.log(`listening on ${port}`);
   
});

async function MS_TextSentimentAnalysis(thisEvent){
    console.log("[MS_TextSentimentAnalysis] in");
    const analyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));
    let documents = [];
    documents.push(thisEvent.message.text);
    // documents.push("我覺得櫃檯人員很親切");
    // documents.push("熱水都不熱，爛死了，很生氣！");
    // documents.push("房間陳設一般般");
    const results = await analyticsClient.analyzeSentiment(documents);
    console.log("[results] ", JSON.stringify(results));

    const echo = {
      type: 'text',
      text: results[0].sentiment
    };
    return client.replyMessage(thisEvent.replyToken, echo);


}

app.post('/callback', line.middleware(configLine),(req, res)=>{
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result)=>res.json(result))
    .catch((err)=>{
>>>>>>> 0ecbb17fd45e0def31172ecaae0b8a2b6c7a8a2e
      console.error(err);
      res.status(500).end();
    });
});

<<<<<<< HEAD
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
=======
function handleEvent(event){
  if(event.type !== 'message' || event.message.type !== 'text'){
>>>>>>> 0ecbb17fd45e0def31172ecaae0b8a2b6c7a8a2e
    return Promise.resolve(null);
  }

  MS_TextSentimentAnalysis(event)
<<<<<<< HEAD
  .catch((err)=>{
    console.error("Error:",err);
  });  
=======
    .catch((err) => {
      console.error("Error:", err);
    }); 
>>>>>>> 0ecbb17fd45e0def31172ecaae0b8a2b6c7a8a2e
}