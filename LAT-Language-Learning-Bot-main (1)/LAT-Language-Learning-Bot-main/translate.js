export function processTranslate(targetLanguage) {
    var uriBase = "https://api.cognitive.microsofttranslator.com/translate";
    var params = {
        "api-version": "3.0",
        "to": targetLanguage
    };
    //獲取要翻譯的文字
    var sourceTranslateText = $("#imageText").val();

    //發送翻譯要求
    $.ajax({
        url: uriBase + "?" + $.param(params),
        // Request header
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey_translate);
            // 如果不是設置全域，就要加上這一行指定你所選擇的區域
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Region", "eastus");
        },
        type: "POST",
        // Request body
        data: JSON.stringify([{"Text": sourceTranslateText}]),
    })
    .done(function(data) {
        //显示 JSON 内容
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
        //修改下面這一行將翻譯結果顯示於右方
        $("#translateResult").text(data[0].translations[0].text);

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        //丢出錯誤訊息
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
};