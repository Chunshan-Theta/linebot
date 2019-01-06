var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId: "1634811399",
  channelSecret: "28e1e21c2a9c03cc439cbc3f01d3a79b",
  channelAccessToken: "KuLZ5dsGCpn48ZwL8wQZPxXsCX53/sLCjk38fI5DzNEQAlaCu1uARHDlEuZIRvA4T+0AjpqhlM7UqOBlFq9jhHjJTCheHsHqO3dcY6/VqjzIHVFwg+zO1cDz56hVJEGf3ZGIAFIPUD2bKTfOttGf/wdB04t89/1O/w1cDnyilFU="
});
bot.on('message', function(event) {
  console.log('-------------------event-------------------');
  console.log(event);
  console.log('-------------------------------------------');
  if (event.message.type = 'text') {
    var msg = event.message.text;
    msg = replyMessage(msg);
    if(msg!=null){
      event.reply(msg)
      .then(function(data) {
        // success
        //console.log(msg);
      })
      .catch(function(error) {
        // error
        console.log('-------------------error-------------------');
        console.log(error);
        console.log('-------------------------------------------');
      });
    }
  }
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

function replyMessage(messege){
  if(messege=="你好"){
    console.log('----------------information----------------');
    console.log('process: messege=="你好"');
    console.log('-------------------------------------------');
    messege = "不是很好！";

  }else if (messege.search("選")) {
    console.log('----------------information----------------');
    console.log('process: messege.search("選")');
    console.log('-------------------------------------------');
    midden_idx = messege.search("選");
    range = messege.substring(0,midden_idx);
    count = messege.substring(midden_idx+1);
    try {

      assert(typeof range == "number");
      assert(typeof count == "number");
      replyText="";
      for(var idx =0;idx<count;idx+=1){
        replyText +=(Math.floor((Math.random() * range) + 1)).toString()
        replyText +=','
      }
      message = replyText;
    }
    catch (error) {
      midden_idx = messege.search("選");
      range = messege.substring(0,midden_idx);
      count = messege.substring(midden_idx+1);
      console.log('-------------------Debug-------------------');
      console.log("range",range);
      console.log("count",count);
      console.log('-------------------------------------------');

      console.log('-------------------error-------------------');
      console.log(error);
      console.log('-------------------------------------------');
    }

  }else{
    console.log('----------------information----------------');
    console.log('process: messege.else');
    console.log('-------------------------------------------');

    message = null;
  }


  return messege
}



function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}
