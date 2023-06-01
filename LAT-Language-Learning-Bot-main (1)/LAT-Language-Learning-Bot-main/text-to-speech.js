export function textToSpeech(text) {
    var SpeechSpeechSDK;
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey_speech, "eastus");

    // The language of the voice that speaks.
    speechConfig.speechSynthesisVoiceName = "zh-TW-HsiaoChenNeural"; 

    // Create the speech synthesizer.
    var synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync(
        text, 
        function (result) {
            if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                console.log("synthesis finished.");
                const blob = new Blob([result.audioData], { type: 'audio/wav' });
                document.querySelector('audio').src = URL.createObjectURL(blob);
            } else {
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
}