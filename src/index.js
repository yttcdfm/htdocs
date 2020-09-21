/*****************************
* メイン部
******************************/
//alert('hogehoge');
pictureJson = JSON.parse(picture_json_array);
categoryJson = JSON.parse(category_json_array);

createSearchForm();

var body = document.getElementById('hogehoge');
var contentsPane = createContentsPane(categoryJson, pictureJson, 1);

var divSearchResult = createDivSearchResult(pictureJson.length);

//ヘッダーのカテゴリタグ
var headerContents = document.getElementsByClassName('header');
var divCategory = document.createElement('div');
divCategory.setAttribute('class', 'category');
var categoryTag = createCategoryTag(categoryJson, 1);
divCategory.appendChild(categoryTag);
headerContents.item(0).appendChild(divCategory);

body.appendChild(divSearchResult);

body.appendChild(contentsPane);

var divPageButtonView = createDivPageButtonView(pictureJson, pictureJson.length);
body.appendChild(divPageButtonView);

var bottom = createBottom();

body.appendChild(bottom);