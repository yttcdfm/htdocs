<?php

function doPostWordSearch($word){
  global $pdo;
  $sql = "SELECT * FROM picture WHERE title LIKE '%".$word."%'";
  $result = $pdo->query($sql);
  if(!$result){
    //var_dump($result);
    die('クエリが失敗しました。'.pg_last_error());
  }else{
  }
  
  return $result;
}

function doPostCategoryTagSearch($category_id){
  global $pdo;
  $sql = "SELECT * FROM picture WHERE category_id = ".$category_id;
  $result = $pdo->query($sql);
  if(!$result){
    //var_dump($result);
    die('クエリが失敗しました。'.pg_last_error());
  }else{
  }
  
  return $result;
}

require_once('common.php');
$pdo;
connect_db();

if($_POST['word'] != ''){
  $result = doPostWordSearch($_POST['word']);
  $pdo = null;
  $picture_json_array = getPicture($result);
  echo($picture_json_array);
  
}else if($_POST['category_id'] != ''){
  $result = doPostCategoryTagSearch($_POST['category_id']);
  $pdo = null;
  $picture_json_array = getPicture($result);
  echo($picture_json_array);
}

?>