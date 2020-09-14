//Fatkhul Mukhlish Al-haq 3SI1
var news="";
var newsJson="";
var link = ["https://rss.detik.com/index.php/finance","http://rss.detik.com/index.php/detikcom_nasional","https://rss.detik.com/index.php/sport"];
function loadDoc(link) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     myFunction(this);
    }
  }
  xhttp.open("GET", link, true);
  xhttp.send();
}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var sumber = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
  var x = xmlDoc.getElementsByTagName("item");
  for (i = 0; i < x.length; i++) {
    var title = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    var link = x[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
    var pubDate = x[i].getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
    var img = x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
    img = img.substring(img.indexOf('"') + 1);
    img = img.substring(0,img.indexOf('"'));
    var desc = x[i].getElementsByTagName("description")[0].childNodes[1].nodeValue;
    news += '<div class="col xl6">'
              +'<div class="card large">'
                +'<div class="card-image">'
                  +'<img src="'+img+'">'
                  +'<span class="card-title"><b>'+title+'</b></span>'
                +'</div>'
                +'<div class="card-content">'
                  +'<p><small><b>'+sumber+'</b></small></p>'
                  +'<p><small>'+pubDate+'</small></p>'
                  +'<p>'+desc+'</p>'
                +'</div>'
                +'<div class="card-action">'
                  +'<a href="'+link+'">Selengkapnya...</a>'
                +'</div>'
              +'</div>'
            +'</div>'
    };
    document.getElementById("konten").innerHTML = news;
    document.getElementById("btn").innerHTML ="Loaded from XML";
}

function loadJSON(link) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(xhttp.responseText);
     myJson(data);
    }
  }
  xhttp.open("GET", "https://api.rss2json.com/v1/api.json?rss_url="+link, true);
  xhttp.send();
}

function myJson(json) {
  var i;
  var x = json.items;
  var sumber = json.feed.title;
  for (i = 0; i < x.length; i++) {
    var title = x[i].title;
    var link = x[i].link;
    var pubDate = x[i].pubDate;
    var img = x[i].description;
    img = img.substring(img.indexOf('"') + 1);
    img = img.substring(0,img.indexOf('"'));
    var desc = x[i].description;
    desc = desc.substring(desc.indexOf('>') + 1);
    newsJson += '<div class="col xl6">'
              +'<div class="card large">'
                +'<div class="card-image">'
                  +'<img src="'+img+'">'
                  +'<span class="card-title"><b>'+title+'</b></span>'
                +'</div>'
                +'<div class="card-content">'
                  +'<p><small><b>'+sumber+'</b></small></p>'
                  +'<p><small>'+pubDate+'</small></p>'
                  +'<p>'+desc+'</p>'
                +'</div>'
                +'<div class="card-action">'
                  +'<a href="'+link+'">Selengkapnya...</a>'
                +'</div>'
              +'</div>'
            +'</div>'
    };
    console.log(newsJson);
    document.getElementById("konten").innerHTML = newsJson;
    document.getElementById("btn").innerHTML ="Loaded from JSON";
}



window.addEventListener("load", function(){
  for(i = 0;i<link.length;i++){
    loadDoc(link[i]);
  };
});
document.getElementById("btn-xml").addEventListener("click", function(){
  for(i = 0;i<link.length;i++){
    loadDoc(link[i]);
  };
});
document.getElementById("btn-json").addEventListener("click", function(){
  for(i = 0;i<link.length;i++){
    loadJSON(link[i]);
  };
});
