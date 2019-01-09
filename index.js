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
  if(messege=="你好" ||  messege=="功能"){
    console.log('----------------information----------------');
    console.log('process: messege=="你好"');
    console.log('-------------------------------------------');
    messege = "您好，目前功能如下：\n(1)輸入 link 會出現我的好友邀請QR code\n(2)輸入 功能 會出現我的功能說明\n(3)輸入 3選1 我會從1~3隨機選擇一個數字";
    messege +="\n(4)輸入\n選一個\n豬排\n鍋貼\n魯肉飯 \n我會從3項中選擇一個（要記得要每個選項都要換行喔";
    return messege

  }
  else if(messege.search("選一個")>=0){
    console.log('----------------information----------------');
    console.log('process: messege.search("選一個")');
    console.log("messege: ",messege);
    console.log('-------------------------------------------');
    var optionArray=[];
    messege+="\n";
    messege=messege.substring(messege.search("\n")+1);
    var runTimes = 0;
    while(messege.search('\n')>=0){

      optionArray.push(messege.substring(0,messege.search("\n")));
      messege = messege.substring(messege.search("\n")+1);
      runTimes+=1;
      if(runTimes>100){
        break
      }
      console.log('-------------------Debug-------------------');
      console.log("messege: ",messege);
      console.log("optionArray: ",optionArray);
      console.log('-------------------------------------------');
    }
    return '我覺得 '+(optionArray[Math.floor(Math.random() * optionArray.length)]).toString()+' 比較好';

  }
  else if(messege.search("選")>=0){
    console.log('----------------information----------------');
    console.log('process: messege.search("選")');
    console.log('-------------------------------------------');

    try {

      midden_idx = parseInt(messege.search("選"));
      range = parseInt(messege.substring(0,midden_idx));
      count = parseInt(messege.substring(midden_idx+1));
      assert(typeof range == "number");
      assert(typeof count == "number");
      assert(range >= count);
      replyText="";
      replyArray=[];
      console.log('----------------information----------------');
      console.log('process: Math.random()');
      console.log('-------------------------------------------');
      for(var idx =0;idx<count;idx+=1){

        unit = Math.floor((Math.random() * range) + 1);
        if(replyArray.indexOf(unit) < 0){
          replyArray.push(unit);
          replyText +=unit.toString();
          replyText +=',';
        }
        else{
          for(var idx2 =0;idx2<count;idx2+=1){
            if(replyArray.indexOf(idx2) < 0){
              replyArray.push(idx2);
              replyText +=idx2.toString();
              replyText +=',';
              break
            }
          }
        }
        console.log('-------------------Debug-------------------');
        console.log("idx: ",idx);
        console.log("replyText: ",replyText);
        console.log("replyArray: ",replyArray);
        console.log('-------------------------------------------');
      }
      console.log('-------------------Debug-------------------');
      console.log("replyText: ",replyText.substring(0,replyText.length-1));
      console.log('-------------------------------------------');
      return replyText.substring(0,replyText.length-1);
    }
    catch (error) {
      midden_idx = messege.search("選");
      range = messege.substring(0,midden_idx);
      count = messege.substring(midden_idx+1);
      console.log('-------------------Debug-------------------');
      console.log("range: ",range);
      console.log("count: ",count);
      console.log('-------------------------------------------');

      console.log('-------------------error-------------------');
      console.log(error);
      console.log('-------------------------------------------');
      return null;
    }

  }
  else if(messege.search("骰")>=0&&messege.search("顆")>=0){

    logging("process: messege.search('骰')",'information');
    try{
      var count = messege.substring(messege.search("骰")+1,messege.search("顆"));
      count = parseInt(count);
      assert(typeof count == "number");
      var dice = [1,2,3,4,5,6];
      logging('dice: '+dice.toString()+'\ncount: '+count.toString());
      if(messege.indexOf("[")>=0 && messege.indexOf("]")>=0){
        logging('process: updated dices');
        var dice_str = messege.substring(messege.indexOf("[")+1,messege.indexOf("]"));
        dice = dice_str.split(",");
      }
      var sum = 0;
      var sum_str = "";
      for(var i=0; i<count;i++){

        var unit = dice[Math.floor(Math.random() * dice.length)];
        logging('unit: '+unit.toString());
        sum_str+='+'+unit.toString();
        sum+=parseInt(unit)
      }
      sum_str+=' = ';
      sum_str+=sum.toString();
      return sum_str.substring(1)
    }
    catch(e){
      logging('Error: '+e.toString(),'Error');
      return null
    }
  }
  else{
    console.log('----------------information----------------');
    console.log('process: messege.else');
    console.log('-------------------------------------------');


    return null
  }


  return null
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
function logging(message,level="DEBUG") {
    try{
      assert(typeof message == "string");
      assert(typeof level == "string");
      console.log('----------------'+level+'----------------');
      console.log(message);
      console.log('-------------------------------------------');
    }
    catch(e){
      console.log('-------------------Error-------------------');
      console.log('Error',e);
      console.log('-------------------------------------------');
    }

}
