export function languageDetection() {
    //確認區域與所選擇的相同或使用客製化端點網址
    var url = "https://ej0qu6.cognitiveservices.azure.com/";
    var uriBase = url + "language/:analyze-text?api-version=2022-05-01";
    
    //顯示分析的圖片
    var sourceText = document.getElementById("imageText").value;

    //送出分析
    $.ajax({
        url: uriBase,

        // Request header
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey_language);
        },

        type: "POST",

        // Request body
        data: `{
            "kind": "LanguageDetection",    
            "parameters": {
                "modelVersion": "latest"
            },
            "analysisInput":{
                "documents":[
                    {
                        "id":"1",
                        "text": "${sourceText}"
                    }
                ]
            }
        }`,
    })
    .done(function(data) {
        // console.log(JSON.stringify(data, null, 2));
        // console.log(data.results.documents[0].detectedLanguage.iso6391Name);
        return data.results.documents[0].detectedLanguage.iso6391Name;
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        //丟出錯誤訊息
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
};