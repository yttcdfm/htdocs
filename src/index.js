/*****************************
* メイン部
******************************/
//alert('hogehoge');
pictureJson = JSON.parse(picture_json_array);

var body = document.getElementById('hogehoge');
var contentsPane = createContentsPane(pictureJson, 1);
body.appendChild(contentsPane);

var divPageButtonView = createDivPageButtonView(pictureJson.length);
