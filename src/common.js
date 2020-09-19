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

function createP(text){
  var p = document.createElement('p');
  p.setAttribute('class', 'content');
  p.innerText = text;
  return p;
}

function createContentExplain(picJ){
  var contentExplain = document.createElement('div');
  contentExplain.setAttribute('class', 'content-explain');
  
  var a = createA(picJ);
  var p1 = createP('　');
  var p2 = createP('掲載元　：' + picJ.site_name);
  var p3 = createP('再生時間：' + picJ.duration);
  
  contentExplain.appendChild(a);
  contentExplain.appendChild(p1);
  contentExplain.appendChild(p2);
  contentExplain.appendChild(p3);

  return contentExplain;
}

function createContentTag(picJ){
  var content = document.createElement('div');
  content.setAttribute('class', 'content');

  var divImg = createDivImg(picJ.pic_url);
  content.appendChild(divImg);
  
  var contentExplain = createContentExplain(picJ);
  content.appendChild(contentExplain);

  return content;
}

function createContentsRowTag(picJ){
  var contentsRow = document.createElement('div');
  contentsRow.setAttribute('class','contents-row');

  for(var i in picJ){
    var content = createContentTag(picJ[i]);
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

function createContentsPane(pictureJson, pageIndex){
  var contents = document.createElement('div');
  contents.setAttribute('class','contents');

  var array = [];
  var displaySize = pictureJson.length;
  var contentsStartIndex = (pageIndex -1) * 30;
  var contentsEndIndex = pageIndex * 30;

  //リンクコンテンツ生成
  if(pictureJson.length > contentsEndIndex){
    displaiSize = contentsEndIndex;
  }

  for(var i = contentsStartIndex; i < contentsEndIndex; i++){
    if((i > contentsStartIndex) && ((i % 3) == 0)){
      contents.appendChild(createContentsRowTag(array));
      array = [];
    }
    array.push(pictureJson[i]);
  }

  contents.appendChild(createContentsRowTag(array));
  array = [];

  return contents;
//  var body = document.getElementById('hogehoge');
//  body.appendChild(contents);
}

function onClick_pageButton(pageIndex){
  var divContents = document.getElementsByClassName('contents');
  var contentsPane = createContentsPane(pictureJson, pageIndex);
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

function onClick_pageButtonNext(){

}

function createPageButtonNext(){
  var pageButton = document.createElement('button');
  pageButton.setAttribute('class', 'page-button');
  pageButton.setAttribute('onclick', 'onClick_pageButtonNext()');
  //クリック時の動きを書く
  pageButton.innerText = '>';
  return pageButton;
}

function createDivPageButton(totalPageSize){
  var divPageButton = document.createElement('div');
  divPageButton.setAttribute('class', 'page-button');

  if(totalPageSize > 5){
  //5ページより多い場合
    for(var i = 1; i <= 5; i++){
      var pageButton = createPageButton(i);
      divPageButton.appendChild(pageButton);
    }
    
    var pageButton = createPageButtonNext();
    divPageButton.appendChild(pageButton);
  }else if(totalPageSize >= 1){
  //5ページまでの場合
    for(var i = 1; i <= 5; i++){
      for(var i = 1; i <= totalPageSize; i++){
        var pageButton = createPageButton(i);
        divPageButton.appendChild(pageButton);
      }
    }
  }
  return divPageButton;
}

function createDivPageButtonView(resultColSize){
  var divPageButtonView = document.createElement('div');
  divPageButtonView.setAttribute('class', 'page-button-view');

  var resultPTag = document.createElement('p');
  resultPTag.innerText = resultColSize + '件の動画が見つかりました'; 

  var totalPageSize = Math.ceil(resultColSize / 30);
  var divPageButton = createDivPageButton(totalPageSize);

  divPageButtonView.appendChild(resultPTag);
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

function createBottom(){
  var divBottom = document.createElement('div');
  divBottom.setAttribute('class', 'bottom');
  var hrTag = document.createElement('hr');
  var endExplain1 = document.createElement('a');
  endExplain1.setAttribute('class', 'site-policy');
  endExplain1.setAttribute('onclick', 'onClick_sitePolicy()');
  endExplain1.innerText = 'サイトポリシー';
  
  divBottom.appendChild(hrTag);
  divBottom.appendChild(endExplain1);
  return divBottom;
}