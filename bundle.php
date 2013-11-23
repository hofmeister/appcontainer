<?php
require 'apps.php';

header('Content-type: text/javascript');

$appIds = explode(',',$_GET['id']);

$js = '';
foreach($appIds as $appId) {
    $js .= compileApp($appId);
}

echo $js;


