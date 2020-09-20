<?php

function doPostContact($name, $email, $message){
  global $pdo;
  $sql = "INSERT INTO contact (name, email, message, post_time) VALUES ('".$name."', '".$email."', '".$message."', CURRENT_TIMESTAMP);";
  $result = $pdo->query($sql);
  $accessCount = $result->fetchColumn();
  if(!$result){
    //var_dump($result);
    die('クエリが失敗しました。'.pg_last_error());
  }
}

require_once('common.php');

$pdo;
connect_db();
doPostContact($_POST['name'], $_POST['email'], $_POST['message']);
$pdo = null;

include('contact-result.html');