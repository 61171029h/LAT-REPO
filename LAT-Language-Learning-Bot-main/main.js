'use strict'

import { imageText, imageTextFile } from './image-text.js';
import { textToSpeech } from './speech.js';
import { processTranslate } from './translate.js';

$(document).ready(function(){
    $("#analyzeButton").click(function(){
        imageText();
    });

    $("#inputImageFile").change(function(e){
        imageTextFile(e.target.files[0]);
    });

    $("#translateLanguage").change(async function() {
        processTranslate($(this).val());
    });

    $("#audioPlayButton").click(function() {
            if ($("#translateLanguage").val() == "zh-Hant")  
                textToSpeech($("#imageText").val(),true);
            else 
                textToSpeech($("#translateResult").val(),false);
    });
});