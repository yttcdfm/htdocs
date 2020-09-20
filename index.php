<?php

/*****************************
* 関数定義部
******************************/



/*****************************
* メイン部
******************************/
//echo('hogehoge');
require_once('./src/common.php');
connect_db();
$result = selectAll('picture');
$src_ip = $_SERVER["REMOTE_ADDR"];
doPostSrcip('access_view', $src_ip);
$pdo = null;

$picture_json_array = getPicture($result);

include('index.html');
?>

<script type="text/javascript">
var picture_json_array ='<?php echo $picture_json_array; ?>';
</script>

<script type="text/javascript" src="./src/common.js"></script>
<script type="text/javascript" src="./src/index.js"></script>