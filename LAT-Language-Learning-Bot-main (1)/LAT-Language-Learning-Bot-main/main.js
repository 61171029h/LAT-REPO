'use strict'

import { imageText } from './image-text.js';
import { textToSpeech } from './text-to-speech.js';
import { processTranslate } from './translate.js';
import { languageDetection } from './language-detection.js'

$(document).ready(function(){
    $("#analyzeButton").click(function(){
        imageText();
    });
    $("#translateLanguage").change(function() {
        var targetLanguage = $(this).val();
        processTranslate(targetLanguage);
    });
    $("#audioPlayButton").click(function() {
        var language = languageDetection();
        var text = document.getElementById("imageText").value;
        textToSpeech(text);
    });
});