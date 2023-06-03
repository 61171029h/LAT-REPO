var data =[{
    values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    labels: ['zh-Hant','en', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'it', 'ru', 'th', 'vi', 'ar', 'yue'],
    type: 'pie'
}];
var layout ={
    height: 500,
    width: 500
};
$(function(){
    setInterval(readData, 5000);
});

function readData(){
    //Read data
    let url="https://huiwen-json-server-05100000.azurewebsites.net/reviews";
    $.getJSON(url)
    .done(function(msg) {
        console.log(msg);
        let targetLanguages = ['zh-Hant','en', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'it', 'ru', 'th', 'vi', 'ar', 'yue'];
        //data[0].values = Array(targetLanguages.length).fill(0);
        for(let i=0;i<targetLanguages.length;i++){
            data[0].values[i] = 0;
        }
        for (let x = 0; x < msg.length; x++) {
            for(let y=0;y<targetLanguages.length;y++){
                if(msg[x].targetLanguage==targetLanguages[y]){
                    data[0].values[y]+=1;
                }
            }
          }
          Plotly.newPlot('myDiv', data, layout);
    })
    .fail(function(msg) { console.log("Fail") });
}

