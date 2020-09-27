function createUnitTag(unitJson){
  var div = document.createElement('div');
  div.setAttribute('class', 'content');
  
  var a1 = document.createElement('a');
  a1.setAttribute('class', 'movie_link');
  a1.setAttribute('href', unitJson['content_url']);
  a1.setAttribute('target', '_blank');
  
  var img = document.createElement('img');
  img.setAttribute('alt', unitJson['title']);
  img.setAttribute('src', unitJson['pic_url']);
  
  a1.appendChild(img);
  
  var a2 = document.createElement('a');
  a2.setAttribute('class', 'movie_link');
  a2.setAttribute('href', unitJson['content_url']);
  a2.setAttribute('target', '_blank');
  a2.innerText = unitJson['title'];
  
  div.appendChild(a1);
  div.appendChild(a2);
  
  return div;
}

/*****************************
* メイン部
******************************/
unitJson = JSON.parse(unit_json_array);

var contents = document.getElementsByClassName('contents');
for(var i in unitJson){
  var unitTag = createUnitTag(unitJson[i]);
  contents[0].appendChild(unitTag);
}

var divBotton = createBottom();
var body = document.getElementsByTagName('body');
body[0].appendChild(divBotton);