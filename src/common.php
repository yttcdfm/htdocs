<?php

require_once('config.php');

/******************
* 関数定義部
*******************/
$db_password;
$admin_ip;
$pdo;

//DB接続
function connect_db(){
  try{
    global $pdo;
    global $db_password;
    $pdo = new PDO('mysql:dbname=zufyzqwv_mydb;host=localhost;port=3306', 'zufyzqwv_admin', $db_password);
    if($pdo == null){
      //die('DB接続失敗');
    }else{
      //print('DB接続成功<br>');
    }
  }catch(PDOException $e){
    print('Error:'.$e->getMessage());
    die();
  }

}

//全件検索
function selectAll($table_name){
  global $pdo;
  $result = $pdo->query('SELECT * FROM '.$table_name.';');
  if(!$result){
    //var_dump($result);
    die('クエリが失敗しました。'.pg_last_error());
  }
  
  return $result;
}

//IDで検索
function select($table_name, $id_name, $id_value){
  global $pdo;
  $result = $pdo->query('SELECT * FROM '.$table_name.' WHERE '.$id_name.'='.$id_value.';');
  if(!$result){
    //var_dump($result);
    die('クエリが失敗しました。'.pg_last_error());
  }
  
  return $result;
}

//POST
function doPostSrcip($table_name, $srcIp){
  global $admin_ip;
  if((gethostname() == 'MyComputer') || ($srcIp == '127.0.0.1') || ($srcIp == '150.95.55.140') || ($srcIp == $admin_ip)){
  }else{
    global $pdo;
    $sql = "INSERT INTO ".$table_name." (src_ip, post_time) VALUES ('".$srcIp."', CURRENT_TIMESTAMP);";
    $result = $pdo->query($sql);
    $accessCount = $result->fetchColumn();
    if(!$result){
      //var_dump($result);
      die('クエリが失敗しました。'.pg_last_error());
    }
  }
}

function insert($pic_id, $postData, $table_name){
  global $pdo;
  $sql = "INSERT INTO ".$table_name." (pic_id,comment) VALUES (".$pic_id.",'".$postData."');";
  $result = $pdo->query($sql);
  $accessCount = $result->fetchColumn();
  if(!$result){
    var_dump($result);
    die('クエリが失敗しました。'.pg_last_error());
  }
}

function insertPic($name, $url, $local_url){
  global $pdo;
  $sql = "INSERT INTO picture (name,url,local_url) VALUES ('".$name."','".$url."','".$local_url."');";
  $result = $pdo->query($sql);
  $accessCount = $result->fetchColumn();
  if(!$result){
    var_dump($result);
    die('クエリが失敗しました。'.pg_last_error());
  }
}

function getPicture($result){

  if(!empty($result)){
    
    $picture_array_tmp = array();
    
    foreach($result as $value){
      //var_dump($value);
      $ans = array("id" => $value['id'], "category_id1" => $value['category_id1'], "category_id2" => $value['category_id2'], "category_id3" => $value['category_id3'], "site_name" => $value['site_name'], "title" => $value['title'], "content_url" => $value['content_url'], "pic_url" => $value['pic_url'], "duration" => $value['duration']);
      array_push($picture_array_tmp, $ans);
    }
    $picture_array = array_reverse($picture_array_tmp);
    return $picture_json_array = json_encode($picture_array, JSON_UNESCAPED_UNICODE);
  }

}

function getCategory($result){
  if(!empty($result)){
    
    $array = array();
    
    foreach($result as $value){
      //var_dump($value);
      $ans = array("id" => $value['id'], "name" => $value['name'], "post_time" => $value['post_time']);
      array_push($array, $ans);
    }
    return $category_json_array = json_encode($array, JSON_UNESCAPED_UNICODE);
  }
}

function getContent($result){

  if(!empty($result)){
    
    $array = array();
    
    foreach($result as $value){
      //var_dump($value);
      $ans = array("id" => $value['id'], "name" => $value['name'], "post_time" => $value['post_time']);
      array_push($array, $ans);
    }
    array_push($array);
    return $json_array = json_encode($array, JSON_UNESCAPED_UNICODE);
  }

}

function getEvent($result){

  if(!empty($result)){
    
    $array = array();
    
    foreach($result as $value){
      //var_dump($value);
      $ans = array("id" => $value['id'], "name" => $value['name'], "location" => $value['location'], "date" => $value['date'], "detail" => $value['detail'], "post_time" => $value['post_time']);
      array_push($array, $ans);
    }
    array_push($array);
    return $json_array = json_encode($array, JSON_UNESCAPED_UNICODE);
  }

}

//レコード数取得
function getRecordCount($table_name){
  global $pdo;
  $result = $pdo->query('SELECT COUNT (*) FROM '.$table_name.';');
  $accessCount = $result->fetchColumn();
  if(!$result){
    //var_dump($result);
    die('クエリが失敗しました。'.pg_last_error());
  }
  
  return $accessCount;
}

function getCommentFromResult($result){

  $varJsSample = array("post_time" => "投稿日時", "comment" => "コメント");
  $varJsSample;
  $comment_array = array($varJsSample);

  //結果からコメントデータを取り出す
  if(!empty($result)){

    foreach($result as $value){
      $ans = array("post_time" => $value['post_time'], "comment" => "".$value['comment']);
      //var_dump($ans);
      array_push($comment_array, $ans);
      //var_dump($comment_array);
    }

    $comment_json_array = json_encode($comment_array, JSON_UNESCAPED_UNICODE);
    //echo $comment_json_array;
  }

  return $comment_json_array;

}