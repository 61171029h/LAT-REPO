const speaker = new Map([
    ["zh-Hant", "zh-TW-HsiaoChenNeural"],
    ["zh-Hans", "zh-CN-XiaochenNeural"],
    ["en", "en-US-AshleyNeural"],
    ["fr", "fr-FR-JacquelineNeural"],
    ["de", "de-DE-ChristophNeural"],
    ["ja", "ja-JP-MayuNeural"],
    ["ko", "ko-KR-JiMinNeural"],
    ["ru", "ru-RU-DariyaNeural"],
    ["th", "th-TH-PremwadeeNeural"],
    ["vi", "vi-VN-HoaiMyNeural"],
    ["ar", "ar-DZ-IsmaelNeural"],
    ["yue", "yue-CN-XiaoMinNeural"],
]);

export function textToSpeech(text) {
    var uriBase = "https://api.cognitive.microsofttranslator.com/translate";
    var targetLanguage = $('#translateLanguage').val();
    var params = {
        "api-version": "3.0",
        "to": targetLanguage,
    };

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
        data: JSON.stringify([{"Text": text}]),
    })
    .done(function(data) {
        console.log(JSON.stringify(data, null, 2));
        console.log(data[0].detectedLanguage.language);
        var language = data[0].detectedLanguage.language;
        
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey_speech, "eastus");
        speechConfig.speechSynthesisVoiceName = speaker.get(data[0].detectedLanguage.language);
        
        if(!language) {
            speechConfig.speechSynthesisVoiceName = "zh-TW-HsiaoChenNeural";
            text = "很抱歉，尚未支援辨識此語言";
        }
        console.log(language);
        console.log(text);
        
        var synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
        
        synthesizer.speakTextAsync(
            text, 
            function (result) {
                if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                    console.log("synthesis finished.");
                    document.querySelector('audio').src = URL.createObjectURL(
                        new Blob([result.audioData], { type: 'audio/wav' })
                    );
                }else {
                    console.error("Speech synthesis canceled, " + result.errorDetails + "\nDid you set the speech resource key and region values?");
                }
                synthesizer.close();
                synthesizer = undefined;
            },
            function (err) {
                console.trace("err - " + err);
                synthesizer.close();
                synthesizer = undefined;
            }
        );
        console.log("Now synthesizing to: " + "success");
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        //丟出錯誤訊息
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
}