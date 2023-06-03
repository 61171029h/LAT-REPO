'use strict';
const axios = require('axios');
const configGet = require('config');

async function saveLanguageToServer(language) {
    let newData = {
        "targetLanguage": language
    };

    let axios_add_data = {
        method: "post",
        url:"https://huiwen-json-server-05100000.azurewebsites.net/reviews",
        headers: {
            "content-type": "application/json"
        },
        data: newData
    };

    axios(axios_add_data)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function () {
            console.log("Error!!");
        });
}

// Example usage
const analyzeButton = document.getElementById("analyzeButton");
const translateLanguage = document.getElementById("translateLanguage");

analyzeButton.addEventListener("click", function () {
    const selectedLanguage = translateLanguage.value;
    saveLanguageToServer(selectedLanguage);
});