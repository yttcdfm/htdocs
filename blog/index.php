<?php

/*****************************
* 関数定義部
******************************/



/*****************************
* メイン部
******************************/
//echo('hogehoge');
require_once('../src/common.php');
connect_db();
$result = selectAll('unit');
$src_ip = $_SERVER["REMOTE_ADDR"];
doPostSrcip('access_view', $src_ip);
$result2 = selectAll('event');
$pdo = null;

$unit_json_array = getPicture($result);
$event_json_array = getCategory($result2);
require_once('index.html');
?>

<script type="text/javascript">
var unit_json_array ='<?php echo $unit_json_array; ?>';
var event_json_array ='<?php echo $event_json_array; ?>';
</script>

<script type="text/javascript" src="../src/common.php"></script>
<script type="text/javascript" src="./src/index.js"></script>