<?php

/*****************************
* 関数定義部
******************************/

function getPicture($result){

  if(!empty($result)){
    
    $picture_array = array();
    
    foreach($result as $value){
      //var_dump($value);
      $ans = array("id" => $value['id'], "site_name" => $value['site_name'], "title" => $value['title'], "content_url" => $value['content_url'], "pic_url" => $value['pic_url'], "duration" => $value['duration']);
      array_push($picture_array, $ans);
    }
    
    return $picture_json_array = json_encode($picture_array, JSON_UNESCAPED_UNICODE);
  }

}

/*****************************
* メイン部
******************************/
//echo('hogehoge');
require_once('./src/common.php');
connect_db();
$result = selectAll('picture');
doPOST('access_view');
$pdo = null;

$picture_json_array = getPicture($result);

include('index.html');
?>

<script type="text/javascript">
var picture_json_array ='<?php echo $picture_json_array; ?>';
</script>

<script type="text/javascript" src="./src/common.js"></script>
<script type="text/javascript" src="./src/index.js"></script>
