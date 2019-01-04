var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId: "1634811399",
  channelSecret: "28e1e21c2a9c03cc439cbc3f01d3a79b",
  channelAccessToken: "KuLZ5dsGCpn48ZwL8wQZPxXsCX53/sLCjk38fI5DzNEQAlaCu1uARHDlEuZIRvA4T+0AjpqhlM7UqOBlFq9jhHjJTCheHsHqO3dcY6/VqjzIHVFwg+zO1cDz56hVJEGf3ZGIAFIPUD2bKTfOttGf/wdB04t89/1O/w1cDnyilFU="
});
bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
