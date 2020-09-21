<?php

function doPostWordSearch($word){
  global $pdo;
  //var_dump('爆乳ちゃん');
  $sql = "SELECT * FROM picture WHERE title LIKE '%".$word."%'";
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
$result = doPostWordSearch($_POST['word']);
$pdo = null;
$picture_json_array = getPicture($result);
echo($picture_json_array);
?>