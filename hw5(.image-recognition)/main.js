$(document).ready(function(){
    //do something
    $("#thisButton").click(function(){
        processImage();
    });
    $("#inputImageFile").change(function(e){
        processImageFile(e.target.files[0]);
    });
});

function processImageFile(imageObject) {

    //確認區域與所選擇的相同或使用客製化端點網址
    var url = "https://eastus.api.cognitive.microsoft.com/";
    //var uriBase = url + "vision/v2.1/describe";
    var uriBase = url + "vision/v2.1/analyze";

    var params = {
         "visualFeatures": "Faces,color,Objects,Adult,Brands,Categories,Description",
         "details": "Landmarks",
        //"maxCandidates": "10",
    };
    //顯示分析的圖片
    // var sourceImageUrl = document.getElementById("inputImage").value;
    var sourceImageUrl = URL.createObjectURL(imageObject);
    document.querySelector("#sourceImage").src = sourceImageUrl;
    //送出分析
    $.ajax({
        url: uriBase + "?" + $.param(params),
        // Request header
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: "POST",
        processData:false,
        contentType:false,
        // Request body
        data: imageObject
    })
        .done(function (data) {
            //顯示JSON內容
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
            //清空
            $("#picDescription").empty();
            //從captions抓取這張剪報的主題
            $("#picDescription").append("這張剪報主題為:");
            for (var x = 0; x < data.description.captions.length; x++) {
                $("#picDescription").append(data.description.captions[x].text + "<br>");
            }
            //辨識是否包含成人內容
            $("#picDescription").append("是否涉及成人主題:");
            $("#picDescription").append(data.adult.isAdultContent + "<br>"+ "<br>");
            //辨識簡報是否超過三個顏色，若超過三個顏色就不符合多媒體原則
            $("#picDescription").append("簡報主要包括:"+data.color.dominantColors.length+"個顏色<br>");
            if(data.color.dominantColors.length>=3){
                $("#picDescription").append("<span style='color: red;'>若超過3種顏色會不符合多媒體原則!建議修改</span>");
            }
            else{
                $("#picDescription").append("<span style='color: red;'>符合多媒體原則！很棒</span>");
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            //丟出錯誤訊息
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });
};


function processImage() {
    
    //確認區域與所選擇的相同或使用客製化端點網址
    var url = "https://eastus.api.cognitive.microsoft.com/";
    //var uriBase = url + "vision/v2.1/describe";
    var uriBase = url + "vision/v2.1/analyze";
    var params = {
         "visualFeatures": "Faces,Color,Objects,Adult,Brands,Categories,Description",
         "details": "Landmarks",
        //"maxCandidates":"10",
        //"language": "zh",
    };
    //顯示分析的圖片
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;
    //送出分析
    $.ajax({
        url: uriBase + "?" + $.param(params),
        // Request header
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: "POST",
        // Request body
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })
    .done(function(data) {
        //顯示JSON內容
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
        //清空
        $("#picDescription").empty();
        //從captions抓取這張剪報的主題
        $("#picDescription").append("這張剪報主題為:");
        for (var x = 0; x < data.description.captions.length; x++) {
            $("#picDescription").append(data.description.captions[x].text + "<br>");
        }
        //辨識是否包含成人內容
        $("#picDescription").append("是否涉及成人主題:");
        $("#picDescription").append(data.adult.isAdultContent + "<br>"+ "<br>");
        //辨識簡報是否超過三個顏色，若超過三個顏色就不符合多媒體原則
        $("#picDescription").append("簡報主要包括:"+data.color.dominantColors.length+"個顏色<br>");
        if(data.color.dominantColors.length>=3){
            $("#picDescription").append("<span style='color: red;'>若超過3種顏色會不符合多媒體原則!建議修改</span>");
        }
        else{
            $("#picDescription").append("<span style='color: red;'>符合多媒體原則！很棒</span>");
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        //丟出錯誤訊息
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
};