var data =[{
    values: [1, 1, 1, 1, 1, 1,, 1, 1, 1, 1 ,1],
    labels: ['ar', 'yue', 'en', 'fr', 'de', 'ja', 'ko', 'ru', 'th', 'vi', 'zh-Hant'],
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
        // data[0].values[0] =0;
        // data[0].values[1] =0;
        // data[0].values[2] =0;
        let sentiments = ['ar', 'yue', 'en', 'fr', 'de', 'ja', 'ko', 'ru', 'th', 'vi', 'zh-Hant'];
        data[0].values = Array(sentiments.length).fill(0);
        for (let i = 0; i < msg.length; i++) {
            let sentiment = msg[i].sentiment;
            let index = sentiments.indexOf(sentiment);
            if (index !== -1) {
              data[0].values[index] += 1;
            }
          }
          Plotly.newPlot('myDiv', data, layout);
    })
    .fail(function(msg) { console.log("Fail") });
}

