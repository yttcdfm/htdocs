function createEventTag(eventJson){
  console.log(eventJson);
  var div = document.createElement('div');
  div.setAttribute('class', 'event_content');
  var name = document.createElement('p');
  name.setAttribute('class', 'event');
  name.innerText = "イベント名　："+eventJson['name'];
  div.append(name);
  
  var location = document.createElement('p');
  location.setAttribute('class', 'event');
  location.innerText = "開催場所　　："+eventJson['location'];
  div.append(location);
  
  var date = document.createElement('p');
  date.setAttribute('class', 'event');
  date.innerText = "開催日　　　："+eventJson['date'];
  div.append(date);
  
  var detail = document.createElement('a');
  detail.setAttribute('class', 'event');
  detail.setAttribute('href', eventJson['detail']);
  detail.innerText = eventJson['detail'];
  div.append("イベント詳細：")
  div.append(detail);
//  div.innerText = 'イベント名　：'+eventJson['name']+'<br>'+
                  '開催場所　　：'+eventJson['location']+'<br>'+
                  '開催日　　　：'+eventJson['date']+'<br>'+
                  'イベント詳細：';
  var a = document.createElement('a');
  a.setAttribute('href', eventJson['detail']);
  div.appendChild(a);
  
  return div;
}

/*****************************
* メイン部
******************************/
eventJson = JSON.parse(event_json_array);

var contents = document.getElementsByClassName('event_contents');
for(var i in eventJson){
  var eventTag = createEventTag(eventJson[i]);
  contents[0].appendChild(eventTag);
}

//var divBotton = createBottom();
//var body = document.getElementsByTagName('body');
//body[0].appendChild(divBotton);