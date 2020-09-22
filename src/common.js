/*****************************
* 関数定義部
******************************/
function createImg(pic_url){
  var img = document.createElement('img');
  img.setAttribute('src', pic_url);
  return img;
}

function createDivImg(pic_url){
  var divImg = document.createElement('div');
  divImg.setAttribute('class', 'img');
  
  var img = createImg(pic_url);
  divImg.appendChild(img);
  
  return divImg;
}

function createA(picJ){
  var a = document.createElement('a');
  a.setAttribute('href', picJ.content_url);
  a.setAttribute('target', '_brank');
  a.innerText = picJ.title;
  return a;
}

function getCategoryId(picJ){
  var category_id = picJ.category_id1;
  return category_id;
}

function createP(text){
  var p = document.createElement('p');
  p.setAttribute('class', 'content');
  p.innerText = text;
  return p;
}

function createContentExplain(category_array, picJ){
  var contentExplain = document.createElement('div');
  contentExplain.setAttribute('class', 'content-explain');
  
  var a = createA(picJ);
  contentExplain.appendChild(a);
  
//  var categoryEditTag = document.createElement('button');
//  categoryEditTag.setAttribute('class', 'category-edit');
//  categoryEditTag.innerText = 'タグ編集';  
  var cate_array = [];
  cate_array.push(picJ.category_id1);
  cate_array.push(picJ.category_id2);
//  categoryEditTag.setAttribute('onclick', 'onClick_categoryEditButton(' + cate_array[0] + ', ' + cate_array[1] + '); return; false;');
//  contentExplain.appendChild(categoryEditTag);
  
  for(var i in cate_array){
    if((cate_array[i] == undefined) || (cate_array[i] == null) || (cate_array[i] == '0')){
    }else{
      var categoryId = cate_array[i];
      var categoryTag = createCategoryTag(category_array, categoryId);
      categoryTag.setAttribute('class', 'content-category');
      contentExplain.appendChild(categoryTag);
    }
  }
  
  var p2 = createP('掲載元　：' + picJ.site_name);
  var p3 = createP('再生時間：' + picJ.duration);
  
  contentExplain.appendChild(p2);
  contentExplain.appendChild(p3);

  return contentExplain;
}

function createContentTag(categoryJ, picJ){
  var content = document.createElement('div');
  content.setAttribute('class', 'content');

  var divImg = createDivImg(picJ.pic_url);
  content.appendChild(divImg);
  
  var contentExplain = createContentExplain(categoryJ, picJ);
  content.appendChild(contentExplain);

  return content;
}

function createContentsRowTag(categoryJ, picJ){
  var contentsRow = document.createElement('div');
  contentsRow.setAttribute('class','contents-row');

  for(var i in picJ){
    var content = createContentTag(categoryJ, picJ[i]);
    contentsRow.appendChild(content);
  }
  
  return contentsRow;
}

function _delete_child_element(id_name){
  var dom_obj = document.getElementsByClassName(id_name);
  if(dom_obj.length > 0){
    dom_obj[0].remove();
  }
}

function createContentsPane(categoryJson, pictureJson, pageIndex){
  var contents = document.createElement('div');
  contents.setAttribute('class','contents');

  var array = [];
  var displaySize = pictureJson.length;
  var contentsStartIndex = (pageIndex -1) * 30;
  var contentsEndIndex = pageIndex * 30;

  //リンクコンテンツ生成
  if(displaySize > contentsEndIndex){
    displaiSize = contentsEndIndex;
  }
  
  if(displaySize < contentsEndIndex){
     
  }

  for(var i = contentsStartIndex; i < contentsEndIndex; i++){
    if(i == displaySize){
       break;
    }
    if((i > contentsStartIndex) && ((i % 3) == 0)){
      contents.appendChild(createContentsRowTag(categoryJson, array));
      array = [];
    }
    array.push(pictureJson[i]);
  }

  contents.appendChild(createContentsRowTag(categoryJson, array));
  return contents;
}

function centeringModalSyncer(){

	//画面(ウィンドウ)の幅を取得し、変数[w]に格納
	var w = $(window).width();

	//画面(ウィンドウ)の高さを取得し、変数[h]に格納
	var h = $(window).height();

	//コンテンツ(#modal-content)の幅を取得し、変数[cw]に格納
	var cw = $('#modal-content').outerWidth(true);

	//コンテンツ(#modal-content)の高さを取得し、変数[ch]に格納
	var ch = $('#modal-content').outerHeight(true);

	//コンテンツ(#modal-content)を真ん中に配置するのに、左端から何ピクセル離せばいいか？を計算して、変数[pxleft]に格納
	var pxleft = ((w - cw)/2);

	//コンテンツ(#modal-content)を真ん中に配置するのに、上部から何ピクセル離せばいいか？を計算して、変数[pxtop]に格納
	var pxtop = ((h - ch)/2);

	//[#modal-content]のCSSに[left]の値(pxleft)を設定
	$("#modal-content").css({"left": pxleft + "px"});

	//[#modal-content]のCSSに[top]の値(pxtop)を設定
	$("#modal-content").css({"top": pxtop + "px"});

    return cw;
}

function createDivRegCategoryLeft(category_id1, category_id2, cw){
  var divRegCategoryLeft = document.getElementsByClassName('reg-category-left');
  $('.reg-category-left').css({"margin-right": cw/3 + "px"});
  var category_name = '';
  var cja = categoryJson;
  var cate_array = [];
  cate_array.push(category_id1);
  cate_array.push(category_id2);
  
  for(var i in cate_array){
    for(var j in cja){
      if(cja[j].id == cate_array[i]){
         category_name = cja[j].name;
      }
    }
    var regCategoryLabel = document.createElement('label');
    regCategoryLabel.setAttribute('class', 'category');
    regCategoryLabel.innerText = category_name;
    divRegCategoryLeft.item(0).appendChild(regCategoryLabel);
    category_name = null;
  }
  
  return divRegCategoryLeft;
}

function onClick_label(){
}

function createDivRegCategoryRight(category_array){
  var divRegCategoryRight = document.getElementsByClassName('reg-category-right');
  var category_name = '';
  
  for(var i in category_array){
    var regCategoryLabel = document.createElement('label');
    regCategoryLabel.setAttribute('class', 'category');
    regCategoryLabel.setAttribute('data-right-cate-id', category_array[i].id);
    regCategoryLabel.setAttribute('onclick', 'onClick_label(); return false;')
    regCategoryLabel.innerText = category_array[i].name;
    divRegCategoryRight.item(0).appendChild(regCategoryLabel);
    category_name = null; 
  }
  
  return divRegCategoryRight;
}

function onClick_categoryEditButton(category_id1, category_id2){
  $(this).blur;
  if($('#modal-overlay')[0]) return false;
  $("body").append('<div id="modal-overlay"></div>');
  $('#modal-overlay').fadeIn('slow');
  
  var cw = centeringModalSyncer();
  
  //タグ編集画面(左：現在の設定)を作る
  var divRegCategoryLeft = createDivRegCategoryLeft(category_id1, category_id2, cw);
  
  //タグ編集画面(右：カテゴリ一覧)を作る
  var divRegCategoryRight = createDivRegCategoryRight(categoryJson);

  $('#modal-content').fadeIn('slow');
  
  $('#modal-overlay,#modal-close').unbind().click(function(){
    $('modal-content,#modal-overlay').fadeOut("slow", function(){
      $("#modal-content").css({"display": "none"});
      $('#modal-overlay').remove();
      divRegCategoryLeft.item(0).innerHTML = null;
      divRegCategoryRight.item(0).innerHTML = null;
    });
  });
}

function createModalContent(){
  var categoryEditPane = document.createElement('div');
  categoryEditPane.setAttribute('id', 'modal-content');
  
  var divRegCategory = document.createElement('div');
  divRegCategory.setAttribute('class', 'reg-category');
  var divRegCategoryLeft = document.createElement('div');
  divRegCategoryLeft.setAttribute('class', 'reg-category-left');
  var divRegCategoryRight = document.createElement('div');
  divRegCategoryRight.setAttribute('class', 'reg-category-right');
  
  divRegCategory.append(divRegCategoryLeft);
  divRegCategory.append(divRegCategoryRight);
  categoryEditPane.appendChild(divRegCategory);
  
  var p = document.createElement('p');
  var execA = document.createElement('a');
  execA.setAttribute('id', 'modal-close');
  execA.setAttribute('class', 'button-link');
  execA.innerText = '更新';
  
  var closeA = document.createElement('a');
  closeA.setAttribute('id', 'modal-close');
  closeA.setAttribute('class', 'button-link');
  closeA.innerText = '閉じる';
  
  p.appendChild(execA);
  p.appendChild(closeA);
  
  categoryEditPane.appendChild(p);
  
  var body = document.getElementsByTagName('body');
  body.item(0).appendChild(categoryEditPane);
}

function onClick_pageButton(pageIndex){
  var divContents = document.getElementsByClassName('contents');
  var contentsPane = createContentsPane(categoryJson, pictureJson, pageIndex);
  divContents[0].innerHTML = contentsPane.innerHTML;
}

function createPageButton(pageIndex){
  var pageButton = document.createElement('button');
  pageButton.setAttribute('class', 'page-button');
  pageButton.setAttribute('onclick', 'onClick_pageButton(' + pageIndex + ')');
  //クリック時の動きを書く
  pageButton.innerText = pageIndex;
  return pageButton;
}

function onClick_pageButtonNext(nextId, totalPageSize){
  //次の番号があるか
  if(nextId <= totalPageSize){
    //ページボタン先頭の配列から詰めていく
    var divPageButton = createDivPageButton(totalPageSize, nextId - 4);
    var oldDivPageButton = document.getElementsByClassName('page-button');
    oldDivPageButton.item(0).innerHTML = divPageButton.innerHTML;
  }
}

function onClick_pageButtonPrevious(previousId, totalPageSize){
  //前の番号があるか
  if(1 <= previousId){
    //ページボタン先頭の配列から詰めていく
    var divPageButton = createDivPageButton(totalPageSize, previousId);
    var oldDivPageButton = document.getElementsByClassName('page-button');
    oldDivPageButton.item(0).innerHTML = divPageButton.innerHTML;
  }
}

function updatePage(data){
  pictureJson = JSON.parse(data);
  var divSearchResult = document.getElementsByClassName('search-result');
  var resultPTag = createDivSearchResult(pictureJson.length);
  divSearchResult.item(0).innerHTML = resultPTag.innerHTML;
    
  var divContents = document.getElementsByClassName('contents');
  var contentsPane = createContentsPane(categoryJson, pictureJson, 1);
  divContents.item(0).innerHTML = contentsPane.innerHTML;
    
  var divPageButtonView = document.getElementsByClassName('page-button-view'); 
  var pageButtonViewContents = createDivPageButtonView(pictureJson, pictureJson.length);
  divPageButtonView.item(0).innerHTML = pageButtonViewContents.innerHTML;
}

function onClick_wordSearchButton(){
  var inputTag = document.getElementById('sbox2');
  var hoge = inputTag.value;
  
  if(hoge == ''){
  }else{
    $.ajax({	
	url: "./src/post-receiver.php", // 通信先のURL
	type: "POST",		// 使用するHTTPメソッド
	data: {'word': hoge},
	dataType: "text", // 応答のデータの種類 
    
  }).done(function(data) {
    updatePage(data);
    //alert('成功');
  }).fail(function() {
    //alert('失敗');
  }).always(function(){
    inputTag.value = '';
  });
  }
}

function createSearchForm(){
  var header = document.getElementsByClassName('header');
  
  var searchForm = document.createElement('form');
  searchForm.setAttribute('id', 'form2');
  //searchForm.setAttribute('onsubmit', "onClick_wordSearchButton(); return; false;");
  
  var inputWordTag = document.createElement('input');
  inputWordTag.setAttribute('id', 'sbox2');
  inputWordTag.setAttribute('name', 'word');
  inputWordTag.setAttribute('type', 'text');
  inputWordTag.setAttribute('placeholder', 'フリーワードを入力');
  //inputWordTag.setAttribute('onsubmit', "onClick_wordSearchButton(); return; false;");
  
  var inputDummyTag = document.createElement('input');
  inputDummyTag.setAttribute('type', 'text');
  inputDummyTag.setAttribute('name', 'dummy');
  inputDummyTag.setAttribute('style', 'display: none;');
  
  var wordSearchButton = document.createElement('button');
  wordSearchButton.setAttribute('type', 'button');
  wordSearchButton.setAttribute('id', 'sbtn2');
  wordSearchButton.setAttribute('onclick', "onClick_wordSearchButton(); return; false;");
  
  var i = document.createElement('i');
  i.setAttribute('class', 'fas fa-search');
  wordSearchButton.appendChild(i);
  
  searchForm.appendChild(inputWordTag);
  searchForm.appendChild(inputDummyTag);
  searchForm.appendChild(wordSearchButton);
  
  header.item(0).appendChild(searchForm);
}

function onClick_categoryTag(category_id){
  if((category_id === undefined) || (category_id == '') || (category_id === null)){
     
  }else{
    $.ajax({	
      url: "./src/post-receiver.php", // 通信先のURL
      type: "POST",		// 使用するHTTPメソッド
      data: {'category_id': category_id},
      dataType: "text", // 応答のデータの種類 
    
    }).done(function(data) {
      updatePage(data);
      //alert('成功');
    }).fail(function() {
      //alert('失敗');
    }).always(function(){
    });  
  }
  
}

function createCategoryTag(category_array, category_id){
  if((category_id === undefined) || (category_id === null) || (category_id == 0)){
     
  }else{
    var categoryTag = document.createElement('button');
    categoryTag.setAttribute('data-category', category_id);
    
    //指定したカテゴリIDの名前を取り出す
    var category_name = '';
    for(var i in category_array){
      if(category_array[i].id == category_id){
         category_name = category_array[i].name;
      }
    }
    
    categoryTag.innerText = category_name;
    categoryTag.setAttribute('onclick', 'onClick_categoryTag(' + category_id + ')');
    return categoryTag;
  }

}

function createPageButtonNext(nextId, totalPageSize){
  var pageButtonNext = document.createElement('button');
  pageButtonNext.setAttribute('class', 'page-button');
  pageButtonNext.setAttribute('onclick', 'onClick_pageButtonNext(' + nextId + ', ' + totalPageSize + ')');
  pageButtonNext.setAttribute('data-nextId', nextId);
  //クリック時の動きを書く
  pageButtonNext.innerText = '>';
  return pageButtonNext;
}

function createPageButtonPrevious(previousId, totalPageSize){
  var pageButtonPrevious = document.createElement('button');
  pageButtonPrevious.setAttribute('class', 'page-button');
  pageButtonPrevious.setAttribute('onclick', 'onClick_pageButtonPrevious(' + previousId + ', ' + totalPageSize + ')');
  pageButtonPrevious.setAttribute('data-previousId', previousId);
  //クリック時の動きを書く
  pageButtonPrevious.innerText = '<';
  return pageButtonPrevious;
}

function createDivPageButton(totalPageSize, startId){
  var divPageButton = document.createElement('div');
  divPageButton.setAttribute('class', 'page-button');

  //スタートページIDが2以上
  if(startId >= 2){
    var pageButtonPrevious = createPageButtonPrevious(startId - 1, totalPageSize);
    divPageButton.appendChild(pageButtonPrevious);
  }
  
  if(totalPageSize > (startId + 4)){
    //5ページより多い場合
    var nextId = 0;
    for(var i = startId; i <= (startId + 4); i++){
      var pageButton = createPageButton(i);
      divPageButton.appendChild(pageButton);
      
      if(i == (startId + 4)){
         nextId = i;
         nextId++;
      }
    }
    
    var pageButtonNext = createPageButtonNext(nextId, totalPageSize);
    divPageButton.appendChild(pageButtonNext);
  }else if(totalPageSize >= startId){
  //5ページまでの場合
    for(var i = startId; i <= totalPageSize; i++){
      var pageButton = createPageButton(i);
      divPageButton.appendChild(pageButton);
    }
  }
  return divPageButton;
}

function createDivSearchResult(resultColSize){
  var resultPTag = document.createElement('p');
  resultPTag.setAttribute('class', 'search-result');
  resultPTag.innerText = resultColSize + '件の動画が見つかりました';
  return resultPTag;
}

function createDivPageButtonView(pictureJson, resultColSize){
  var divPageButtonView = document.createElement('div');
  divPageButtonView.setAttribute('class', 'page-button-view');

  var totalPageSize = Math.ceil(resultColSize / 30);
  var divPageButton = createDivPageButton(totalPageSize, 1);

  divPageButtonView.appendChild(divPageButton);
  return divPageButtonView;
}

function onClick_sitePolicy(){
  var site_policy = 'サイトポリシー\n' +
                    '・ エロ動画無料まとめサイト ポチットはアダルトサイトです。\n' +
                    '・ 18才未満の方はエロ動画を閲覧しないでください。\n' +
                    '・ 本サイトからのリンクを経由してアクセスした外部サイトに関しましては、\n   当サイトは一切関与致しません。\n\n' +
                    '本サイト上におきまして、権利を侵害するようなエロ動画へのリンク、画像がございましたら、速やかにエロ動画リンクを削除する措置を取らせていただいております。発見された場合はお問い合わせフォームよりご連絡お願いします。\n\n';
  alert(site_policy);
}

function onClick_siteList(){
  open("./site-link.html", "_blank") ;
}

function onClick_contact(){
  open("./contact.html", "_blank") ;
}

function createBottom(){
  var divBottom = document.createElement('div');
  divBottom.setAttribute('class', 'bottom');
  var hrTag = document.createElement('hr');
  
  var endExplain1 = document.createElement('a');
  endExplain1.setAttribute('class', 'site-policy');
  endExplain1.setAttribute('onclick', 'onClick_sitePolicy()');
  endExplain1.innerText = 'サイトポリシー';
  
  var endExplain2 = document.createElement('a');
  endExplain2.setAttribute('class', 'site-list');
  endExplain2.setAttribute('onclick', 'onClick_siteList()');
  endExplain2.innerText = '登録サイト';
  
  
  var endExplain3 = document.createElement('a');
  endExplain3.setAttribute('class', 'contact');
  endExplain3.setAttribute('onclick', 'onClick_contact()');
  endExplain3.innerText = 'お問い合わせ';
  
  divBottom.appendChild(hrTag);
  divBottom.appendChild(endExplain1);
  divBottom.appendChild(endExplain2);
  divBottom.appendChild(endExplain3);
  return divBottom;
}