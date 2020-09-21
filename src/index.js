/*****************************
* メイン部
******************************/
//alert('hogehoge');
pictureJson = JSON.parse(picture_json_array);

createSearchForm();

var body = document.getElementById('hogehoge');
var contentsPane = createContentsPane(pictureJson, 1);

var divSearchResult = createDivSearchResult(pictureJson.length);
body.appendChild(divSearchResult);

body.appendChild(contentsPane);

var divPageButtonView = createDivPageButtonView(pictureJson, pictureJson.length);
body.appendChild(divPageButtonView);

var bottom = createBottom();

body.appendChild(bottom);