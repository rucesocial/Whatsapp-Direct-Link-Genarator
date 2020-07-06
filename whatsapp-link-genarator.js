var username = $('#username');
var token = $('#token');
var links = $('#links');
var output = $('#output');
var convert = $('#convert');

var converters = $('input[name="converter"]');
var lastConverter = localStorage.getItem('converter');
converters.on('click', function () {
  localStorage.setItem('converter', this.value);
}).filter(`[value="${lastConverter}"]`).prop('checked', true);

function getConvertSite () {
  return $('input[name="converter"]:checked').val();
}

function createRequest (url) {
  var site = "bitly";
  if(token.val()==""){
    alert("Mesaj yerini boş bırakmayın.");

  }
  else{
     console.log('site:', 'bitly');
document.getElementById("links").style.display = "block";
var urlx=`https://8pz.blogspot.com/?no=${username.val()}&text=${token.val()}`;
  switch (site) {
    case 'bitly':
      return $.ajax({
        url: `https://api-ssl.bitly.com/v3/shorten?format=txt&login=${"your_bitly_username"}&access_token=${"your_access_token"}&longUrl=${encodeURIComponent(urlx)}`,
        async: false,
        dataType: 'text',
      }).then(function (data) {
        return data.trim();
      });
    case 'adfly':
      return $.ajax({
        method: 'GET',
        async: false,
        url: `https://api.adf.ly/v1/shorten?_user_id=${username.val()}&_api_key=${token.val()}&url=${urlx}`,
        mimeType: 'text/plain',
        dataType: 'text',
      }).then(function (data) {
        return data.trim();
      });
  }
  }
 
}

username.on('change', function(){ localStorage.setItem('username', this.value) }).val(localStorage.getItem('username'));
token.on('change', function(){ localStorage.setItem('token', this.value) }).val(localStorage.getItem('token'));

function getLink(url) {
  var newline = output.val().legth === 0 ? '' : '\n';
  if (url.indexOf('http') !== 0) {
    var request = createRequest(url);
    $.when(request).then(function (data) {
      output.val(data);
    });
  } else {
    var request = createRequest(url);
    $.when(request).then(function (data) {
      output.val(data);
    });
  }
}

convert.on('click', function(){
    "https://google.com".trim().split('\n').forEach(getLink)
});
