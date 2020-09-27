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
$result = selectAll('event');
$pdo = null;

$event_json_array = getEvent($result);
require_once('fan-event.html');
?>

<script type="text/javascript">
var event_json_array ='<?php echo $event_json_array; ?>';
</script>

<script type="text/javascript" src="../src/common.php"></script>
<script type="text/javascript" src="./src/fan-event.js"></script>